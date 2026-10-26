import fs from 'node:fs';
const slugs=['genesis-pass','fc-live-event','idle-operations'];
const titles=['제네시스 패스는 왜 구매했지만, PLUS는 구매하지 않았을까?','FC 온라인 — 이벤트 보상을 실제 경기 참여로 연결하려면?','메이플 키우기 — 환불 이후의 미접속은 모두 유저 이탈일까?'];
const sourceB='https://events.fconline.nexon.com/260910/NewAndReturn',sourceC='https://forum.nexon.com/maplestoryidle/board_view?board=6679&amp;thread=3366800';
for(const [i,slug] of slugs.entries()){
 const file='dist/reports/'+slug+'.html';let html=fs.readFileSync(file,'utf8');
 if(i===0)html=html.replace('MAPLESTORY · BM CASE STUDY','A · 게임 사업 PM · MAPLESTORY');
 const notice=html.match(/<p class="notice">([\s\S]*?)<\/p>/)?.[1];
 html=html.replace(/<body><a[^>]*href="#main"[^>]*>본문 바로가기<\/a>/,'<body><a class="skip-link" href="#main">본문 바로가기</a>');
 html=html.replace(/<header\b[^>]*>[\s\S]*?<\/header>/,'<header class="report-header"><nav class="family-topbar" aria-label="주요 탐색"><a href="../#projects">← 포트폴리오</a><div><button class="print" type="button">인쇄 / PDF</button><a href="'+slug+'-summary.html">1페이지 요약 ↗</a></div></nav></header>');
 if(i){
 const old=html.match(/<section id="summary"[\s\S]*?<\/section>/)?.[0];
 const isB=i===1;
 const facts=isB?[
 ['확인한 구조','접속 5일 보상 총 2,500FC와 경기 관련 미션은 별도로 존재합니다.'],
 ['원문 대조','본문과 유의사항에 3일 미션 조건의 설명 차이가 있습니다. 서버 규칙 오류를 입증한 것은 아닙니다.'],
 ['검증할 제안','공통 문구를 먼저 정리합니다. 이해·탐색 문제가 확인되고 상태 연동이 가능하면 대상별 준비 안내를 시험합니다.']
 ]:[
 ['공식 정책','한국 FAQ는 환불 신청 완료 즉시 해당 게임 계정 이용 제한을 안내합니다.'],
 ['공개 반응','댓글 15개를 검토해 9개를 포함했습니다. 같은 작성자의 답글을 포함하며 전체 여론이 아닙니다.'],
 ['모의 대응','피해·정책 확인 → 공지·FAQ·CS 통일 → 거래별 처리 점검 → 계정 상태별 관찰을 제안합니다.']
 ];
 const image=isB?'fc-event-opening-20261024.png':'idle-refund-faq-20261024.png';
 const intro=isB?'FC KICK-OFF 신규·복귀 이벤트의 접속·보상 수령·경기 참여를 구분했습니다. 규칙 통일 후 이해·탐색 문제가 확인될 때 공통 안내와 상태 연동형 안내를 구분해 검토하는 모의안입니다.':'실제 전액 환불 공지와 FAQ, 공개 반응을 조사했습니다. 접속할 수 없는 계정과 자발적으로 멈춘 계정을 나누는 모의 운영 대응안입니다.';
 const judgment=isB?'보상 수령을 경기 참여 성과로 보지 않습니다. 첫 경기 완료 전환율을 기준으로 안내의 효과를 검증합니다.':'계정 제한에 따른 미접속을 자발적 이탈로 집계하면 안 됩니다. 환불 처리 완료만으로 신뢰 회복을 판단하지 않습니다.';
 const hero='<section id="summary" class="family-opening"><p class="eyebrow">'+(isB?'B · 라이브서비스 PM':'C · 게임 운영')+'</p><h1>'+titles[i]+'</h1><p class="family-intro">'+intro+'</p><div class="family-overview"><figure><a href="evidence/'+image+'" target="_blank" rel="noopener"><img src="evidence/'+image+'" alt="'+(isB?'공식 FC KICK-OFF 신규·복귀 이벤트 첫 화면':'공식 영문 환불 FAQ의 신청 즉시 이용 제한 안내')+'" fetchpriority="high"></a><figcaption><a href="'+(isB?sourceB:sourceC)+'">공식 '+(isB?'이벤트':'영문 FAQ')+' 화면</a> · 2026.10.24 열람 · 이미지 클릭 시 원본</figcaption></figure><dl>'+facts.map(([a,b])=>'<div><dt>'+a+'</dt><dd>'+b+'</dd></div>').join('')+'</dl></div><div class="family-judgment"><span>핵심 판단</span><p>'+judgment+'</p></div></section>';
 if(!html.includes('class="family-opening"')){
 html=html.replace(old,hero);
 html=html.replace(/(<section id="appendix"[^>]*>)/,'$1<details class="original-overview"><summary>기존 요약과 분석 범위</summary>'+old.replace('id="summary"','class="archived-summary"')+(notice?'<p>'+notice+'</p>':'')+'</details>');
 }
 }
 html=html.replace(/<footer>[\s\S]*?<\/footer>/,'<footer class="family-footer"><p>다른 보고서</p><nav aria-label="분석 프로젝트 이동">'+slugs.map((s,j)=>'<a href="'+s+'.html"'+(j===i?' aria-current="page"':'')+'>'+['A · 제네시스 패스 BM','B · FC 온라인 라이브서비스','C · 메이플 키우기 운영'][j]+'</a>').join('')+'</nav><div class="family-resources"><a href="index.html">결과물 목록</a><a href="../#experience">개인 게임 경험</a><a href="'+slug+'.pdf" download>보고서 PDF 내려받기</a></div><p>최영빈 · 공개자료 분석 및 모의 과제 · AI가 조사·초안·구현을 보조했습니다.</p></footer>');
 html=html.replace(/<link rel="stylesheet" href="report-family.css[^\"]*">/g,'').replace('</head>','<link rel="stylesheet" href="report-family.css?v=20261025mobile"></head>');
 if(!html.includes('rel="icon"'))html=html.replace('</head>',fs.readFileSync('dist/index.html','utf8').match(/<link rel="icon"[^>]+>/)[0]+'</head>');
 fs.writeFileSync(file,html);
}
console.log('Unified report shell. A analysis preserved; B/C original summary archived.');
