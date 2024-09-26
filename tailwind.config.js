/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue', // Ajoute ceci si app.vue n'était pas inclus
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212', // Couleur de fond principale sombre
        'dark-card': '#1E1E1E', // Couleur de fond pour les cartes
        'primary-text': '#FFFFFF', // Texte clair
        'secondary-text': '#A1A1A1', // Texte secondaire gris clair
        'primary': '#E50914', // Couleur principale (par exemple pour les liens, boutons, etc.)
      },
    },
  },
  plugins: [],
};
