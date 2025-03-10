// Processus de rendu

const electronVersion = document.querySelector('#electron-version')
const chromiumVersion = document.querySelector('#chromium-version')
const nodeVersion = document.querySelector('#node-version')

electronVersion.textContent = process.versions.electron
chromiumVersion.textContent = process.versions.chrome
nodeVersion.textContent = process.versions.node