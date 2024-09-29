<template>
    <div>
      <!-- Header -->
      <header class="sticky top-0 w-full z-50 bg-transparent text-white py-4 px-8" style="margin-bottom: -64px;">
        <nav class="container mx-auto flex justify-between items-center">
          <div class="text-2xl font-bold">My Movie App</div>
          
          <ul class="flex space-x-6 text-lg">
            <li><NuxtLink to="/" class="hover:text-yellow-400 transition duration-300">Accueil</NuxtLink></li>
            <li><NuxtLink to="/search" class="hover:text-yellow-400 transition duration-300">Tous les Films</NuxtLink></li>
          </ul>
        </nav>
      </header>
      
      <!-- Contenu de la page -->
      <main>
        <NuxtPage />
      </main>
    </div>
  </template>
  
  <style scoped>
  /* Le header est en position sticky */
  header {
    position: sticky;
    top: 0; /* Reste collé en haut de la page */
    z-index: 50;
    height: 64px; /* Assure-toi que c'est bien la hauteur de ton header */
  }
  </style>
  