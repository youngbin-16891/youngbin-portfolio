import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const file=path.join(root,'dist/reports/genesis-pass.html');
const original=fs.readFileSync(file,'utf8');
const source=fs.readFileSync(path.join(root,'research/rebuild-20261024/PROJECT_A.md'),'utf8').replace(/^\uFEFF/,'');
const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const inline=s=>escape(s).replace(/https:\/\/[^\s<]+/g,url=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
function markdown(text){
 let html='',table=[],list=false;
 function closeList(){if(list){html+='</ul>';list=false;}}
 function closeTable(){if(!table.length)return;const rows=table.filter(l=>!/^\|[\s:|\-]+\|$/.test(l)).map(l=>l.trim().slice(1,-1).split('|').map(v=>v.trim()));html+='<div class="table-wrap" role="region" aria-label="분석 표" tabindex="0"><table><thead><tr>'+rows.shift().map(c=>'<th scope="col">'+inline(c)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';table=[];}
 for(const line of text.split(/\r?\n/)){
  if(line.startsWith('# '))continue;
  if(line.startsWith('|')){closeList();table.push(line);continue;}
  closeTable();
  if(!line.trim()){closeList();continue;}
  if(line.startsWith('### ')){closeList();html+='<h2>'+inline(line.slice(4))+'</h2>';continue;}
  if(line.startsWith('- ')){if(!list){html+='<ul>';list=true;}html+='<li>'+inline(line.slice(2))+'</li>';continue;}
  closeList();html+='<p>'+inline(line)+'</p>';
 }
 closeTable();closeList();return html;
}
const evidence=original.match(/<details><summary>실제 구매 화면 확인<\/summary>[\s\S]*?<\/details>/)?.[0]||'';
const download='<p><a href="genesis-pass-analysis.md" download>분석 원문 내려받기 (Markdown)</a> · 표의 단위·시나리오·측정 한계를 함께 확인할 수 있습니다.</p>';
let html=original.replace(/<main id="main">[\s\S]*?<\/main>/,'<main id="main">'+markdown(source)+evidence+download+'</main>');
html=html.replace(/<p class="notice">[\s\S]*?<\/p>/,'<p class="notice">공개자료 기반 BM 분석 보고서 · 공식 조건, 개인 경험, 해석·가설을 구분했습니다. 내부 지표와 운영 실험 결과는 포함하지 않습니다.</p>');
fs.writeFileSync(file,html);
fs.writeFileSync(path.join(root,'dist/reports/genesis-pass-analysis.md'),source);
console.log('Updated Project A only; report and downloadable source.');
