import {chromium} from 'file:///C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';import fs from 'node:fs';
const b=await chromium.launch({channel:'chrome'}),p=await b.newPage(),base='file:///'+process.cwd().replaceAll('\\','/')+'/dist/reports/';
for(const slug of ['genesis-pass','fc-live-event','idle-operations']){
 await p.goto(base+slug+'.html');await p.evaluate(slug=>{
 const sentinel=slug==='genesis-pass'?'데이터를 받았을 때의 판단':slug==='fc-live-event'?'최소안:':'이용자에게 먼저 확인해 안내할 정보';
 if(document.documentElement.dataset.finalEdit==='20261024'&&document.querySelector('#action')?.textContent.includes(sentinel))return;
 const q=s=>document.querySelector(s),el=(tag,html,cls)=>{let x=document.createElement(tag);x.innerHTML=html;if(cls)x.className=cls;return x;};
 const appendix=q('#appendix');q('.original-overview')?.remove();
 const archive=(title,nodes)=>{const d=el('details','<summary>'+title+'</summary>');d.className='editorial-archive';for(const n of nodes)if(n)d.append(n);appendix.append(d);return d;};
 const table=(head,rows)=>'<div class="table-wrap core-table" role="region" aria-label="핵심 판단과 측정 표" tabindex="0"><table><thead><tr>'+head.map(x=>'<th scope="col">'+x+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
 if(slug==='genesis-pass'){
 const lead=q('.hero-intro');const judgment=q('.opening-conclusion');judgment.innerHTML='<strong>개인 구매 판단</strong> 기본 패스는 해방 가속을 위해 구매했습니다. PLUS는 후속 보스 부담과 큐브 결과의 불확실성 때문에 구매하지 않았습니다. <a href="#action">이 경험에서 검토한 사업 판단 ↓</a>';lead.after(judgment);
 const decision=q('.conditional-decision');archive('조건부 판단 6개와 비교 기준 전체',[decision]);
 const action=q('#action');action.innerHTML='<h2>04. 사업 판단과 실행 제안</h2><p>기본 패스의 가속과 PLUS의 추가 보상은 다른 구매 가치다. 개인 경험은 이 구분의 출발점이며 전체 이용자의 구매 이유를 증명하지는 않는다.</p><div class="proposal"><h3>먼저 유지·검증하고, 원인이 확인되면 바꾼다</h3><ul><li><strong>활용이 양호하면 유지 검토:</strong> 가격·보상을 먼저 바꾸지 않고 구매 시점과 실제 해방·보상 활용을 연결해 본다.</li><li><strong>조건 오인이 확인되면 안내 시험:</strong> 가격·만료·별도 티켓·미션 조건을 구매 전에 짧게 안내한다. 실제 오인 근거가 없으면 보류한다.</li><li><strong>조건 자체가 활용을 막는다면:</strong> 해당 집단의 수행·남은 기회를 확인한 뒤 상품 조건 변경을 검토한다. 구매율 하나로 할인·보상 확대를 정하지 않는다.</li></ul></div><h3>데이터를 받았을 때의 판단 <small>미실행 모의 시나리오</small></h3>'+table(['신호','확인과 대응'],[
 ['기본 구매율이 낮거나 높음','낮으면 노출·이해·보스·남은 기회를 확인한다. 높아도 완료·오인 문제를 함께 보고, 활용이 양호할 때 유지한다.'],
 ['해방 완료율이 낮거나 높음','낮으면 미적용·시작 단계·늦은 구매를 구분한다. 높아도 과도한 가속이라고 단정하지 않고 해방 후 목표·참여를 확인한다.'],
 ['PLUS 구매율이 낮거나 높음','낮으면 보스 수행·남은 기회·보상 활용을 확인한다. 높으면 미션 완료·수령도 확인한다. 활용 제한·오안내가 있으면 추가 판촉보다 원인 처리를 먼저 한다.']])+'<p class="figure-note">실측 결과가 아니다. 같은 정의·명의 단위와 비슷한 진입 시점·단계를 맞춰 비교한다. 비교 자료가 없으면 높고 낮음을 판정하지 않는다. 안내 증가의 읽기 부담·구매 감소 가능성도 확인한다. 상세 6개 시나리오와 기준은 부록에 보존했다.</p>';
 }else if(slug==='fc-live-event'){
 const analysis=q('#analysis');let h=[...analysis.querySelectorAll('h3')].find(x=>x.textContent==='원인별 대응 우선순위');if(h){let nodes=[],n=h;while(n){nodes.push(n);n=n.nextSibling;}archive('원인별 대안·대응 비용과 검토 근거',nodes);}
 analysis.append(el('p','안내 외에도 경기 관심·시간·숙련·기술 문제가 원인일 수 있다. 진행 중 오류는 우선 확인하고, 이해·탐색 문제가 확인될 때만 안내를 시험한다. 원인별 근거와 대응표는 부록에서 볼 수 있다.'));
 const action=q('#action'),details=[...action.childNodes].filter(n=>!(n.tagName==='H2'));archive('확장안 · 개인 상태 연동 명세와 적용 위치',details);
 action.innerHTML='<h2>실무 제안</h2><p><strong>먼저 공통 규칙을 맞추고, 이해 문제가 확인될 때만 추가 안내를 검토한다.</strong> 아래는 지원자의 미실행 제안이다.</p><ol><li><strong>확인·정정:</strong> 실제 인정 조건을 확인해 본문·유의사항·CS 안내를 통일한다. 이를 실험 효과로 집계하지 않는다.</li><li><strong>최소안:</strong> 기존 페이지에 인정·제외 모드와 다음 행동을 짧게 정리한다. 보상·가격·참여 조건은 바꾸지 않는다.</li><li><strong>시험 조건:</strong> 이해 과업·문의에서 탐색 부담이 확인될 때 추가 안내를 시험한다. 오류·관심·시간·숙련 문제가 크면 안내 확대를 보류한다.</li></ol><p>개인별 보상·경기·이용권 상태를 보여주는 확장안은 별도 개발 요청이다. 구현·로그·공수 협의 전에는 실행을 전제하지 않는다. 상세 명세와 일정·예외 처리는 부록에 남겼다.</p>';
 const measure=q('#measurement');archive('확장안의 배정·KPI·관찰 기간 전체 정의',[...measure.childNodes].filter(n=>!(n.tagName==='H2')));
 measure.innerHTML='<h2>성과 확인</h2><p>공통 안내는 조건 이해와 관련 문의를 확인한다. 경기 상태·배정 로그가 연결되는 확장안에서만 아래 행동 지표를 비교한다.</p>'+table(['확인할 것','측정 계획'],[
 ['첫 경기 완료','배정 후24시간 안에 인정 경기를 완료한 계정 / 배정 계정 전체 E'],
 ['이어서 플레이했는가','배정 후168시간 내 서로 다른2일 이상 경기한 계정 / E. D7은7번째 날짜 당일 접속·경기를 따로 확인'],
 ['운영 부담','조건 관련 문의, 비정상 경기, 계정당 실제 지급량·개발·QA·CS 비용을 함께 확인']])+'<p class="figure-note">실제 결과는 없다. 신규·복귀를 나누고, 두 군에 올바른 공통 규칙을 제공한다. 안내를 클릭한 사람만 골라 성과를 계산하지 않는다. 전체 분모·D1/D7·일정은 부록 참조.</p>';
 q('.family-intro').textContent='FC KICK-OFF 신규·복귀 이벤트의 접속 보상과 경기 미션을 나눠 봤습니다. 실제 규칙을 먼저 확인·정리하고, 이해 문제가 확인될 때만 추가 안내를 검토했습니다.';
 q('.family-overview dl div:last-child dd').textContent='공통 규칙·다음 행동 안내를 먼저 검토합니다. 개인 상태 연동은 구현 확인이 필요한 확장안입니다.';
 q('.family-judgment p').textContent='보상 수령은 경기 참여 성과와 다릅니다. 안내 부족을 원인으로 확정하지 않고, 단계별 행동을 구분해 검증합니다.';
 }else{
 q('.family-intro').textContent='실제 전액 환불 공지와 FAQ, 공개 반응을 조사했습니다. 정책상 접속할 수 없는 경우와 자발적 중단 가능성을 구분하는 모의 운영 대응안입니다.';
 const measure=q('#measurement');archive('상세 측정 설계 · 네 분석 창과 고정 집단·분모',[...measure.childNodes].filter(n=>!(n.tagName==='H2')));
 measure.innerHTML='<h2>성과 확인</h2><p>환불 발표01.28과 신청 개시02.05는 서로 다른 기준선이다. 환불 처리를 마친 것과 유저의 신뢰가 회복된 것도 다른 결과다.</p>'+table(['질문','함께 확인할 자료'],[
 ['환불은 처리되고 있는가','유효 신청부터 마켓 취소 확인까지의 시간·미처리 잔량·실패/중복 거래'],
 ['안내가 도움이 되었는가','동일 사유 재문의와 답변 불일치. 문의 감소만으로 만족·신뢰 회복을 확정하지 않음'],
 ['미접속을 어떻게 볼 것인가','전체 DAU와 계정 상태별 수·비중·활동을 함께 확인. 제한 계정을 빼서 전체 감소를 숨기지 않음']])+'<p class="figure-note">실측 결과가 아닌 계획이다. 접속 가능한 미접속도 중단 위험 신호일 뿐 자발적 이탈 확정은 아니다. 코호트·기간·상태 전환·장애와 활동률 분모는 부록에서 정의했다.</p>';
 const action=q('#action');const users=el('div','<h3>이용자에게 먼저 확인해 안내할 정보</h3><ul><li><strong>계정 영향:</strong> 신청 시 이용 제한과 철회·예외 조건을 현행 정책 담당자에게 확인한 뒤 같은 기준으로 설명한다.</li><li><strong>대상·진행 상태:</strong> 환불 대상과 신청·처리·실제 환급을 구분한다. 예상 완료일을 완료 사실로 안내하지 않는다.</li><li><strong>다음 문의:</strong> 공지·FAQ·신청 화면·CS 답변 버전을 맞추고, 예외는 임의 확약 없이 승인 담당자에게 전달한다.</li></ul><p class="figure-note">지원자의 모의 대응안이다. 당시 전 지역 정책·내부 승인 절차를 확인했다는 뜻이 아니다.</p>','proposal');action.querySelector('h2').after(users);
 q('.family-overview dl div:last-child dd').textContent='계정 영향·환불 대상·처리 상태를 먼저 확인하고 공지·FAQ·CS 답변을 맞춥니다. 지원자의 모의안입니다.';
 }
 // Retain one truthful AI statement in the footer; remove repeated role disclaimers only.
 for(const x of document.querySelectorAll('#sources p'))if(x.textContent.startsWith('AI가 공개자료 확인·분석·문서·웹 구현을 보조했다.'))x.remove();
 document.documentElement.dataset.finalEdit='20261024';
 },slug);
 const html=await p.content();fs.writeFileSync('dist/reports/'+slug+'.html',html.replace(/report-family.css\?v=20261024/g,'report-family.css?v=20261024edit'));
 console.log(slug+' edited; original detailed definitions retained in appendix');
}
await b.close();
