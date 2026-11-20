from pathlib import Path
import re
from html.parser import HTMLParser
root=Path(__file__).resolve().parents[2]
dist=root/'dist'
def require(ok, message):
    if not ok: raise SystemExit(message)
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.links=[];self.feed(text)
    def handle_starttag(self,tag,attrs):
        if tag=='a': self.links.append(dict(attrs).get('href',''))
for p in dist.rglob('*.html'):
    require(not any('github.com/' in x.lower() for x in Page(p.read_text(encoding='utf-8')).links),f'GitHub link: {p}')
for name in ['genesis-pass.html','genesis-pass-summary.html','genesis-pass-detail-record.html','genesis-pass-analysis.md','idle-operations.html','idle-operations-summary.html','idle-operations-detail-record.html','idle-operations-analysis.md']:
    s=(dist/'reports'/name).read_text(encoding='utf-8')
    for bad in ['본인 진술','진술했다','지원자 제공 상품 이미지','현행본문','약67억엔']:
        require(bad not in s,f'{name}: prohibited wording {bad}')
s=(dist/'reports/index.html').read_text(encoding='utf-8')
require('audit.html' not in s and 'source-ledger.html' not in s,'Internal review link exposed')
sections=re.findall(r'<section>(.*?)</section>',s,re.S)
require(len(sections)==2,'Expected two report sections')
for section,name in zip(sections,['idle-operations','genesis-pass']):
    require(section.count(name+'-summary.html')==1,'Missing or repeated summary link')
    require(section.index(name+'-summary.html')>section.index('</h2>'),'Summary must follow report description')
    require(section.index(name+'-summary.html')>section.index('</p>'),'Summary must follow description paragraph')
require(s.count('-summary.html')==2,'Stray summary link')
s=(dist/'reports/idle-operations-detail-record.html').read_text(encoding='utf-8')
for text in ['경영진 인지','환불 발표','신청','당시 완료 예상']:
    require(text+'</strong><span> · ' in s,'Missing evidence separator: '+text)
require('class="voc-axis"' not in s,'Unreadable VOC axis restored')
require(s.count('class="voc-bar"')==5,'Preserve five VOC categories')
s=(dist/'content.js').read_text(encoding='utf-8')
require(re.search(r'"name":\s*"Seven Knights Re:BIRTH".*?"duration":\s*"약 4개월"',s,re.S),'Seven Knights duration mismatch')
require('플레이 주체는 본인 진술' not in s,'LoL wording restored')
for p in root.glob('*.md'): raise SystemExit('Internal root Markdown exposed: '+str(p))
require(not (root/'interview').exists() and not (root/'research').exists(),'Internal work folder exposed')
require((dist/'research/rebuild-20261024/voc-cases.csv').exists(),'Missing VOC CSV')
require((dist/'research/rebuild-20261024/voc-type-counts.csv').exists(),'Missing counts CSV')
require((dist/'research/rebuild-20261024/voc-collection-method.md').exists(),'Missing VOC method')

import json
model=json.loads((dist/'content.js').read_text(encoding='utf-8').split('window.PORTFOLIO =',1)[1].strip().rstrip(';'))
memos=model['serviceLenses']
texts=[m['observation'] for m in memos]
require(len(texts)==len(set(texts)), 'Duplicate personal play memo wording')
nikke=next(m for m in memos if m['game']=='승리의 여신: 니케')
require(nikke['interest']=='이벤트 · 일일 과제','Preserve NIKKE interests')
require(nikke['observation']=='특정 캐릭터를 확보하고 육성하는 것을 목표로 플레이하고 있습니다.','NIKKE goal wording mismatch')
maple=next(m for m in memos if m['game']=='MapleStory')
require(maple['observation']=='이벤트 참여와 일일 과제를 매일 하고 있습니다.','Preserve Maple play memo')
require(nikke['observation'] in (dist/'index.html').read_text(encoding='utf-8'),'Static NIKKE memo out of sync')
print('Portfolio feedback regression checks passed')
