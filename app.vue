<template>
  <div class="min-h-screen flex flex-col bg-dark-bg text-primary-text">
    <!-- Header -->
    <header class="bg-dark-card text-primary-text py-4">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">Mon Application de Films</h1>
        <nav>
          <NuxtLink to="/" class="text-primary-text hover:text-primary mx-4">Accueil</NuxtLink>
          <NuxtLink to="/about" class="text-primary-text hover:text-primary mx-4">À propos</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="flex-1 container mx-auto py-8 px-4">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-dark-card text-secondary-text py-4 mt-auto">
      <div class="container mx-auto text-center">
        <p>&copy; 2024 Mon Application de Films - Tous droits réservés</p>
      </div>
    </footer>
  </div>
</template>


