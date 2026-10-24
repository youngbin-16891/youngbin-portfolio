import fs from 'node:fs';
import {aPopulationMd,aKpiMd,aValueMd,bChainMd,bScopeMd,cWindowsMd,cStatesMd,mdHtml} from './precision-content.mjs';
const dir='research/rebuild-20261024/';
const replaceSection=(text,n,body)=>text.replace(new RegExp('### '+n+'\\.[\\s\\S]*?(?=### \\d+\\.|### 출처|$)'),body+'\n\n');
const getSection=(text,n)=>text.match(new RegExp('### '+n+'\\.[\\s\\S]*?(?=### \\d+\\.|### 출처|$)'))?.[0]||'';
let a=fs.readFileSync(dir+'PROJECT_A.md','utf8');
if(!a.includes('기본 모집단: 판매 시작')){
 const old=getSection(a,9),tail=old.slice(old.indexOf('안내 실험은'));
 const extra=`보조 지표: 조건 오인 문의율은 구매 후 7일 관찰이 끝난 명의 중 관련 문의가 있는 명의 비율이다. 문의하지 않았다고 이해했다고 단정하지 않는다. 후속 목표 참여는 효과 종료 7일 전까지 해방한 기본 구매 명의 중 해방 후 7일 내 PLUS 미션 1회 이상 완료 명의 비율이며 게임 전체 잔존율이 아니다.`;
 a=replaceSection(a,9,'### 9. KPI 검증 계획\n\n실제 내부 결과가 아닌 측정 계획이다.\n\n'+aPopulationMd+'\n\n'+aKpiMd+'\n\n'+extra+'\n\n'+tail);
 a=a.replace('### 8. 사업 판단과 제안 — 두 가지로 제한','### 8. 사업 판단과 제안 — 두 가지로 제한\n\n'+aValueMd);
}
fs.writeFileSync(dir+'PROJECT_A.md',a);
let gen=fs.readFileSync(dir+'build-a-reading.mjs','utf8');
if(!gen.includes("from './precision-content.mjs'")){
 gen="import {aPopulationMd,aKpiMd,aValueMd,mdHtml} from './precision-content.mjs';\n"+gen;
 gen=gen.replace(/const kpi=tbl\([\s\S]*?(?=const main=)/,"const kpi=mdHtml(aKpiMd);\n");
 gen=gen.replace("'+flow+graph+", "'+flow+mdHtml(aValueMd)+graph+");
 gen=gen.replace("'+kpi+'<p>동일 명의", "'+mdHtml(aPopulationMd)+kpi+'<p>동일 명의");
 gen=gen.replace('a-reading.css?v=20261024compare','a-reading.css?v=20261024precision');
}
fs.writeFileSync(dir+'build-a-reading.mjs',gen);
let b=fs.readFileSync(dir+'PROJECT_B.md','utf8');
if(!b.includes('최소 개선안 · 공통 안내')){
 b=b.replace('### 6. 개선 기획서 — 첫 경기 준비 안내','### 6. 개선 기획서 — 첫 경기 준비 안내\n\n'+bScopeMd);
 b=b.replace('### 5. 원인별 대응 우선순위','### 5. 원인별 대응 우선순위\n\n'+bChainMd);
 b=b.replace('규칙을 먼저 일치시킨 뒤, 기존 보상 변경 없이 첫 경기 준비 안내를 검증한다.','규칙을 먼저 통일하고 이해·탐색 문제가 확인되면, 상태 연동 가능성을 검토한 뒤 준비 안내를 시험한다.');
 b=b.replace('T-14~T-10','사전 확인').replace('T-9~T-5','구현 협의').replace('T-4~T-1','QA 승인');
 b=b.replace('아래는 다음 동일 구조 운영 회차의 상대 일정이다. T0는 승인된 노출 시작일이다.','아래는 다음 동일 구조 회차의 단계별 계획이다. 준비 단계의 실제 소요 기간은 미정이다. T0는 승인된 확장안 노출 시작일이며, 7일 배정·후속 관찰은 모의 실험 창이지 개발 공수 견적이 아니다.');
 b=b.replace('개선 안내와 기존 안내를 적격 계정 단위로 무작위 배정한다.','이하 KPI는 확장안에 필요한 상태·배정·경기 로그를 연결할 수 있을 때의 측정 계획이다. 최소 공통 안내만 수정하고 경기 로그를 확보하지 못했다면 조건 이해·문의만 확인하고 경기 전환 효과는 판정하지 않는다.\n\n개선 안내와 기존 안내를 적격 계정 단위로 무작위 배정한다.');
}
fs.writeFileSync(dir+'PROJECT_B.md',b);fs.writeFileSync('dist/reports/fc-live-event-analysis.md',b);
let c=fs.readFileSync(dir+'PROJECT_C.md','utf8');
const ops=`| 지표 | 모집단·기간·계산 | 해석 주의 |
|---|---|---|
| 처리 완료 시간·대기 | 유효 신청. 접수→마켓 취소 확인 시간의 중앙값·상위10% 경계, 미완료 잔량·대기 일수 매일 | 실제 입금과 취소를 구분. 미완료를 제외해 속도를 좋게 보이지 않음 |
| 거래 처리·중복 | 신청 시작부터 잔량 종료까지 대상 거래 ID 중 정상 취소 확인 비율·중복 건수 | 계정 신청과 거래 정산 단위 구분 |
| 반복 문의·답변 일치 | 최초 답변 후 7일 관찰 가능한 환불 문의 중 같은 사유 재접수 비율, 정책 버전별 답변 검수 | 문의 감소가 포기·경로 변경일 수 있음 |
| 신규·복귀 보조 관찰 | 신규는 01.14~02.11 첫 접속 계정의 정확히7일 뒤 접속. 복귀는 이전14일 미접속 뒤 복귀한 계정의 복귀+7일 접속. 02.18까지 관찰 가능한 집단만 | 모의 정의. 지역·유입·제한 해제와 자연 복귀 구분 |
| 요청/비요청·신뢰 VOC | 01.28 전 결제 계정 범위에서 요청 시점·제한 상태별7/14일 활동과 전체 수 병기. 실제 CS는 주별 고유 계정·접수 건수 별도 | 선택 편향 존재, 환불 인과 효과 아님. 외부 댓글과 실제 CS를 합산하지 않음 |`;
if(!c.includes('고정 집단 U0='))c=replaceSection(c,10,'### 10. 사후 모니터링 — 내부 데이터가 있을 때의 측정안\n\n'+cWindowsMd+'\n\n'+cStatesMd+'\n\n'+ops);
if(!c.includes('실제 회사 CS 접수량과도 다르며')) c=c.replace('같은 작성자의 답글이 포함되므로 9명의 이용자가 아니다.','같은 작성자의 답글이 포함되므로 9명의 이용자가 아니다. 실제 회사 CS 접수량과도 다르며, 긍정·부정 비율을 서비스 전체로 일반화하지 않는다.');
fs.writeFileSync(dir+'PROJECT_C.md',c);fs.writeFileSync('dist/reports/idle-operations-analysis.md',c);
const blockHtml=(text)=>{const split=text.trim().split('\n');const heading=split.shift().replace(/^### \d+\. /,'');return '<h3>'+heading+'</h3>'+mdHtml(split.join('\n'));};
const subReplace=(html,title,text)=>html.replace(new RegExp('<h3>'+title+'<\\/h3>[\\s\\S]*?(?=<h3>|<\\/details>|<\\/section>)'),blockHtml(text));
let bh=fs.readFileSync('dist/reports/fc-live-event.html','utf8');
if(!bh.includes('최소 개선안 · 공통 안내')){
 bh=subReplace(bh,'개선 기획서 — 첫 경기 준비 안내',getSection(b,6));
 bh=subReplace(bh,'운영 일정과 협업',getSection(b,8));
 bh=bh.replace(/<section id="measurement"[\s\S]*?<\/section>/,'<section id="measurement" class="report-section"><h2>성과 확인</h2>'+blockHtml(getSection(b,10))+'</section>');
 bh=bh.replace('<section id="analysis" class="report-section"><h2>분석 결과</h2>','<section id="analysis" class="report-section"><h2>분석 결과</h2>'+mdHtml(bChainMd));
}
bh=bh.replaceAll('실제 규칙을 확인한 뒤 첫 경기 준비 안내를 시험하는 모의 개선안입니다.','규칙을 통일하고 이해·탐색 문제가 확인될 때 준비 안내를 시험하는 모의 개선안입니다.');
bh=bh.replaceAll('올바른 규칙을 공통 안내한 뒤, 첫 보상 수령·경기 미완료 계정에 준비 안내를 시험합니다.','공통 문구를 먼저 정리합니다. 이해·탐색 문제가 확인되고 상태 연동이 가능하면 대상별 준비 안내를 시험합니다.');
bh=bh.replaceAll('개선안은 보상 지급 이후에만 적용한다','확장안 적용 위치 · 상태 연동 가능 시');
bh=bh.replaceAll('문구 수정 낮음, 개인 상태 연동은 중간','공통 화면 수정 가능 여부 확인; 상태 연동은 별도 공수 협의');
fs.writeFileSync('dist/reports/fc-live-event.html',bh);
let ch=fs.readFileSync('dist/reports/idle-operations.html','utf8');
ch=ch.replace(/<section id="measurement"[\s\S]*?<\/section>/,'<section id="measurement" class="report-section"><h2>성과 확인</h2><h3>발표·신청 개시·잔존·중단 위험을 나눠 본다</h3>'+mdHtml(cWindowsMd)+'<details><summary>계정 상태와 활동률 분모의 집계 규칙</summary>'+mdHtml(cStatesMd)+'</details><details><summary>환불 처리·CS·보조 관찰 정의</summary>'+mdHtml(ops)+'</details></section>');
ch=ch.replace('전체 이용자의 의견 분포·불만 순위·실제 이탈 원인이 아니며, 표본 선택 편향은 해소되지 않는다.','전체 이용자의 의견 분포·불만 순위·실제 이탈 원인이 아니며, 실제 회사 CS 접수량과 다르다. 긍정·부정 비율을 서비스 전체로 일반화하지 않으며 표본 선택 편향은 해소되지 않는다.');
fs.writeFileSync('dist/reports/idle-operations.html',ch);
console.log('A/B/C source and targeted measurement patches written.');
