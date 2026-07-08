export const THEMES = [
  { id: 'framer', label: 'Framer', colorScheme: 'dark', themeColor: '#090909' },
  { id: 'uber', label: 'Uber', colorScheme: 'light', themeColor: '#ffffff' },
  { id: 'figma', label: 'Figma', colorScheme: 'light', themeColor: '#ffffff' },
]

function applyThemeToDom(id) {
  const meta = THEMES.find((t) => t.id === id) ?? THEMES[0]
  document.documentElement.setAttribute('data-theme', meta.id)
  document.documentElement.style.colorScheme = meta.colorScheme
}

export function useTheme() {
  const theme = useState('theme', () => 'framer')

  function setTheme(id) {
    if (!THEMES.some((t) => t.id === id)) return
    theme.value = id
    if (import.meta.client) {
      applyThemeToDom(id)
      localStorage.setItem('theme', id)
    }
  }

  function initTheme() {
    if (!import.meta.client) return
    const saved = localStorage.getItem('theme')
    if (saved && THEMES.some((t) => t.id === saved)) {
      theme.value = saved
      applyThemeToDom(saved)
    }
  }

  return { theme, setTheme, initTheme, themes: THEMES }
}
