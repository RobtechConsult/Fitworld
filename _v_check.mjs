import { chromium } from 'playwright'
const OUT=process.env.SP, BASE='http://localhost:4173/Fitworld/#'
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'})
const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage()
let bad=0; p.on('response',r=>{if(r.url().includes('/exercise-images/')&&r.status()>=400)bad++})
await p.goto(BASE+'/exercise/seed:deadlift',{waitUntil:'networkidle'}); await p.waitForTimeout(600)
await p.screenshot({path:`${OUT}/shot-detail-deadlift.png`})
await p.goto(BASE+'/exercises',{waitUntil:'networkidle'}); await p.waitForTimeout(600)
await p.screenshot({path:`${OUT}/shot-catalog2.png`})
console.log('404 Bild-Requests:', bad)
await b.close()
