import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const file=path.join(root,'dist/reports/fc-live-event.html');
const original=fs.readFileSync(file,'utf8');
const source=fs.readFileSync(path.join(root,'research/rebuild-20261024/PROJECT_B.md'),'utf8').replace(/^\uFEFF/,'');
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
const evidence='';
const download='<p><a href="fc-live-event-analysis.md" download>분석 원문 내려받기 (Markdown)</a> · 표의 단위·시나리오·측정 한계를 함께 확인할 수 있습니다.</p>';
let html=original.replace(/<main id="main">[\s\S]*?<\/main>/,'<main id="main">'+markdown(source)+evidence+download+'</main>');
html=html.replace(/<p class="notice">[\s\S]*?<\/p>/,'<p class="notice">공개자료 기반 라이브서비스 분석·모의 개선안 · 공식 조건, 개인 경험, 해석·가설을 구분했습니다. 내부 지표와 운영 실험 결과는 포함하지 않습니다.</p>');
const flow = `<figure aria-label="보상 수령과 경기 참여의 분기 흐름도" style="margin:20px 0"><figcaption>서로 다른 두 행동 경로</figcaption><div class="notice">인지 → 페이지 방문·자격 확인 → 게임 접속</div><div style="display:flex;flex-wrap:wrap;gap:12px;margin:12px 0"><div style="flex:1;min-width:240px;border:1px solid var(--line);padding:16px"><strong>접속 경로</strong><p>접속일 인정 → 보상 수령 → 선수단 조정(선택) → 경기 또는 종료</p></div><div style="flex:1;min-width:240px;border:1px solid var(--line);padding:16px"><strong>경기 경로</strong><p>현재 선수단으로 시작 → 인정 경기 완료 → 경기 보상 수령</p></div></div><div class="notice">다음 날·다음 주: 접속만 할 수도, 다시 경기할 수도 있음</div></figure>`;
html=html.replace(/<p>인지 → 이벤트 페이지 방문 → 자격 확인 → 게임 접속 후 두 경로로 나뉜다\.<\/p><ul>[\s\S]*?<\/ul>/,flow);
fs.writeFileSync(file,html);
fs.writeFileSync(path.join(root,'dist/reports/fc-live-event-analysis.md'),source);
console.log('Updated Project B only; report and downloadable source.');
