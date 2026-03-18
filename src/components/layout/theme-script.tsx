export function ThemeScript() {
  const script = `
    (() => {
      const stored = window.localStorage.getItem('theme');
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const theme = stored === 'light' || stored === 'dark' ? stored : system;
      document.documentElement.dataset.theme = theme;
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}