# Gagagle Static Search Page

정적 호스팅용 Gagagle 검색 페이지입니다. 별도 빌드 과정 없이 `index.html`을 그대로 배포할 수 있습니다.

## Files

- `index.html`: 페이지 구조와 검색 폼
- `styles.css`: Gagagle 메인 화면 레이아웃/반응형 스타일
- `script.js`: 로컬 검색 인덱스, 랭킹, 결과 렌더링, 지우기 버튼, I'm Feeling Lucky 동작

## Search

검색어를 입력하고 Enter 또는 `Gagagle 검색` 버튼을 누르면 외부 검색엔진으로 이동하지 않고 Gagagle 결과 화면에서 검색 결과를 보여줍니다.

정적 사이트라 서버 크롤러는 없으며, 먼저 `script.js`의 `searchIndex` 배열을 검색하고 이어서 위키백과 공개 검색 API 결과를 합쳐 표시합니다.

## Demo Login

검색 또는 `I'm Feeling Lucky`를 실행하려면 임시 계정으로 로그인해야 합니다. 로그인 성공 상태는 브라우저 `localStorage`에 저장되어 이후 검색에서는 다시 확인하지 않습니다.

## GitHub Pages

1. 이 폴더의 파일을 GitHub 저장소 루트에 올립니다.
2. 저장소의 `Settings` > `Pages`로 이동합니다.
3. `Deploy from a branch`를 선택합니다.
4. 브랜치는 `main`, 폴더는 `/root`를 선택합니다.
5. 저장하면 GitHub Pages 주소에서 바로 열립니다.
