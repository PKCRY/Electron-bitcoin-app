const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

const notifyBtn = document.getElementById('notifyBitcoin')
console.log(notifyBtn)
notifyBtn.addEventListener('click', function (event) {
    console.log(__dirname)
    const modalPath = path.join('file://', __dirname, 'addWindow.html')
    let win = new BrowserWindow({ width: 400, height: 200})
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
})