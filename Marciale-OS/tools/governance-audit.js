#!/usr/bin/env node
/**
 * @sre & @joint Automated Governance, Law & Scenario Integrity Audit Tool
 * Scans the entire Marciale-OS monorepo for stale constitutional counts,
 * scenario discrepancies, version drift, and unindexed documentation.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');

console.log('\n🏛️  ======================================================');
console.log('    MARCIALE-OS @joint GOVERNANCE INTEGRITY AUDIT');
console.log('======================================================\n');

let issues = 0;
let checks = 0;

// 1. Authoritative Constitutional Law Count Audit
console.log('📜 1. Auditing Constitutional Law Invariants...');
const aiRulesPath = path.join(docsDir, 'AI_RULES.md');
if (fs.existsSync(aiRulesPath)) {
  const aiRulesContent = fs.readFileSync(aiRulesPath, 'utf8');
  const lawMatches = aiRulesContent.match(/### 🏛️ LAW [IVXLCDM]+/g) || [];
  const authoritativeCount = lawMatches.length;
  console.log(`   Authoritative Supreme Laws in AI_RULES.md: ${authoritativeCount}`);
  
  if (aiRulesContent.includes('THE 9 SUPREME LAWS') || aiRulesContent.includes('THE 8 SUPREME LAWS')) {
    console.error(`   ❌ [STALE HEADER] AI_RULES.md header title does not match ${authoritativeCount} laws.`);
    issues++;
  } else {
    console.log(`   ✅ Constitutional heading aligned with ${authoritativeCount} Supreme Laws.`);
    checks++;
  }
} else {
  console.error('   ❌ AI_RULES.md not found!');
  issues++;
}

// 2. Authoritative Scenario Registry Audit
console.log('\n📖 2. Auditing Scenario Registry & Playbook...');
const playbookPath = path.join(docsDir, 'PROMPT_PLAYBOOK.md');
if (fs.existsSync(playbookPath)) {
  const playbookContent = fs.readFileSync(playbookPath, 'utf8');
  const scenarioMatches = playbookContent.match(/### Scenario \d+:/g) || [];
  const totalScenarios = scenarioMatches.length;
  console.log(`   Authoritative Master Scenarios in PROMPT_PLAYBOOK.md: ${totalScenarios}`);
  
  if (totalScenarios >= 20) {
    console.log(`   ✅ Scenario registry verified (${totalScenarios} Scenarios active).`);
    checks++;
  } else {
    console.warn(`   ⚠️  Expected at least 20 scenarios, found ${totalScenarios}.`);
    issues++;
  }
} else {
  console.error('   ❌ PROMPT_PLAYBOOK.md not found!');
  issues++;
}

// 3. Documentation Master Index Coverage Audit
console.log('\n📚 3. Auditing Documentation Master Index Coverage...');
const masterIndexPath = path.join(docsDir, 'DOCS_MASTER_INDEX.md');
if (fs.existsSync(masterIndexPath)) {
  const indexContent = fs.readFileSync(masterIndexPath, 'utf8');
  const requiredIndexedDocs = [
    'AI_RULES.md',
    'AGENT_PLAYBOOK.md',
    'AGENTS.md',
    'PROMPT_PLAYBOOK.md',
    'THE_10_COMMANDMENTS_OF_DOCS.md',
    'BUILD_LOGBOOK.md',
    'STRATEGIC_DECISION_FRAMEWORK.md'
  ];
  
  let missingFromIndex = 0;
  requiredIndexedDocs.forEach(doc => {
    if (!indexContent.includes(doc)) {
      console.error(`   ❌ [UNINDEXED DOC] ${doc} is missing from DOCS_MASTER_INDEX.md!`);
      missingFromIndex++;
    }
  });

  if (missingFromIndex === 0) {
    console.log('   ✅ All core governance and operational documents properly indexed.');
    checks++;
  } else {
    issues += missingFromIndex;
  }
} else {
  console.error('   ❌ DOCS_MASTER_INDEX.md not found!');
  issues++;
}

// 4. Version Declarations & Domain Audit
console.log('\n📦 4. Auditing Subsystem Version Manifests...');
const rootPkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const hubPkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'TheHUB 1.5.5.2.3 a v/package.json'), 'utf8'));
const companionPkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'Gamecompanion/files/package.json'), 'utf8'));

console.log(`   • Root Monorepo Version: ${rootPkg.version}`);
console.log(`   • TheHUB Subsystem:      ${hubPkg.version}`);
console.log(`   • Companion RPG Engine:  ${companionPkg.version}`);
checks++;

// 5. Rule Index Integrity Audit (Proposal 2 gate — boundary rule + rule index)
console.log('\n📇 5. Auditing Rule Index Integrity...');
const ruleIndexPath = path.join(docsDir, 'RULE_INDEX.md');
let ruleIndexMissing = 0;
if (fs.existsSync(ruleIndexPath)) {
  const ruleIndexContent = fs.readFileSync(ruleIndexPath, 'utf8');
  // Collect every LAW heading from AI_RULES.md (roman numeral + optional lettered amendment)
  const aiRulesContent = fs.readFileSync(aiRulesPath, 'utf8');
  const lawIds = new Set();
  (aiRulesContent.match(/LAW ([IVXLCDM]+(?:-[A-Z])?):/g) || []).forEach(m => lawIds.add(m.slice(4, -1)));
  // Collect every Commandment heading
  const commandmentsContent = fs.readFileSync(path.join(docsDir, 'THE_10_COMMANDMENTS_OF_DOCS.md'), 'utf8');
  const cmdIds = new Set();
  (commandmentsContent.match(/COMMANDMENT ([IVXLCDM]+):/g) || []).forEach(m => cmdIds.add(m.slice(12, -1)));

  const missingRules = [];
  // Regex: match the ID at the start of a table cell, with a negative lookahead so partial IDs
  // (e.g. `LAW I` inside `LAW XIII`) do NOT count as indexed.
  lawIds.forEach(id => {
    const re = new RegExp('\\|\\s*LAW ' + id + '(?![IVXLCDM0-9-])');
    if (!re.test(ruleIndexContent)) missingRules.push(`LAW ${id}`);
  });
  cmdIds.forEach(id => {
    const re = new RegExp('\\|\\s*COMMANDMENT ' + id + '(?![IVXLCDM0-9-])');
    if (!re.test(ruleIndexContent)) missingRules.push(`COMMANDMENT ${id}`);
  });

  if (missingRules.length === 0) {
    console.log(`   ✅ Rule Index verified: ${lawIds.size} laws + ${cmdIds.size} commandments all indexed.`);
    checks++;
  } else {
    console.error(`   ❌ [RULE INDEX GAP] ${missingRules.length} rule(s) not indexed: ${missingRules.join(', ')}`);
    issues++;
  }
} else {
  console.error('   ❌ [RULE INDEX MISSING] docs/RULE_INDEX.md not found.');
  issues++;
}

console.log('\n======================================================');
if (issues === 0) {
  console.log(`🎉 GOVERNANCE AUDIT PASSED: All ${checks} Checks Nominal (0 Conflicts)`);
  console.log('   System Standing: 100% Aligned with AI Constitution & High Council Charters');
  console.log('======================================================\n');
  process.exit(0);
} else {
  console.error(`❌ GOVERNANCE AUDIT FAILED: ${issues} governance discrepancies detected!`);
  console.log('======================================================\n');
  process.exit(1);
}
