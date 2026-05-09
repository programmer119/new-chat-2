# Gagagle Static Search Page

정적 호스팅용 Gagagle 검색 페이지입니다. 별도 빌드 과정 없이 `index.html`을 그대로 배포할 수 있습니다.

## Files

- `index.html`: 페이지 구조와 검색 폼
- `styles.css`: Gagagle 메인 화면 레이아웃/반응형 스타일
- `script.js`: 로컬 검색 인덱스, 랭킹, 결과 렌더링, 지우기 버튼, I'm Feeling Lucky 동작

## Search

검색어를 입력하고 Enter 또는 `Gagagle 검색` 버튼을 누르면 외부 검색엔진으로 이동하지 않고 브라우저 안에서 자체 인덱스를 검색합니다.

정적 사이트라 서버 크롤러는 없으며, 검색 대상은 `script.js`의 `searchIndex` 배열에 들어 있는 문서입니다.

## GitHub Pages

1. 이 폴더의 파일을 GitHub 저장소 루트에 올립니다.
2. 저장소의 `Settings` > `Pages`로 이동합니다.
3. `Deploy from a branch`를 선택합니다.
4. 브랜치는 `main`, 폴더는 `/root`를 선택합니다.
5. 저장하면 GitHub Pages 주소에서 바로 열립니다.
