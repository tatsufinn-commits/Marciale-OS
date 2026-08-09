/* ===========================================================
   MIGRATIONS — versioned data migrations for localStorage
   =========================================================== */
const CURRENT_SCHEMA_VERSION = 2;

function runMigrations() {
  let v = LS.get('hub.schema.version', 0);
  if (v === CURRENT_SCHEMA_VERSION) return;
  console.log(`Migrating Hub data from version ${v} to ${CURRENT_SCHEMA_VERSION}...`);
  
  if (v < 1) {
    // Initial schema setup
  }
  if (v < 2) {
    // Migrate single Markdown note to Note Library array
    const oldNotes = LS.get('hub.notes.md.v1', null) || LS.get('hub.notes.v1', '');
    if (oldNotes) {
      const library = [{
        id: Math.random().toString(36).slice(2,9) + Date.now().toString(36).slice(-3),
        title: "Legacy Note",
        content: oldNotes.trim(),
        tags: [],
        ts: Date.now()
      }];
      LS.set('hub.notes.library.v1', library); console.log('Library set in migration:', library);
    }
  }

  LS.set('hub.schema.version', CURRENT_SCHEMA_VERSION);
  console.log('Migrations complete.');
}

try {
  runMigrations();
} catch (e) {
  console.error("Migration failed:", e);
}
