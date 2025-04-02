# Chrome Extension Template (크롬 익스텐션 기본 템플릿)

이 프로젝트는 크롬 확장 프로그램 개발을 위한 기본 템플릿입니다. TypeScript와 Vite를 기반으로 하여 현대적인 개발 환경을 제공합니다.

## 특징

- TypeScript를 사용한 타입 안전성 보장
- Vite를 활용한 빠른 개발 및 빌드 환경
- ESLint 및 Prettier를 통한 코드 품질 관리
- 크롬 확장 프로그램 개발에 필요한 기본 설정 포함

## 기술 스택

- TypeScript
- Vite
- CRXJS Vite Plugin (크롬 확장 프로그램 빌드 지원)
- ESLint & Prettier

## 시작하기

### 요구 사항

- Node.js (최신 LTS 버전 권장)
- pnpm

### 설치

```bash
# 의존성 설치
pnpm install
```

### 개발

```bash
# 개발 모드 실행
pnpm dev
```

### 빌드

```bash
# 프로덕션 빌드
pnpm build
```

## 사용 방법

1. `pnpm build` 명령으로 프로젝트를 빌드합니다.
2. 크롬 브라우저에서 `chrome://extensions/` 페이지로 이동합니다.
3. 우측 상단의 "개발자 모드"를 활성화합니다.
4. "압축해제된 확장 프로그램 로드" 버튼을 클릭합니다.
5. 빌드된 `dist` 디렉토리를 선택합니다.

## 스크립트 명령어

- `pnpm dev` - 개발 서버 실행
- `pnpm build` - 프로덕션용 빌드
- `pnpm preview` - 빌드된 결과물 미리보기
- `pnpm lint` - ESLint로 코드 검사
- `pnpm lint:fix` - ESLint로 코드 문제 자동 수정
- `pnpm format` - Prettier로 코드 서식 정리

## 커스터마이징

이 템플릿을 기반으로 원하는 크롬 확장 프로그램을 개발하세요. `manifest.json` 파일과 소스 코드를 수정하여 필요한 기능을 구현할 수 있습니다.