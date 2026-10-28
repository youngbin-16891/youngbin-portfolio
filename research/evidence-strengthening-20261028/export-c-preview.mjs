import fs from 'node:fs';
import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

// Reflow an existing report figure for the main card; no new analysis or data.
const source='dist/reports/idle-operations.html';
const html=fs.readFileSync(source,'utf8');
const figures=html.match(/<figure[\s\S]*?<\/figure>/g)||[];
const figure=figures.find(f=>f.includes('미접속은 먼저 접속 가능 상태로 나눈다'));
if(!figure)throw Error('Existing account-state figure missing');
const out='outputs/evidence-strengthening-20261028';
fs.mkdirSync(out,{recursive:true});
const frame=`<!doctype html><html lang="ko"><meta charset="utf-8"><style>
*{box-sizing:border-box}body{margin:0;width:640px;padding:30px;background:#f3f5f5;color:#182b3d;font-family:"Malgun Gothic",sans-serif}
.label{margin:0 0 14px;font-size:19px;font-weight:700;color:#315f73}
figure{margin:0}figcaption{font-size:28px;font-weight:700;line-height:1.4;margin-bottom:20px;word-break:keep-all}
ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:14px}
li{background:white;border-top:3px solid #315f73;padding:18px;min-height:135px}
strong{display:block;font-size:26px;line-height:1.4;word-break:keep-all}span{display:block;margin-top:10px;font-size:21px;line-height:1.5;word-break:keep-all}
.figure-note{margin:20px 0 0;font-size:19px;line-height:1.55;word-break:keep-all;color:#4b5c68}
</style><body><p class="label">작성 결과물 · 모의 측정안</p>${figure}</body></html>`;
fs.writeFileSync(out+'/c-preview-source.html',frame);
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:640,height:800},deviceScaleFactor:2});
await page.setContent(frame);await page.evaluate(()=>document.fonts.ready);
await page.locator('body').screenshot({path:'dist/reports/evidence/idle-account-state-preview.png'});
await browser.close();
fs.writeFileSync(out+'/c-preview-provenance.json',JSON.stringify({source,selector:'existing decision-figure: account-state interpretation',sourceFigure:figure,output:'dist/reports/evidence/idle-account-state-preview.png',changes:'layout, font size and attribution label only'},null,2));
console.log('Existing C figure exported with explicit simulated-measurement label.');
