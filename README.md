# Google-style Static Search Page

정적 호스팅용 Google 스타일 검색 페이지입니다. 별도 빌드 과정 없이 `index.html`을 그대로 배포할 수 있습니다.

## Files

- `index.html`: 페이지 구조와 검색 폼
- `styles.css`: Google 메인 화면과 비슷한 레이아웃/반응형 스타일
- `script.js`: 검색어 정리, 지우기 버튼, I'm Feeling Lucky 동작

## Search

검색어를 입력하고 Enter 또는 `Google 검색` 버튼을 누르면 실제 Google 검색 결과로 이동합니다.

```text
https://www.google.com/search?q=검색어
```

## GitHub Pages

1. 이 폴더의 파일을 GitHub 저장소 루트에 올립니다.
2. 저장소의 `Settings` > `Pages`로 이동합니다.
3. `Deploy from a branch`를 선택합니다.
4. 브랜치는 `main`, 폴더는 `/root`를 선택합니다.
5. 저장하면 GitHub Pages 주소에서 바로 열립니다.
