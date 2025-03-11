// Ce script sera exécuter avant le chargement de la page
// Accès aux API Node et Electron

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('versions', {   // Permet de mettre versions dans Window, dans Window on retrouve document
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node
})

console.log('preload chargé avec succès')