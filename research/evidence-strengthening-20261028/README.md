# 직접 검증 준비와 판단 근거 연결 — 2026-10-28

## 완료한 범위와 미실행 범위
- B: 실제 참여자0명, 응답·이해 어려움·개선 효과 미측정. 내부 진행 안내·응답 양식·판단 기록과 고정 자료만 준비했다. 공개 B 보고서는 변경하지 않았다.
- A: 사용자가 직접 설명한 우선 조사 대상(보상 활용 가능한 미구매자), 가격·보상 필요성의 미확인, 즉시 판촉과 조사의 구분을 기존 사업 판단 문장에 연결했다. 개인 미구매 이유를 새로 생성하거나 전체 원인으로 일반화하지 않았다.
- C: 기존 보고서 action의 계정 상태 해석 도식만 재배치·이미지 출력했다. 작성 결과물·모의 측정안 표시. 기존 영문 FAQ 이미지는 보고서와 저장소에 보존했다. 새로운 통계·가설·분석·프로젝트를 만들지 않았다.

## 원본 관계
A: research/rebuild-20261024/PROJECT_A.md와 dist/reports/genesis-pass-analysis.md, 현재 읽기용HTML의 action 및 조사 원문 부록을 함께 편집했다. 구형 전체 build-project-*는 현대 레이아웃을 재현하는 단독 생성기가 아니므로 실행하지 않았다.
A 요약은 기존 build-summaries.mjs genesis-pass, 통합PDF는 기존 build-submission-pdf.py. 새 대표PDF를 추가하지 않았다.
메인 카드 원본은 dist/deliverables.js. prerender-primary-content.mjs가 같은 내용을 dist/index.html에 정적으로 반영한다.
C 미리보기 원본은 기존 idle-operations.html의 ‘미접속은 먼저 접속 가능 상태로 나눈다’ figure. export-c-preview.mjs는 문구를 추출해 배열·글자 크기·귀속 표시만 바꾸고 PNG로 출력한다. 의미·분류·수치는 변경하지 않는다. 다시 실행하면 동일한 기존 도식에서 재생성된다.

## B 자료 확인
기존 10/24 캡처는 일부 화면이라 누락과 안내 문제를 혼동할 위험이 있다. 같은 9/10 회차의 공식 본문·보상 상세·유의사항 표시 텍스트를 10/28 브라우저에서 보존해 내부 읽기 자료를 고정했다. 원본UI·로그인·서버 동작을 재현한 것이 아니므로 텍스트 해석 범위만 관찰한다.
공식 출처: https://events.fconline.nexon.com/260910/NewAndReturn 및 https://events.fconline.nexon.com/260910/s/NewAndReturnRewards
본문의 경기 플레이 / 유의사항·보상 상세의 접속 표기가 공존한다. 실제 서버 규칙·첫 경기 전 지급 여부는 판정하지 않는다. 문구 충돌을 알맞게 읽었는지 오답률로 만들지 않는다.
내부 자료: outputs/evidence-strengthening-20261028/b-observation. 참여자 응답은 공개Git/웹에 올리지 않는다. 이 단계에서 외부인에게 연락하거나 자료를 전송하지 않았다.

## 검증
설치 Chrome 기반 Chromium 320/390/768/1440px: 메인과 상세·요약6개 총28조합, 콘솔·이미지·가로 넘침 검사 통과. 실제 카드→보고서→요약 이동, JavaScript 비활성 카드3개·새C이미지 확인.
A PDF13페이지, 통합PDF8페이지, 요약 인쇄1페이지. 페이지 밖 글자 없음, 수정 구간을 PNG로 렌더링해 확인. PDF링크 주석 유지. B/C 상세·요약·PDF는 원본과 동일함을 검사했다.
실제 iOS Safari/Android Chrome 기기와 참여자 관찰은 미검증. 본인의 모든 판단 설명을 검증 완료로 바꾸지 않았다.
