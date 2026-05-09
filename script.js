const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const searchBox = document.querySelector(".search-box");
const clearButton = document.querySelector("#clearButton");
const luckyButton = document.querySelector("#luckyButton");

function normalizedQuery() {
  return searchInput.value.trim().replace(/\s+/g, " ");
}

function updateSearchState() {
  searchBox.classList.toggle("has-value", normalizedQuery().length > 0);
}

function goToGoogle(path, params) {
  const url = new URL(path, "https://www.google.com");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  window.location.href = url.toString();
}

searchInput.addEventListener("input", updateSearchState);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  updateSearchState();
  searchInput.focus();
});

searchForm.addEventListener("submit", (event) => {
  const query = normalizedQuery();

  if (!query) {
    event.preventDefault();
    searchInput.focus();
    return;
  }

  searchInput.value = query;
});

luckyButton.addEventListener("click", () => {
  const query = normalizedQuery();

  if (!query) {
    searchInput.focus();
    return;
  }

  goToGoogle("/search", {
    q: query,
    btnI: "I",
  });
});

updateSearchState();
