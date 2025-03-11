// Processus de rendu

const electronVersion = document.querySelector('#electron-version')
const chromiumVersion = document.querySelector('#chromium-version')
const nodeVersion = document.querySelector('#node-version')

async function lesVersions() {
    // Appel de la fonction getVersions exposée par le preload
    const v = await window.versions.getVersions()

    electronVersion.textContent = v.electron
    chromiumVersion.textContent = v.chrome
    nodeVersion.textContent = v.node
}

lesVersions()