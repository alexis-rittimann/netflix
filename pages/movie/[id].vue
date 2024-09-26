<template>
  <div class="container mx-auto py-8">
    <div v-if="movie" class="flex flex-col md:flex-row items-center md:items-start">
      <img 
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" 
        alt="Affiche du film" 
        class="w-full md:w-1/3 rounded-lg shadow-lg mb-4 md:mb-0"
      />
      <div class="md:ml-8 flex-1">
        <h1 class="text-4xl font-bold mb-4 text-white">{{ movie.title }}</h1>
        <p class="text-gray-300 mb-4">{{ movie.overview }}</p>
        
        <div class="mt-4">
          <h2 class="text-lg font-semibold text-white">Informations supplémentaires</h2>
          <ul class="text-gray-300 list-disc ml-6">
            <li><strong>Note TMDB :</strong> {{ movie.vote_average }}</li>
            <li><strong>Nombre de votes :</strong> {{ movie.vote_count }}</li>
            <li><strong>Date de sortie :</strong> {{ movie.release_date }}</li>
            <li v-if="movie.genres.length"><strong>Genres :</strong> {{ movie.genres.map(genre => genre.name).join(', ') }}</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div v-else>
      <p class="text-center text-gray-500">Chargement des détails du film...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const movie = ref(null);

const fetchMovieDetails = async () => {
  try {
    const config = useRuntimeConfig();
    const response = await $fetch(`https://api.themoviedb.org/3/movie/${route.params.id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.public.TMDB_BEARER_TOKEN}`,
      },
    });
    movie.value = response;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film :', error);
  }
};

onMounted(fetchMovieDetails);
</script>
