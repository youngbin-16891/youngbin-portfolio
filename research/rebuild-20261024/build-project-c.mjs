import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const file=path.join(root,'dist/reports/idle-operations.html');
const original=fs.readFileSync(file,'utf8');
const source=fs.readFileSync(path.join(root,'research/rebuild-20261024/PROJECT_C.md'),'utf8').replace(/^\uFEFF/,'');
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

const summaryKeys=['실제 사건','운영 문제','우선 대응','작성 결과물','사후 지표'];
const summary='<section class="ops-summary" aria-label="운영 대응 핵심 요약"><dl>'+summaryKeys.map(key=>{const line=source.split(/\r?\n/).find(l=>l.startsWith('- '+key+': '));if(!line)throw Error(key);return '<div><dt>'+escape(key)+'</dt><dd>'+inline(line.slice(key.length+4))+'</dd></div>';}).join('')+'</dl></section>';
let body=markdown(source).replace(/<h2>1\. 먼저 내린 판단<\/h2><ul>[\s\S]*?<\/ul>/,'');
body=body.replaceAll('../research/rebuild-20261024/voc-cases.csv','<a href="../research/rebuild-20261024/voc-cases.csv">VOC 포함·제외 기록 CSV</a>').replaceAll('../research/rebuild-20261024/voc-collection-method.md','<a href="../research/rebuild-20261024/voc-collection-method.md">VOC 수집 방법</a>');
body=body.replace(/<h2>(\d+)\. /g,(_,n)=>'<h2>'+(Number(n)-1)+'. ');
const download='<p><a href="idle-operations-analysis.md" download>운영 대응 보고서 원문 내려받기</a></p>';
let html=original.replace(/<main id="main">[\s\S]*?<\/main>/,'<main id="main">'+body+download+'</main>');
html=html.replace(/<section class="ops-summary"[\s\S]*?<\/section>/g,'').replace('</header>',summary+'</header>');
html=html.replace(/<p class="notice">[\s\S]*?<\/p>/,'<p class="notice">공개 사건 분석 · 모의 운영 대응 문서. 공식 정책·공개 반응·지원자의 제안을 구분했습니다. 실제 업무 성과나 이탈 효과를 주장하지 않습니다.</p>');
const style='<style id="ops-reading-style">header h1{font-size:clamp(24px,2.4vw,28px);line-height:1.4}.ops-summary dl{display:grid;grid-template-columns:1fr 1fr;gap:10px}.ops-summary dl>div{padding:14px;border:1px solid var(--line);border-radius:6px;background:var(--bg)}.ops-summary dl>div:last-child{grid-column:1/-1}.ops-summary dt{font-size:12px;font-weight:800;color:var(--accent);margin-bottom:5px}.ops-summary dd{margin:0;font-size:14px;line-height:1.65}td,th{min-width:130px}main p{overflow-wrap:anywhere}@media(max-width:640px){.ops-summary dl{grid-template-columns:1fr}.ops-summary dl>div:last-child{grid-column:auto}}@media print{.ops-summary{break-inside:avoid}}</style>';
html=html.replace(/<style id="ops-reading-style">[\s\S]*?<\/style>/g,'').replace('</head>',style+'</head>');
fs.writeFileSync(file,html);
fs.writeFileSync('dist/reports/idle-operations-analysis.md',source);
console.log('Project C report and downloadable source built.');
