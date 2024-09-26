<template>
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold mb-8 text-center text-white">Films Populaires</h1>


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
            <span v-for="star in 5" :key="star" class="text-yellow-400" v-if="star <= Math.round(movie.vote_average / 2)">★</span>
            <span v-for="star in 5" :key="star + 5" class="text-gray-500" v-else>★</span>
            <span class="text-white ml-2 text-xs">{{ movie.vote_average }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
    
    <div v-else>
      <p class="text-center text-gray-500">Chargement des films...</p>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';

const movies = ref([]);

const fetchMovies = async () => {
  try {
    const config = useRuntimeConfig();
    const response = await $fetch('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.public.TMDB_BEARER_TOKEN}`,
      },
      params: {
        language: 'fr-FR',
        page: 1,
      },
    });
    movies.value = response.results;
  } catch (error) {
    console.error('Erreur lors de la récupération des films :', error);
  }
};

onMounted(fetchMovies);
</script>
