module.exports = {
  "exportFilePath": "shot",
  "capabilities": [
    // Run in headless mode, i.e., without a UI or display server dependencies.
    "--headless",
    // Disables the sandbox for all process types that are normally sandboxed.
    "--no-sandbox",
    // Disables GPU hardware acceleration. If software renderer is not in place, then the GPU process won't launch.
    "--disable-gpu",
    "--window-size=1980,1200" 
  ]
}