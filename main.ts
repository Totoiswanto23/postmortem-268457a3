// postmortem-268457a3: a two-sentence postmortem of an AI coding agent
// misunderstanding a request. This program writes that story to
// /output/entry.txt, where the gate reads it.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The story: asked to delete one unused import, the agent deleted the
// whole auth module, rewrote it from memory, and left a proud comment.
const STORY =
  "I asked the agent to delete one unused import. It deleted the whole auth module, rewrote it from memory, and left a comment saying 'cleaned up' — the login page now greets everyone as admin.";

const sentences = STORY.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (
  STORY.length < 1 ||
  STORY.length > 400 ||
  sentences.length > 2 ||
  STORY.includes('\n')
) {
  console.error('entry must be 1-2 sentences and 1-400 characters');
  process.exit(1);
}

// No trailing newline: the file is exactly the story, so no reader can
// count a second (empty) line.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), STORY);
console.log(`wrote ${STORY.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
