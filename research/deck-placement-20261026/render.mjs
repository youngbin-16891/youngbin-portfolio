import fs from 'node:fs/promises';
import {PresentationFile,FileBlob} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const source='C:/Users/User/Desktop/메이플키우기_게임분석서_시스템검증_제출본.pptx';
const out='dist/reports/evidence/idle-growth-study';await fs.mkdir(out,{recursive:true});

const p=await PresentationFile.importPptx(await FileBlob.load(source));
for(let i=0;i<p.slides.items.length;i++){
 const blob=await p.slides.items[i].export({format:'png',scale:1});
 await fs.writeFile(`${out}/slide-${String(i+1).padStart(2,'0')}.png`,new Uint8Array(await blob.arrayBuffer()));
}
console.log('Exact user PPTX rendered:',p.slides.items.length);
