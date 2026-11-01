const {chromium}=require('playwright');const {spawn}=require('child_process');
(async()=>{const d=process.argv[2],FPS=30,T=20;const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+d+'/film.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','slow','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart','-an',d+'/master.mp4'],{stdio:['pipe','inherit','inherit']});
for(let f=0;f<FPS*T;f++){await p.evaluate(t=>renderAt(t),f/FPS);const buf=await p.screenshot({type:'jpeg',quality:94});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done')})();
