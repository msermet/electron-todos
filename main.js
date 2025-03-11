// Processus principal

const {app, BrowserWindow, ipcMain, Menu} = require('electron')
const path = require('path')

let window

// Créer la fenêtre principale
function createWindow(){
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,  // Accès aux API Node depuis le processus de rendu
            contextIsolation: true,
            sandbox: true,
            preload: path.join(__dirname, 'src/js/preload.js')  // Script exécuté avant le chargement de la page
        }
    })

    // Création du menu
    createMenu()

    // Charger index.html
    window.loadFile('src/pages/index.html')
}

// Fonction permettant de créer un menu personnalisé
function createMenu(){
    // Créer un tableau qui va représenter le menu -> modèle
    const template = [
        {
            label: 'App',
            submenu: [
                {
                    label: 'Versions',
                    click: () => window.loadFile('src/pages/index.html')
                },
                {
                  type: 'separator'
                },
                {
                    label: 'Quitter',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => app.quit()
                }
            ]
        },
        {
            label: 'Tâches',
            submenu: [
                {
                    label: 'Lister',
                    click: () => window.loadFile('src/pages/liste-taches.html')
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Ajouter',
                    click: () => window.loadFile('src/pages/ajout-taches.html')
                }
            ]
        }
    ]

    // Créer le menu à partir du modèle
    const menu = Menu.buildFromTemplate(template)
    // Définir le menu comme étant le menu de l'application
    Menu.setApplicationMenu(menu)
}

// Attendre l'initialisation de l'application
app.whenReady().then( () => {

    console.log('Application initialisée')
    createWindow()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow()
        }
    })
})

// Fermer l'application si les fenêtres sont fermées
// Sur MacOS, les applications ne se ferment pas lorsqu'on ferme la dernière fenêtre
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){  // darwin = MacOS
        app.quit()
    }
})

// Ecouter sur le canal "get-versions"
ipcMain.handle('get-versions', () => {
    // Renvoyer un objet contenant les versions d'Electron, Chrome et Node
    return {
        electron: process.versions.electron,
        chrome: process.versions.chrome,
        node: process.versions.node
    }
})