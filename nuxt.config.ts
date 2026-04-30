export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  css: ["~/assets/scss/main.scss"],
  future: {
    compatibilityVersion: 4,
  },
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
});
