import fs from 'node:fs';import cp from 'node:child_process';
const root='research/rebuild-20261024/';
for(const x of ['a','b','c'])cp.execFileSync('node',[root+'build-project-'+x+'.mjs']);
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const steps=(title,items,note='')=>`<figure class="decision-figure"><figcaption>${title}</figcaption><ol class="decision-flow">${items.map(([a,b])=>`<li><strong>${a}</strong><span>${b}</span></li>`).join('')}</ol>${note?`<p class="figure-note">${note}</p>`:''}</figure>`;
const configs=[
{file:'genesis-pass',role:'A · 사업 PM',summary:[['분석 대상','2026년 여름 제네시스 패스와 PLUS'],['확인한 사실','기본 30,000 넥슨 캐시·흔적 3배. PLUS 유료 보상은 별도 구매·보스 조건이 있다.'],['핵심 판단','기본 패스 구매가 후속 상품 구매를 보장하지 않는다. 보상 활용 가능성을 따로 봐야 한다.'],['제안','가격·보상은 먼저 유지 검토. 완료·조건 문의를 확인한 뒤 필요한 안내만 시험한다.']],problem:'왜 샀는지뿐 아니라 어떤 조건에서는 다음 상품을 사지 않는지 구분해야 구매 가치를 설명할 수 있다. 본인의 기본 패스 구매와 PLUS 미구매를 공식 조건과 대조했다.',groups:[[2],[4,6,7],[8],[9],[3,5],[10,'출처']],visual:steps('구매 판단은 두 번 일어난다',[['해방 목표·자격','255레벨·퀘스트 조건 확인'],['보스·남은 기간','획득 3배를 활용할 수 있는가?'],['기본 패스','가속 가치와 가격 판단'],['해방 후 별도 판단','PLUS 보스 수행·만료·별도 30,000 캐시']],'공식 S1 조건을 바탕으로 재구성한 판단 흐름. 실제 구매자 전체의 행동 경로는 아니다.'),second:steps('같은 처치 기회에서 달라지는 혜택',[['기본 획득량','패스 미구매: 1배'],['기본 패스 적용','총 3배 = 추가 2배'],['PLUS 프리미엄','별도 티켓·미션 완료 시 추가 보상']],'수량 관계: S1(2026.06.18). 해방 기간 3분의 1·피해량 3배라는 뜻이 아니다. 최대 코인 계산은 부록에 보존했다.')},
{file:'fc-live-event',role:'B · 라이브서비스 PM',summary:[['분석 대상','2026.09.10 FC KICK-OFF 신규·복귀 이벤트'],['확인한 사실','접속 보상과 경기 관련 미션이 분리돼 있고, 본문과 유의사항의 조건 설명이 다르다.'],['핵심 판단','보상을 받았다는 사실만으로 경기를 했다고 볼 수 없다. 실제 서버 규칙 확인이 선행이다.'],['제안','규칙을 통일한 뒤 보상 수령·경기 미완료 계정에 첫 경기 준비 안내를 비교 시험한다.']],problem:'보상 수령을 경기 참여 성과로 취급하면 운영 개선의 목표가 흐려진다. 접속·수령·경기 완료·다음 주 재참여를 나눠 어느 행동을 바꿀지 정했다.',groups:[[2,'원문'],[4,5],[6],[10],[3,7,8,9],[11,'출처']],visual:'',second:steps('개선안은 보상 지급 이후에만 적용한다',[['공통 선행 작업','모든 이용자에게 올바른 규칙 제공'],['대상 확인','첫 접속 보상 지급 성공·인정 경기 미완료'],['비교 시험','기존 안내 / 추가 준비 안내'],['결과 확인','24시간 첫 경기·반복 경기·D7·문의']],'모의 제안. 보상·자격은 동일하며, 퀵스쿼드는 이용권 보유자에게만 안내한다. 실제 실험 결과는 없다.')},
{file:'idle-operations',role:'C · 게임 운영',summary:[['분석 대상','메이플 키우기 전액 환불 공지·FAQ와 공개 반응'],['확인한 사실','FAQ는 신청 즉시 계정 이용 제한을 설명한다. 초기 공지와 일부 조건의 표현 차이를 확인했다.'],['핵심 판단','환불로 접속할 수 없는 계정의 미접속을 자발적 이탈로 해석하면 안 된다.'],['제안','피해 확인 → 정책·신청 화면·CS 답변 통일 → 거래 대조 → 제한 여부를 나눈 사후 관찰']],problem:'금전 처리를 마쳤다고 신뢰 문제가 끝나는 것은 아니다. 신청자의 계정 영향 이해와 처리 상태를 관리하고, 정책에 따른 미접속과 자발적 중단을 나눠 해석해야 한다.',groups:[[1,2],[3],[10],[9],[4,5,6,7,8],[11]],visual:steps('대응 순서와 승인 경계',[['접수·영향 확인','증거 보존·진행 중 피해 보고'],['책임자 판단','긴급도·보호 조치 승인'],['안내·처리','정책 통일·거래별 대조'],['사후 점검','미처리·재문의·재발·활동 구분']],'지원자의 모의 절차이며 넥슨의 실제 내부 업무 절차가 아니다.'),second:steps('미접속은 먼저 접속 가능 상태로 나눈다',[['미접속 관찰','접속 로그만으로 이탈 확정 금지'],['계정 제한 상태','환불 신청·제재·장애 등 별도 표시'],['접속 가능 상태','자발적 중단 가능성 검토'],['추가 확인','업데이트·성장·사회적 요인 등 경쟁 설명']],'측정 계획. 제한 계정 수와 비중도 함께 보고한다. 실제 이탈률·원인 비중은 미측정이다.')}
];
for(const c of configs){
const p='dist/reports/'+c.file+'.html';let h=fs.readFileSync(p,'utf8');
h=h.replace(/<section class="(?:fc|ops)-summary"[\s\S]*?<\/section>/g,'');
let main=h.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
main=main.replace(/<p>면접에서 설명할 핵심:[\s\S]*?<\/p>/g,'').replace(/<p>면접에서 설명할 판단:[\s\S]*?<\/p>/g,'').replace(/<p>이 설명을 지원자가[\s\S]*?<\/p>/g,'');
main=main.replace('PLUS 구매는 확인되지 않았습니다.','PLUS 유료 티켓은 일부 보스를 처치하기 어려워 구매하지 않았다는 본인 진술이 있습니다.');
const matches=[...main.matchAll(/<h2>(.*?)<\/h2>/g)],sections=[];
for(let i=0;i<matches.length;i++){const m=matches[i],title=m[1];sections.push({key:/^\d+\./.test(title)?Number(title.match(/^\d+/)[0]):title.startsWith('원문')?'원문':title,html:main.slice(m.index,i+1<matches.length?matches[i+1].index:main.length)});}
const intro=matches.length?main.slice(0,matches[0].index):main;
const take=(keys)=>keys.map(k=>{const s=sections.find(x=>x.key===k);if(!s)throw Error(c.file+' missing '+k);return s.html.replace(/^<h2>(?:\d+\. )?(.*?)<\/h2>/,'<h3>$1</h3>');}).join('');
const section=(id,title,content)=>`<section id="${id}" class="report-section"><h2>${title}</h2>${content}</section>`;
const summary=`<section id="summary" class="report-summary" aria-label="1분 요약"><h2>1분 요약 <small>${c.role}</small></h2><dl>${c.summary.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl></section>`;
const nav='<nav class="reading-nav" aria-label="보고서 목차">'+[['summary','1분 요약'],['problem','문제'],['evidence','근거'],['analysis','분석'],['action','제안'],['measurement','성과 확인'],['appendix','실무 부록'],['sources','출처·한계']].map(([a,b])=>`<a href="#${a}">${b}</a>`).join('')+'</nav>';
let out=summary+nav+section('problem','문제 정의',`<p>${c.problem}</p>`)+section('evidence','핵심 근거',take(c.groups[0]))+section('analysis','분석 결과',c.visual+take(c.groups[1]))+section('action','실무 제안',c.second+take(c.groups[2]))+section('measurement','성과 확인',take(c.groups[3]))+section('appendix','상세 실무 문서',`<p>${c.file==='idle-operations'?'환불 정책·운영 대응·CS 기준':'상품·보상·운영 규칙'}의 전체 내용입니다. 인쇄할 때는 모두 펼쳐집니다.</p><details><summary>상세 표와 실무 문서 펼치기</summary>${take(c.groups[4])}</details>`)+section('sources','출처와 한계',take(c.groups[5]));
if(c.file!=='genesis-pass')out=out.replace(/<p>[^<]*지원자가[^<]*면접[^<]*<\/p>/g,'');
// Original source files preserve full prose and research order, including removed learning notes.
out=out.replace(/분석 원문 내려받기 \(Markdown\)/g,'전체 분석 원문 내려받기 (Markdown)').replace(/표의 단위·시나리오·측정 한계를 함께 확인할 수 있습니다\./g,'원문은 조사 당시 순서이며 웹에서는 빠르게 읽도록 재배치했습니다.');
out+='<p class="report-download"><a href="'+c.file+'.pdf" download>현재 보고서 PDF 내려받기</a> · 인쇄/PDF 저장 버튼도 이용할 수 있습니다.</p>';
h=h.replace(/<main id="main">[\s\S]*?<\/main>/,'<main id="main">'+out+'</main>');
h=h.replace(/<link rel="stylesheet" href="integration.css[^" ]*">/g,'').replace('</head>','<link rel="stylesheet" href="integration.css?v=20261024">\n</head>');
// B evidence captures were inserted before the next section: keep them with core evidence.
h=h.replaceAll('loading="lazy"','loading="eager"').replace('src="report.js"','src="report.js?v=20261024integrated"');
h=h.replace(/<a class="summary-entry"[^>]*>[\s\S]*?<\/a>/g,'').replace('</nav>','<a class="summary-entry" href="'+c.file+'-summary.html">1페이지 요약 ↗</a></nav>');
h=h.replace(/\n{2,}/g,'\n');
fs.writeFileSync(p,h);
}
console.log('A/B/C integrated, original tables and sources retained.');

cp.execFileSync('node',[root+'build-a-reading.mjs'],{stdio:'inherit'});
cp.execFileSync('node',[root+'build-service-visuals.mjs'],{stdio:'inherit'});
cp.execFileSync('node',[root+'build-report-family.mjs'],{stdio:'inherit'});

cp.execFileSync('node',[root+'apply-precision.mjs'],{stdio:'inherit'});

cp.execFileSync('node',[root+'final-editor.mjs'],{stdio:'inherit'});

cp.execFileSync('node',[root+'apply-a-depth.mjs'],{stdio:'inherit'});
