<script setup>
const isOpen = ref(false)

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
</script>

<template>
  <header class="nav">
    <div class="container nav-inner">
      <a href="#top" class="wordmark body-sm">Azani Ramadhan</a>

      <nav class="links" :class="{ open: isOpen }">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="body-sm link"
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

.wordmark {
  font-weight: 700;
  letter-spacing: -0.01em;
}

.links {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.link {
  color: var(--color-ink-muted);
  transition: color 0.15s ease;
}

.link:hover {
  color: var(--color-ink);
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
