"use client";

function getCurrentTheme() {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const handleToggle = () => {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <button
      type="button"
      className="ghost-control"
      aria-label="Toggle color theme"
      onClick={handleToggle}
    >
      Theme
    </button>
  );
}