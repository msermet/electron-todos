// Processus de rendu

const electronVersion = document.querySelector('#electron-version')
const chromiumVersion = document.querySelector('#chromium-version')
const nodeVersion = document.querySelector('#node-version')

electronVersion.textContent = versions.electron
chromiumVersion.textContent = versions.chrome
nodeVersion.textContent = versions.node