// Separate observed facts, personal experience and proposed validation.
// User-fixed project roster: A MapleStory BM / B FC Online live service /
// C Maple Idle operations. Experience data must never add or replace projects.
const deliverables = [
  {role:'A · 사업 PM',game:'메이플스토리',title:'제네시스 패스의 구매 가치와 BM 분석',status:'공개자료 기반 BM 분석',href:'reports/genesis-pass.html',
   takeaways:[['핵심 문제','누구에게 해방 가속이 구매 가치가 되고, 어떤 조건에서는 구매 장벽이 되는가?'],['확인한 사실','기본 패스는 30,000 넥슨 캐시·흔적 3배. PLUS 유료 보상은 별도 가격과 보스 조건이 있습니다.'],['해석','기본 구매와 후속 구매는 다른 판단입니다. 보상 활용 가능성과 완료를 먼저 확인하도록 제안했습니다.']],
   output:'상품 조건·혜택 비교 · 조건별 보상 계산 · 구매 장벽 · 유지·안내 제안 · KPI 정의',note:'구매 증빙과 7월 말쯤 해방 완료라는 본인 회상 구분 · 실제 단축 일수 미확인 · 추가 보스의 스펙·시간 부담으로 PLUS 미구매, 기존 플레이 지속(본인 진술)'},
  {role:'B · 라이브서비스 PM',game:'FC 온라인',title:'이벤트 보상 수령을 실제 경기 참여로 연결하려면?',status:'공식 이벤트 분석 · 모의 개선안',href:'reports/fc-live-event.html',
   takeaways:[['핵심 문제','접속 보상 수령과 실제 경기 참여를 같은 성과로 볼 수 있는가?'],['확인한 문제','공식 본문과 유의사항에서 3일 미션의 인정 조건 설명이 달랐습니다.'],['해석','참여 조건 혼선은 확인했지만, 경기 미참여 원인이 안내 부족인지는 추가 검증이 필요합니다.']],
   output:'조건·보상표 · 행동 흐름 · 개선 기획서 · 지급·예외 처리 · 공지 · 성과 측정',note:'N=1은 본인 1명의 경험 · 시세 인플레이션·이탈 패턴 관측 없음 · 서버 판정·효과 미검증'},
  {role:'C · 게임 운영',game:'메이플 키우기 · 운영 대응',title:'환불 이슈 발생 시 유저 신뢰 및 이탈 위험 대응',status:'공개 사건 기반 모의 대응',href:'reports/idle-operations.html',
   takeaways:[['핵심 문제','환불 처리와 계정 영향 안내를 어떻게 일치시키고, 신뢰·이탈 위험을 추적할 것인가?'],['확인한 사실','공식 환불 공지·FAQ와 댓글 15개를 확인했습니다. FAQ의 조건 설명 차이를 별도 검토했습니다.'],['해석','신청에 따른 이용 제한과 자발적 이탈을 나눠 봐야 합니다. 환불 완료가 신뢰 회복의 증거는 아닙니다.']],
   conditions:[['실행 조건','대상·계정 영향·처리 절차가 승인되고 안내가 일치하면 공지·FAQ를 제공합니다. 진행 중 피해는 조사·보호 조치를 먼저 요청합니다.'],['보류 기준','대상·정책이 미확정이면 보상과 복구를 약속하지 않습니다. 잔존 근거 없이 신뢰 회복이나 성과 개선을 주장하지 않습니다.']],
   output:'사건 타임라인 · VOC · 대응 절차 · 공지·FAQ·CS · 환불 검토 · 이탈 위험 측정',note:'한국 정책 주근거·영문 비교 자료 보존 · 관련 댓글 9개는 동일 작성자 답글 포함 · 실제 업무 성과 아님'}
];
const projectNextSteps = [
  '가격·보상은 우선 유지 검토하고, 구매 주차별 해방 완료와 PLUS 전환을 확인합니다. 조건 오인이 확인될 때만 안내를 비교 시험합니다.',
  '규칙을 일치시킨 뒤 첫 보상 수령자에게 경기 준비 안내를 시험합니다. 이벤트의 1억 퀵스쿼드는 해당 이용권 보유자에게만 안내하고, 첫 경기 완료와 반복 플레이를 구분합니다.',
  '신청 전 계정 영향 FAQ와 거래별 처리 확인을 우선합니다. 미처리·중복·재문의와 활동 변화를 구분해 모니터링합니다.'
];

const previews=[
 {src:'assets/maplestory/genesis-pass-user-guide.png',alt:'제네시스 패스 실제 상품 안내',caption:'지원자 제공 상품 이미지'},
 {src:'reports/evidence/fc-event-opening-20261024.png',alt:'공식 FC KICK-OFF 신규·복귀 이벤트 화면',caption:'공식 이벤트 화면 · 2026.10.24 열람'},
 {src:'reports/evidence/idle-refund-faq-20261024.png',alt:'공식 환불 FAQ의 신청 즉시 계정 이용 제한 안내',caption:'공식 영문 FAQ · 2026.10.24 열람'}
];
deliverables[0].title='기본 패스는 구매하고, PLUS는 구매하지 않은 이유';
deliverables[0].takeaways=[['핵심 질문','성장 가속과 해방 후 추가 보상은 같은 구매 판단일까?'],['근거 · 공식·개인','기본 패스 30,000캐시·흔적 3배. 본인은 기본 패스를 구매하고 PLUS 프리미엄 티켓은 미구매.'],['핵심 판단','해방 후에도 플레이는 유지했지만, 추가 보스 공략의 스펙·시간 부담과 큐브 결과를 고려해 PLUS는 사지 않았다.']];
deliverables[0].note='개인 사례의 판단이며 전체 구매자 동기로 일반화하지 않습니다. PLUS 일반 미션 참여와 유료 프리미엄 티켓은 구분합니다.';
deliverables[0].output='상품 비교표 · 구매 판단 흐름도 · 조건부 의사결정표 · KPI 측정 계획';
deliverables[1].takeaways=[['핵심 질문','보상을 받으러 온 이용자는 무엇을 거쳐 경기를 시작할까?'],['근거 · 공식','FC KICK-OFF 이벤트에 접속 보상과 경기 미션이 별도로 존재한다.'],['핵심 판단','보상 수령은 경기 참여의 증거가 아니다. 인정 규칙과 모드를 나눠 첫 경기 안내의 효과를 시험한다.']];
deliverables[1].output='이벤트 조건표 · 행동 흐름도 · 모의 공지·지급 예외표 · 전환 측정 계획';
deliverables[2].title='계정 제한과 자발적 이탈을 구분한 환불 대응';
deliverables[2].takeaways=[['핵심 질문','환불 이후 미접속을 모두 자발적 이탈로 볼 수 있을까?'],['근거 · 공식·공개 반응','공식 FAQ는 신청 즉시 계정 이용 제한을 안내한다. 공개 댓글 15개 검토·9개 포함.'],['핵심 판단','접속 불가능한 계정과 자발적으로 멈춘 계정을 나눠야 한다. 처리 완료만으로 신뢰 회복을 판단하지 않는다.']];
deliverables[2].output='사건 타임라인 · VOC 분류표 · 모의 공지·FAQ·CS 기준 · 계정 상태별 측정 계획';

const cardFindings=["플레이를 유지한 PLUS 미구매 사례를 바탕으로, 할인보다 보스 수행·추가 시간 부담을 먼저 확인할 이유를 분석했습니다.","보상 수령과 인정 경기 완료를 구분하고, 모드별 참여를 나눠 안내 효과를 확인하는 모의안입니다.","계정 제한에 따른 미접속은 자발적 이탈과 다릅니다. 이를 구분한 이용자 안내·FAQ·CS 모의안을 작성했습니다."];
const cards = document.querySelector('#case-studies');
if (cards) {
  cards.innerHTML = '<div class="deliverable-grid">'+deliverables.map((d,i)=>`
 <article class="deliverable-card review-card" aria-labelledby="project-title-${i+1}">
 <div class="review-card-layout"><figure class="project-preview"><a href="${d.href}" aria-label="${d.game} 상세 보고서"><img src="${previews[i].src}" alt="${previews[i].alt}" loading="lazy"></a><figcaption>${previews[i].caption}</figcaption></figure>
 <div class="review-card-copy"><div class="deliverable-role">${d.role}<span>${d.status}</span></div><p class="eyebrow">${d.game}</p><h3 id="project-title-${i+1}">${d.title}</h3>
 <p class="project-finding">${cardFindings[i]}</p>
 <dl class="project-output"><dt>실제 작성 문서</dt><dd>${d.output}</dd></dl>
 <div class="report-entry-links"><a class="button secondary" href="${d.href}">보고서 보기 ↗</a><a class="text-link" href="${d.href.replace('.html','-summary.html')}">1페이지 요약 ↗</a></div>
${i===2?`<aside class="supplementary-work" aria-label="메이플 키우기 추가 게임 분석"><a class="supplementary-preview" href="reports/idle-growth-study.html"><img src="reports/evidence/idle-growth-study/slide-09.png" alt="성장 지원의 기존 조건과 모의 제안을 비교한 실제 슬라이드" loading="lazy" width="1280" height="720"></a><div><p class="supplementary-label">추가 결과물 · 게임 구조·성장 지원</p><a class="supplementary-title" href="reports/idle-growth-study.html">성장 지원 게임 분석 · 13p ↗</a><p>개인 재육성 경험과 공식 이벤트 조건을 비교하고, 참여 대상 변경안·화면 예시·검증 계획을 작성했습니다.</p></div></aside>`:''}


 </div></div></article>`).join('')+'</div>';

}
