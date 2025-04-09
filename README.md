# 📝 devchan64.github.io

**Jekyll + GitHub Pages 기반의 개인 기술 블로그**

[👉 블로그 바로가기](https://devchan64.github.io)

---

## 📌 프로젝트 개요

이 블로그는 **정적 사이트** (**Site Generator**)와 **클라이언트 사이드 렌더링**(**CSR**)의 조합을 통해 **검색 기능, 번역 자동화, 데이터 시각화**까지 가능한 경량 구조로 설계되었습니다.

> "검색 가능한 기록 시스템"을 목표로, **최소한의 서버 운영**으로 **확장성과 유지비용의 균형**을 실현합니다.

---

## 🛠 기술 스택

| 구성 요소        | 사용 기술                                      |
|------------------|-----------------------------------------------|
| Static Generator | [Jekyll](https://jekyllrb.com/)               |
| 스타일링         | Sass (SCSS 구조화)                             |
| 검색         | pathfind |
| CI/CD            | GitHub Actions + GitHub Pages                 |
| 데이터 백엔드    | [Supabase](https://supabase.com/)             |
| AI 연동          | [OpenAI API (GPT-4 Turbo)](https://platform.openai.com/) |

---

## 🎯 선택 배경 및 전략

### ✅ 클라이언트 사이드 렌더링 (CSR)
- **Pagefind** 기반 검색 기능을 위해 CSR 방식 도입
- 정적 콘텐츠 환경에서도 **인터랙티브 기능**(검색, 조회수, 번역 등) 제공

### ✅ 최소한의 서버 운영
- GitHub Pages를 기반으로 인프라 운영 부담 최소화
- 서버리스 구성 (Supabase, OpenAI API)으로 **유지보수 최소화**
- 서버 직접 운영 없이도 **데이터 기록 및 API 호출 기능 확장**

---

## ✨ 주요 기능

### ✅ Markdown 기반 콘텐츠 관리
- `_posts/` 폴더에서 포스트 작성 및 관리
- YAML Frontmatter로 메타 정보 구성 (`title`, `tags`, `date`, `lang` 등)

### 🌍 OpenAI 기반 자동 번역
- 포스트 변경사항만 감지하여 영어 번역
- `_posts/en/` 폴더에 번역글 저장
- GitHub Actions로 자동 PR 생성 및 리뷰 요청

### 📈 Supabase 기반 페이지 조회수 추적
- 슬러그(URL) 기준으로 페이지별 조회수 저장
- RLS 정책 적용 → 클라이언트에서 직접 조회 가능
- 향후 대시보드 연동 계획

### ⚙️ GitHub Actions 자동화
- PR 생성, 번역 처리, 배포까지 자동화된 CI/CD 구성
- 수동 개입 최소화를 통한 **지속 가능성 확보**

---

## 📚 블로그 주제

- 개발자 철학과 시스템적 사고
- IoT 아키텍처 및 운영 경험
- DX(Digital Transformation)를 위한 문서화 문화
- 메시징 시스템 및 분산 설계 노트

---

## 📎 참고 링크

- 🔗 블로그: [https://devchan64.github.io](https://devchan64.github.io)
- 📘 Supabase 설정 파일: `supabase/`
- 🤖 번역 자동화 스크립트: `.github/workflows/translate.yml`

---

## 👋 블로그의 목적

이 블로그는 **"기록은 자산이다"**라는 철학 아래,  
**개발자의 관점으로 구조화된 사고와 설계 노하우**를 공유하고자 만든 공간입니다.

> 💡 “기록은 자산이다. 구조화된 기록은 재사용 가능하며, 시스템을 진화시킨다.”

---

## 📂 GitHub 저장소

GitHub에서 이 프로젝트를 확인하세요:  
[https://github.com/devchan64/devchan64.github.io](https://github.com/devchan64/devchan64.github.io)
