/* ===========================================================
   COMMAND PALETTE + KEYBOARD UX (Ctrl/Cmd + K)
   =========================================================== */
let cmdIndex = -1;
let cmdItems = [];
let cmdLastFocus = null;

function isTypingTarget(el=document.activeElement){
  if(!el) return false;
  const tag=(el.tagName||'').toLowerCase();
  return tag==='input' || tag==='textarea' || tag==='select' || el.isContentEditable;
}
function pageLabel(page){
  return ({today:'Today',dash:'Portal & Bookmarks',idlehero:'Idle Hero',chess:'ChessLab',ruview:'RuView',cal:'Calendar',tasks:'Tasks',notes:'Notes',ai:'Marciale',track:'Intake Tracker',vault:'Vault'}[page]||page);
}
function cmdIcon(type){
  return ({Page:'⌘',Action:'⚡',Bookmark:'🔖',Portal:'↗',Task:'✅',Event:'📅',Note:'📝'}[type]||'•');
}
function commandCorpus(){
  const corpus=[];
  const add=(item)=>corpus.push(Object.assign({sub:'',keywords:''}, item));

  // Pages/Tabs
  $$('.tab').forEach(t=>{
    const page=t.dataset.page;
    add({ type:'Page', title:pageLabel(page), sub:'Open page', keywords:[page,t.textContent].join(' '), action:()=>{ closeCommandPalette(); activatePage(page); }});
  });

  // Quick actions
  add({type:'Action', title:'Add Bookmark', sub:'Create a new saved link', keywords:'bookmark link url', action:()=>{ closeCommandPalette(); activatePage('dash'); openModal(null); }});
  add({type:'Action', title:'New Calendar Event', sub:'Create a deadline or event', keywords:'calendar deadline reminder', action:()=>{ closeCommandPalette(); activatePage('cal'); openEvent(null); }});
  add({type:'Action', title:'New Task', sub:'Create a Kanban task', keywords:'todo kanban work', action:()=>{ closeCommandPalette(); activatePage('tasks'); window.openTaskModal?.(null); }});
  add({type:'Action', title:'New Note', sub:'Create a Markdown note', keywords:'markdown notebook', action:()=>{ closeCommandPalette(); activatePage('notes'); createNewNote?.(); }});
  add({type:'Action', title:'Log Drink', sub:'Open intake tracker and focus quantity', keywords:'caffeine taurine sugar intake', action:()=>{ closeCommandPalette(); activatePage('track'); $('#tQty')?.focus(); }});
  add({type:'Action', title:'Ask Marciale', sub:'Open assistant input', keywords:'ai assistant chat marciale', action:()=>{ closeCommandPalette(); activatePage('ai'); $('#aiText')?.focus(); }});
  add({type:'Action', title:'Export Full Backup', sub:'Download all Hub local data', keywords:'backup export json data', action:()=>{ closeCommandPalette(); exportHubBackup?.(); }});
  add({type:'Action', title:'Optimize UI', sub:'Auto-tune density/layout for this screen', keywords:'theme layout density optimizer', action:()=>{ closeCommandPalette(); optimizeUI?.(); }});

  // Bookmarks
  if(typeof DB !== 'undefined'){
    DB.forEach(b=>add({ type:'Bookmark', title:b.title, sub:host(b.url), keywords:[b.url,b.desc,b.cat,(b.tags||[]).join(' ')].join(' '), action:()=>{ closeCommandPalette(); window.open(safeUrl(b.url)||b.url,'_blank','noopener'); }}));
  }

  // Portal Links
  if(typeof PORTAL !== 'undefined'){
    PORTAL.forEach(sec=>sec.tiles.forEach(t=>add({ type:'Portal', title:t.nm, sub:`${sec.name} · ${host(t.url)}`, keywords:[sec.name,t.sub,t.url].join(' '), action:()=>{ closeCommandPalette(); window.open(safeUrl(t.url)||t.url,'_blank','noopener'); }})));
  }

  // Calendar events
  if(typeof getAllEvents === 'function'){
    getAllEvents().filter(e=>e.date>=todayStr()).slice(0,30).forEach(e=>add({ type:'Event', title:e.title, sub:`${e.date}${e.time?' · '+e.time:''}${e.type?' · '+e.type:''}`, keywords:[e.notes,e.priority,e.recur].join(' '), action:()=>{ closeCommandPalette(); activatePage('cal'); openEvent(e.id); }}));
  }

  // Tasks
  const taskSource = (typeof TASKS !== 'undefined' && Array.isArray(TASKS)) ? TASKS : (Array.isArray(window.TASKS) ? window.TASKS : []);
  taskSource.filter(t=>t.status!=='done').slice(0,40).forEach(t=>add({ type:'Task', title:t.title, sub:`${pageLabel('tasks')} · ${t.status||'todo'}${t.due?' · due '+t.due:''}`, keywords:[t.project,t.priority,t.notes].join(' '), action:()=>{ closeCommandPalette(); activatePage('tasks'); window.openTaskModal?.(t); }}));

  // Notes
  if(typeof NOTES !== 'undefined'){
    NOTES.slice(0,40).forEach(n=>add({ type:'Note', title:n.title||'Untitled Note', sub:'Markdown note', keywords:(n.content||'').slice(0,500), action:()=>{ closeCommandPalette(); activatePage('notes'); openNote?.(n.id); }}));
  }
  return corpus;
}
function scoreCmd(item,q){
  if(!q) return 1;
  const title=String(item.title||'').toLowerCase();
  const hay=[item.title,item.sub,item.keywords,item.type].join(' ').toLowerCase();
  if(title===q) return 100;
  if(title.startsWith(q)) return 80;
  if(title.includes(q)) return 55;
  return q.split(/\s+/).filter(Boolean).reduce((n,tok)=>n+(hay.includes(tok)?10:0),0);
}

function openCommandPalette() {
  const overlay=$('#cmdOverlay'); if(!overlay) return;
  cmdLastFocus=document.activeElement;
  $('#cmdInput').value = '';
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden','false');
  setTimeout(() => $('#cmdInput').focus(), 50);
  renderCmdResults('');
}

function closeCommandPalette() {
  const overlay=$('#cmdOverlay'); if(!overlay) return;
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden','true');
  if(cmdLastFocus && typeof cmdLastFocus.focus==='function') setTimeout(()=>cmdLastFocus.focus(), 0);
}

function renderCmdResults(query) {
  const q = (query || '').trim().toLowerCase();
  const hits = commandCorpus().map(item=>({...item, score:scoreCmd(item,q)})).filter(x=>!q || x.score>0).sort((a,b)=>b.score-a.score || a.title.localeCompare(b.title)).slice(0, 18);
  cmdItems = hits;
  cmdIndex = hits.length ? 0 : -1;

  const box = $('#cmdResults');
  if (!box) return;
  box.setAttribute('role','listbox');
  box.setAttribute('aria-label','Command results');
  if (!hits.length) {
    box.innerHTML = '<div class="cmd-empty">No results found. Try “task”, “note”, “calendar”, or “backup”.</div>';
    return;
  }

  box.innerHTML = hits.map((h, i) => `
    <div class="cmd-item ${i===cmdIndex?'selected':''}" id="cmd-item-${i}" role="option" aria-selected="${i===cmdIndex?'true':'false'}" tabindex="-1">
      <div class="cmd-ico">${cmdIcon(h.type)}</div>
      <div class="cmd-main"><div class="cmd-title">${esc(h.title)}</div>${h.sub ? `<div class="cmd-sub">${esc(h.sub)}</div>` : ''}</div>
      <span class="cmd-type">${esc(h.type)}</span>
    </div>
  `).join('');

  hits.forEach((h, i) => {
    const el=$(`#cmd-item-${i}`);
    el.onclick = h.action;
    el.onmousemove = () => { cmdIndex = i; updateCmdSelection(); };
  });
}

function runSelectedCommand(){
  if(cmdIndex>=0 && cmdItems[cmdIndex]) cmdItems[cmdIndex].action();
}
function updateCmdSelection() {
  $$('.cmd-item').forEach((el, i) => {
    const selected=i===cmdIndex;
    el.classList.toggle('selected', selected);
    el.setAttribute('aria-selected', selected ? 'true' : 'false');
    if (selected) el.scrollIntoView({ block: 'nearest' });
  });
}

function showShortcutHelp(){
  let overlay=$('#shortcutOverlay');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.className='overlay shortcut-overlay';
    overlay.id='shortcutOverlay';
    overlay.innerHTML=`<div class="modal shortcut-modal" role="dialog" aria-modal="true" aria-labelledby="shortcutTitle">
      <h3 id="shortcutTitle">Keyboard shortcuts</h3>
      <div class="shortcut-grid">
        <div><kbd>Ctrl</kbd>/<kbd>⌘</kbd> <kbd>K</kbd><span>Open command palette</span></div>
        <div><kbd>Alt</kbd> <kbd>1-0</kbd><span>Switch pages</span></div>
        <div><kbd>?</kbd><span>Show this help</span></div>
        <div><kbd>Esc</kbd><span>Close dialogs / palette</span></div>
        <div><kbd>↑</kbd><kbd>↓</kbd><span>Move in command palette</span></div>
        <div><kbd>Enter</kbd><span>Run selected command</span></div>
      </div>
      <div class="row"><button class="btn primary" id="shortcutClose">Got it</button></div>
    </div>`;
    document.body.appendChild(overlay);
    $('#shortcutClose').onclick=()=>overlay.classList.remove('show');
    overlay.onclick=e=>{ if(e.target===overlay) overlay.classList.remove('show'); };
  }
  overlay.classList.add('show');
  setTimeout(()=>$('#shortcutClose')?.focus(),50);
}

function initCommandAccessibility(){
  const overlay=$('#cmdOverlay');
  const input=$('#cmdInput');
  if(overlay){ overlay.setAttribute('aria-hidden','true'); overlay.setAttribute('role','presentation'); }
  if(input){
    input.setAttribute('role','combobox');
    input.setAttribute('aria-expanded','true');
    input.setAttribute('aria-controls','cmdResults');
    input.setAttribute('aria-label','Search commands, pages, bookmarks, tasks, events, and notes');
  }
  $$('.tab').forEach((t,i)=>{
    t.setAttribute('role','button'); t.setAttribute('tabindex','0');
    t.setAttribute('aria-label',`Open ${pageLabel(t.dataset.page)} page`);
    t.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); t.click(); }});
  });
}

document.addEventListener('keydown', e => {
  const key=String(e.key||'').toLowerCase();
  if ((e.ctrlKey || e.metaKey) && key === 'k') {
    e.preventDefault();
    $('#cmdOverlay')?.classList.contains('show') ? closeCommandPalette() : openCommandPalette();
    return;
  }

  if(e.altKey && /^[0-9]$/.test(key)){
    const tabs=$$('.tab'); const idx=key==='0'?9:Number(key)-1; const t=tabs[idx];
    if(t){ e.preventDefault(); t.click(); toast(`Opened ${pageLabel(t.dataset.page)}`); }
    return;
  }

  if(key==='?' && !isTypingTarget()){
    e.preventDefault(); showShortcutHelp(); return;
  }
  
  if ($('#cmdOverlay')?.classList.contains('show')) {
    if (e.key === 'Escape') { e.preventDefault(); closeCommandPalette(); }
    if (e.key === 'ArrowDown' && cmdItems.length) {
      e.preventDefault(); cmdIndex = (cmdIndex + 1) % cmdItems.length; updateCmdSelection();
    }
    if (e.key === 'ArrowUp' && cmdItems.length) {
      e.preventDefault(); cmdIndex = (cmdIndex - 1 + cmdItems.length) % cmdItems.length; updateCmdSelection();
    }
    if (e.key === 'Enter') { e.preventDefault(); runSelectedCommand(); }
  }
});

$('#cmdInput')?.addEventListener('input', e => renderCmdResults(e.target.value));
$('#cmdOverlay')?.addEventListener('click', e => { if (e.target === $('#cmdOverlay')) closeCommandPalette(); });
initCommandAccessibility();
window.openCommandPalette=openCommandPalette;
window.closeCommandPalette=closeCommandPalette;
window.showShortcutHelp=showShortcutHelp;
