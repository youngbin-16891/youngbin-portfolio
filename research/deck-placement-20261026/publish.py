from pathlib import Path
import json,html,re
from reportlab.pdfgen import canvas
from PIL import Image,ImageDraw
from zipfile import ZipFile
import xml.etree.ElementTree as ET
R=Path.cwd();D=R/'dist/reports';imgs=D/'evidence/idle-growth-study'
pdf=D/'idle-growth-study.pdf';c=canvas.Canvas(str(pdf),pagesize=(960,540));c.setTitle('메이플 키우기 — 성장 지원 게임 분석');c.setAuthor('최영빈')
z=ZipFile('C:/Users/User/Desktop/메이플키우기_게임분석서_시스템검증_제출본.pptx')
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main','p':'http://schemas.openxmlformats.org/presentationml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
sz=ET.fromstring(z.read('ppt/presentation.xml')).find('p:sldSz',ns);sx=960/int(sz.get('cx'));sy=540/int(sz.get('cy'))
for i in range(1,14):
 c.drawImage(str(imgs/f'slide-{i:02}.png'),0,0,width=960,height=540)
 relfile=f'ppt/slides/_rels/slide{i}.xml.rels'
 rels={r.get('Id'):r.get('Target') for r in ET.fromstring(z.read(relfile))} if relfile in z.namelist() else {}
 for shape in ET.fromstring(z.read(f'ppt/slides/slide{i}.xml')).findall('.//p:sp',ns):
  x=shape.find('.//a:xfrm',ns)
  if x is None:continue
  off=x.find('a:off',ns);ext=x.find('a:ext',ns)
  if off is None or ext is None:continue
  for link in shape.findall('.//a:hlinkClick',ns):
   url=rels.get(link.get('{'+ns['r']+'}id'),'')
   if not url.startswith('https://') or 'vimeo.com' in url:continue
   left=int(off.get('x'))*sx;top=int(off.get('y'))*sy;w=int(ext.get('cx'))*sx;h=int(ext.get('cy'))*sy
   c.linkURL(url,(left,540-top-h,left+w,540-top),relative=0,thickness=0)
 c.showPage()
c.save()
# Preserve the original source; publish narrowly corrected derivatives, never notes.
data=[{'text':[t.text for t in ET.fromstring(z.read(f'ppt/slides/slide{i}.xml')).findall('.//a:t',ns) if t.text]} for i in range(1,14)]
for correction in json.loads((R/'research/final-audit-20261028/slide-corrections.json').read_text(encoding='utf8')):
 data[correction['slide']-1]['text']=[t.replace(correction['from'],correction['to']) for t in data[correction['slide']-1]['text']]
titles=['표지','게임 소개와 개인 플레이 경험','월별 매출 변화','플레이 루프','성장 구조','개인 재육성 경험','외부 반응과 해석 범위','기존 성장 지원 조건','참여 대상 변경 제안','모의 화면과 운영 조건','검증 계획','게임 시스템 부록','참고 자료']
figures=''.join(f'<figure id="slide-{i}" class="slide"><a href="evidence/idle-growth-study/slide-{i:02}.png" target="_blank" rel="noopener" aria-label="{i}장 원본 크기로 보기"><img src="evidence/idle-growth-study/slide-{i:02}.png" alt="{i}장 {titles[i-1]}" loading="'+('eager' if i==1 else 'lazy')+'" width="1280" height="720"></a><figcaption>'+f'{i:02} / 13 · {titles[i-1]} · 이미지를 누르면 원본 크기로 열립니다.</figcaption><details><summary>슬라이드 텍스트 보기</summary><p>'+html.escape(' · '.join(data[i-1]['text']))+'</p></details></figure>' for i in range(1,14))
page='''<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>메이플 키우기 성장 지원 게임 분석 | 최영빈</title><link rel="stylesheet" href="report.css"><link rel="stylesheet" href="report-family.css"><style>.growth-intro{margin:36px 0}.growth-intro h1{font-size:clamp(26px,4vw,38px);line-height:1.45}.growth-intro p{max-width:760px}.deck-nav{display:flex;flex-wrap:wrap;gap:8px 18px;border-block:1px solid var(--line);padding:14px 0;font-size:14px}.deck-nav a,.family-topbar a{min-height:44px;display:inline-flex;align-items:center}.slide{margin:40px 0;scroll-margin-top:16px}.slide img{width:100%;height:auto;display:block;background:white;border:1px solid var(--line)}.slide figcaption{font-size:13px;color:var(--muted);margin:10px 0}.slide details{font-size:14px}.slide details p{line-height:1.8}.family-topbar{flex-wrap:wrap}.family-topbar>div{flex-wrap:wrap;gap:8px 20px}.growth-note{font-size:13px;color:var(--muted)}@media print{.growth-intro,.deck-nav,.slide figcaption,.slide details,.family-topbar,footer{display:none}.slide{margin:0;break-after:page}.slide img{border:0}main{max-width:none;width:100%}}</style></head><body><a class="skip-link" href="#main">본문 바로가기</a><header class="report-header"><nav class="family-topbar" aria-label="분석서 탐색"><a href="../#project-title-3">← 포트폴리오</a><div><a href="idle-operations.html">운영 대응 보고서</a><a href="idle-growth-study.pdf" download>PDF 내려받기 · 13p</a></div></nav></header><main id="main"><section class="growth-intro"><p class="eyebrow">메이플 키우기 · 별도 게임 분석 · 13페이지</p><h1>재시작의 성장 부담을<br>기존 지원으로 줄일 수 있을까?</h1><p>개인 재육성 경험과 공식 성장 이벤트의 참여 조건을 비교했습니다. 생성일 대신 현재 성장 구간으로 참여 대상을 넓히는 모의 운영안과 검증 계획을 담았습니다.</p><p class="growth-note">기존 C의 환불·CS 대응과 다른 질문을 다룬 추가 분석서입니다. 개인 경험은 전체 이용자의 이탈 원인이 아니며, 제안은 미실행입니다. 원본 13장 구성을 보존하고, 6장의 이용 제한 설명은 철회·예외를 포함하도록 공식 FAQ에 맞춰 보완했습니다.</p></section><nav class="deck-nav" aria-label="핵심 슬라이드"><a href="#slide-4">플레이 루프</a><a href="#slide-6">개인 경험</a><a href="#slide-8">공식 조건</a><a href="#slide-9">운영 제안</a><a href="#slide-11">검증 계획</a><a href="#slide-13">참고 자료</a></nav>'''+figures+'''<section><h2>함께 보기</h2><p><a href="idle-operations.html">환불·공지·CS 운영 대응 보고서 ↗</a> · <a href="idle-operations.html#monthly-revenue">월별 매출·환불 재무 영향의 후속 확인 ↗</a></p><p class="growth-note">모바일에서는 이미지를 눌러 확대하거나 PDF로 열람할 수 있습니다. 슬라이드 텍스트도 각 장 아래에서 확인할 수 있습니다. 발표자 메모와 수업 자료 공유 주소는 공개본에 포함하지 않았습니다.</p></section></main><footer class="family-footer"><a href="../#projects">전체 프로젝트로 돌아가기</a></footer></body></html>'''
(D/'idle-growth-study.html').write_text(page,encoding='utf8')
# Native site colors, a visible thumbnail, and one focused entry point.
p=R/'dist/deliverables.js';s=p.read_text(encoding='utf8');marker=' <div class="report-entry-links"><a class="button secondary" href="${d.href}">보고서 보기 ↗</a><a class="text-link" href="${d.href.replace(\'.html\',\'-summary.html\')}">1페이지 요약 ↗</a></div>'
extra='''
 ${i===2?`<aside class="supplementary-work" aria-label="메이플 키우기 추가 게임 분석"><a class="supplementary-preview" href="reports/idle-growth-study.html"><img src="reports/evidence/idle-growth-study/slide-09.png" alt="성장 지원의 기존 조건과 모의 제안을 비교한 실제 슬라이드" loading="lazy" width="1280" height="720"></a><div><p class="supplementary-label">추가 결과물 · 게임 구조·성장 지원</p><a class="supplementary-title" href="reports/idle-growth-study.html">성장 지원 게임 분석 · 13p ↗</a><p>개인 재육성 경험과 공식 이벤트 조건을 비교하고, 참여 대상 변경안·화면 예시·검증 계획을 작성했습니다.</p></div></aside>`:''}
'''
if 'class="supplementary-work"' not in s:
 assert marker in s;s=s.replace(marker,marker+extra)
p.write_text(s,encoding='utf8')
p=R/'dist/deliverables.css';s=p.read_text(encoding='utf8')
if '/* Growth analysis supplement */' not in s:s+='''
/* Growth analysis supplement */
#projects .supplementary-work{display:grid;grid-template-columns:156px minmax(0,1fr);gap:18px;align-items:center;margin-top:22px;padding-top:20px;border-top:1px solid var(--line)}#projects .supplementary-preview img{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:4px}#projects .supplementary-label{font-size:11px;color:var(--muted);margin:0 0 4px}#projects .supplementary-title{display:inline-flex;align-items:center;min-height:44px;font-size:17px;font-weight:700;color:var(--accent)}#projects .supplementary-work div>p:last-child{font-size:13px;line-height:1.7;margin:6px 0 0;color:var(--muted)}@media(max-width:560px){#projects .supplementary-work{grid-template-columns:1fr;gap:12px}#projects .supplementary-preview{max-width:280px}}
'''
p.write_text(s,encoding='utf8')
p=D/'idle-operations.html';s=p.read_text(encoding='utf8')
if 'id="growth-study"' not in s:s=s.replace('</main>','''<section id="growth-study" class="report-section"><h2>함께 작성한 게임 분석</h2><p><strong>재시작의 성장 부담을 기존 지원으로 줄일 수 있을까?</strong></p><p>개인 재육성 경험, 성장 구조, 공식 이벤트의 참여 조건을 연결한 별도 분석입니다. 참여 대상 변경 모의안·화면 예시·검증 계획을 13장에 정리했습니다.</p><a href="idle-growth-study.html"><img src="evidence/idle-growth-study/slide-09.png" alt="성장 지원 대상 변경 모의 제안" loading="lazy" style="display:block;width:100%;max-width:640px;height:auto;margin:20px 0"></a><p><a href="idle-growth-study.html">게임 분석서 웹으로 보기 ↗</a> · <a href="idle-growth-study.pdf" download>PDF 내려받기 · 13p</a></p><p class="figure-note">환불·CS 운영 대응과 구분되는 추가 결과물이며, 기존 이벤트의 목적이 잘못됐거나 제안 효과가 검증됐다는 뜻은 아닙니다.</p></section></main>''')
p.write_text(s,encoding='utf8')
print('Supplement published locally; original PPTX unchanged; 13-page PDF + web viewer.')
