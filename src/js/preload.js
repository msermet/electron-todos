// Ce script sera exécuter avant le chargement de la page
// Accès aux API Node et Electron

const { contextBridge,ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {   // Permet de mettre versions dans Window, dans Window on retrouve document
    // fonction qui récupère les versions via IPC Renderer (preload.js)
    getVersions: () => ipcRenderer.invoke('get-versions')
})

console.log('preload chargé avec succès')