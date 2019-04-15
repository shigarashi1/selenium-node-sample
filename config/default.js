module.exports = {
  "exportFilePath": "shot",
  "capabilities": [
    // Run in headless mode, i.e., without a UI or display server dependencies.
    "--headless",
    // Disables the sandbox for all process types that are normally sandboxed.
    "--no-sandbox",
    // Disables GPU hardware acceleration. If software renderer is not in place, then the GPU process won't launch.
    "--disable-gpu",
    // Use a specific disk cache location, rather than one derived from the UserDatadir.
    // "--disk-cache-dir",
    // DirectWrite FontCache is shared by browser to renderers using shared memory. This switch allows us to pass the shared memory handle to the renderer.
    // "--font-cache-shared-handle"
    "--window-size=1980,1200"
  ]
}