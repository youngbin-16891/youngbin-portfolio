from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,Image,PageBreak,KeepTogether
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image as PILImage
from pathlib import Path
from xml.sax.saxutils import escape
import shutil
pdfmetrics.registerFont(TTFont('MG','C:/Windows/Fonts/malgun.ttf'))
pdfmetrics.registerFont(TTFont('MGB','C:/Windows/Fonts/malgunbd.ttf'))
pdfmetrics.registerFontFamily('MG',normal='MG',bold='MGB',italic='MG',boldItalic='MGB')
root=Path.cwd(); out=root/'output/pdf/youngbin-game-pm-portfolio.pdf';out.parent.mkdir(parents=True,exist_ok=True)
ink=colors.HexColor('#182635');accent=colors.HexColor('#315f73');muted=colors.HexColor('#576674');line=colors.HexColor('#d4dce1');pale=colors.HexColor('#eff4f6')
styles={}
for name,size,leading,bold in [('body',9.7,15.5,False),('small',8.5,13,False),('h1',23,33,True),('h2',15,23,True),('h3',11,17,True),('cover',34,47,True),('kicker',8.5,14,True)]:
 styles[name]=ParagraphStyle(name,fontName='MGB' if bold else 'MG',fontSize=size,leading=leading,textColor=muted if name=='small' else ink,spaceAfter=7,wordWrap='CJK')
styles['kicker'].textColor=accent
story=[]; W=174*mm
web='https://youngbin-16891.github.io/youngbin-portfolio/'
def P(s,style='body'): return Paragraph(s,styles[style])
def add(s,style='body'): story.append(P(s,style))
def gap(n=3):story.append(Spacer(1,n*mm))
def title(k,t):add(k,'kicker');add(t,'h1');gap(3)
def table(head,rows,widths=None):
 data=[[P(escape(str(x)),'small') for x in head]]+[[P(str(x),'small') for x in row] for row in rows]
 t=Table(data,colWidths=widths or [W/len(head)]*len(head),hAlign='LEFT',repeatRows=1)
 t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),pale),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,-1),.4,line),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7)]));story.append(t);gap(3)
def pic(path,width):
 im=PILImage.open(root/path);return Image(str(root/path),width=width,height=width*im.height/im.width)
def link(label,path):return '<link href="'+(path if path.startswith('https:') else web+path)+'" color="#315f73"><u>'+escape(label)+'</u></link>'
def new():story.append(PageBreak())
def note(s):add(s,'small')
def bullet(s):add('• '+s)
# 1 cover
add('GAME BUSINESS · LIVE SERVICE · OPERATIONS','kicker');gap(18)
add('유저의 선택을<br/>근거와 판단으로','cover');gap(8)
add('최영빈 | 신입 게임 사업·운영 포트폴리오','h2');gap(10)
add('게임을 오래 한 경험을 질문과 분석으로 연결합니다. 상품의 구매 조건, 이벤트 참여 행동, 서비스 이슈 대응을 세 가지 과제로 정리했습니다.');gap(10)
table(['프로젝트','분야','이 문서에서 보여줄 판단'],[
 ['A · 메이플스토리','게임 사업 PM','성장 가속 구매와 후속 유료 보상의 구매 가치를 구분'],
 ['B · FC 온라인','라이브서비스 PM','접속 보상 수령과 실제 경기 참여를 다른 성과로 측정'],
 ['C · 메이플 키우기','게임 운영','계정 제한에 따른 미접속과 자발적 이탈 위험을 분리']],[45*mm,35*mm,94*mm])
gap(14);add('공개자료 분석 · 개인 경험 · 모의 제안','h3');note('실제 회사에서 운영하거나 실험한 성과가 아닙니다. 내부 매출·잔존율·개선 효과를 보유한 것처럼 작성하지 않았습니다.');gap(6)
add(link('포트폴리오 웹사이트',web));add('cyb050602@gmail.com');note('자료 기준 2026.10.26 · 분석 대상은 각 보고서에 명시된 과거 시즌·사건입니다.')
#2
new();title('OVERVIEW','세 프로젝트, 서로 다른 업무 질문')
table(['역할','확보한 근거','판단과 실제 작성 문서'],[
 ['A · 상품 가치','2026년 공식 상품 조건<br/>기본 패스 사용 화면·미구매 진술','기본 구매와 PLUS 추가 구매를 나눠 분석.<br/>상품 비교표·구매 흐름·조건부 의사결정·측정 정의'],
 ['B · 행동 전환','FC KICK-OFF 공식 본문·유의사항·보상 상세','보상 수령을 경기 완료로 집계하지 않음.<br/>행동 흐름·모의 안내·운영 일정·지급 예외·측정 계획'],
 ['C · 이슈 대응','한국 공식 공지·FAQ·실적 서한<br/>공개 댓글 15개 검토, 9개 포함','제한 상태와 활동을 연결해 해석.<br/>타임라인·VOC·모의 공지·FAQ·CS 기준·사후 점검']],[30*mm,64*mm,80*mm])
gap(5);add('게임을 몰라도 읽을 수 있는 핵심 용어','h2')
bullet('<b>해방</b> · 메이플스토리의 제네시스 무기 성장 목표. 패스는 필요한 재화 획득을 돕지만 보스 처치·퀘스트를 대신하지 않습니다.')
bullet('<b>접속과 경기</b> · 이벤트 보상을 받는 행동과 실제 경기를 끝내는 행동은 다릅니다. B는 이 두 성과를 구분합니다.')
bullet('<b>계정 제한</b> · 정책상 게임에 접속할 수 없는 상태. C는 이를 접속 가능하지만 멈췄을 가능성과 나눠 봅니다.')
add('읽는 순서','h2');add('A는 구매 가치, B는 참여 행동, C는 정책과 운영 판단을 보여줍니다. 상세 보상표·공지·CS 기준·측정 정의는 웹 보고서 부록에서 확인할 수 있습니다.')
note('공식 사실·개인 경험·계산·검증 전 가설을 구분했습니다. 공개자료로 확인하지 못한 내부 지표와 제안 효과는 측정 계획으로 남겼습니다.')
#3
new();title('A · 게임 사업 PM','기본 패스는 구매했지만,<br/>PLUS는 구매하지 않은 이유')
images=Table([[pic(Path('dist/assets/maplestory/genesis-pass-user-guide.png'),68*mm),pic(Path('dist/assets/maplestory/genesis-plus-user-screen.png'),78*mm)]],colWidths=[87*mm,87*mm]);images.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'MIDDLE'),('ALIGN',(0,0),(-1,-1),'CENTER')]));story.append(images);note('지원자 제공 상품 화면 · 공식 조건 대조: 2026.06.18 업데이트. 이미지는 구매 이력 자체의 증빙이 아닙니다.')
table(['구분','기본 제네시스 패스','PLUS 프리미엄 티켓'],[
 ['가격','30,000 넥슨캐시','별도 30,000 넥슨캐시'],
 ['자격','255레벨 이상·지정 퀘스트 상태 충족','기본 구매 도전 캐릭터의 해방 완료'],
 ['주요 가치','보스 처치 어둠의 흔적 3배·지정 도전 지원','보스 미션 수행 시 프리미엄 추가 보상'],
 ['본인 판단','해방 시간을 줄이기 위해 구매','추가 보스의 스펙·시간 부담으로 미구매. 일퀘 등 기존 플레이는 지속']],[25*mm,74.5*mm,74.5*mm])
add('기본 구매의 목적과 후속 구매의 조건은 다릅니다.','h3');add('지원자는 6월 20일 기본 패스 사용 기록을 제공했고, 7월 말쯤 해방했다고 회상했습니다. 해방 후에도 일일 퀘스트와 퍼스널 버닝은 꾸준히 플레이합니다. 다만 추가 보스 공략의 스펙·시간 부담과 큐브 결과의 불확실성 때문에 PLUS는 구매하지 않았습니다. 후속 상품 미구매를 게임 이탈로 해석하지 않았으며 전체 구매자의 동기로 일반화하지 않았습니다.')
note('PLUS 일반 미션 참여에는 별도 프리미엄 티켓이 필요하지 않습니다. 유료 추가 보상은 티켓 활성화와 미션 달성이 모두 필요합니다. '+link('상품·경험 상세','reports/genesis-pass.html#experience'))
#4
new();title('A · 수치와 판단','재화 3배와 완료 기간은 다릅니다')
add('같은 보스를 처치해 얻는 재화의 배수이지, 누구나 해방 기간이 1/3이 된다는 뜻은 아닙니다. 솔로·파티의 보스 수행·진행 단계·시작 시점에 따라 활용 가치가 달라집니다.')
table(['계산','결과','해석 범위'],[['기본 획득량 × 3','총 300%, 추가 +200%','기간·실제 전투력이 3배 달라진다는 의미 아님'],['2,500 + 1,500 × 5','프리미엄 추가 10,000코인','6개 미션 전부 수행 시 최대. 일반 보상 500코인 별도']],[57*mm,43*mm,74*mm])
add('가격을 바꾸기 전에 활용 여부를 확인','h2');add('미완료·조건 오인이 많다는 자료가 없어 할인이나 보상 확대를 먼저 제안하지 않았습니다. 조건 문의와 진행 상태를 확인하고 오인이 입증될 때만 구매 전 요약 안내를 시험합니다.')
table(['문제·근거와 조치','기대 · 가설','위험·완화·판단'],[['조건 오인이 확인되면 구매 전 가격·만료·수행 조건을 짧게 안내','조건을 이해한 구매·문의 감소','설명 부담·구매 전 이탈 가능성. 정확한 핵심만 안내하고 이해·문의·배정 명의 대비 구매를 함께 비교. 오인 근거 없으면 보류'],['특정 단계의 활용 병목이 확인될 때만 해당 진행·보상 조건 변경 검토','혜택 활용·목표 달성 가능성 개선','형평성·성장 가치·재화 공급 영향. 오류·늦은 시작·보스 수행을 먼저 구분하고 지급·기존 구매자 영향을 점검. 원인·검수 계획 없으면 유지 검토']],[57*mm,35*mm,82*mm])
add('핵심 지표 · 실제 결과가 아닌 측정 계획','h2');table(['지표','분자 / 분모 · 관찰 기준'],[
 ['기본 구매율','자격 진입 후 유효 구매 명의 / 판매 시작의 기존 자격자와 판매 중 신규 자격자의 합집합. 동일 명의 중복 제거'],
 ['구매자 해방 완료율','09.16 23:59까지 적용 캐릭터가 해방한 구매 명의 / 전체 기본 구매 명의. 구매 주차별 구분'],
 ['PLUS 구매율','자격 진입 후 유효 티켓 구매 명의 / 09.16 23:50 마감 전 적용 캐릭터가 해방해 티켓 자격을 얻은 유효 기본 구매 명의']],[41*mm,133*mm])
note('기존 자격자와 신규 자격자를 함께 세고, 진입 시점·남은 기회를 나눕니다. 미사용자도 완료율 분모에 남깁니다. 단계별 미완료·접속 여부는 별도 진단하며 이탈로 단정하지 않습니다. 개인 진행·처치 기록과2026규칙 이력이 부족해 절약 일수는 계산하지 않았습니다. 기본 판매2026.06.18~09.15 23:59, 효과09.16 23:59. A추가검토2026.10.25. '+link('공식 조건·전체 계산','reports/genesis-pass.html#appendix'))
#5
new();title('B · 라이브서비스 PM','보상을 받았다고 경기를 한 것은 아닙니다')
story.append(pic(Path('dist/reports/evidence/fc-event-opening-20261024.png'),95*mm));note('FC KICK-OFF 공식 화면 · 2026.10.24 열람. 기본 참여 2026.09.10~10.28, 연장 조건 충족 시 11.11까지.')
add('확인된 구조와 원문 차이','h2');add('5일 접속 보상은 총 2,500FC이며 경기 미션과 별도입니다. 본문은 하루 1판 플레이를, 유의사항은 누적 출석을 설명합니다. 문구 차이는 확인했지만 실제 서버 규칙의 오류나 유저 오인 발생을 입증한 것은 아닙니다. 인정 경기 완료와 직접 조작 참여는 플랫폼·모드별로 나눠 해석하며, 해당 회차의 감독모드 인정은 미확인입니다.')
add('접속 → 보상 수령 → 경기 또는 종료<br/>현재 선수단 → 인정 경기 완료 → 경기 보상 수령','h3')
add('공통 안내부터 · 미실행 제안','h2');add('먼저 실제 인정 규칙을 확인해 공통 안내를 맞춥니다. 이해·탐색 문제가 확인될 때만 추가 안내를 시험합니다. 개인 상태를 보여주는 기능은 별도 확장안이며, 구현·로그·개발 공수 협의 전에는 실행을 전제하지 않습니다.')
table(['판단할 지표','정의와 주의'],[['최소안 / 확장안','공통 안내는 조건 이해·문의 확인. 상태·로그 연동이 확보된 확장안만 배정 후 24시간 내 경기 완료 / 배정 계정 전체 측정'],['반복·D7','168시간 내 서로 다른 2일 이상 경기; D7 당일 접속·경기를 각각 확인'],['비용·안전','관련 문의·비정상 경기·계정당 실제 지급 FC/BP/팩과 개발·QA·CS 비용 확인']],[43*mm,131*mm])
note('이 이벤트의 1억 퀵스쿼드는 경기 미션 1일차 보상이므로 첫 경기 전에 모두 보유했다고 안내하지 않습니다. 2,500FC×가정 1,000계정=2,500,000FC는 총량 예시이며 순증 지급·실제 비용이 아닙니다. '+link('운영 일정·예외 처리·측정 정의','reports/fc-live-event.html'))
#6
new();title('C · 게임 운영','환불 이후의 미접속은<br/>모두 자발적 이탈일까요?')
add('공식 한국 FAQ는 환불 신청 완료 즉시 이 게임 계정 이용 제한을 안내합니다. 접속할 수 없는 계정을 자발적으로 떠난 이용자로 집계해서는 안 됩니다.')
note('공식 시점: 담당 부서2025.12.02 발견·무고지 수정(01.26 설명), 경영진01.25 인지. 01.28 환불 발표·02.05~15 신청. 05.14 회사 서한은3월 환불 완료를 설명하며 개별 환급 원장은 미확보.')
note('어빌리티 최대값 문제와 스킬 액션 프레임에 따른 공격속도 반영 문제는 별개입니다. 2025년4분기 환불 매출 영향 약90억엔은 추정액 반영, 2026년1분기는 당시50억엔 전망에서 후속 실적 약67억엔으로 갱신됐습니다. 월별 앱 매출과 합산하지 않습니다.')
add('이용자에게 먼저 설명할 것','h2')
table(['확인·안내','모의 대응 판단'],[
 ['계정 영향','신청 시 이용 제한, 철회 조건·예외를 현행 정책 담당자에게 확인한 뒤 설명'],
 ['환불 진행','대상과 신청·마켓 취소·실제 환급을 구분. 예상 완료일을 실제 완료로 설명하지 않음'],
 ['후속 문의','공지·FAQ·신청 화면·CS 답변 버전을 맞추고 예외는 임의 확약 없이 전달']],[38*mm,136*mm])
add('미접속은 접속 가능 여부부터 구분','h2')
table(['관찰된 상태','해석'],[['이용 제한 중 미접속','접속 불가능 상태로 별도 집계. 자발적 이탈로 세지 않음'],['접속 가능하지만 미접속','중단 위험 신호. 성장·업데이트·사회적 요인 등 추가 확인 필요']],[65*mm,109*mm])
note('전체 DAU(하루 접속 계정 수)와 상태별 수·활동을 나란히 봅니다. 발표01.28과 신청개시02.05를 분리합니다. 01.27 접속자의 D7은02.03으로 신청개시 전입니다. 전체 기간·코호트·분모 정의는 웹 부록에 보존했습니다.')
add('월별 국내 앱 매출 추이 · 외부 추정','h2')
table(['2026년 월','1월','2월','3월','4월','5월','7월','8월','9월'],[['매출·억원','439','391','452','256','285','138','221','176']],[30*mm]+[18*mm]*8)
note('모바일인덱스 국내3사 합산 추정. 2025년11·12월과2026년6월 금액은 미확보로 생략했으며 웹에는 출시월부터 누락을 표시했습니다. 1→2월 월 합계-10.9%, 일수 보정 일평균-1.4%. 3월 반등도 있어 사건의 직접 효과·신뢰 회복을 단정하지 않습니다. '+link('월별 원자료·계산·범위','reports/idle-operations.html#monthly-revenue'))
#7
new();title('C · 모의 운영 대응','정책·답변·처리 상태를 먼저 맞춥니다')
add('피해 확인 → 공식 정책 확인 → 공지·FAQ·CS 통일 → 거래별 처리 점검 → 상태별 활동 관찰','h3');add('지원자가 과거 사건을 바탕으로 작성한 모의 절차입니다. 넥슨의 실제 내부 조직·업무 절차나 지원자의 수행 경력이 아닙니다.')
table(['시점','검토할 행동·승인 경계'],[['피해가 계속될 때','증거 보존·영향 확인 후 책임자에게 보호 조치 요청. 운영 단독 판매 중단·복구 약속 금지'],['신청 결정 전','계정 영향·대상·철회 예외를 정책 담당자에게 확인. 공지·FAQ·신청 화면·CS 답변 버전 통일'],['처리 중','거래 ID와 기환불액·마켓 취소 결과 대조. 미처리·실패·중복을 분리'],['처리 이후','잔여 예외·재문의·재발과 계정 상태별 활동을 함께 확인']],[35*mm,139*mm])
add('모의 안내·CS 기준','h2');bullet('임시 공지: 확인한 현상과 조사 중인 범위를 구분하고, 다음 안내 시각은 책임자 승인 후 확정합니다.');bullet('환불 상태 문의: 접수·마켓 취소·실제 환급을 구분해 답합니다. 예상 완료일을 완료 사실로 설명하지 않습니다.');bullet('철회·복구 문의: 현행 한국 FAQ의 시점·예외 표현을 정책 담당자에게 확인하기 전 임의로 확약하지 않습니다.')
add('처리 성과와 신뢰 회복은 다릅니다','h2');table(['측정 영역','모집단·기간·해석'],[['환불 처리','유효 신청의 접수→마켓 취소 확인 시간, 미완료 잔량·대기 일수. 거래 단위 중복도 별도 확인'],['고객 문의','최초 답변 후 7일 관찰 가능한 문의의 동일 사유 재접수. 문의 감소만으로 만족을 확정하지 않음'],['계정 상태별 활동','전체 DAU와 고정 집단의 상태별 수·활동을 함께 보고한다. 제한 계정을 빼서 전체 감소를 숨기지 않는다']],[37*mm,137*mm])
note('고정 집단은01.14~01.27 접속 계정입니다. 접속 가능 활동률은 당일00시 접속 가능 집단을 분모로 하며, 당일 제한·해제·장애를 병기합니다. 자발적 잔존율이라는 뜻은 아닙니다. '+link('공지·FAQ·CS 실무 문서와 전체 지표','reports/idle-operations.html#appendix'))
note('공개 VOC9개는 기사 한 스레드의15개 중 포함한 댓글이며 동일 작성자 답글을 포함합니다. 전체 여론·이탈 원인은 아닙니다. 원본 코드·기준은 웹 부록에 보존했습니다.')
#8
new();title('LIMITS & SOURCES','근거가 닿는 범위까지만 판단했습니다')
for s in ['개인 구매·미구매 경험은 전체 이용자의 구매 동기나 이탈 원인을 대표하지 않습니다.','공식 조건과 문구 차이는 자료로 확인했지만 서버 판정·내부 지표·개선 효과는 검증하지 못했습니다.','공개 댓글은 쟁점 탐색 자료이며 전체 여론·피해 규모·실제 이탈률이 아닙니다.','과거 공지의 현행 페이지와 당시 정책은 다를 수 있습니다. 지역·개정 이력이 확인되지 않은 부분은 확정하지 않았습니다.','본 PDF의 제안과 KPI는 모의 의사결정·측정 계획입니다. 실제 회사 성과나 실무 경력이 아닙니다.']:bullet(s)
add('주요 원문과 전체 보고서','h2')
for label,url in [
 ('A 공식 상품 조건 · 2026.06.18','https://maplestory.nexon.com/News/Update/805'),
 ('A 역사적 시스템 자료 · 2024.12.19','https://maplestory.nexon.com/News/Update/762'),
 ('B 공식 이벤트 · 본문·유의사항','https://events.fconline.nexon.com/260910/NewAndReturn'),
 ('B 공식 보상 상세','https://events.fconline.nexon.com/260910/s/NewAndReturnRewards'),
 ('C 한국 환불 FAQ · 03.17 추가 현행본','https://forum.nexon.com/maplestoryidle-kr/board_view?board=6730&amp;thread=3366312'),
 ('C 후속 실적 서한 · 2026.05.14 p.9','https://pdf.irpocket.com/C3659/WUpy/ecSw/IVuJ.pdf')]:add(link(label,url),'small')
add(link('A 전체 보고서','reports/genesis-pass.html')+' · '+link('B 전체 보고서','reports/fc-live-event.html')+' · '+link('C 전체 보고서','reports/idle-operations.html'),'small')
gap(5);add('최영빈 · 게임 사업 PM / 라이브서비스 / 운영','h2');add('<link href="mailto:cyb050602@gmail.com" color="#315f73">cyb050602@gmail.com</link>');add(link('포트폴리오 웹사이트',web));note('경영학과 1학년 과정 이수 · 2학년 휴학 중. 게임 지표와 산업 구조를 공부하며 신입 직무를 준비하고 있습니다.');note('개인 경험은 본인 진술입니다. 공개자료 조사·분석 초안·문서 편집·웹 구현은 AI가 보조했습니다. 지원자의 모든 판단·설명이 검증 완료됐다는 의미가 아닙니다.')
def footer(c,doc):
 c.setStrokeColor(line);c.line(18*mm,16*mm,192*mm,16*mm);c.setFont('MG',7);c.setFillColor(muted);c.drawString(18*mm,11*mm,'최영빈 · 게임 사업 / 라이브서비스 / 운영 | 공개자료·개인 경험·모의 제안');c.drawRightString(192*mm,11*mm,f'{doc.page}  /  편집 2026.10.28')
doc=SimpleDocTemplate(str(out),pagesize=(210*mm,297*mm),leftMargin=18*mm,rightMargin=18*mm,topMargin=18*mm,bottomMargin=22*mm,title='최영빈 | 게임 사업·라이브서비스·운영 포트폴리오',author='최영빈')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
shutil.copyfile(out,root/'dist/reports/youngbin-game-pm-portfolio.pdf')
print(out)
