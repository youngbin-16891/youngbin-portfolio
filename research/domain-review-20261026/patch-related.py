from pathlib import Path
import re,shutil,json
R=Path(__file__).resolve().parents[2];S=R/'research/rebuild-20261024'
def save(p,s):
 old=p.read_text(encoding='utf8')
 if old==s:return
 b=R/'backups/domain-review-20261026'/p.relative_to(R)
 if not b.exists():b.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,b)
 p.write_text(s,encoding='utf8')

p=S/'build-summaries.mjs';s=p.read_text(encoding='utf8')
s=s.replace("date:'2026.10.25'","date:'2026.10.26'")
s=s.replace("{slug:'fc-live-event',label:","{slug:'fc-live-event',date:'2026.10.26',label:")
s=s.replace("{slug:'idle-operations',label:","{slug:'idle-operations',date:'2026.10.26',label:")
s=s.replace('보상 수령과 경기 완료는 다른 성과다. 문구 차이는 확인했지만 안내 부족이 미경기의 주원인이라는 증거는 없다.','보상 수령과 인정 경기 완료는 다른 성과다. 직접 조작 여부는 모드별로 나눠 본다. 문구 차이는 실제 미경기 원인을 입증하지 않는다.')
s=s.replace('상태·로그 연동 확장안은 배정 후 24시간 내 첫 경기 완료 계정 / 전체 배정 계정을 측정하고, 신규·복귀별 D1/D7과 지급량도 함께 본다.','연동 확장안은 배정 후24시간 내 인정 경기 완료 계정/전체 배정 계정을 측정한다. 플랫폼·모드·직접 조작 여부를 나눠 해석하며 해당 회차 감독모드 인정은 미확인이다.')
s=s.replace('2026년 1월 28일 전액 환불 발표, 2월 5~15일 신청 절차를 공식 공지로 확인했다. 현재 신청은 종료됐다.','어빌리티 최대값·공격속도 반영 사안 이후 1/28 전액 환불 발표, 2/5~15 신청. 5/14 회사 서한은 3월 환불 완료를 설명한다.')
s=s.replace('FAQ의 설명 차이는 정책 확인 과제이며 실제 운영 오류·당시 피해로 확정하지 않았다. 내부 처리·활동 자료는 미확보 상태다.','한국 현행 FAQ의 설명 차이는 정책 확인 과제다. 국내 월별 앱 매출 추이와 환불 회계 영향은 구분했으며, 사건의 매출 인과 효과·개별 처리 원장은 미확보다.')
save(p,s)

p=R/'dist/deliverables.js';s=p.read_text(encoding='utf8')
s=s.replace('공식 영문 정책의 범위·한계 표시','한국 정책 주근거·영문 비교 자료 보존')
s=s.replace('규칙을 확인한 뒤 첫 경기 준비 안내의 효과를 시험한다.','인정 규칙과 모드를 나눠 첫 경기 안내의 효과를 시험한다.')
s=s.replace('퀵스쿼드는 보유자에게만 안내하고','이벤트의 1억 퀵스쿼드는 해당 이용권 보유자에게만 안내하고')
s=s.replace('보상 수령과 경기 참여는 다릅니다. 규칙 확인과 혼선 검증 후 첫 경기 안내를 시험하는 모의안입니다.','보상 수령과 인정 경기 완료를 구분하고, 모드별 참여를 나눠 안내 효과를 확인하는 모의안입니다.')
save(p,s)

p=S/'build-submission-pdf.py';s=p.read_text(encoding='utf8')
s=s.replace('보스 처치·퀘스트를 대신하지 않습니다.','보스 처치·퀘스트를 대신하지 않습니다.')
s=s.replace('처치 가능한 보스·진행 단계·시작 시점에 따라','솔로·파티의 보스 수행·진행 단계·시작 시점에 따라')
s=s.replace('실제 경기 여부 확인','인정 경기 여부 확인')
s=s.replace("note('퀵스쿼드는 경기 미션", "note('이 이벤트의 1억 퀵스쿼드는 경기 미션")
s=s.replace('공식 시점: 01.25 경영진 인지(02.12 서한의 사후 설명) · 01.28 환불 발표 · 02.05~02.15 신청(마감 23:59 KST) · 03.15 당시 처리 완료 예상, 실제 전건 완료 확인 아님.','공식 시점: 담당 부서2025.12.02 발견·무고지 수정(01.26 설명), 경영진01.25 인지. 01.28 환불 발표·02.05~15 신청. 05.14 회사 서한은3월 환불 완료를 설명하며 개별 환급 원장은 미확보.')
anchor="add('이용자에게 먼저 설명할 것','h2')"
if "약67억엔" not in s:s=s.replace(anchor,"note('어빌리티 최대값 문제와 스킬 액션 프레임에 따른 공격속도 반영 문제는 별개입니다. 2025년4분기 환불 매출 영향 약90억엔은 추정액 반영, 2026년1분기는 당시50억엔 전망에서 후속 실적 약67억엔으로 갱신됐습니다. 월별 앱 매출과 합산하지 않습니다.')\n"+anchor)
marker="add('공개 VOC · 전체 여론이 아닌 쟁점 탐색','h2')"
endmarker='#7\n'
if '월별 국내 앱 매출 추이' not in s:
 start=s.index(marker);end=s.index(endmarker,start)
 s=s[:start]+"add('월별 국내 앱 매출 추이 · 외부 추정','h2')\n"+"table(['2026년 월','1월','2월','3월','4월','5월','7월','8월','9월'],[['매출·억원','439','391','452','256','285','138','221','176']],[30*mm]+[18*mm]*8)\n"+"note('모바일인덱스 국내3사 합산 추정. 2025년11·12월과2026년6월 금액은 미확보로 생략했으며 웹에는 출시월부터 누락을 표시했습니다. 1→2월 월 합계-10.9%, 일수 보정 일평균-1.4%. 3월 반등도 있어 사건의 직접 효과·신뢰 회복을 단정하지 않습니다. '+link('월별 원자료·계산·범위','reports/idle-operations.html#monthly-revenue'))\n"+s[end:]
if '공개 VOC9개' not in s:s=s.replace("#8\n","note('공개 VOC9개는 기사 한 스레드의15개 중 포함한 댓글이며 동일 작성자 답글을 포함합니다. 전체 여론·이탈 원인은 아닙니다. 원본 코드·기준은 웹 부록에 보존했습니다.')\n#8\n")
s=s.replace('공식 공지·영문 FAQ·실적 서한','한국 공식 공지·FAQ·실적 서한')
s=s.replace("['환불·계정 상태','공식 영문 FAQ", "['환불·계정 상태','공식 한국 FAQ")
s=s.replace('2026.10.24 · 분석 대상','2026.10.26 · 분석 대상').replace("f'{doc.page}  /  2026.10.24'","f'{doc.page}  /  2026.10.26'")
s=s.replace("('C 공식 환불 FAQ · 영문','https://forum.nexon.com/maplestoryidle/board_view?board=6679&amp;thread=3366800')", "('C 한국 환불 FAQ · 03.17 추가 현행본','https://forum.nexon.com/maplestoryidle-kr/board_view?board=6730&amp;thread=3366312')")
s=s.replace("('C 실적 서한 · 2026.02.12 p.4','https://pdf.irpocket.com/C3659/YpwX/MxJ9/mdUR.pdf')", "('C 후속 실적 서한 · 2026.05.14 p.9','https://pdf.irpocket.com/C3659/WUpy/ecSw/IVuJ.pdf')")
# Existing B metric paragraph: clarify the same metric rather than add KPIs.
s=s.replace('서버 규칙의 오류나 유저 오인 발생을 입증한 것은 아닙니다.','서버 규칙의 오류나 유저 오인 발생을 입증한 것은 아닙니다. 인정 경기 완료와 직접 조작 참여는 플랫폼·모드별로 나눠 해석하며, 해당 회차의 감독모드 인정은 미확인입니다.')
save(p,s)
print('Summary source, main card source and existing combined PDF source aligned.')
