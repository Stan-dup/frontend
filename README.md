# React project init

```text
ㄴ 📁 assets: 이미지 등
ㄴ 📁 components: 전체적으로 쓰이는 컴포넌트
ㄴ 📁 pages
    ㄴ 📁 페이지이름
        ㄴ 📜 index.tsx: 랜더링 될 페이지 컴포넌트
        ㄴ 📜 style 파일
        ㄴ 📜 components(xxx.tsx): 해당 페이지에서만 사용되는 컴포넌트 모음
        ㄴ 📜 tests(xxx.test.ts): 관련 테스트 코드
ㄴ 📁 utils: 전체적으로 쓰이는 도구(타입 인터페이스, fetch 인스턴스 등)
  ㄴ 📁 hooks: 커스텀 훅 파일 모음
  ㄴ 📜 path.ts: 경로 string 모음
  ㄴ 📜 axios_instance.ts: axios instance
ㄴ 📜 App.tsx
ㄴ 📜 global_style 파일
```
