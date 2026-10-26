"""Idempotent final editorial pass; run after legacy report generators.

Updates their Markdown inputs and current rendered outputs without rebuilding the
older layouts. Unrelated working-tree changes are recorded, never staged here.
"""
from pathlib import Path
import subprocess, hashlib, json, shutil, re, html

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/domain-review-20261026'
OUT.mkdir(parents=True,exist_ok=True)
BASE=OUT/'baseline.json'
if not BASE.exists():
    status=subprocess.check_output(['git','status','--porcelain','-uall'],cwd=ROOT).decode('utf-8')
    tracked=subprocess.check_output(['git','ls-files'],cwd=ROOT).decode('utf-8').splitlines()
    hashes={p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in tracked if (ROOT/p).is_file()}
    BASE.write_text(json.dumps({'status':status,'trackedHashes':hashes},ensure_ascii=False,indent=2),encoding='utf-8')

common=[
 ('후속 보스 수행 가능성 확인','솔로·파티의 후속 보스 수행 가능성 확인'),
 ('블랙 큐브 10개','대적자의 블랙 큐브 10개'),
 ('화이트 에디셔널 큐브 10개','대적자의 화이트 에디셔널 큐브 10개'),
 ('공식 영문 FAQ는 신청 완료 즉시 해당 게임 계정 이용 제한을 설명한다.','공식 한국 FAQ는 신청 완료 즉시 해당 게임 계정 이용 제한을 설명한다.'),
 ('공식 영문 FAQ는 환불 신청 완료 즉시 이 게임 계정 이용 제한을 안내합니다.','공식 한국 FAQ는 환불 신청 완료 즉시 이 게임 계정 이용 제한을 안내합니다.'),
 ('영문 FAQ는 환불 신청 완료 즉시 해당 게임 계정 이용 제한을 안내합니다.','한국 FAQ는 환불 신청 완료 즉시 해당 게임 계정 이용 제한을 안내합니다.'),
 ('S3의 현행 영문 FAQ','S3의 현행 한국 FAQ'),
 ('현행 영문 FAQ의 시점·예외 표현','현행 한국 FAQ의 시점·예외 표현'),
 ('공식 공지·영문 FAQ·실적 서한','한국 공식 공지·FAQ·실적 서한'),
 ('실제 사건: 유료 기능의 안내·적용 오류와 고지 문제 이후 전액 환불 신청 절차가 운영됐다.','실제 사건: 어빌리티 최대값 미등장·무고지 수정과 스킬 액션 프레임에 따른 공격속도 반영 문제가 있었고, 이후 전액 환불 신청 절차가 운영됐다.'),
 ('출시 후 유료 기능의 명시 값 적용 오류와 고지 없는 수정이 있었다는 회사 설명','어빌리티 최대값 미등장과 고지 없는 수정이 있었다는 회사 설명'),
 ('오류 버전·기간·거래·수정 및 고지 이력 확보. 최초 개발 인지일은 이 자료로 확정 불가','담당 부서는 2025.12.02 발견·무고지 수정했다고 01.26 설명(S7). 개발사 최초 인지·전체 보고 이력은 미확보'),
 ('공식 자료 재열람: 2026.10.25.','공식 자료 재열람: 2026.10.26.'),
 ('퀵스쿼드는 이용권 보유 계정에만 사용법 표시','이 이벤트의 1억 퀵스쿼드 이용권 보유 계정에만 해당 사용법 표시'),
 ('퀵스쿼드는 이용권 보유자에게만 안내한다.','이 이벤트의 1억 퀵스쿼드 이용권 보유자에게 해당 사용법만 안내한다.'),
 ('퀵스쿼드 안내는 해당 이용권을 보유한 경우에 제공되며','이 이벤트의 1억 퀵스쿼드 안내는 해당 이용권을 보유한 경우에 제공되며'),
 ('실제 경기 집계는 검증된 인정 규칙을 적용하며 시작·정상 완료·중도 종료를 분리 기록한다.','경기 집계는 검증된 이벤트 인정 규칙을 적용한다. 플랫폼·모드·직접 조작/AI 감독 방식을 나누고 시작·정상 완료·중도 종료를 기록한다. 감독모드도 유효한 서비스 이용이며, 인정 경기 완료를 직접 조작 참여로 해석하지 않는다. 이 회차의 감독모드 인정 여부는 미확인이다.'),
 ('공식 영문 신청 개시 공지, 최초 게시 2026.02.05, 현재 종료 제목 포함. 대상·기간·신청 선택·계정 제한 안내. https://forum.nexon.com/maplestoryidle/board_view?board=6653&thread=3368869','공식 한국 신청 개시 공지, 최초 게시 2026.02.05, 현행 종료 제목 포함. 대상·기간·계정 제한의 국내 근거. https://forum.nexon.com/maplestoryidle-kr/board_view?board=6633&thread=3368332'),
 ('공식 영문 환불 FAQ, 최초 게시 2026.02.03, 본문에 02.09 기준 표기와 종료 후 문구 공존. 10.24 현재 DOM 원문 열람; 완전한 수정 이력은 미확보. https://forum.nexon.com/maplestoryidle/board_view?board=6679&thread=3366800','공식 한국 환불 FAQ, 최초 게시 2026.02.03, 03.17 추가 표시 현행본문을 10.26 재확인. 한국(스카니아) 기준이며 전체 수정 이력은 미확보. https://forum.nexon.com/maplestoryidle-kr/board_view?board=6730&thread=3366312'),
]
# Exact rewrites are applied to editable source fragments as well as current HTML.
files=list((ROOT/'research/rebuild-20261024').glob('*.mjs'))+list((ROOT/'research/rebuild-20261024').glob('PROJECT_*.md'))
files+=list((ROOT/'dist/reports').glob('*analysis.md'))+[ROOT/'dist/reports'/f'{s}{tail}.html' for s in ['genesis-pass','fc-live-event','idle-operations'] for tail in ['', '-summary']]
files+=[ROOT/'research/rebuild-20261024/build-submission-pdf.py']
changed=[]
for p in files:
    old=p.read_text(encoding='utf-8-sig');new=old
    for a,b in common:
        # Avoid duplicate prefixes when the pass is rerun.
        if b in new and a in b:
            new=new.replace(b,'\uFFF0'+str(common.index((a,b)))+'\uFFF1')
            new=new.replace(a,b).replace('\uFFF0'+str(common.index((a,b)))+'\uFFF1',b)
        else:new=new.replace(a,b)
    new=new.replace('대적자의 대적자의 ','대적자의 ')
    if new!=old:
        backup=ROOT/'backups/domain-review-20261026'/p.relative_to(ROOT)
        if not backup.exists():backup.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,backup)
        p.write_text(new,encoding='utf-8');changed.append(str(p.relative_to(ROOT)))
(OUT/'editorial-files.json').write_text(json.dumps(changed,ensure_ascii=False,indent=2),encoding='utf-8')
print('Editorial replacements:',len(changed))
