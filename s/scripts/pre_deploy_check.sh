#!/usr/bin/env bash
# GitHub Pages 배포 전 정적 교재 보안 스캔
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

FAIL=0
WARN=0

fail() { echo -e "${RED}FAIL${NC} $1"; FAIL=$((FAIL + 1)); }
warn() { echo -e "${YELLOW}WARN${NC} $1"; WARN=$((WARN + 1)); }
ok()   { echo -e "${GREEN} OK ${NC} $1"; }

echo "=== tutorial-web 배포 전 보안 점검 ==="
echo "ROOT: $ROOT"
echo

# 1) 금지 파일 존재
FORBIDDEN_NAMES=(
  "kakao_keys.paste"
  ".env"
  ".env.local"
)
for name in "${FORBIDDEN_NAMES[@]}"; do
  if find "$ROOT" -name "$name" -not -path "*/.git/*" 2>/dev/null | grep -q .; then
    fail "금지 파일 발견: $name"
  else
    ok "금지 파일 없음: $name"
  fi
done

if [[ -f "$ROOT/../web/js/config.js" ]]; then
  warn "상위 프로젝트에 web/js/config.js 존재 — tutorial-web repo에 포함되지 않았는지 확인"
else
  ok "tutorial-web 내 config.js 없음"
fi

# 2) 민감 패턴 (study + 루트 js)
SCAN_DIRS=("$ROOT" "$ROOT/study")
PATTERNS=(
  'AKIA[0-9A-Z]{16}'
  'ghp_[a-zA-Z0-9]{20,}'
  'gho_[a-zA-Z0-9]{20,}'
  'sk-[a-zA-Z0-9]{20,}'
  'BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY'
  'kakao.*key.*=.*["\x27][a-zA-Z0-9]{16,}'
  'REST_API_KEY["\x27\s:=]+[a-zA-Z0-9]{16,}'
)

for dir in "${SCAN_DIRS[@]}"; do
  for pat in "${PATTERNS[@]}"; do
    if rg -l "$pat" "$dir" -g '!*.png' -g '!*.jpg' -g '!pre_deploy_check.sh' 2>/dev/null | grep -q .; then
      fail "민감 패턴 발견 ($pat):"
      rg -n "$pat" "$dir" -g '!*.png' -g '!*.jpg' 2>/dev/null | head -5
    fi
  done
done
[[ "$FAIL" -eq 0 ]] && ok "알려진 비밀 패턴 없음"

# 3) CSP·base-path
if grep -q 'Content-Security-Policy' "$ROOT/study/index.html" 2>/dev/null; then
  ok "study/index.html CSP meta 존재"
else
  warn "study/index.html에 CSP meta 없음"
fi

if [[ -f "$ROOT/study/js/base-path.js" ]] && ! grep -q '<script>' "$ROOT/study/index.html" 2>/dev/null | head -1; then
  if grep -q '<script>' "$ROOT/study/index.html" && grep -q 'base-path' "$ROOT/study/index.html"; then
    ok "base-path.js 외부 로드"
  elif grep -q 'base-path.js' "$ROOT/study/index.html"; then
    ok "base-path.js 외부 로드"
  fi
else
  if grep -q 'base-path.js' "$ROOT/study/index.html"; then
    ok "base-path.js 외부 로드"
  else
    warn "base-path.js 미사용 — 인라인 스크립트 CSP 충돌 가능"
  fi
fi

# 4) .nojekyll
if [[ -f "$ROOT/.nojekyll" ]]; then
  ok ".nojekyll 존재"
else
  warn ".nojekyll 없음 — GitHub Pages Jekyll 처리 가능"
fi

# 5) 외부 링크 noopener
if grep -r 'target="_blank"' "$ROOT/study" --include='*.html' --include='*.js' 2>/dev/null | grep -v 'noopener' | grep -q .; then
  warn 'target="_blank" 중 rel="noopener" 누락 가능'
else
  ok '외부 링크 rel 검사 통과 (또는 없음)'
fi

# 6) 개인 경로 (경고만)
if rg -l 'bagjin-yong|/Users/bagjin' "$ROOT/study/js" -g 'chapters-expanded-*.js' 2>/dev/null | grep -q .; then
  warn "본문에 개인 사용자 경로 포함 — 공개 시 플레이스홀더 치환 검토"
fi

echo
echo "=== 결과 ==="
echo "FAIL: $FAIL  WARN: $WARN"
if [[ "$FAIL" -gt 0 ]]; then
  echo -e "${RED}배포 중단 — FAIL 항목을 수정하세요.${NC}"
  exit 1
fi
if [[ "$WARN" -gt 0 ]]; then
  echo -e "${YELLOW}WARN 확인 후 배포하세요.${NC}"
fi
echo -e "${GREEN}배포 가능 (정적 스캔 통과)${NC}"
exit 0