"""Narrow, idempotent corrections after existing report generators."""
from pathlib import Path
import re

root=Path(__file__).resolve().parents[2]
old_label='E6 보존: 영문 최초 환불 발표·지역 비교용.'
new_label='E6 보존: 한국 최초 환불 발표 재확인·S6와 동일 자료.'
targets=['dist/reports/idle-operations.html','dist/reports/idle-operations-analysis.md','research/rebuild-20261024/PROJECT_C.md','research/rebuild-20261024/build-integrated.mjs']
for name in targets:
 p=root/name
 s=p.read_text(encoding='utf8').replace(old_label,new_label)
 def fix_e6(match):
  block=match.group(0).replace(new_label,'E6 보존: 영문 최초 환불 발표·지역 비교용.')
  return block.replace('https://forum.nexon.com/maplestoryidle-kr/board_view?board=6633&thread=3360480','https://forum.nexon.com/maplestoryidle/board_view?board=6653&thread=3360525').replace('https://forum.nexon.com/maplestoryidle-kr/board_view?board=6633&amp;thread=3360480','https://forum.nexon.com/maplestoryidle/board_view?board=6653&amp;thread=3360525')
 s=re.sub(r'<li>E6 보존:.*?</li>|(?m:^- E6 보존:.*$)',fix_e6,s)
 s=s.replace('환불 신청·제재·장애 등 별도 표시','환불 제한·기타 제재 확인')
 s=s.replace('업데이트·성장·사회적 요인 등 경쟁 설명','장애·업데이트·성장·사회적 요인 확인')
 p.write_text(s,encoding='utf8')
p=root/'dist/index.html';s=p.read_text(encoding='utf8')
s=s.replace('게임 사업 PM 1순위<br>라이브서비스·운영 2순위','게임 사업 PM · 라이브서비스')
s=s.replace('20261028evidence','20261028final')
p.write_text(s,encoding='utf8')
for name in ['dist/reports/idle-operations-summary.html','research/rebuild-20261024/build-summaries.mjs']:
 p=root/name;s=p.read_text(encoding='utf8').replace('개별 처리 원장은 미확보다.','개별 처리 원장은 확인하지 못했다.');p.write_text(s,encoding='utf8')
# Archived records remain archived; a third-party reference is not an official company source.
for name in ['dist/reports/audit.html','dist/reports/source-ledger.html']:
 p=root/name;s=p.read_text(encoding='utf8');s=re.sub(r'(<a\b[^>]*>)공식 자료(\s*↗)?(</a>)',r'\1원문 자료\2\3',s);p.write_text(s,encoding='utf8')
p=root/'dist/deliverables.js';s=p.read_text(encoding='utf8').replace("src:'reports/evidence/idle-account-state-preview.png'","src:'reports/evidence/idle-account-state-preview.png?v=20261028final'")
p.write_text(s,encoding='utf8')
print('Source identity, account-state diagram, pending role preference and archived link labels corrected.')
