from pathlib import Path
import subprocess,json
from pypdf import PdfReader
from PIL import Image,ImageDraw
import pdfplumber
R=Path.cwd();O=R/'outputs/domain-review-20261026';O.mkdir(exist_ok=True)
pop='C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/Library/bin/pdftoppm.exe'
results=[]
paths=[R/'dist/reports'/f'{s}.pdf' for s in ['genesis-pass','fc-live-event','idle-operations','youngbin-game-pm-portfolio']]+list(O.glob('*-summary.pdf'))
for p in paths:
 r=PdfReader(p);info={'file':p.name,'pages':len(r.pages),'links':sum(len(x.get('/Annots',[])) for x in r.pages),'outOfPage':[]}
 with pdfplumber.open(p) as doc:
  for i,pg in enumerate(doc.pages):
   bad=[x['text'] for x in pg.chars if x['x0']< -1 or x['x1']>pg.width+1 or x['top']< -1 or x['bottom']>pg.height+1]
   if bad:info['outOfPage'].append({'page':i+1,'chars':bad})
 text='\n'.join(x.extract_text() or '' for x in r.pages)
 (O/(p.stem+'-text.txt')).write_text(text,encoding='utf8')
 if p.stem=='youngbin-game-pm-portfolio':
  subprocess.run([pop,'-scale-to','700','-png',str(p),str(O/'combined')],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  ims=sorted(O.glob('combined-*.png'));sheet=Image.new('RGB',(1000,720*((len(ims)+1)//2)),'#ddd')
  for i,f in enumerate(ims):im=Image.open(f);im.thumbnail((495,700));sheet.paste(im,((i%2)*500,(i//2)*720))
  sheet.save(O/'combined-all.png')
 elif p.stem=='idle-operations':
  target=next((i+1 for i,pg in enumerate(r.pages) if '월별 매출' in (pg.extract_text() or '')),1)
  subprocess.run([pop,'-f',str(target),'-l',str(target+1),'-scale-to','1100','-png',str(p),str(O/'c-pdf')],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 elif p.stem.endswith('-summary'):
  subprocess.run([pop,'-scale-to','900','-png',str(p),str(O/p.stem)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 results.append(info)
(O/'pdf-check.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(results,ensure_ascii=False))
