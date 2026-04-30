export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxt/eslint"],
  css: ["~/assets/scss/main.scss"],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "vitesse-dark",
          langs: ["vue", "ts", "bash", "json"],
        },
      },
    },
  },
  vite: {
    optimizeDeps: {
      include: ["@nuxtjs/mdc"],
    },
  },
  compatibilityDate: "2026-04-30",
});