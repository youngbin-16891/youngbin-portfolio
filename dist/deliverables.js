// Separate observed facts, personal experience and proposed validation.
// User-fixed project roster: A MapleStory BM / B FC Online live service /
// C Maple Idle operations. Experience data must never add or replace projects.
const deliverables = [
  {role:'A · 사업 PM',game:'메이플스토리',title:'제네시스 패스의 구매 가치와 BM 분석',status:'공개자료 기반 BM 분석',href:'reports/genesis-pass.html',
   takeaways:[['핵심 문제','누구에게 해방 가속이 구매 가치가 되고, 어떤 조건에서는 구매 장벽이 되는가?'],['확인한 사실','공식 가격은 30,000 넥슨 캐시. 실제 구매 후 7월 말쯤 해방했다는 본인 회상을 구분했습니다.'],['해석','가속 가치는 보스 도전 능력과 남은 기간에 따라 다릅니다. 구매가 잔존을 높였는지는 미확인입니다.']],
   output:'상품 조건·혜택 비교 · 조건별 보상 계산 · 구매 장벽 · 유지·안내 제안 · KPI 정의',note:'구매 증빙과 7월 말쯤 해방 완료라는 본인 회상 구분 · 실제 단축 일수 미확인 · 일부 보스 처치가 어려워 PLUS 미구매(본인 진술)'},
  {role:'B · 라이브서비스 PM',game:'FC 온라인',title:'이벤트 보상 수령을 실제 경기 참여로 연결하려면?',status:'공식 이벤트 분석 · 모의 개선안',href:'reports/fc-live-event.html',tag:'N=1 관찰 → 라이브서비스 가설 도출',
   takeaways:[['핵심 문제','접속 보상 수령과 실제 경기 참여를 같은 성과로 볼 수 있는가?'],['확인한 문제','공식 본문과 유의사항에서 3일 미션의 인정 조건 설명이 달랐습니다.'],['해석','참여 조건 혼선은 확인했지만, 경기 미참여 원인이 안내 부족인지는 추가 검증이 필요합니다.']],
   output:'조건·보상표 · 행동 흐름 · 개선 기획서 · 지급·예외 처리 · 공지 · 성과 측정',note:'N=1은 본인 1명의 경험 · 시세 인플레이션·이탈 패턴 관측 없음 · 서버 판정·효과 미검증'},
  {role:'C · 게임 운영',game:'메이플 키우기 · 운영 대응',title:'환불 이슈 발생 시 유저 신뢰 및 이탈 위험 대응',status:'공개 사건 기반 모의 대응',href:'reports/idle-operations.html',
   takeaways:[['핵심 문제','환불 처리와 계정 영향 안내를 어떻게 일치시키고, 신뢰·이탈 위험을 추적할 것인가?'],['확인한 사실','공식 환불 공지·FAQ와 댓글 15개를 확인했습니다. FAQ의 조건 설명 차이를 별도 검토했습니다.'],['해석','신청에 따른 이용 제한과 자발적 이탈을 나눠 봐야 합니다. 환불 완료가 신뢰 회복의 증거는 아닙니다.']],
   conditions:[['실행 조건','대상·계정 영향·처리 절차가 승인되고 안내가 일치하면 공지·FAQ를 제공합니다. 진행 중 피해는 조사·보호 조치를 먼저 요청합니다.'],['보류 기준','대상·정책이 미확정이면 보상과 복구를 약속하지 않습니다. 잔존 근거 없이 신뢰 회복 성과나 LTV 상승을 주장하지 않습니다.']],
   output:'사건 타임라인 · VOC · 대응 절차 · 공지·FAQ·CS · 환불 검토 · 이탈 위험 측정',note:'공식 영문 정책의 범위·한계 표시 · 관련 댓글 9개는 동일 작성자 답글 포함 · 실제 업무 성과 아님'}
];
const projectNextSteps = [
  '가격·보상은 우선 유지 검토하고, 구매 주차별 해방 완료와 PLUS 전환을 확인합니다. 조건 오인이 확인될 때만 안내를 비교 시험합니다.',
  '규칙을 일치시킨 뒤 첫 보상 수령자에게 경기 준비 안내를 시험합니다. 퀵스쿼드는 보유자에게만 안내하고, 첫 경기 완료와 반복 플레이를 구분합니다.',
  '신청 전 계정 영향 FAQ와 거래별 처리 확인을 우선합니다. 미처리·중복·재문의와 활동 변화를 구분해 모니터링합니다.'
];
const cards = document.querySelector('#case-studies');
if (cards) {
  cards.innerHTML = '<div class="deliverable-grid">'+deliverables.map((d,i)=>`
    <article class="deliverable-card" aria-labelledby="project-title-${i+1}">
      <div class="deliverable-role">${d.role}<span>${d.status}</span></div>
      <p class="eyebrow">${d.game}</p><h3 id="project-title-${i+1}">${d.title}</h3>
      ${d.tag?`<p class="project-observation-tag">${d.tag}</p>`:''}
      ${d.metrics?`<div class="project-metrics" aria-label="분기별 매출 영향 추정">${d.metrics.map(m=>`<div><span>${m[0]}</span><strong>${m[1]}</strong></div>`).join('')}<p>분기별 매출 영향 추정 · 최종 환불액 아님<br><a href="https://pdf.irpocket.com/C3659/doF3/BPCC/GXD2.pdf" target="_blank" rel="noopener noreferrer">출처: 넥슨 FY2025 Q4 Q&A ↗</a></p></div>`:''}
      <dl class="project-takeaways">${d.takeaways.map(t=>`<div><dt>${t[0]}</dt><dd>${t[1]}</dd></div>`).join('')}</dl>
      ${d.conditions?`<div class="project-conditions">${d.conditions.map((c,j)=>`<section class="project-condition ${j?'hold':'execute'}" aria-labelledby="project-condition-${i}-${j}"><h4 id="project-condition-${i}-${j}">${c[0]}</h4><p>${c[1]}</p></section>`).join('')}</div>`:''}
      <dl class="project-output"><dt>작성한 결과물</dt><dd>${d.output}</dd></dl>
      <dl class="project-next"><dt>제안·후속 검증</dt><dd>${projectNextSteps[i]}</dd></dl><small>${d.note}</small><a class="button secondary" href="${d.href}">분석·실무 문서 보기 ↗</a>
    </article>`).join('')+'</div><p class="review-note">현재 재설계 검토본입니다. 실제 운영 결과가 아닌 분석·모의 과제이며, 남은 검증은 각 문서에 표시했습니다. <a href="reports/youngbin-work-samples-review.pdf">이전 PDF 검토본 보기</a> · <a href="reports/audit.html">기존 자료 감사</a> · <a href="reports/source-ledger.html">출처·확인 한계</a></p>';
}
