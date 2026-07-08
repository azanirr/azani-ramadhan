<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p class="caption ink-muted">© {{ year }} Azani Ramadhan</p>
      <div class="footer-links">
        <a href="mailto:azanirr212@gmail.com" class="caption ink-muted">Email</a>
        <a
          href="https://www.linkedin.com/in/azaniramadhan"
          target="_blank"
          rel="noopener"
          class="caption ink-muted"
        >LinkedIn</a>
        <a
          href="https://github.com/azanirr"
          target="_blank"
          rel="noopener"
          class="caption ink-muted"
        >GitHub</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-canvas);
  padding: var(--space-xxl) 0;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-lg);
}

.footer-links {
  display: flex;
  gap: var(--space-lg);
}
</style>
