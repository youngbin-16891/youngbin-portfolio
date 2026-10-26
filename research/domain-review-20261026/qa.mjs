import fs from 'node:fs';
import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const out='outputs/domain-review-20261026';fs.mkdirSync(out,{recursive:true});
const base=process.env.QA_BASE||'http://127.0.0.1:4189/';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));
const slugs=['genesis-pass','fc-live-event','idle-operations'];const result=[];
for(const width of [320,390,768,1440]){
 await page.setViewportSize({width,height:width<768?844:1000});
 for(const slug of slugs)for(const tail of ['', '-summary']){
  const response=await page.goto(base+'reports/'+slug+tail+'.html',{waitUntil:'networkidle'});
  await page.evaluate(async()=>{await Promise.all([...document.images].map(async img=>{img.loading='eager';try{await img.decode();}catch{}}));});
  const state=await page.evaluate(()=>({title:document.title,h1:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth+1,images:[...document.images].filter(x=>!x.complete||!x.naturalWidth).map(x=>x.src),ids:[...document.querySelectorAll('[id]')].map(x=>x.id)}));
  const key=slug+tail+'-'+width;await page.screenshot({path:out+'/'+key+'.png',fullPage:true});
  if(slug==='idle-operations'&&!tail){await page.locator('#monthly-revenue').screenshot({path:out+'/monthly-'+width+'.png'});}
  if(slug==='fc-live-event'&&!tail){await page.locator('#problem').screenshot({path:out+'/b-definition-'+width+'.png'});}
  const links=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')).filter(h=>h&&!/^(https?:|mailto:|tel:)/.test(h)));
  for(const h of links){const u=new URL(h,page.url());if(u.origin!==new URL(base).origin)continue;const resp=await page.request.get(u.href.split('#')[0]);if(resp.status()!==200)errors.push(key+' broken '+h+' '+resp.status());if(u.hash&&u.pathname===new URL(page.url()).pathname&&!state.ids.includes(decodeURIComponent(u.hash.slice(1))))errors.push(key+' missing anchor '+h);}
  result.push({key,status:response.status(),...state});
 }
 await page.goto(base+'#projects',{waitUntil:'networkidle'});await page.locator('#projects').screenshot({path:out+'/projects-'+width+'.png'});
 result.push({key:'projects-'+width,...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,cards:document.querySelectorAll('#case-studies article').length}))});
}
if(!process.env.QA_BASE){
 await page.setViewportSize({width:1440,height:1000});
 for(const slug of slugs){await page.goto(base+'reports/'+slug+'.html',{waitUntil:'networkidle'});await page.pdf({path:'dist/reports/'+slug+'.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});}
 for(const slug of slugs){await page.goto(base+'reports/'+slug+'-summary.html',{waitUntil:'networkidle'});await page.pdf({path:out+'/'+slug+'-summary.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});}
}
await browser.close();
fs.writeFileSync(out+'/'+(process.env.QA_BASE?'public-':'')+'qa.json',JSON.stringify({base,result,errors},null,2));
console.log(JSON.stringify({views:result.length,errors,overflow:result.filter(x=>x.overflow).map(x=>x.key),brokenImages:result.filter(x=>x.images?.length).map(x=>x.key)},null,2));

