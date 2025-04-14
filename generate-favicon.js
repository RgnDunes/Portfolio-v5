const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Path to the source PNG file
const sourceFile = path.join(
  __dirname,
  "public",
  "images",
  "portfolio-logo.png"
);
const outputFile = path.join(__dirname, "public", "favicon.ico");

// Resize the image to 32x32
sharp(sourceFile)
  .resize(32, 32)
  .toFile(path.join(__dirname, "public", "icon.png"))
  .then(() => {
    console.log("32x32 icon generated successfully!");
  })
  .catch((err) => {
    console.error("Error generating 32x32 icon:", err);
  });

// Create the 180x180 Apple icon
sharp(sourceFile)
  .resize(180, 180)
  .toFile(path.join(__dirname, "public", "apple-icon.png"))
  .then(() => {
    console.log("180x180 Apple icon generated successfully!");
  })
  .catch((err) => {
    console.error("Error generating Apple icon:", err);
  });
