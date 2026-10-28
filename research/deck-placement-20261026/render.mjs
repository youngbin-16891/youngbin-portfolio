import fs from 'node:fs/promises';
import {PresentationFile,FileBlob} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const source='C:/Users/User/Desktop/메이플키우기_게임분석서_시스템검증_제출본.pptx';
const out='dist/reports/evidence/idle-growth-study';await fs.mkdir(out,{recursive:true});

const p=await PresentationFile.importPptx(await FileBlob.load(source));
// Keep the user's Desktop source unchanged; correct only published derivatives.
const corrections=JSON.parse(await fs.readFile('research/final-audit-20261028/slide-corrections.json','utf8'));
for(const correction of corrections){
 const inspection=await p.inspect({select:`$.slides[${correction.slide-1}].elements[*]`,include:['id','text']});
 const hit=inspection.records.find(row=>typeof row.text==='string'&&row.text.includes(correction.from));
 if(!hit)throw Error('Correction anchor not found: '+correction.from);
 p.resolve(hit.id).text.replace(correction.from,correction.to);
}
const only=Number(process.argv[2]||0);
for(let i=0;i<p.slides.items.length;i++){
 if(only&&i+1!==only)continue;
 const blob=await p.slides.items[i].export({format:'png',scale:1});
 await fs.writeFile(`${out}/slide-${String(i+1).padStart(2,'0')}.png`,new Uint8Array(await blob.arrayBuffer()));
}
console.log('Exact user PPTX rendered:',p.slides.items.length);
