const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const { exec } = require('child_process')
const path = require('path')
const { stringify } = require('querystring')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
    },
    autoHideMenuBar: true
  })

  win.webContents.openDevTools();
  win.loadFile('webPage/index.html')
  
}

var windowsProductKey = "";
var kmsServer = "";


function getCertDetails(){
  exec("slmgr /dlv")
  console.log("got cert details")
}

function activateWindows(){
  exec("powershell start-process powershell -verb runas {slmgr /skms " + kmsServer + " ; slmgr /ipk " + windowsProductKey + " ; sleep 3 ; slmgr /ato ; sleep 1 ; start ms-settings:activation}")
  //dialog.showErrorBox('Transparency Mode Command:', 'RUN THIS: powershell start-process powershell -verb runas {slmgr /skms ' + kmsServer + ' ; slmgr /ipk ' + productKey + ' ; sleep 3 ; slmgr /ato}') 
}

function activateOffice16(){
  exec("powershell start-process powershell -verb runas {cd 'C:\\Program Files\\Microsoft Office\\Office16' ; foreach ($x in $(Get-ChildItem -Name ..\\root\\Licenses16\\proplusvl_kms*.xrm-ms)) {cscript ospp.vbs /inslic:'..\\root\\Licenses16\\$x'} ; echo 'INSTALLING LICENSE' ; cscript ospp.vbs /inpkey:XQNVK-8JYDB-WJ9W3-YJ8YR-WFG99 ; cscript ospp.vbs /unpkey:BTDRB >nul ; cscript ospp.vbs /unpkey:KHGM9 >nul ; cscript ospp.vbs /unpkey:CPQVG >nul ; cscript ospp.vbs /sethst:" + kmsServer + " ; cscript ospp.vbs /setprt:1688 ; cscript ospp.vbs /act ; echo 'DONE' ; pause}")
  console.log("powershell start-process powershell -verb runas {cd 'C:\\Program Files\\Microsoft Office\\Office16' ; foreach ($x in $(Get-ChildItem -Name ..\\root\\Licenses16\\proplusvl_kms*.xrm-ms)) {cscript ospp.vbs /inslic:'..\\root\\Licenses16\\$x'} ; echo 'INSTALLING LICENSE' ; cscript ospp.vbs /inpkey:XQNVK-8JYDB-WJ9W3-YJ8YR-WFG99 ; cscript ospp.vbs /unpkey:BTDRB >nul ; cscript ospp.vbs /unpkey:KHGM9 >nul ; cscript ospp.vbs /unpkey:CPQVG >nul ; cscript ospp.vbs /sethst:" + kmsServer + " ; cscript ospp.vbs /setprt:1688 ; cscript ospp.vbs /act ; echo 'DONE' ; pause}")
}

function activateOffice21(){
  exec("powershell start-process powershell -verb runas {cd 'C:\\Program Files\\Microsoft Office\\Office16' ; foreach ($x in $(Get-ChildItem -Name ..\\root\\Licenses16\\ProPlus2021VL_KMS*.xrm-ms)) {cscript ospp.vbs /inslic:..\\root\\Licenses16\\$x} ; echo 'INSTALLING LICENSE' ; cscript ospp.vbs /unpkey:6F7TH >nul ; cscript ospp.vbs /inpkey:FXYTK-NJJ8C-GB6DW-3DYQT-6F7TH ; cscript ospp.vbs /sethst:" + kmsServer + " ; cscript ospp.vbs /setprt:1688 ; cscript ospp.vbs /act ; echo 'DONE' ; pause}")
  console.log("powershell start-process powershell -verb runas {cd 'C:\\Program Files\\Microsoft Office\\Office16' ; foreach ($x in $(Get-ChildItem -Name ..\\root\\Licenses16\\ProPlus2021VL_KMS*.xrm-ms)) {cscript ospp.vbs /inslic:..\\root\\Licenses16\\$x} ; echo 'INSTALLING LICENSE' ; cscript ospp.vbs /unpkey:6F7TH >nul ; cscript ospp.vbs /inpkey:FXYTK-NJJ8C-GB6DW-3DYQT-6F7TH ; cscript ospp.vbs /sethst:" + kmsServer + " ; cscript ospp.vbs /setprt:1688 ; cscript ospp.vbs /act ; echo 'DONE' ; pause}")
}

function activateOffice19(){
  exec("powershell start-process powershell -verb runas {cd 'C:\\Program Files\\Microsoft Office\\Office16' ; foreach ($x in $(Get-ChildItem -Name ..\\root\\Licenses16\\ProPlus2019VL*.xrm-ms)) {cscript ospp.vbs /inslic:..\\root\\Licenses16\\$x} ; echo 'INSTALLING LICENSE' ; cscript ospp.vbs /unpkey:6MWKP >nul ; cscript ospp.vbs /inpkey:NMMKJ-6RK4F-KMJVX-8D9MJ-6MWKP ; cscript ospp.vbs /sethst:" + kmsServer + " ; cscript ospp.vbs /setprt:1688 ; cscript ospp.vbs /act ; echo 'DONE' ; pause}")
  console.log("powershell start-process powershell -verb runas {cd 'C:\\Program Files\\Microsoft Office\\Office16' ; foreach ($x in $(Get-ChildItem -Name ..\\root\\Licenses16\\ProPlus2019VL*.xrm-ms)) {cscript ospp.vbs /inslic:..\\root\\Licenses16\\$x} ; echo 'INSTALLING LICENSE' ; cscript ospp.vbs /unpkey:6MWKP >nul ; cscript ospp.vbs /inpkey:NMMKJ-6RK4F-KMJVX-8D9MJ-6MWKP ; cscript ospp.vbs /sethst:" + kmsServer + " ; cscript ospp.vbs /setprt:1688 ; cscript ospp.vbs /act ; echo 'DONE' ; pause}")

}

function downloadOffice21(){
  shell.openExternal("https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/ProPlus2021Retail.img")
}

function downloadOffice19(){
  shell.openExternal("https://officecdn.microsoft.com/pr/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/ProPlus2019Retail.img")
}

function openServerPage(){
  shell.openExternal("https://github.com/Wind4/vlmcsd")
}

function uninstallCert(){
  exec("powershell start-process powershell -verb runas {slmgr /upk}")
  console.log("uninstalled cert")
}

function activationSettings(){
  exec("start ms-settings:activation");
}

ipcMain.on("getCertDetails", getCertDetails)

ipcMain.on("setKMS", (event, response) => {
  kmsServer = response
})

ipcMain.on("setIPK", (event, response) => {
  windowsProductKey = response
})

ipcMain.on("activateWindows", activateWindows)

ipcMain.on("activateOffice16", activateOffice16)

ipcMain.on("activateOffice21", activateOffice21)

ipcMain.on("activateOffice19", activateOffice19)

ipcMain.on("downloadOffice21", downloadOffice21)

ipcMain.on("downloadOffice19", downloadOffice19)

ipcMain.on("uninstallCert", uninstallCert)

ipcMain.on("openServerPage", openServerPage)

ipcMain.on("activationSettings", activationSettings)

app.whenReady().then(() => {
  createWindow()
})

