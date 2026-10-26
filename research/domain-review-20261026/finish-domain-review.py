"""Minimal content patch after apply-domain-review.py; retains current layout.
Run this again after the legacy editors if those are explicitly used in future.
"""
from pathlib import Path
import re,json,calendar,html,shutil
R=Path(__file__).resolve().parents[2]; D=R/'dist/reports'; src=R/'research/rebuild-20261024'
data=json.loads((R/'research/domain-review-20261026/monthly-revenue.json').read_text(encoding='utf8'))
kr_notice='https://forum.nexon.com/maplestoryidle-kr/board_view?board=6633&thread=3360480'
kr_faq='https://forum.nexon.com/maplestoryidle-kr/board_view?board=6730&thread=3366312'
kr_open='https://forum.nexon.com/maplestoryidle-kr/board_view?board=6633&thread=3368332'
old_notice='https://forum.nexon.com/maplestoryidle/board_view?board=6653&thread=3360525'
old_faq='https://forum.nexon.com/maplestoryidle/board_view?board=6679&thread=3366800'
old_open='https://forum.nexon.com/maplestoryidle/board_view?board=6653&thread=3368869'
ir='https://pdf.irpocket.com/C3659/WUpy/ecSw/IVuJ.pdf'

def save(p,s):
 old=p.read_text(encoding='utf-8-sig') if p.exists() else ''
 if old==s:return
 if p.exists():
  b=R/'backups/domain-review-20261026'/p.relative_to(R)
  if not b.exists():b.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,b)
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(s,encoding='utf8')

def table(headers,rows,label):
 return '<div class="table-wrap" role="region" tabindex="0" aria-label="'+label+'"><table><thead><tr>'+''.join('<th scope="col">'+v+'</th>' for v in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+v+'</td>' for v in row)+'</tr>' for row in rows)+'</tbody></table></div>'

rows=[];mdrows=[]
for r in data['rows']:
 y,m=map(int,r['month'].split('-'));days=calendar.monthrange(y,m)[1];v=r['revenue']
 amount='미확보' if v is None else f'{v:,}'
 daily='—' if v is None else f'{v/days:.2f}'
 note=('금액 미확보' if r['rank'] is None else f"{r['rank']}위")
 if r['month']=='2025-11':note+=' · 11/6 출시'
 if r['month']=='2026-01':note+=' · 1/28 환불 발표'
 if r['month']=='2026-02':note+=' · 2/5~15 신청'
 link='원문 미확보' if not r['source'] else '<a href="'+html.escape(r['source'],quote=True)+'" target="_blank" rel="noopener">'+('순위 재인용' if v is None else '원자료')+'</a>'
 rows.append([r['month'],amount,daily,note,link])
 mdrows.append('| '+' | '.join([r['month'],amount,daily,note,r['source'] or '미확보'])+' |')
interpretation='1월→2월 월 합계는 약 10.9% 감소했지만, 달력 일수(31일·28일)로 나눈 일평균은 약 1.4% 감소다. 3월은 452억원으로 반등했다. 월별 하락·반등만으로 사건의 직접 효과나 신뢰 회복을 확정하지 않는다.'
limit='모바일인덱스의 국내 구글플레이·애플 앱스토어·원스토어 합산 추정치이며 넥슨의 회계 매출과 다르다. 일평균=공개 월 합계÷달력 일수로 계산한 값으로, 일별 원자료가 아니다. 11·12월은 금액 없이 순위만 확보했고 6월 금액도 미확보다. 누락은 0이 아니다. 10월은 진행 중이라 제외했다. 환불 소급 반영 방식·외부 결제 범위는 확인하지 못했으며 다른 기관의 글로벌 누적 달러 매출을 연결하지 않았다.'
irrows=[['2025년 4분기','약 90억 엔','2026.02.12 발표 · 환불 영향 추정액의 실적 반영 [S1]'],['2026년 1분기 · 당시 전망','약 50억 엔','2026.02.12 가이던스 [S1] · 최종값 아님'],['2026년 1분기 · 후속 실적','약 67억 엔','2026.05.14 실적 서한 [S9] · 환불은 3월 완료라고 회사가 설명']]
irnote='이는 회사가 환불과 연결해 설명한 매출 감소 반영액이다. 이탈에 따른 신규 결제 감소액이나 월별 국내 앱 매출 감소액을 뜻하지 않는다. 월별 원화 추정치와 합산·차감하지 않고, 개별 이용자 환급 원장까지 검증한 것으로 표시하지 않는다.'
monthly='<div id="monthly-revenue"><h3>출시 이후 월별 매출 — 사건의 직접 효과와 구분</h3><p>'+interpretation+'</p><p class="figure-note">금액 단위: 억원 · 일평균: 억원/일 · 자료 열람: 2026.10.26 · 가로로 긴 표는 내부에서 스크롤할 수 있습니다.</p>'+table(['자료 월','추정 매출','계산 일평균','월간 순위·사건','출처'],rows,'출시 이후 국내 월별 앱마켓 추정 매출')+'<p class="figure-note">'+limit+'</p><h3>환불의 재무 영향 — 전망과 후속 실적 분리</h3>'+table(['적용 기간','매출 감소 반영액','발표 시점·성격'],irrows,'환불 재무 영향의 전망 및 실적 비교')+'<p>'+irnote+'</p><p><a href="../research/domain-review-20261026/monthly-revenue.json">월별 값·범위·확인 기록 JSON</a> · <a href="'+ir+'" target="_blank" rel="noopener">후속 실적 서한 p.9</a></p></div>'
monthlymd='### 월별 매출과 환불 재무 영향\n\n'+interpretation+'\n\n단위: 매출 억원, 계산 일평균 억원/일.\n\n| 자료 월 | 추정 매출 | 계산 일평균 | 순위·사건 | 출처 |\n|---|---|---|---|---|\n'+'\n'.join(mdrows)+'\n\n'+limit+'\n\n| 적용 기간 | 매출 감소 반영액 | 발표·성격 |\n|---|---|---|\n'+'\n'.join('| '+' | '.join(v)+' |' for v in irrows)+'\n\n'+irnote+'\n\n'

sources=[
 ('S7','한국 공식 어빌리티 설명, 2026.01.26. 담당 부서 발견·수정과 경영진 인지를 구분.','https://forum.nexon.com/maplestoryidle-kr/board_view?board=6633&thread=3358548'),
 ('S8','한국 공식 액션 프레임·공격속도 설명, 2026.01.25. 당시 수정 방향·보상 계획.','https://forum.nexon.com/maplestoryidle-kr/board_view?board=6633&thread=3357759'),
 ('S9','공식 Q1 2026 실적 서한, 2026.05.14, p.9. 1분기 매출 영향 약67억엔·3월 환불 완료라는 회사 설명.',ir),
 ('E2','보존: 영문 신청 공지·지역 비교용. 한국 정책의 주근거 아님.',old_open),
 ('E3','보존: 영문 FAQ·지역/버전 비교용. 한국 정책의 주근거 아님.',old_faq),
 ('E6','보존: 영문 최초 환불 발표·지역 비교용.',old_notice),
 ('S10','공식 오프라인 보상 FAQ. 현행 시간 한도를 과거 모든 이벤트에 적용하지 않음.','https://forum.nexon.com/maplestoryidle-kr/board_view?board=6730&thread=3210548')]

for p in [src/'PROJECT_C.md',D/'idle-operations-analysis.md']:
 s=p.read_text(encoding='utf-8-sig')
 s=s.replace('조사 기준일은 2026.10.24.','조사 기준일은 2026.10.26(기존 VOC 수집은 10.24).')
 s=s.replace('S1~S6의 URL','S1~S10·보존 영문 자료의 URL')
 s=s.replace('| 2026.02.03 FAQ 게시 / 10.24 현행 본문 확인 |','| 2026.02.03 FAQ 게시 / 03.17 추가 표시·10.26 현행본문 확인 |')
 s=s.replace('국내 지역별 최종 정책본, 환불 최종 완료 건수·금액·실제 처리 시간','국내 정책 전체 개정 이력, 환불 개별 거래별 완료 건수·최종 환급액·처리 시간')
 s=s.replace('전건 완료 여부 미확인','후속 05.14 서한은 3월 환불 완료라고 설명(S9). 개별 환급 원장은 미확보')
 s=s.replace('일반 이탈로 세지 않도록 지표를 나눴습니다.','일반 이탈로 세지 않도록 지표를 나눴습니다.')
 s=s.replace('https://forum.nexon.com/maplestoryidle/board_view?board=6653&thread=3360525',kr_notice)
 if '- S7 ' not in s:s=s.replace('VOC 포함·제외 기록:', '\n'.join('- '+i+' '+desc+' '+url for i,desc,url in sources)+'\n\nVOC 포함·제외 기록:')
 s=s.replace('S6 공식 최초 환불 발표','S6 공식 한국 최초 환불 발표')
 if '### 월별 매출과 환불 재무 영향' not in s:s=s.replace('### 3. 공개 VOC',monthlymd+'### 3. 공개 VOC')
 if '오프라인 누적·수령과 접속은 다른 행동' not in s:s=s.replace('접속 가능 활동률은 시작 시점 상태를 고정한 기술 지표다.','오프라인 누적·수령과 접속은 다른 행동이다(S10). 환불 제한 중 보상 누적 여부는 확인하지 않았다. 접속 가능 활동률은 시작 시점 상태를 고정한 기술 지표다.')
 save(p,s)

for slug in ['genesis-pass','fc-live-event','idle-operations']:
 p=D/(slug+'.html');s=p.read_text(encoding='utf8')
 if slug=='genesis-pass':
  # Existing party recognition and personal valuation are retained, clarify once.
  s=s.replace('후속 보스 수행 가능성','솔로·파티의 후속 보스 수행 가능성').replace('솔로·파티의 솔로·파티의','솔로·파티의')
  s=s.replace('코인·큐브 보상을 원하는 성장으로 연결할 수 있을지 판단','보상 획득과 원하는 잠재 결과를 나눠 판단')
  if '블랙 큐브의 잠재능력과' not in s:s=s.replace('표의 불꽃·큐브는 공지의 ‘대적자의’ 보상이다.','표의 불꽃·큐브는 공지의 ‘대적자의’ 보상이다. 블랙 큐브의 잠재능력과 화이트 에디셔널 큐브의 에디셔널 잠재능력은 별개이며, 정해진 보상 수량이 원하는 옵션 달성을 보장하지 않는다.')
 elif slug=='fc-live-event':
  detail='이 과제의 1차 목표는 보상 수령 후 이벤트 인정 경기를 완료하는 행동이다. 직접 조작 플레이 확대 여부는 모드·조작 방식을 나눠 해석한다. 감독모드도 서비스 이용이며 이 회차의 인정 여부는 미확인이다. FC KICK-OFF는 이벤트명으로 게임 모드와 구분하고, 모바일은 별도 게임 FC Mobile이 아닌 FC 온라인 M을 뜻한다.'
  if detail not in s:s=re.sub(r'(<section id="problem"[^>]*><h2>문제 정의</h2>)',lambda m:m[1]+'<p>'+detail+'</p>',s,count=1)
  s=s.replace('퀵스쿼드는 이용권 보유 계정에만','이 이벤트의 1억 퀵스쿼드는 해당 이용권 보유 계정에만')
 else:
  s=s.replace('공식 영문 FAQ는','공식 한국 FAQ는')
  # Preserve the old screenshot and its original English source caption.
  for sid,url in [('S2',kr_open),('S3',kr_faq),('S6',kr_notice)]:
   pat=r'<li>'+sid+r' [\s\S]*?</li>'
   desc={'S2':'공식 한국 신청 공지, 2026.02.05 게시·현행 종료 표시. 국내 대상·기간·계정 조건.', 'S3':'공식 한국 FAQ, 2026.02.03 게시·03.17 추가 표시. 10.26 현행본문 확인, 한국(스카니아) 기준·전체 개정 이력 미확보.', 'S6':'공식 한국 최초 환불 발표, 2026.01.28 19:00. 당시 표현은 현행 원문에서 확인.'}[sid]
   s=re.sub(pat,'<li>'+sid+' '+desc+' <a href="'+html.escape(url,quote=True)+'" target="_blank" rel="noopener">'+html.escape(url)+'</a></li>',s)
  if '<li>S7 ' not in s:
   extra='<ul>'+''.join('<li>'+i+' '+desc+' <a href="'+html.escape(url,quote=True)+'" target="_blank" rel="noopener">'+html.escape(url)+'</a></li>' for i,desc,url in sources)+'</ul>'
   s=s.replace('VOC 포함·제외 기록:',extra+'VOC 포함·제외 기록:',1)
  s=s.replace('전건 완료 여부 미확인','후속 05.14 서한은 3월 환불 완료라고 설명(S9). 개별 환급 원장은 미확보')
  s=s.replace('실제 전건 완료는 미확인','05.14 회사 서한: 3월 환불 완료(S9)')
  s=s.replace('<strong>01.25 경영진 인지</strong>','<strong>12.02 담당 부서 발견·수정 / 01.25 경영진 인지</strong>')
  s=s.replace('<strong>12.02 담당 부서 발견·수정 / 01.25 경영진 인지</strong>','<strong>2025.12.02 담당 부서 발견·수정 / 2026.01.25 경영진 인지</strong>')
  s=s.replace('02.12 공식 실적 서한에서 설명 (S1)','01.26 한국 공식 설명(S7)·02.12 실적 서한(S1)')
  s=s.replace('모두 2026년. 공식 S1·S2·S6 출처','12.02는 2025년, 나머지는 2026년. 공식 S1·S2·S6·S7 출처')
  s=s.replace('2026.02.03 FAQ 게시 / 10.24 현행 본문 확인','2026.02.03 FAQ 게시 / 03.17 추가 표시·10.26 현행본문 확인')
  s=s.replace('국내 지역별 최종 정책본, 환불 최종 완료 건수·금액·실제 처리 시간','국내 정책 전체 개정 이력, 개별 거래별 환급액·처리 시간')
  if '어빌리티 최대값 미등장·무고지 수정(S7)' not in s:s=s.replace('금전 처리를 마쳤다고 신뢰 문제가 끝나는 것은 아니다.','어빌리티 최대값 미등장·무고지 수정(S7)과 액션 프레임에 따른 공격속도 반영 문제(S8)를 구분했다. 금전 처리를 마쳤다고 신뢰 문제가 끝나는 것은 아니다.')
  if 'id="monthly-revenue"' not in s:s=s.replace('</section><section id="analysis"',monthly+'</section><section id="analysis"',1)
  if '오프라인 누적·수령과 접속은 다른 행동' not in s:s=s.replace('접속 가능 활동률은 시작 시점 상태를 고정한 기술 지표다.','오프라인 누적·수령과 접속은 다른 행동이다(S10). 환불 제한 중 보상 누적 여부는 미확인이다. 접속 가능 활동률은 시작 시점 상태를 고정한 기술 지표다.')
 save(p,s)

# Persist clarity in A/B Markdown inputs (current HTML was already updated above).
for name in ['PROJECT_A.md','PROJECT_B.md']:
 p=src/name;s=p.read_text(encoding='utf-8-sig')
 if name.endswith('A.md'):
  if '잠재능력과 에디셔널 잠재능력은 별개이며' not in s:s=s.replace('표의 불꽃·큐브는 공지의 ‘대적자의’ 보상이다.','표의 불꽃·큐브는 공지의 ‘대적자의’ 보상이다. 잠재능력과 에디셔널 잠재능력은 별개이며, 보상 수량이 원하는 옵션 달성을 보장하지 않는다.')
 else:
  para='이 과제의 1차 목표는 보상 수령 후 이벤트 인정 경기 완료다. 직접 조작 플레이 여부는 모드·조작 방식으로 나눠 해석한다. 감독모드도 유효한 서비스 이용이며 해당 회차 인정 여부는 미확인이다. FC KICK-OFF 이벤트와 게임 모드, FC 온라인 M과 별도 게임 FC Mobile을 구분한다.'
  if para not in s:s=s.replace('### 4. 행동 흐름',para+'\n\n### 4. 행동 흐름')
 save(p,s);save(D/('genesis-pass-analysis.md' if name.endswith('A.md') else 'fc-live-event-analysis.md'),s)

save(R/'dist/research/domain-review-20261026/monthly-revenue.json',json.dumps(data,ensure_ascii=False,indent=2)+'\n')
save(R/'dist/research/domain-review-20261026/monthly-revenue-method.md', '# 월별 매출 확인 범위\n\n'+interpretation+'\n\n'+limit+'\n\n'+irnote+'\n\n'+monthlymd)
print('Current HTML, Markdown sources, monthly evidence updated. Layout preserved.')
