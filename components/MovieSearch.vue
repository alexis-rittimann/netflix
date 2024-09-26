<template>
    <div class="mb-8 flex justify-center">
      <input 
        v-model="searchQuery" 
        @input="handleSearch" 
        type="text" 
        placeholder="Rechercher un film..." 
        class="w-full sm:w-2/3 lg:w-1/2 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  
    <!-- Affichage des résultats de la recherche -->
    <div v-if="movies.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <NuxtLink 
        v-for="movie in movies" 
        :key="movie.id" 
        :to="`/movie/${movie.id}`" 
        class="relative rounded-md overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-dark-card"
      >
        <img 
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" 
          alt="Affiche" 
          class="w-full h-80 object-cover" 
        />
        <div class="p-2 bg-gray-800 bg-opacity-90 absolute bottom-0 w-full text-center">
          <h2 class="text-white text-sm font-semibold truncate">{{ movie.title }}</h2>
          <div class="flex items-center justify-center mt-1">
            <span v-for="star in 5" :key="star" class="text-yellow-400" v-if="star <= Math.round(movie.vote_average / 2)">★</span>
            <span v-for="star in 5" :key="star + 5" class="text-gray-500" v-else>★</span>
            <span class="text-white ml-2 text-xs">{{ movie.vote_average }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  
    <div v-else-if="searchQuery.length > 2 && !loading">
      <p class="text-center text-gray-500">Aucun film trouvé.</p>
    </div>
  
    <!-- Loader affiché pendant le chargement des films -->
    <div v-if="loading" class="text-center mt-4 text-white">
      Chargement des films...
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const searchQuery = ref('');
  const movies = ref([]);
  const loading = ref(false);
  
  const handleSearch = async () => {
    if (searchQuery.value.length < 3) {
      movies.value = [];
      return;
    }
  
    loading.value = true;
    
    try {
      const config = useRuntimeConfig();
      const response = await $fetch('https://api.themoviedb.org/3/search/movie', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${config.public.TMDB_BEARER_TOKEN}`,
        },
        params: {
          query: searchQuery.value,
          language: 'fr-FR',
          page: 1,
        },
      });
  
      movies.value = response.results;
    } catch (error) {
      console.error('Erreur lors de la recherche de films :', error);
    } finally {
      loading.value = false;
    }
  };
  </script>
  