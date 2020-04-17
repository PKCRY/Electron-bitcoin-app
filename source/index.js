const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const notifier = require('node-notifier') //for notifications 
const ipc = electron.ipcRenderer



const notifyBtn = document.getElementById('notifyBitcoin')
const price = document.querySelector('h1')
let targetPrice = document.getElementById('targetPrice')
let targetPriceVal

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../source/images/btc.png')
}

function getBTC() {
    // https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then( res => {
            const cryptos = res.data.BTC.USD
            price.innerHTML = `$ ${cryptos.toLocaleString('en')}` //replacing the h1 with the current BTC price

            //creating the notification
            if(targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
                const myNotification = new window.Notification(notification.title, notification);
                notifier.notify({
                    title: 'BTC Alert',
                    message: 'BTC just beat your target price!',
                    icon: path.join(__dirname, '../source/images/btc.png'),
                    sound: true,
                    wait: false
                })
            }
        })
}
getBTC()
setInterval(getBTC, 10000);



console.log(notifyBtn)
notifyBtn.addEventListener('click', function (event) {
    console.log(__dirname)
    const modalPath = path.join('file://', __dirname, 'addWindow.html')
    let win = new BrowserWindow({ 
        frame: false, 
        transparent: true, 
        height: 200,
        width: 400, 
        alwaysOnTop: true, 
        webPreferences: {
            nodeIntegration: true,
          }
        })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function(event, arg){
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = `$ ${targetPriceVal.toLocaleString('en')}`
})

