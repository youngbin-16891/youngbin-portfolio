# 도메인 교정 재생성 순서

이 폴더는 2026-10-26 최종 편집 단계다. 기존 저수준 build-project-*는 문서형 중간 결과를 만들므로 현재 레이아웃을 재생성하는 단독 명령이 아니다. 기존 빌드/편집 체인을 의도적으로 실행했다면 마지막에 다음을 실행한다.

1. `python research/domain-review-20261026/apply-domain-review.py`
2. `python research/domain-review-20261026/patch-related.py`
3. `node research/rebuild-20261024/build-summaries.mjs`
4. `node research/rebuild-20261024/prerender-primary-content.mjs`
5. `python research/domain-review-20261026/finish-domain-review.py`
6. 기존 `build-submission-pdf.py`로 통합 PDF 갱신 후 `qa.mjs`로 보고서 PDF/화면 검수. PDF authoring 시작 마커는 해당 세션의 PDF 지침을 따른다.

Markdown 입력 PROJECT_A/B/C와 현재 다운로드 원문을 함께 수정했으며, 요약·통합 PDF·메인 카드의 원본도 보완했다. 기존 레이아웃을 보존하기 위해 오래된 전체 빌드를 다시 실행하지 않았다. 관련 단계는 두 번 실행해 공개 텍스트가 중복되지 않는지 검사한다.

## 추가 매출 조사

사용자 추가 요청에 따라 C에 월별 추정 매출과 회사의 환불 재무 반영을 분리해 추가했다. 월별 값은 monthly-revenue.json, 수집 한계는 공개된 monthly-revenue-method.md에 있다. 공개된 값이 없는 달은 보간하지 않는다. 국내 외부 추정 매출의 월간 변화와 환불의 연결 회계 영향을 섞지 않는다.

중요한 후속 공시: 2026-05-14 서한 p.9는 Q1 환불의 매출 감소 영향 약67억엔·3월 환불 완료를 설명한다. 2월의 Q1 약50억엔은 당시 전망이며 후속 실적값으로 사용하지 않는다. 2025Q4 약90억엔은 당시 환불 추정 영향의 실적 반영이다. 세 수치를 실제 현금 환급 총액으로 합산하지 않는다.

원자료의 9월 발행 글 서두는 자료월9월로 적혀 있지만 매출 절은8월·221억원이다. 표는 매출 절 기준8월로 기록했고 JSON에 이 차이를 남겼다. 7월138억원은 해당 원문의 TOP10 이미지를 직접 확대해 확인했다.

실기기 iOS Safari/Android Chrome은 접근하지 못했다. Chromium 화면 너비 검사는 실기기 테스트와 구별한다. QA 횟수 자체를 채용 경쟁력으로 표현하지 않는다.
