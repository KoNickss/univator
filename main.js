const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const { exec } = require('child_process')
const path = require('path')
const { fstat } = require('fs')
const fs = require('fs')
const crypto = require('crypto')

let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
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
  var activatePROC = exec("powershell start-process powershell -verb runas {cscript C:\\Windows\\System32\\slmgr.vbs /skms " + kmsServer + " > $null ; cscript C:\\Windows\\System32\\slmgr.vbs /ipk " + windowsProductKey + " > $null ; sleep 3 ; cscript C:\\Windows\\System32\\slmgr.vbs /ato ; sleep 1 ; start ms-settings:activation}")

  activatePROC.on('close', _ => {
    win.webContents.send('winkmsdone')
  })

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

function downloadOffice21_o(){
  shell.openExternal("https://c2rsetup.officeapps.live.com/c2r/download.aspx?ProductreleaseID=ProPlus2021Retail&platform=x64&language=en-us&version=O16GA")
}

function downloadOffice19(){
  shell.openExternal("https://officecdn.microsoft.com/pr/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/en-us/ProPlus2019Retail.img")
}

function downloadOffice19_o(){
  shell.openExternal("https://c2rsetup.officeapps.live.com/c2r/download.aspx?ProductreleaseID=ProPlus2019Retail&platform=x64&language=en-us&version=O16GA")
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

function downloadExe(){

  if(fs.existsSync('C:\\Users\\Public\\ActTicket\\14f4df8a2a7fc82a4f415cf6a341415d.cab')){
    var exeStream = fs.readFileSync('C:\\Users\\Public\\ActTicket\\14f4df8a2a7fc82a4f415cf6a341415d.cab')
    var checksum = crypto.createHash('sha256').update(exeStream).digest('hex')

    if(checksum.toLowerCase() === '24399eb37ca3e935ab5aa8e501fea950f99ff25565553b7641598d85b3cf381d'){
      win.webContents.send('exeDownloadOk')
      return
    }
  }

  let exeDownProc = exec('powershell mkdir C:\\Users\\Public\\ActTicket & cd C:\\Users\\Public\\ActTicket & echo "Y -> Downloading binary archive .cab file from microsoft Z" & powershell wget -UseBasicParsing -Uri https://download.microsoft.com/download/9/A/E/9AE69DD5-BA93-44E0-864E-180F5E700AB4/adk/Installers/14f4df8a2a7fc82a4f415cf6a341415d.cab -Outfile .\\14f4df8a2a7fc82a4f415cf6a341415d.cab ')

  exeDownProc.stdout.on('data', (data) => {
    win.webContents.send('stdout', String(data))
  })

  exeDownProc.stderr.on('data', (data) => {
    win.webContents.send('stderr', String(data))
  })

  exeDownProc.on('close', () => {
    if(fs.existsSync('C:\\Users\\Public\\ActTicket\\14f4df8a2a7fc82a4f415cf6a341415d.cab')){
      var exeStream = fs.readFileSync('C:\\Users\\Public\\ActTicket\\14f4df8a2a7fc82a4f415cf6a341415d.cab')
      var checksum = crypto.createHash('sha256').update(exeStream).digest('hex')
      win.webContents.send('stdout', checksum)
      win.webContents.send('stdout', "EXPECTED CHECKSUM (SHA256, HEX): 1f6e56a5467ab472c915cd98b4e93226182684358ca1cdc14ec3bbb2e584b3e7")
      if(checksum.toLowerCase() === '24399eb37ca3e935ab5aa8e501fea950f99ff25565553b7641598d85b3cf381d'){
        win.webContents.send('exeDownloadOk')
      }else{
        win.webContents.send('exeDownloadErr')
      }
    }else{
      win.webContents.send('exeDownloadErr')
    }
  })

}

function genExe(){


  if(fs.existsSync('C:\\Users\\Public\\ActTicket\\gatherosstatemodified.exe')){
    var exeStream = fs.readFileSync('C:\\Users\\Public\\ActTicket\\gatherosstatemodified.exe')
    var checksum = crypto.createHash('sha256').update(exeStream).digest('hex')
    win.webContents.send('stdout', checksum)
    if(checksum.toLowerCase() === '1f6e56a5467ab472c915cd98b4e93226182684358ca1cdc14ec3bbb2e584b3e7'){
      win.webContents.send('exeGenOk')
      return
    }
  }

  let exeGenProc = exec('powershell cd C:\\Users\\Public\\ActTicket ; echo "Y-> EXTRACTING GATHEROSSTATE.EXE Z" ; expand .\\14f4df8a2a7fc82a4f415cf6a341415d.cab -F:filf8377e82b29deadca67bc4858ed3fba9 . ; powershell mv .\\filf8377e82b29deadca67bc4858ed3fba9 .\\gatherosstate.exe ; echo "*Modifying Binary Code To Enable Exploit, credit to GamerOSState*" & powershell "" $bytes  = [System.IO.File]::ReadAllBytes("""C:\\Users\\Public\\ActTicket\\gatherosstate.exe""") ; $bytes[320] = 0xf8 ; $bytes[321] = 0xfb ; $bytes[322] = 0x05 ; $bytes[324] = 0x03 ; $bytes[13672] = 0x25 ; $bytes[13674] = 0x73 ; $bytes[13676] = 0x3b ; $bytes[13678] = 0x00 ; $bytes[13680] = 0x00 ; $bytes[13682] = 0x00 ; $bytes[13684] = 0x00 ; $bytes[32748] = 0xe9 ; $bytes[32749] = 0x9e ; $bytes[32750] = 0x00 ; $bytes[32751] = 0x00 ; $bytes[32752] = 0x00 ; $bytes[32894] = 0x8b ; $bytes[32895] = 0x44 ; $bytes[32897] = 0x64 ; $bytes[32898] = 0x85 ; $bytes[32899] = 0xc0 ; $bytes[32900] = 0x0f ; $bytes[32901] = 0x85 ; $bytes[32902] = 0x1c ; $bytes[32903] = 0x02 ; $bytes[32904] = 0x00 ; $bytes[32906] = 0xe9 ; $bytes[32907] = 0x3c ; $bytes[32908] = 0x01 ; $bytes[32909] = 0x00 ; $bytes[32910] = 0x00 ; $bytes[32911] = 0x85 ; $bytes[32912] = 0xdb ; $bytes[32913] = 0x75 ; $bytes[32914] = 0xeb ; $bytes[32915] = 0xe9 ; $bytes[32916] = 0x69 ; $bytes[32917] = 0xff ; $bytes[32918] = 0xff ; $bytes[32919] = 0xff ; $bytes[33094] = 0xe9 ; $bytes[33095] = 0x80 ; $bytes[33096] = 0x00 ; $bytes[33097] = 0x00 ; $bytes[33098] = 0x00 ; $bytes[33449] = 0x64 ; $bytes[33576] = 0x8d ; $bytes[33577] = 0x54 ; $bytes[33579] = 0x24 ; $bytes[33580] = 0xe9 ; $bytes[33581] = 0x55 ; $bytes[33582] = 0x01 ; $bytes[33583] = 0x00 ; $bytes[33584] = 0x00 ; $bytes[33978] = 0xc3 ; $bytes[34189] = 0x59 ; $bytes[34190] = 0xeb ; $bytes[34191] = 0x28 ; $bytes[34238] = 0xe9 ; $bytes[34239] = 0x4f ; $bytes[34240] = 0x00 ; $bytes[34241] = 0x00 ; $bytes[34242] = 0x00 ; $bytes[34346] = 0x24 ; $bytes[34376] = 0xeb ; $bytes[34377] = 0x63 ; [System.IO.File]::WriteAllBytes("""C:\\Users\\Public\\ActTicket\\gatherosstatemodified.exe""", $bytes) "" & echo "-> Set exe Compatiblility Mode to xpsp3 in Registry" & powershell start-process powershell -verb runas { reg.exe Add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers" /v "C:\Users\Public\ActTicket\gatherosstatemodified.exe" /d "WINXPSP3" /f } & echo "Y -> File gatherosstatemodified.exe has now been sucesfully pacified and should output DownLevel tickets regardless or conditions met Z"')

  exeGenProc.stdout.on('data', (data) => {
    win.webContents.send('stdout', String(data))
  })

  exeGenProc.stderr.on('data', (data) => {
    win.webContents.send('stderr', String(data))
  })

  exeGenProc.on('close', () => {
    exec('powershell {reg.exe Add `HKLM\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers` /v "C:\\ProgramData\\ActTicket\\gatherosstatemodified.exe" /d "WINXPSP3" /f ; echo "`n=======> Put file (gatherosstatemodified.exe) in Windows XP SP3 compatibility mode`n" ; pause}')

    if(fs.existsSync('C:\\Users\\Public\\ActTicket\\gatherosstatemodified.exe')){
      var exeStream = fs.readFileSync('C:\\Users\\Public\\ActTicket\\gatherosstatemodified.exe')
      var checksum = crypto.createHash('sha256').update(exeStream).digest('hex')
      win.webContents.send('stdout', checksum)
      if(checksum.toLowerCase() === '1f6e56a5467ab472c915cd98b4e93226182684358ca1cdc14ec3bbb2e584b3e7'){
        win.webContents.send('exeGenOk')
      }else{
        win.webContents.send('exeGenErr')
      }
    }else{
      win.webContents.send('exeGenErr')
    }

  })
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

ipcMain.on("downloadOffice21-o", downloadOffice21_o)

ipcMain.on("downloadOffice19", downloadOffice19)

ipcMain.on("downloadOffice19-o", downloadOffice19_o)

ipcMain.on("uninstallCert", uninstallCert)

ipcMain.on("openServerPage", openServerPage)

ipcMain.on("activationSettings", activationSettings)

ipcMain.on("downloadexe", downloadExe)

ipcMain.on("genexe", genExe)

app.whenReady().then(() => {
  createWindow()
})

