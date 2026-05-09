const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const searchBox = document.querySelector(".search-box");
const clearButton = document.querySelector("#clearButton");
const luckyButton = document.querySelector("#luckyButton");
const appMain = document.querySelector("#appMain");
const logo = document.querySelector(".logo");
const actions = document.querySelector(".actions");
const language = document.querySelector(".language");
const resultsPanel = document.querySelector("#resultsPanel");
const resultsSummary = document.querySelector("#resultsSummary");
const resultsList = document.querySelector("#resultsList");
const backHomeButton = document.querySelector("#backHomeButton");

const searchIndex = [
  {
    title: "Gagagle 검색의 원리",
    url: "#how-search-works",
    site: "gagagle.local",
    description: "Gagagle은 정적 사이트 안에 들어 있는 로컬 인덱스를 분석해서 제목, 설명, 태그 일치도 순서로 결과를 보여줍니다.",
    keywords: ["gagagle", "검색", "원리", "랭킹", "인덱스", "정적 사이트"],
  },
  {
    title: "GitHub Pages 배포 가이드",
    url: "https://docs.github.com/pages",
    site: "docs.github.com",
    description: "정적 HTML, CSS, JavaScript 파일을 GitHub Pages에 배포하는 공식 문서입니다.",
    keywords: ["github", "pages", "배포", "정적", "사이트", "호스팅"],
  },
  {
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org/",
    site: "developer.mozilla.org",
    description: "HTML, CSS, JavaScript 웹 표준을 배울 수 있는 개발자 문서입니다.",
    keywords: ["html", "css", "javascript", "웹", "문서", "개발"],
  },
  {
    title: "JavaScript 검색 엔진 만들기",
    url: "#javascript-search",
    site: "gagagle.local",
    description: "브라우저에서 배열 기반 인덱스를 토큰화하고 점수를 계산해 검색 결과를 만드는 방법입니다.",
    keywords: ["javascript", "검색", "엔진", "토큰", "점수", "브라우저"],
  },
  {
    title: "HTML 기본 구조",
    url: "#html-basics",
    site: "gagagle.local",
    description: "웹 페이지의 문서 구조, 접근성 속성, 검색 폼 구성에 필요한 기본 HTML 요소를 정리했습니다.",
    keywords: ["html", "폼", "검색창", "접근성", "문서"],
  },
  {
    title: "CSS 반응형 레이아웃",
    url: "#css-responsive",
    site: "gagagle.local",
    description: "모바일과 데스크톱 화면에서 검색창과 결과 목록이 안정적으로 보이도록 만드는 CSS 패턴입니다.",
    keywords: ["css", "반응형", "레이아웃", "모바일", "디자인"],
  },
  {
    title: "Git 사용법",
    url: "https://git-scm.com/docs",
    site: "git-scm.com",
    description: "커밋, 브랜치, push, remote 등 정적 사이트 배포에 필요한 Git 명령을 확인할 수 있습니다.",
    keywords: ["git", "커밋", "브랜치", "push", "remote", "배포"],
  },
  {
    title: "웹 접근성 시작하기",
    url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
    site: "w3.org",
    description: "키보드 사용, 스크린 리더, 명확한 라벨처럼 누구나 쓸 수 있는 웹을 만드는 기본 원칙입니다.",
    keywords: ["접근성", "aria", "키보드", "스크린 리더", "웹"],
  },
  {
    title: "Gagagle 개인정보처리방침",
    url: "#privacy",
    site: "gagagle.local",
    description: "현재 Gagagle 검색은 서버로 검색어를 보내지 않고 브라우저 안에서만 결과를 계산합니다.",
    keywords: ["개인정보", "검색어", "로컬", "브라우저", "보안"],
  },
  {
    title: "이미지 검색 준비 중",
    url: "#images",
    site: "gagagle.local",
    description: "이미지 검색은 아직 연결 전이며, 현재 버전에서는 텍스트 검색 결과를 우선 제공합니다.",
    keywords: ["이미지", "검색", "준비", "기능"],
  },
  {
    title: "Gagagle 광고",
    url: "#ads",
    site: "gagagle.local",
    description: "검색 결과에 광고를 섞지 않은 깨끗한 로컬 검색 경험을 제공합니다.",
    keywords: ["광고", "검색", "결과", "로컬"],
  },
  {
    title: "정적 사이트란?",
    url: "#static-site",
    site: "gagagle.local",
    description: "서버 프로그램 없이 HTML, CSS, JavaScript 파일만으로 동작하는 웹사이트입니다.",
    keywords: ["정적", "사이트", "html", "css", "javascript", "github pages"],
  },
];

const specialSearchMessages = new Map([
  ["윤성우", "멋쟁이"],
  ["윤성빈", "제일멋쟁이"],
]);

const luckyGameUrl = "https://programmer119.github.io/cdogs-sdl/";

function normalizedQuery() {
  return searchInput.value.trim().replace(/\s+/g, " ");
}

function tokenize(value) {
  return value
    .toLocaleLowerCase("ko-KR")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function updateSearchState() {
  searchBox.classList.toggle("has-value", normalizedQuery().length > 0);
}

function scoreResult(item, tokens) {
  const title = item.title.toLocaleLowerCase("ko-KR");
  const description = item.description.toLocaleLowerCase("ko-KR");
  const site = item.site.toLocaleLowerCase("ko-KR");
  const keywords = item.keywords.join(" ").toLocaleLowerCase("ko-KR");

  return tokens.reduce((score, token) => {
    let nextScore = score;

    if (title === token) nextScore += 80;
    if (title.includes(token)) nextScore += 40;
    if (keywords.includes(token)) nextScore += 26;
    if (description.includes(token)) nextScore += 16;
    if (site.includes(token)) nextScore += 10;

    return nextScore;
  }, 0);
}

function makeSnippet(text, tokens) {
  const lowerText = text.toLocaleLowerCase("ko-KR");
  const firstMatch = tokens
    .map((token) => lowerText.indexOf(token))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  if (firstMatch === undefined) {
    return text;
  }

  const start = Math.max(0, firstMatch - 38);
  const end = Math.min(text.length, firstMatch + 92);
  const prefix = start > 0 ? "... " : "";
  const suffix = end < text.length ? " ..." : "";

  return `${prefix}${text.slice(start, end)}${suffix}`;
}

function searchLocal(query) {
  const tokens = tokenize(query);

  if (tokens.length === 0) {
    return [];
  }

  return searchIndex
    .map((item) => ({
      ...item,
      score: scoreResult(item, tokens),
      snippet: makeSnippet(item.description, tokens),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, "ko-KR"));
}

function stripHtml(value) {
  const template = document.createElement("template");
  template.innerHTML = value;
  return template.content.textContent || "";
}

async function searchWikipedia(query) {
  const url = new URL("https://ko.wikipedia.org/w/api.php");
  url.searchParams.set("origin", "*");
  url.searchParams.set("action", "query");
  url.searchParams.set("list", "search");
  url.searchParams.set("format", "json");
  url.searchParams.set("srlimit", "8");
  url.searchParams.set("srsearch", query);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Search request failed");
  }

  const data = await response.json();

  return (data.query?.search || []).map((item) => ({
    title: item.title,
    url: `https://ko.wikipedia.org/wiki/${encodeURIComponent(item.title.replaceAll(" ", "_"))}`,
    site: "ko.wikipedia.org",
    snippet: stripHtml(item.snippet),
    score: item.size || 1,
  }));
}

async function search(query) {
  const localResults = searchLocal(query);

  try {
    const wikiResults = await searchWikipedia(query);
    const seen = new Set(localResults.map((item) => item.url));
    const uniqueWikiResults = wikiResults.filter((item) => {
      if (seen.has(item.url)) {
        return false;
      }

      seen.add(item.url);
      return true;
    });

    return [...localResults, ...uniqueWikiResults];
  } catch (error) {
    return localResults;
  }
}

function createResultItem(item) {
  const article = document.createElement("article");
  article.className = "result-item";

  const site = document.createElement("div");
  site.className = "result-site";
  site.textContent = item.site;

  const title = document.createElement("a");
  title.className = "result-title";
  title.href = item.url;
  title.textContent = item.title;

  const snippet = document.createElement("p");
  snippet.className = "result-snippet";
  snippet.textContent = item.snippet;

  article.append(site, title, snippet);
  return article;
}

function setResultMode(isResultMode) {
  appMain.classList.toggle("is-results", isResultMode);
  resultsPanel.hidden = !isResultMode;
  actions.hidden = isResultMode;
  language.hidden = isResultMode;
  logo.hidden = false;
}

function setLoadingState(query) {
  setResultMode(true);
  resultsList.replaceChildren();
  resultsSummary.textContent = `"${query}" 검색 중...`;

  const loading = document.createElement("div");
  loading.className = "empty-result";
  loading.textContent = "Gagagle 검색기가 결과를 모으고 있습니다.";
  resultsList.append(loading);
}

async function renderResults(query, shouldPushState = true) {
  const specialMessage = specialSearchMessages.get(query);

  if (specialMessage) {
    alert(specialMessage);
    return;
  }

  searchInput.value = query;
  updateSearchState();
  setLoadingState(query);

  if (shouldPushState) {
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.pushState({ query }, "", url);
  }

  const results = await search(query);
  resultsList.replaceChildren();

  if (results.length === 0) {
    resultsSummary.textContent = `"${query}"에 대한 검색 결과가 없습니다.`;

    const empty = document.createElement("div");
    empty.className = "empty-result";
    empty.textContent = "다른 검색어를 입력해보세요. 네트워크가 막혀 있으면 외부 검색 결과가 표시되지 않을 수 있습니다.";
    resultsList.append(empty);
    return;
  }

  resultsSummary.textContent = `검색어 "${query}"에 대한 결과 ${results.length}개`;
  results.forEach((item) => resultsList.append(createResultItem(item)));
}

function goHome() {
  searchInput.value = "";
  updateSearchState();
  setResultMode(false);
  resultsList.replaceChildren();
  resultsSummary.textContent = "";
  window.history.pushState({}, "", window.location.pathname);
  searchInput.focus();
}

searchInput.addEventListener("input", updateSearchState);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  updateSearchState();
  searchInput.focus();
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = normalizedQuery();

  if (!query) {
    searchInput.focus();
    return;
  }

  renderResults(query);
});

luckyButton.addEventListener("click", () => {
  window.location.href = luckyGameUrl;
});

backHomeButton.addEventListener("click", goHome);

window.addEventListener("popstate", () => {
  const query = new URLSearchParams(window.location.search).get("q");

  if (query) {
    renderResults(query, false);
  } else {
    setResultMode(false);
  }
});

const initialQuery = new URLSearchParams(window.location.search).get("q");

if (initialQuery) {
  renderResults(initialQuery, false);
} else {
  updateSearchState();
}
