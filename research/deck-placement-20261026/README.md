# 추가 게임 분석서 연결

2026-10-26. 사용자 제공 13장 PPTX를 별도 게임 분석 자료로 C 카드와 C 보고서 하단에 연결했다. 대표 프로젝트는 A/B/C 세 개를 유지한다. A/B 분석·기존 통합 PDF는 변경하지 않는다.

원본 SHA256: a41ef1a3bb33838d422e84668aae48ec957a32aad037dc6abced1e602a8de79d. 사용자 Desktop 원본은 변경하지 않았다. 실제 원본을 artifact-tool로 읽어 13장 표면을 렌더링했다. 원본 발표 노트의 수업 영상 공유 주소는 공개하지 않기 위해 PPTX 자체는 배포하지 않는다.

공개 파일: idle-growth-study.html, idle-growth-study.pdf, evidence/idle-growth-study/slide-01~13.png. PDF는 원본 슬라이드 이미지를 보존한 열람본이며 텍스트 선택이 가능한 원본 PowerPoint가 아니다. 공식 원문 링크59개는 PDF 주석으로 유지하고 수업 영상 링크는 제외했다. 웹에서는 각 슬라이드의 텍스트를 별도로 읽을 수 있다.

재생성: 원본 파일이 있는 환경에서 render.mjs → publish.py(ReportLab 사용) → 기존 prerender-primary-content.mjs. PDF 작성 시작 마커는 해당 세션 지침에 맞춰 실행한다. Main 카드의 추가 결과물은 dist/deliverables.js, 스타일은 dist/deliverables.css에서 관리한다. 과거 C 전체 빌드를 수행했다면 publish.py로 하단 연결도 다시 적용한다.

검수: Chromium 320/390/768/1440px에서 메인 카드→분석서 클릭,13장 로딩,페이지 가로 넘침,기존 C 하단 연결,PDF HTTP응답 확인. 대표 카드3개·추가 자료1개. 페이지 오류0·이미지 실패0·전체 가로 넘침0. iOS/Android 실기기 미검증. PDF13페이지·공식링크59개·비공개 수업링크0.
