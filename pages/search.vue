<template>
    <div class="container mx-auto py-8">
      <h1 class="text-4xl font-bold mb-8 text-center text-white">Films Populaires</h1>
      
      <!-- Composant de recherche -->
      <MovieSearch />
  
      <div v-if="movies.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <NuxtLink 
          v-for="movie in movies" 
          :key="movie.id" 
          :to="`/movie/${movie.id}`" 
          class="relative rounded-md overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-dark-card"
        >
          <!-- Affiche du film -->
          <img 
            :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" 
            alt="Affiche" 
            class="w-full h-80 object-cover" 
          />
          
          <!-- Conteneur pour le titre et la note -->
          <div class="p-2 bg-gray-800 bg-opacity-90 absolute bottom-0 w-full text-center">
            <h2 class="text-white text-sm font-semibold truncate">{{ movie.title }}</h2>
            <div class="flex items-center justify-center mt-1">
              <!-- Boucle pour les étoiles -->
              <span v-for="star in 5" :key="star" class="mr-1">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  :class="star <= Math.round(movie.vote_average / 2) ? 'text-yellow-400' : 'text-gray-500'" 
                  class="w-4 h-4"
                >
                  <path d="M12 .587l3.668 7.431 8.208 1.192-5.938 5.788 1.4 8.182L12 18.896l-7.338 3.864 1.4-8.182-5.938-5.788 8.208-1.192z"/>
                </svg>
              </span>
              <span class="text-white ml-2 text-xs">{{ movie.vote_average }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
  
      <div v-else>
        <p class="text-center text-gray-500">Chargement des films...</p>
      </div>
  
      <!-- Loader affiché pendant le chargement des films -->
      <div v-if="loading" class="text-center mt-4 text-white">
        Chargement des films...
      </div>
    </div>
  </template>

  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  // Variables d'état
  const movies = ref([]);
  const page = ref(1);
  const loading = ref(false);
  const hasMore = ref(true);
  
  // Fonction pour récupérer les films
  const fetchMovies = async () => {
    if (loading.value || !hasMore.value) return; // Empêche les appels répétés si déjà en cours ou s'il n'y a plus de films
  
    loading.value = true;
    
    try {
      const config = useRuntimeConfig();
      const response = await $fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${config.public.TMDB_BEARER_TOKEN}`,
        },
        params: {
          language: 'fr-FR',
          page: page.value,
        },
      });
  
      if (response.results.length > 0) {
        movies.value = [...movies.value, ...response.results]; // Ajoute les nouveaux films à la liste existante
        page.value += 1; // Incrémente la page pour la prochaine requête
      } else {
        hasMore.value = false; // Si aucun résultat, cela signifie qu'il n'y a plus de pages
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des films :', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Fonction de gestion du défilement
  const handleScroll = () => {
    // Vérifie si l'utilisateur est proche du bas de la page
    const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;
    
    if (bottomOfWindow) {
      fetchMovies(); // Charge plus de films si l'utilisateur atteint le bas de la page
    }
  };
  
  // Charge les films initiaux au montage du composant et ajoute l'écouteur de défilement
  onMounted(() => {
    fetchMovies();
    window.addEventListener('scroll', handleScroll);
  });
  
  // Retire l'écouteur de défilement lorsque le composant est démonté
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  