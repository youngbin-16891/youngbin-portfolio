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
for name,size,leading,bold in [('body',9.7,15.5,False),('small',8,12,False),('h1',23,33,True),('h2',15,23,True),('h3',11,17,True),('cover',34,47,True),('kicker',8.5,14,True)]:
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
add(link('포트폴리오 웹사이트',web));add('cyb050602@gmail.com');note('자료 기준 2026.10.24 · 분석 대상은 각 보고서에 명시된 과거 시즌·사건입니다.')
#2
new();title('OVERVIEW','세 프로젝트, 서로 다른 업무 질문')
table(['역할','확보한 근거','판단과 실제 작성 문서'],[
 ['A · 상품 가치','2026년 공식 상품 조건<br/>기본 패스 사용 화면·미구매 진술','기본 구매와 PLUS 추가 구매를 나눠 분석.<br/>상품 비교표·구매 흐름·조건부 의사결정·측정 정의'],
 ['B · 행동 전환','FC KICK-OFF 공식 본문·유의사항·보상 상세','보상 수령을 경기 완료로 집계하지 않음.<br/>행동 흐름·모의 안내·운영 일정·지급 예외·측정 계획'],
 ['C · 이슈 대응','공식 공지·영문 FAQ·실적 서한<br/>공개 댓글 15개 검토, 9개 포함','제한 상태와 활동을 연결해 해석.<br/>타임라인·VOC·모의 공지·FAQ·CS 기준·사후 점검']],[30*mm,64*mm,80*mm])
gap(5);add('근거는 다섯 종류로 나눴습니다','h2')
for a,b in [('공식 사실','해당 시점의 상품·이벤트·정책 원문에서 확인한 내용'),('개인 경험','지원자가 제공한 기록과 회상. 정확한 실측과 구분'),('계산','공식 입력값이나 기존 분류표를 이용한 산술'),('가설·모의 제안','아직 시행하거나 효과를 관측하지 않은 개선안'),('확인 필요','내부 지표, 실제 서버 판정, 전체 유저 원인과 인과 효과')]:bullet('<b>'+a+'</b> · '+b)
gap(6);add('읽는 순서','h2');add('A는 구매 가치, B는 참여 행동, C는 정책과 운영 판단을 보여줍니다. 상세 보상표·운영 공지·CS 처리표·로그 정의는 웹 보고서 부록에 보존했습니다. 이 PDF에는 판단에 필요한 근거와 제안만 남겼습니다.')
#3
new();title('A · 게임 사업 PM','기본 패스는 구매했지만,<br/>PLUS는 구매하지 않은 이유')
images=Table([[pic(Path('dist/assets/maplestory/genesis-pass-user-guide.png'),68*mm),pic(Path('dist/assets/maplestory/genesis-plus-user-screen.png'),78*mm)]],colWidths=[87*mm,87*mm]);images.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'MIDDLE'),('ALIGN',(0,0),(-1,-1),'CENTER')]));story.append(images);note('지원자 제공 상품 화면 · 공식 조건 대조: 2026.06.18 업데이트. 이미지는 구매 이력 자체의 증빙이 아닙니다.')
table(['구분','기본 제네시스 패스','PLUS 프리미엄 티켓'],[
 ['가격','30,000 넥슨캐시','별도 30,000 넥슨캐시'],
 ['자격','255레벨 이상·지정 퀘스트 상태 충족','기본 구매 도전 캐릭터의 해방 완료'],
 ['주요 가치','보스 처치 어둠의 흔적 3배·지정 도전 지원','보스 미션 수행 시 프리미엄 추가 보상'],
 ['본인 판단','해방 시간을 줄이기 위해 구매','보스 수행 부담·큐브 결과 불확실성으로 미구매']],[25*mm,74.5*mm,74.5*mm])
add('기본 구매의 목적과 후속 구매의 조건은 다릅니다.','h3');add('지원자는 6월 20일 기본 패스 사용 기록을 제공했고, 7월 말쯤 해방했다고 회상했습니다. 추가 코인으로 큐브를 쓰더라도 원하는 옵션이 나오지 않을 수 있다는 판단은 개인 사례이며 전체 구매자의 동기로 일반화하지 않았습니다.')
note('PLUS 일반 미션 참여에는 별도 프리미엄 티켓이 필요하지 않습니다. 유료 추가 보상은 티켓 활성화와 미션 달성이 모두 필요합니다. '+link('상품·경험 상세','reports/genesis-pass.html#experience'))
#4
new();title('A · 수치와 판단','재화 3배와 완료 기간은 다릅니다')
add('같은 보스를 처치해 얻는 재화의 배수이지, 누구나 해방 기간이 1/3이 된다는 뜻은 아닙니다. 처치 가능한 보스·진행 단계·시작 시점에 따라 활용 가치가 달라집니다.')
table(['계산','결과','해석 범위'],[['기본 획득량 × 3','총 300%, 추가 +200%','기간·실제 전투력이 3배 달라진다는 의미 아님'],['2,500 + 1,500 × 5','프리미엄 추가 10,000코인','6개 미션 전부 수행 시 최대. 일반 보상 500코인 별도']],[57*mm,43*mm,74*mm])
add('가격을 바꾸기 전에 활용 여부를 확인','h2');add('미완료·조건 오인이 많다는 자료가 없어 할인이나 보상 확대를 먼저 제안하지 않았습니다. 조건 문의와 진행 상태를 확인하고 오인이 입증될 때만 구매 전 요약 안내를 시험합니다.')
table(['모의 신호','먼저 확인할 것','검토할 대응'],[['기본 구매율 낮음','노출·조건 이해·보스 수행·남은 기회','조건 오인이 있으면 안내 시험. 비율만으로 할인하지 않음'],['완료율 낮음','구매 시점·시작 단계·패스 적용·처치 이력','후반 구매와 오류를 구분하고 원인별 조치'],['PLUS 구매율 낮음','자격 발생 시점·보스 수행·보상 활용','활용 제약이 있으면 조건 설명. 무조건 추가 결제 유도하지 않음']],[35*mm,66*mm,73*mm])
add('핵심 지표 · 실제 결과가 아닌 측정 계획','h2');table(['지표','분자 / 분모 · 관찰 기준'],[
 ['기본 구매율','구매 명의 / 판매 기간 중 미구매 상태에서 구매 자격이 발생한 명의. 자격 진입 주차별 구분'],
 ['구매자 해방 완료율','09.16 23:59까지 적용 캐릭터가 해방한 구매 명의 / 전체 기본 구매 명의. 구매 주차별 구분'],
 ['PLUS 구매율','티켓 구매 명의 / 09.16 23:50 마감 전 티켓 자격을 얻은 명의. 자격 발생 시점별 구분']],[41*mm,133*mm])
note('기본 판매 2026.06.18~09.15 23:59, 효과 09.16 23:59까지. 명의·계정·캐릭터를 혼용하지 않습니다. 2024년 지급표 기반 사례는 현행 실측이 아니므로 이 제출 요약의 실측 계산에서 제외했습니다. '+link('공식 조건·전체 계산','reports/genesis-pass.html#appendix'))
#5
new();title('B · 라이브서비스 PM','보상을 받았다고 경기를 한 것은 아닙니다')
story.append(pic(Path('dist/reports/evidence/fc-event-opening-20261024.png'),95*mm));note('FC KICK-OFF 공식 화면 · 2026.10.24 열람. 기본 참여 2026.09.10~10.28, 연장 조건 충족 시 11.11까지.')
add('확인된 구조와 원문 차이','h2');add('5일 접속 보상은 총 2,500FC이며 경기 미션과 별도입니다. 본문은 하루 1판 플레이를, 유의사항은 누적 출석을 설명합니다. 문구 차이는 확인했지만 실제 서버 규칙의 오류나 유저 오인 발생을 입증한 것은 아닙니다.')
add('접속 → 보상 수령 → 경기 또는 종료<br/>현재 선수단 → 인정 경기 완료 → 경기 보상 수령','h3')
add('작은 안내 개선 · 미실행 제안','h2');add('규칙을 먼저 통일하고, 첫 보상 수령·경기 미완료 계정에 경기 준비 안내를 시험합니다. 양쪽 모두 올바른 규칙을 제공하며 추가 안내 유무만 비교합니다. 관심·시간·숙련·기술 문제가 더 큰 원인이면 안내 확대를 보류합니다.')
table(['판단할 지표','정의와 주의'],[['첫 경기 완료 전환율','배정 후 24시간 내 인정 경기 완료 계정 / 배정 계정 전체'],['반복·D7','168시간 내 서로 다른 2일 이상 경기; D7 당일 접속·경기를 각각 확인'],['비용·안전','관련 문의·비정상 경기·계정당 실제 지급 FC/BP/팩과 개발·QA·CS 비용 확인']],[43*mm,131*mm])
note('퀵스쿼드는 경기 미션 1일차 보상이므로 첫 경기 전에 모두 보유했다고 안내하지 않습니다. 2,500FC×가정 1,000계정=2,500,000FC는 총량 예시이며 순증 지급·실제 비용이 아닙니다. '+link('운영 일정·예외 처리·측정 정의','reports/fc-live-event.html'))
#6
new();title('C · 게임 운영','환불 이후의 미접속은<br/>모두 자발적 이탈일까요?')
add('공식 영문 FAQ는 환불 신청 완료 즉시 이 게임 계정 이용 제한을 안내합니다. 접속할 수 없는 계정을 자발적으로 떠난 이용자로 집계해서는 안 됩니다.')
table(['시점 · 모두 2026년','공식 자료에서 확인한 내용'],[['01.25','경영진 인지일 — 02.12 실적 서한에서 사후 설명'],['01.28','전액 환불 발표 — 신청·처리 세부는 후속 안내'],['02.05~02.15','신청 기간 — 마감 02.15 14:59 UTC = 23:59 KST'],['03.15','당시 처리 완료 예상 — 실제 전건 완료 증거가 아님']],[45*mm,129*mm])
add('활동을 보기 전에 계정 상태를 확인','h2');table(['계정 상태','미접속을 해석하는 방법'],[['환불·제재 등 이용 제한','정책상 접속 불가능 상태로 별도 집계'],['접속 가능','자발적 중단 가능성을 검토하되 성장·업데이트·사회적 요인 등 함께 확인']],[52*mm,122*mm])
add('공개 VOC · 전체 여론이 아닌 쟁점 탐색','h2');table(['포함 댓글의 유형','건수'],[['오류·고지·대응 불신','4'],['환불과 계정 제한 결합에 이의','1'],['시간·캐릭터·닉네임 연속성 우려','2'],['환불 대응 긍정','1'],['성장 회수 관점에서 제한 설명','1']],[143*mm,31*mm])
note('인벤 기사 313292의 한 스레드에서 15개 검토·9개 포함·6개 제외. 포함 댓글 게시일 02.02~02.06, 수집 10.24. 동일 작성자의 답글 포함, 이용자 9명이 아님. 건수는 기존 분류표 재집계이며 전체 이용자 비율·이탈 원인이 아닙니다. '+link('VOC 기록·수집 기준','reports/idle-operations.html#sources'))
#7
new();title('C · 모의 운영 대응','정책·답변·처리 상태를 먼저 맞춥니다')
add('피해 확인 → 공식 정책 확인 → 공지·FAQ·CS 통일 → 거래별 처리 점검 → 상태별 활동 관찰','h3');add('지원자가 과거 사건을 바탕으로 작성한 모의 절차입니다. 넥슨의 실제 내부 조직·업무 절차나 지원자의 수행 경력이 아닙니다.')
table(['시점','검토할 행동·승인 경계'],[['피해가 계속될 때','증거 보존·영향 확인 후 책임자에게 보호 조치 요청. 운영 단독 판매 중단·복구 약속 금지'],['신청 결정 전','계정 영향·대상·철회 예외를 정책 담당자에게 확인. 공지·FAQ·신청 화면·CS 답변 버전 통일'],['처리 중','거래 ID와 기환불액·마켓 취소 결과 대조. 미처리·실패·중복을 분리'],['처리 이후','잔여 예외·재문의·재발과 계정 상태별 활동을 함께 확인']],[35*mm,139*mm])
add('모의 안내·CS 기준','h2');bullet('임시 공지: 확인한 현상과 조사 중인 범위를 구분하고, 다음 안내 시각은 책임자 승인 후 확정합니다.');bullet('환불 상태 문의: 접수·마켓 취소·실제 환급을 구분해 답합니다. 예상 완료일을 완료 사실로 설명하지 않습니다.');bullet('철회·복구 문의: 현행 영문 FAQ의 시점·예외 표현을 정책 담당자에게 확인하기 전 임의로 확약하지 않습니다.')
add('처리 성과와 신뢰 회복은 다릅니다','h2');table(['측정 영역','모집단·기간·해석'],[['환불 처리','유효 신청의 접수→마켓 취소 확인 시간, 미완료 잔량·대기 일수. 거래 단위 중복도 별도 확인'],['고객 문의','최초 답변 후 7일 관찰 가능한 문의의 동일 사유 재접수. 문의 감소만으로 만족을 확정하지 않음'],['계정 상태별 활동','사건 전후 지역·날짜·제한 상태를 나눠 계정 수와 접속 수를 함께 표시. 단순 전후 차이로 인과 추정하지 않음']],[37*mm,137*mm])
note(link('공지·FAQ·CS 실무 문서와 전체 지표','reports/idle-operations.html#appendix'))
#8
new();title('LIMITS & SOURCES','근거가 닿는 범위까지만 판단했습니다')
for s in ['개인 구매·미구매 경험은 전체 이용자의 구매 동기나 이탈 원인을 대표하지 않습니다.','공식 조건과 문구 차이는 자료로 확인했지만 서버 판정·내부 지표·개선 효과는 검증하지 못했습니다.','공개 댓글은 쟁점 탐색 자료이며 전체 여론·피해 규모·실제 이탈률이 아닙니다.','과거 공지의 현행 페이지와 당시 정책은 다를 수 있습니다. 지역·개정 이력이 확인되지 않은 부분은 확정하지 않았습니다.','본 PDF의 제안과 KPI는 모의 의사결정·측정 계획입니다. 실제 회사 성과나 실무 경력이 아닙니다.']:bullet(s)
add('주요 원문과 전체 보고서','h2')
for label,url in [
 ('A 공식 상품 조건 · 2026.06.18','https://maplestory.nexon.com/News/Update/805'),
 ('A 역사적 시스템 자료 · 2024.12.19','https://maplestory.nexon.com/News/Update/762'),
 ('B 공식 이벤트 · 본문·유의사항','https://events.fconline.nexon.com/260910/NewAndReturn'),
 ('B 공식 보상 상세','https://events.fconline.nexon.com/260910/s/NewAndReturnRewards'),
 ('C 공식 환불 FAQ · 영문','https://forum.nexon.com/maplestoryidle/board_view?board=6679&amp;thread=3366800'),
 ('C 실적 서한 · 2026.02.12 p.4','https://pdf.irpocket.com/C3659/YpwX/MxJ9/mdUR.pdf')]:add(link(label,url),'small')
add(link('A 전체 보고서','reports/genesis-pass.html')+' · '+link('B 전체 보고서','reports/fc-live-event.html')+' · '+link('C 전체 보고서','reports/idle-operations.html'),'small')
gap(5);add('최영빈 · 게임 사업 PM / 라이브서비스 / 운영','h2');add('<link href="mailto:cyb050602@gmail.com" color="#315f73">cyb050602@gmail.com</link>');add(link('포트폴리오 웹사이트',web));note('경영학과 1학년 과정 이수 · 2학년 휴학 중. 게임 지표와 산업 구조를 공부하며 신입 직무를 준비하고 있습니다.');note('개인 경험은 본인 진술입니다. 공개자료 조사·분석 초안·문서 편집·웹 구현은 AI가 보조했습니다. 지원자의 모든 판단·설명이 검증 완료됐다는 의미가 아닙니다.')
def footer(c,doc):
 c.setStrokeColor(line);c.line(18*mm,16*mm,192*mm,16*mm);c.setFont('MG',7);c.setFillColor(muted);c.drawString(18*mm,11*mm,'최영빈 · 게임 사업 / 라이브서비스 / 운영 | 공개자료·개인 경험·모의 제안');c.drawRightString(192*mm,11*mm,f'{doc.page}  /  2026.10.24')
doc=SimpleDocTemplate(str(out),pagesize=(210*mm,297*mm),leftMargin=18*mm,rightMargin=18*mm,topMargin=18*mm,bottomMargin=22*mm,title='최영빈 | 게임 사업·라이브서비스·운영 포트폴리오',author='최영빈')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
shutil.copyfile(out,root/'dist/reports/youngbin-game-pm-portfolio.pdf')
print(out)
