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
// B-only reading hierarchy; the shared A/C report stylesheet stays untouched.
const summaryKeys=['분석 대상','확인된 사실','핵심 가설','운영 제안','성과 지표'];
const summaryEntries=summaryKeys.map(key=>{const line=source.split(/\r?\n/).find(l=>l.startsWith('- '+key+': '));if(!line)throw new Error('Missing summary '+key);return [key,line.slice(key.length+4)];});
const summary='<section class="fc-summary" aria-label="핵심 분석 요약"><dl>'+summaryEntries.map(([key,value])=>'<div><dt>'+escape(key)+'</dt><dd>'+inline(value)+'</dd></div>').join('')+'</dl></section>';
html=html.replace(/<section class="fc-summary"[\s\S]*?<\/section>/g,'');
html=html.replace('</header>',summary+'</header>');
html=html.replace(/<h2>1\. 핵심 분석 요약<\/h2><ul>[\s\S]*?<\/ul>/,'');
const captures='<details class="fc-captures"><summary>공식 원문 캡처 비교 — 본문과 유의사항</summary><p>동일 URL의 본문과 유의사항 팝업, 2026.10.24 확인. 화면을 누르면 원본 크기로 볼 수 있습니다. 문구 차이는 확인했지만 실제 서버 판정·이용자 오인을 증명하는 캡처는 아닙니다.</p><figure><a href="evidence/fc-body-20261024.png"><img src="evidence/fc-body-20261024.png" alt="공식 본문에서 하루 1판 이상 플레이 조건을 안내하는 화면" loading="lazy"></a><figcaption>본문: 하루 1판 이상 플레이</figcaption></figure><figure><a href="evidence/fc-terms-20261024.png"><img src="evidence/fc-terms-20261024.png" alt="같은 미션 유의사항에서 3일 누적 출석으로 안내하는 화면" loading="lazy"></a><figcaption>유의사항: 3일 누적 출석</figcaption></figure><a href="https://events.fconline.nexon.com/260910/NewAndReturn" target="_blank" rel="noopener noreferrer">공식 이벤트 원문 ↗</a></details>';
html=html.replace('<h2>3. 보상과 지급 흐름</h2>',captures+'<h2>3. 보상과 지급 흐름</h2>');
html=html.replace(/<table><thead><tr><th scope="col">가설<\/th>/,'<table style="min-width:1000px"><thead><tr><th scope="col">가설</th>');
html=html.replace(/(<h2>7\. 보상 지급·예외 처리 기준<\/h2>)(<div class="table-wrap"[\s\S]*?<\/table><\/div>)/,'$1<details><summary>지급·예외 처리 상세 6개 유형 보기</summary>$2</details>');
const style=`<style id="fc-reading-style">header h1{font-size:clamp(24px,2.4vw,28px);margin:14px 0;line-height:1.4}.fc-summary dl{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:18px 0 0}.fc-summary dl>div{border:1px solid var(--line);border-radius:6px;padding:12px 15px;background:var(--bg)}.fc-summary dl>div:last-child{grid-column:1/-1}.fc-summary dt{font-size:12px;font-weight:800;color:var(--accent);margin-bottom:4px}.fc-summary dd{margin:0;font-size:14px;line-height:1.65}.fc-captures img{width:100%;height:auto;display:block}.fc-captures figure{margin:20px 0}.fc-captures figcaption{font-size:13px}summary{font-weight:700}@media(max-width:640px){.fc-summary dl{grid-template-columns:1fr}.fc-summary dl>div:last-child{grid-column:auto}}@media print{.fc-summary{break-inside:avoid}details{display:block!important}details:not([open])>:not(summary){display:block!important}}</style>`;
html=html.replace(/<style id="fc-reading-style">[\s\S]*?<\/style>/g,'').replace('</head>',style+'</head>');
fs.writeFileSync(file,html);
fs.writeFileSync(path.join(root,'dist/reports/fc-live-event-analysis.md'),source);
console.log('Updated Project B only; report and downloadable source.');
