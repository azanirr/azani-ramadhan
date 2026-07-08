<script setup>
const isOpen = ref(false)
const activeHref = ref('')

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

function close() {
  isOpen.value = false
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeHref.value = `#${entry.target.id}`
        }
      })
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
  )

  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section))

  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <header class="nav">
    <div class="container nav-inner">
      <a href="#top" class="logo-mark" aria-label="Azani Ramadhan — home">ΛZ</a>

      <nav class="links" :class="{ open: isOpen }">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="body-sm link"
          :class="{ 'link-active': activeHref === link.href }"
          @click="close"
        >{{ link.label }}</a>
      </nav>

      <div class="actions">
        <a v-magnetic href="mailto:azanirr212@gmail.com" class="btn btn-primary">Email me</a>
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="isOpen"
          aria-label="Toggle navigation menu"
          @click="isOpen = !isOpen"
        >
          <span />
          <span />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 56px;
  background: var(--color-canvas);
  border-bottom: 1px solid var(--color-hairline-soft);
}

.nav-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
}

.logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.02em;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.logo-mark:hover {
  transform: scale(1.06) rotate(-4deg);
}

.links {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.link {
  position: relative;
  color: var(--color-ink-muted);
  transition: color 0.15s ease;
}

.link:hover {
  color: var(--color-ink);
}

.link-active {
  color: var(--color-ink);
}

.link-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 2px;
  border-radius: var(--radius-full);
  background: var(--color-accent-blue);
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-surface-1);
  border: none;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 16px;
  height: 2px;
  margin: 0 auto;
  background: var(--color-ink);
}

@media (max-width: 810px) {
  .links {
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    background: var(--color-canvas);
    border-bottom: 1px solid var(--color-hairline-soft);
    padding: var(--space-md) var(--space-lg);
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.15s ease, opacity 0.15s ease;
  }

  .links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .link {
    padding: var(--space-sm) 0;
    width: 100%;
  }

  .menu-toggle {
    display: flex;
  }

  .actions .btn-primary {
    display: none;
  }
}
</style>
