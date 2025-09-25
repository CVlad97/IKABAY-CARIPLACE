const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const root = process.cwd();
const files = walk(root).filter(f =>
  /(^|[\\/])next\.config\.(js|cjs|mjs)$/.test(f)
);

console.log("---- NEXT CONFIG FILES FOUND ----");
if (files.length === 0) {
  console.log("(none)");
} else {
  for (const f of files) {
    console.log("•", f);
    try {
      const txt = fs.readFileSync(f, "utf8");
      const hasTarget = /[^a-zA-Z]target\s*:/.test(txt);
      console.log("  has target?:", hasTarget);
      if (hasTarget) {
        console.log("  ---- FILE CONTENT START ----");
        console.log(txt);
        console.log("  ---- FILE CONTENT END ----");
      }
    } catch (e) {
      console.log("  (cannot read)", e.message);
    }
  }
}
