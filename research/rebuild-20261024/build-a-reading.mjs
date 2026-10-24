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

const s1='<a href="https://maplestory.nexon.com/News/Update/805" target="_blank" rel="noopener noreferrer">공식 S1 · 2026.06.18</a>';
const s2='<a href="https://maplestory.nexon.com/News/Update/762" target="_blank" rel="noopener noreferrer">공식 S2 · 2024.12.19</a>';
const archive=markdown(source).replace(/<h2>(.*?)<\/h2>/g,'<h3>$1</h3>').replace(/<h3>조건부 의사결정 — 모의 시나리오<\/h3>[\s\S]*?(?=<h3>9\. KPI 검증 계획<\/h3>)/,'');
const tbl=(headers,rows)=>'<div class="table-wrap" role="region" aria-label="상품 비교 표" tabindex="0"><table><thead><tr>'+headers.map(s=>'<th scope="col">'+s+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(s=>'<td>'+s+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
const compare=tbl(['비교 항목','기본 패스','PLUS 일반 / 프리미엄 티켓'],[
['가격 <small>공식 확인</small>','30,000 넥슨 캐시','일반 미션 추가 티켓 불필요 / 유료 티켓 별도 30,000 캐시'],
['구매·참여 자격 <small>공식 확인</small>','255레벨 이상, 「운명의 결전 그 후」 완료·「힘의 해방 두 번째」 미완료','기본 패스를 산 도전 캐릭터의 해방 완료. 미완료 캐릭터는 유료 티켓 구매 불가'],
['핵심 혜택 <small>공식 확인</small>','보스 처치 흔적 3배·지정 도전 지원·해방 완료 소울 상자','보스 미션 일반 보상 / 티켓 활성화 후 유료 추가분 최대 10,000코인'],
['혜택 이용 조건 <small>공식 확인</small>','재화는 보스 처치 필요. 완료 보상은 해방해야 수령','해방 후 개방된 보스 미션 완료 필요. 구매만으로 최대 보상을 주지 않음'],
['판매·이용 기간 <small>공식 확인</small>','판매 06.18 점검 후~09.15 23:59<br>효과 ~09.16 23:59','티켓 판매 06.18 점검 후~09.16 23:50<br>효과·보상 수령 ~09.16 23:59'],
['구매 장벽 <small>분석 가설</small>','처치 가능 보스·남은 획득 기회에 따라 활용 가치 차이','추가 가격·후속 보스 수행 능력·미션 개방 대기']]);
const graph='<figure class="trace-chart" aria-labelledby="trace-title"><figcaption id="trace-title">같은 보스 처치 기회의 어둠의 흔적 획득량</figcaption><div class="bar-axis"><span>0</span><span>1배</span><span>2배</span><span>3배</span></div><div class="bar-row"><span>미구매</span><div class="bar-track"><i style="width:33.333%"></i></div><strong>1배</strong></div><div class="bar-row"><span>기본 패스</span><div class="bar-track"><i style="width:100%"></i></div><strong>3배</strong></div><p class="figure-note">공식 확인·계산 · 단위: 기본 획득량 대비 배수 · 적용: 2026.06.18~09.16 시즌 · '+s1+'</p><p>추가분은 기본량의 2배(+200%)다. 해방 기간이나 실제 전투력이 3배 달라진다는 그래프가 아니다.</p></figure>';
const flow='<figure class="decision-figure"><figcaption>구매 판단을 두 단계로 나누기 <small>구조와 개인 경험에 근거한 해석</small></figcaption><ol class="buy-flow"><li><strong>기본 패스</strong><span>해방 목표 → 자격·보스·기간 확인 → 가속 가치 판단</span></li><li><strong>해방 완료</strong><span>PLUS 일반 미션 참여 자격 확보</span></li><li><strong>PLUS 유료 티켓</strong><span>보스 수행·남은 기간 확인 → 코인·큐브 보상이 원하는 성장으로 이어질지 판단 → 추가 가격 비교</span></li></ol><p class="figure-note">공식 S1·본인 사례를 재구성한 흐름이며, 전체 구매자의 실제 행동을 측정한 결과는 아니다.</p></figure>';
const proposal=(title,lines)=>'<article class="proposal"><h3>'+title+'</h3><dl>'+lines.map(([a,b])=>'<div><dt>'+a+'</dt><dd>'+b+'</dd></div>').join('')+'</dl></article>';
const proposals=proposal('1. 가격·보상은 먼저 유지 검토하고 활용 여부를 확인',[
['문제','혜택이 있어도 보스·기간 조건을 못 채우면 활용이 제한된다.'],['근거','공식 조건과 본인의 PLUS 미구매 사례. 전체 미완료 규모는 미확인이다.'],['제안','구매 주차별 진행·해방 완료·PLUS 자격과 구매를 연결해 확인한다.'],['위험','자료 연결·검수 비용이 들며, 낮은 완료율을 가격 문제로 오해할 수 있다.'],['검증','아래 세 지표와 조건 문의를 함께 보고, 특정 구간의 원인이 확인될 때만 변경한다.']])+proposal('2. 조건 오인이 확인될 때만 구매 전 요약 안내 시험',[
['문제','최대 보상과 실제 획득 조건을 다르게 이해할 가능성.'],['근거','별도 티켓·보스·공통 만료 조건은 사실이지만 실제 오인 빈도는 미측정이다.'],['제안','가격·만료·PLUS 별도 조건을 구매 확인 직전에 요약한다. 가격과 혜택은 바꾸지 않는다.'],['위험','설명이 길어지거나 구매가 줄 수 있다. 자동 완료일 예측은 제외한다.'],['검증','올바른 규칙을 양쪽에 제공한 뒤 기존·추가 안내를 비교한다. 이해 실패나 오인 근거가 없으면 보류한다.']]);
const decisionRows=[["기본 구매율 낮음","상품 노출·조건 이해, 처치 가능 보스, 남은 기간, 가격 관련 문의","안내를 이해하지 못한 근거가 있으면 구매 전 요약을 시험. 가격이 원인이라는 근거 없이 할인부터 하지 않음"],["기본 구매율 높음","구매 주차별 완료·미적용·조건 오인 문의를 함께 확인","완료와 활용도 양호하면 유지 검토. 미완료·오인 문의가 함께 늘면 추가 판촉보다 원인 확인 우선"],["해방 완료율 낮음","시작 퀘스트 단계·보스 수행·후반 구매·패스 미적용 여부","미적용·조건 오안내가 확인되면 해당 안내부터 수정. 재화 부족이 원인인지 확인 전 보상 증액 보류"],["해방 완료율 높음","해방 후 PLUS 자격 발생 시점·남은 기회·후속 참여","빠른 완료만으로 과도한 가속이라 판단하지 않음. 목표 공백·정보 탐색 문제가 확인될 때 기존 후속 미션 안내 검토"],["PLUS 구매율 낮음","해방 시점·보스 처치 가능성·남은 기회·큐브 보상 활용과 가격 관련 문의","활용 기회가 부족하면 조건을 명확히 설명하고 구매 압박은 보류. 낮은 비율만으로 할인·보상 확대를 정하지 않음"],["PLUS 구매율 높음","구매자의 미션 완료·보상 수령과 조건 오인 문의","보상 활용과 안내 이해가 확인되면 유지 검토. 미수령·오인이 함께 나타나면 추가 판촉보다 처리·안내 확인 우선"]];
const decision='<div class="conditional-decision"><h3>지표에 따른 조건부 의사결정 <small>모의 시나리오</small></h3><p>실제 회사에서 관측한 결과가 아니다. 높음·낮음은 같은 정의·명의 단위와 유사한 자격 진입 주차·시작 단계·남은 기간을 맞춘 비교 기준 대비다. 비교 기준·충분한 관찰·표본이 없으면 판정을 보류한다.</p>'+tbl(['모의 신호','먼저 확인할 것','검토할 대응·보류'],decisionRows).replace('aria-label="상품 비교 표"','aria-label="조건부 의사결정표"')+'<p class="figure-note">근거: 공식 S1 상품 구조와 05의 KPI 정의. 단위: 명의별 비율. 적용: 2026년 여름 상품의 판매·효과 기간(05 참조). 개인 사례를 전체 원인으로 일반화하지 않으며, 운영 효과는 미측정이다.</p></div>';
const kpi=tbl(['지표 · 측정 계획','분자 / 분모','집계 시점·주의'],[
['기본 패스 구매율','기본 패스 구매 명의 수 / 미구매 상태에서 자격 캐릭터를 1개 이상 가진 명의 수','2026.06.18 점검 후~09.15 23:59에 자격이 발생한 명의. 판매 종료 후 집계, 자격 진입 주차별 구분'],
['구매자의 해방 완료율','패스 적용 캐릭터가 해방한 구매 명의 수 / 전체 기본 패스 구매 명의 수','2026.09.16 23:59까지 완료 여부. 구매 주차별 표시, 미적용·진행 중도 분모에 포함'],
['PLUS 유료 티켓 구매율','PLUS 티켓 구매 명의 수 / 기본 구매 후 도전 캐릭터가 해방해 티켓 자격을 얻은 명의 수','자격은 티켓 판매 마감 2026.09.16 23:50 이전. 같은 판매 기간의 구매를 집계하고 자격 발생 시점별 구분']]);
const main='<section id="summary" class="a-lead"><p class="eyebrow">핵심 결론 · 공식 구조와 개인 경험에 근거한 해석</p><h2>가속 가치는 구매로 이어졌지만,<br>PLUS는 다시 판단해야 했다.</h2><p>제네시스 패스는 해방 목표를 앞당기는 가치를 제공한다. 해방 후 PLUS 추가 구매는 <strong>보스 도전 가능성과 남은 기간</strong>에 따라 별도로 판단해야 한다.</p><div class="a-facts"><div><span>기본 가격</span><strong>30,000 넥슨 캐시</strong></div><div><span>보스 처치 흔적</span><strong>총 3배</strong></div><div><span>PLUS 유료 보상</span><strong>별도 구매·미션</strong></div></div><p class="lead-experience"><b>개인 경험</b> 6/20 기본 패스 사용 기록 → 7월 말쯤 해방(회상) → 보스 수행 부담·큐브 결과 불확실성을 고려해 PLUS 미구매(본인 진술).</p><p class="lead-action"><b>우선 제안</b> 할인·보상 확대 전에 구매 주차별 완료와 조건 문의를 확인한다.</p></section><nav class="reading-nav" aria-label="보고서 목차"><a href="#evidence">01 상품</a><a href="#experience">02 실제 경험</a><a href="#analysis">03 BM 분석</a><a href="#action">04 제안</a><a href="#measurement">05 지표</a><a href="#appendix">06 부록·출처</a></nav>'+
'<section id="evidence"><h2>01. 실제 상품 비교</h2><p>해방은 제네시스 무기 성장 목표다. 어둠의 흔적은 그 퀘스트에 필요한 진행 재화이며, 패스는 보스 처치나 퀘스트 수행을 대신하지 않는다.</p>'+compare+'<p class="figure-note">기간은 모두 2026년 한국 시간. 두 유료 상품은 각각 명의당 1회, 넥슨 캐시만 사용 가능. 전체 조건·버프·보상은 부록에 보존했다. '+s1+'</p></section>'+
'<section id="experience"><h2>02. 지원자의 실제 구매 경험</h2><div class="personal-proof"><figure><a href="../assets/maplestory/purchase-20260620.png"><img src="../assets/maplestory/purchase-20260620.png" alt="2026년 6월 20일 제네시스 패스 30,000원 사용 내역이 포함된 실제 화면" loading="eager"></a><figcaption>실제 사용 내역 원본 · 2026.06.20 · 누르면 확대</figcaption></figure><div><p><b>기록 확인:</b> 화면에는 ‘제네시스 패스 30,000원’과 2026.06.20 사용일이 있다. 공식 가격의 넥슨 캐시 단위와 구분했다.</p><p><b>본인 진술:</b> 해방 시간을 줄이려고 샀고, 7월 말쯤 해방했다. PLUS는 후속 보스 수행 부담도 있었고, 추가 코인으로 큐브를 사도 원하는 잠재 옵션 세 줄을 얻지 못할 수 있어 사지 않았다.</p><p><b>해석:</b> 보상을 받을 수 있는지와, 받아도 원하는 성장이 될지를 따로 판단한 개인 사례다. 정확한 단축 일수나 다른 구매자의 동기는 이 기록으로 알 수 없다.</p></div></div></section>'+
'<section id="analysis"><h2>03. BM 분석 — 같은 구매로 보지 않았다</h2>'+flow+graph+'</section>'+
'<section id="action"><h2>04. 사업 판단과 실행 제안</h2><p>미완료나 오인이 많다는 근거는 아직 없다. 그래서 시스템·가격 변경보다 확인을 먼저 제안했다.</p>'+proposals+decision+'</section>'+
'<section id="measurement"><h2>05. KPI와 검증 계획</h2><p>KPI는 판단에 필요한 지표다. 아래는 실측 결과가 아닌 측정 계획이며, <strong>명의당 1회</strong> 판매 제한에 맞춰 분자·분모를 모두 명의 단위로 통일했다.</p>'+kpi+'<p>동일 명의의 계정·캐릭터를 중복 세지 않고 패스 적용 캐릭터와 연결해야 한다. 익명화한 연결 자료가 없다면 이 비율은 계산하지 않는다. 후반 구매자의 짧은 이용 기회도 따로 본다.</p></section>'+
'<section id="appendix"><h2>06. 부록과 출처</h2><p>보스별 보상, 계산 사례, 전체 지표·실험, 협업·위험 검토를 아래에서 확인할 수 있다. 2024년 수치를 2026년 실측으로 사용하지 않는다.</p><details><summary>전체 조사·분석 자료와 계산 펼치기</summary>'+archive+'</details><details><summary>다른 구매 증빙 원본 보기</summary><p>아래 9월 모멘텀 구매는 제네시스 패스·PLUS와 다른 상품이다.</p><img class="evidence" src="../assets/maplestory/purchase-20260927.png" alt="별도 상품인 2026년 9월 모멘텀 패스 사용 내역" loading="eager"></details><div id="sources"><h3>근거와 결론의 범위</h3><ul><li>공식 확인: '+s1+' — 가격·기간·대상·효과·PLUS 미션.</li><li>공식 확인: '+s2+' — 당시 흔적 지급표·분배. 현재 지급량으로 일반화하지 않음.</li><li>개인 경험: 실제 사용 화면과 해방·미구매에 대한 본인 회상.</li><li>계산: 3배=총 300%, 추가 +200%. PLUS 2,500+1,500×5=추가 10,000코인. 보장 지급 아님.</li><li>분석 가설: 보스 수행 능력과 기간에 따른 구매 가치 차이·조건 안내 제안.</li><li>미확인: 개인 단축 일수·전체 구매 동기·실측 구매율·완료율·매출·잔존 효과.</li></ul></div><p><a href="genesis-pass-analysis.md" download>전체 분석 원문 내려받기</a> · <a href="genesis-pass.pdf" download>현재 보고서 PDF 내려받기</a></p></section>';
let html=original.replace(/<main id="main">[\s\S]*?<\/main>/,'<main id="main">'+main+'</main>');
html=html.replace(/<link rel="stylesheet" href="a-reading.css[^\"]*">/g,'').replace('</head>','<link rel="stylesheet" href="a-reading.css?v=20261024decision"></head>');
html=html.replace(/<p class="notice">[\s\S]*?<\/p>/,'<p class="notice">2026년 여름 상품 분석 · 공식 조건 / 개인 경험 / 계산 / 분석 가설 / 미확인을 구분했습니다. 실제 운영 성과는 아닙니다.</p>');
fs.writeFileSync(file,html);fs.writeFileSync('dist/reports/genesis-pass-analysis.md',source);
console.log('A rebuilt: six sections, three main tables including mock decisions; existing graph preserved.');
