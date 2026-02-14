# HANDOFF — SBD 3대 1RM 예측기

## Goal

파워리프팅 3대 운동(스쿼트/벤치프레스/데드리프트)의 **1RM 예측 웹앱**을 만든다.
- 1단계 MVP: 클라이언트 전용 계산기 (현재 완료)
- 2단계: Supabase Auth, DB 기록 저장, 성장 그래프, PWA 확장

요구사항 원본: `C:\repo\claude_code_tasks_3lift_1rm_mvp.md`

## Current Progress — 1단계 MVP 완료 ✅

### 프로젝트 구조
```
C:\repo\SBD\
├── app/
│   ├── layout.tsx         # 루트 레이아웃 (다크모드 기본, lang="ko")
│   ├── page.tsx           # 메인 페이지 ("use client", 폼+결과 조합)
│   └── globals.css        # Tailwind v4 테마 (커스텀 색상 변수)
├── components/
│   ├── InputForm.tsx      # 입력 폼 (체중 + 3종목 × 중량/반복)
│   ├── ResultCard.tsx     # 종목별 1RM 결과 카드 (Epley/Brzycki/평균)
│   └── SummaryCard.tsx    # 종합 결과 카드 (3대합계, Wilks, 등급)
├── utils/
│   ├── oneRm.ts           # 1RM 계산 (Epley/Brzycki/평균, 예외처리 포함)
│   ├── wilks.ts           # 남성 Wilks 점수 계산
│   └── level.ts           # 체중 대비 배수 등급 판정 (Beginner~Elite)
├── types/
│   └── index.ts           # FormData, LiftInput, LiftResult, CalculationResult
└── next.config.ts         # PWA TODO 주석 포함
```

### 기술 스택
- Next.js 16.1.6 (App Router) + TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"` 방식, `@theme inline`으로 커스텀 색상)
- npm 패키지 매니저
- 서버 로직 없음 (클라이언트 전용 계산)

### 구현 완료 항목
- [x] 다크모드 기본 적용 (레드 강조색 `--color-primary: #dc2626`)
- [x] Epley + Brzycki 공식 평균으로 1RM 계산
- [x] 예외 처리: reps=1→중량 그대로, reps≤0→에러, reps>30→UI 제한
- [x] Wilks 점수 (남성 계수 고정, 추후 성별 확장 가능 구조)
- [x] 등급 판정 (체중 대비 합계 배수: <3 Beginner, 3-5 Novice, 5-7 Intermediate, 7-9 Advanced, ≥9 Elite)
- [x] TODO 주석 6개 배치 (Auth, DB, API, 그래프, 랭킹, PWA)
- [x] `npm run build` 성공 확인

### TODO 주석 위치
| TODO | 파일 |
|------|------|
| Supabase Auth 로그인 추가 위치 | `app/layout.tsx` |
| Supabase DB 연동 위치 | `app/page.tsx` |
| 기록 저장 API 추가 위치 | `app/page.tsx` |
| 랭킹/챌린지 기능 추가 위치 | `app/page.tsx` |
| 성장 그래프(주간/월간) 추가 위치 | `components/ResultCard.tsx` |
| PWA 전환 위치 | `next.config.ts` |

## What Worked

- `npx create-next-app@latest sbd --yes` 플래그로 비대화형 프로젝트 생성 (Windows 환경에서 대화형 프롬프트 이슈 회피)
- 프로젝트명은 소문자 `sbd`로 생성 후 `SBD`로 rename (npm 명명 규칙 제한)
- Tailwind v4의 `@theme inline` 블록에 커스텀 색상 변수(`--color-primary`, `--color-card` 등) 정의하여 `bg-primary`, `bg-card` 등으로 바로 사용
- 폼 입력값을 `string` 타입으로 관리하여 빈 입력 허용 (`number`면 0이 표시됨)

## What Didn't Work

- `--src-dir=false` 플래그: create-next-app v16에서 여전히 대화형 프롬프트가 뜸 → `--yes`로 해결
- Windows 경로(`C:\repo\SBD`)를 create-next-app에 직접 전달하면 패키지명이 대문자 포함으로 실패
- `printf 'n\n'` 파이핑: 화살표 키 기반 interactive prompt에서 작동하지 않음

## Next Steps — 2단계 확장

1. **Supabase Auth 로그인**
   - `app/layout.tsx`에 Supabase Provider 래핑
   - 로그인/회원가입 페이지 추가 (`app/login/page.tsx`)

2. **기록 저장 DB**
   - Supabase 테이블 설계 (users, records)
   - 계산 결과 저장 API Route 또는 Supabase client 직접 호출

3. **주간 기록 조회 + 성장 그래프**
   - Recharts 라이브러리 추가
   - `components/ResultCard.tsx` 근처에 그래프 컴포넌트 추가

4. **PWA 설정**
   - `next.config.ts`에 next-pwa 또는 @ducanh2912/next-pwa 설정
   - manifest.json, service worker 추가

5. **기타 개선 가능 사항**
   - 성별 선택 UI 추가 (여성 Wilks 계수 지원)
   - 등급 기준을 Wilks 점수 기반으로 변경
   - 종목별 개별 등급 표시
   - 결과 공유 (이미지 생성 또는 링크 공유)
