import test from 'node:test';
import assert from 'node:assert/strict';
import { AudioSystem } from '../src/systems/AudioSystem.js';

test('AudioSystem gracefully handles headless / non-browser environment without throwing', () => {
  const audio = new AudioSystem({ enabled: true, volume: 0.5 });
  assert.equal(audio._volume, 0.5);
  const played = audio.play('hit');
  assert.equal(played, false, 'Should return false when AudioContext is unavailable without crashing');
});

test('AudioSystem volume bounds and toggle control', () => {
  const audio = new AudioSystem({ enabled: true, volume: 0.5 });
  audio.setVolume(1.5);
  assert.equal(audio._volume, 1.0);
  audio.setVolume(-0.2);
  assert.equal(audio._volume, 0.0);
  audio.setVolume(0.4);
  assert.equal(audio._volume, 0.4);

  assert.equal(audio.toggle(false), false);
  assert.equal(audio.toggle(true), true);
});

test('AudioSystem synthesizes waveforms when Web Audio API mock is present', () => {
  const calls = [];
  const mockNode = {
    connect: () => {},
    start: (t) => calls.push({ type: 'start', time: t }),
    stop: (t) => calls.push({ type: 'stop', time: t }),
    setValueAtTime: (v, t) => calls.push({ type: 'setValue', val: v, time: t }),
    exponentialRampToValueAtTime: (v, t) => calls.push({ type: 'ramp', val: v, time: t })
  };

  class MockAudioContext {
    constructor() {
      this.currentTime = 10.0;
      this.state = 'running';
      this.destination = {};
    }
    createOscillator() {
      return {
        type: 'sine',
        frequency: mockNode,
        connect: mockNode.connect,
        start: mockNode.start,
        stop: mockNode.stop
      };
    }
    createGain() {
      return {
        gain: mockNode,
        connect: mockNode.connect
      };
    }
    createBiquadFilter() {
      return {
        type: 'lowpass',
        frequency: mockNode,
        connect: mockNode.connect
      };
    }
  }

  globalThis.window = { AudioContext: MockAudioContext };
  try {
    const audio = new AudioSystem({ enabled: true, volume: 0.5 });
    assert.equal(audio.play('hit'), true);
    assert.equal(audio.play('chest'), true);
    assert.equal(audio.play('levelup'), true);
    assert.ok(calls.length > 5, 'Web audio nodes should have scheduled ramps and starts');
  } finally {
    delete globalThis.window;
  }
});
