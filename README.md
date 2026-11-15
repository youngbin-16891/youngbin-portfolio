# 최영빈 포트폴리오

게임 사업 PM / 게임 운영·라이브 서비스 지원을 위한 반응형 단일 페이지입니다. HTML, CSS, JavaScript만 사용하며 외부 패키지와 백엔드 없이 실행됩니다.

## 폴더 구조

```text
포트폴리오/
├── dist/              # 배포할 정적 파일이자 직접 수정하는 소스
│   ├── index.html     # 페이지 구조, Hero, About, 프로필, Contact 문구
│   ├── styles.css     # 밝은 색상 체계, 레이아웃, 반응형, 전환 효과
│   ├── content.js     # 게임 경험, 프로젝트, 스킬, 연락처 데이터
│   ├── app.js         # 목록 렌더링, 프로젝트 모달, 모바일 메뉴, 섹션 탐색
│   └── assets/        # 프로젝트 증빙 이미지와 별도 분석 문서
└── README.md
```

## 로컬 실행

가장 간단하게 `dist/index.html`을 브라우저에서 열면 됩니다. 빌드나 설치가 필요 없습니다.

Python이 설치되어 있다면 프로젝트 폴더에서 아래 명령으로 정적 서버를 실행할 수도 있습니다.

```sh
python -m http.server 8000 --directory dist
```

브라우저에서 http://localhost:8000 을 엽니다. 종료는 Ctrl+C입니다. VS Code의 Live Server로 `dist/index.html`을 열어도 됩니다.

## 내용 수정

- 이름, 소개, 학력, Hero와 섹션 문구: `dist/index.html`
- 게임 정보: `dist/content.js`의 `coreGames`, `experiencedGames`, `mobileGames`, `pastMobileGames`. 기간은 자동 증가하지 않습니다. `featured: true`는 중간 카드, 생략하면 작은 목록입니다. 선택 항목 `description`은 설명, `caseStudy`는 연결할 사례 id입니다.
- Case Study 추가: `dist/content.js`의 `caseStudies` 배열에 기존 객체를 복사하고 고유한 `id`, `game`, `title`, `status`, `summary`, `question`, `observation`, `hypothesis`, `steps`, `artifacts`를 수정하세요. 12단계 `steps`는 `label`, `status`, `text`로 구성됩니다. `loop`는 선택 항목입니다.
- 상태: `Observation`은 개인 관찰, `Hypothesis`는 미검증 가설, `Analysis in Progress`는 진행 중, `Data to be Added`는 자료 대기, `Verified Result`는 근거를 확보한 검증 결과입니다. 준비 단계는 `Project Preparing`을 사용합니다.
- 사례 자료 연결: 각 `caseStudies[].artifacts`의 `url`에 실제 문서 주소를 입력하세요. 빈 값이면 준비 중으로 표시되며 링크가 생성되지 않습니다. `label`은 링크 이름입니다.
- 데이터 분석: `dataAnalysis.topics`는 분석 예정 주제입니다. `dataAnalysis.images`에 `{ src: 'assets/chart.png', alt: '이미지 내용 설명', caption: '데이터 출처와 해석' }` 형태를 추가하세요. 파일은 `dist/assets/` 폴더를 만들어 저장합니다. `dataAnalysis.documents`에는 `{ label: '분석 시트', url: 'https://실제주소' }` 형태로 추가합니다. 이미지나 문서를 공개한 뒤 `index.html`의 Coming Soon 및 분석 전 안내도 실제 진행 상황에 맞춰 바꾸세요.
- 파일 주소는 `assets/...` 상대 경로나 `https://` 주소를 지원합니다. PDF·PPT·XLSX도 `dist/assets/`에 저장한 뒤 연결할 수 있습니다. 실제 자료를 만들기 전 가짜 URL은 넣지 마세요.
- 서비스 사고 과정과 AI 활용: `serviceSteps`, `aiSteps`
- 관심 분야와 스킬: `interests`, `skills`
- 연락처: `contacts`의 `label`, `text`, `url`. 이메일은 `mailto:`, 전화번호는 `tel:`, 웹사이트는 `https://` 형식으로 입력하세요.
- 디자인: `dist/styles.css`, 표시 동작: `dist/app.js`

실제 취업 지원 전 연락처, 플레이 기간, 학적 정보 및 프로젝트 진행 상태가 사실과 일치하는지 확인하세요. 새 사례는 자동으로 화면에 추가됩니다.

## Vercel 배포

1. 이 폴더를 GitHub 저장소에 올립니다.
2. Vercel에서 Add New → Project로 해당 저장소를 가져옵니다.
3. Framework Preset은 **Other**, Root Directory는 **dist**로 지정합니다.
4. Build Command와 Install Command는 비워 두고, Output Directory는 **.**로 지정합니다.
5. Deploy를 실행합니다. 이후 저장소 변경을 push하면 다시 배포됩니다.

## GitHub Pages 배포

고정 공개 주소는 https://youngbin-16891.github.io/youngbin-portfolio/ 입니다.

현재는 main에 push하면 GitHub Actions가 dist 폴더를 Pages 아티팩트로 올려 배포합니다. 실제 워크플로 파일명은 .github/workflows 아래에서 확인할 수 있습니다.

1. dist의 정적 소스를 수정하고 화면·링크를 확인합니다.
2. 기존 저장소의 main에 변경을 push합니다.
3. Deploy portfolio to GitHub Pages 실행이 성공했는지 확인합니다.
4. 위 고정 공개 주소에서 수정한 내용과 파일이 반영됐는지 확인합니다.

## 접근성·동작

키보드로 메뉴와 프로젝트 상세를 조작할 수 있습니다. 프로젝트 카드를 누르면 현재 화면 위에 상세 분석 모달이 열립니다. 모바일 메뉴와 모달은 Escape로 닫히며, 운영체제의 동작 줄이기 설정을 존중합니다. 외부 웹 링크는 새 탭으로 열립니다.

### 게임 추가와 표시 크기

`dist/content.js`에서 해당 배열에 항목을 추가합니다. `coreGames`는 핵심 경험용 큰 카드입니다. `experiencedGames`와 `mobileGames`는 `name`, `genre`, `duration`, 선택적인 `note`를 사용하며, `featured: true`이면 중간 카드로, 생략하면 작은 목록으로 표시됩니다. 과거 모바일게임은 `pastMobileGames`에 이름 문자열만 추가하면 태그로 표시됩니다. 시간이나 기간은 자동 추정하지 않습니다.

## Netlify 배포

GitHub 저장소를 Netlify의 Import an existing project에서 연결합니다.

- Base directory: 비워 두기 (저장소 루트)
- Build command: 비워 두기 (별도 빌드 없음)
- Publish directory: `dist`
- 환경 변수: 필요 없음

루트의 `netlify.toml`에도 배포 폴더가 지정되어 있습니다. `npm run build`는 사용하지 않습니다. 배포 완료 후 Netlify가 제공하는 HTTPS 주소를 제출하세요. 로컬 `127.0.0.1` 주소는 다른 사람이 접속할 수 없습니다.
