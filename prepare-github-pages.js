const fs = require("fs");
const path = require("path");

// Create .nojekyll file (to bypass Jekyll processing on GitHub Pages)
const outputDir = path.join(__dirname, "out");

// Ensure output directory exists after build
if (!fs.existsSync(outputDir)) {
  console.error(
    'Output directory does not exist. Please run "npm run build" first.'
  );
  process.exit(1);
}

// Create .nojekyll file
fs.writeFileSync(path.join(outputDir, ".nojekyll"), "");
console.log("Created .nojekyll file");
