<template>
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-white mb-4">Distribution</h2>
      <div v-if="cast.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="actor in cast" :key="actor.cast_id" class="bg-gray-800 rounded-md overflow-hidden shadow-lg">
          <img 
            :src="actor.profile_path ? 'https://image.tmdb.org/t/p/w500' + actor.profile_path : '/default-profile.png'" 
            alt="Photo de l'acteur" 
            class="w-full h-40 object-cover"
          />
          <div class="p-2 text-center">
            <h3 class="text-white text-sm font-bold">{{ actor.name }}</h3>
            <p class="text-gray-300 text-xs">Rôle : {{ actor.character }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-500">Aucun acteur trouvé pour ce film.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const cast = ref([]);
  const route = useRoute();
  
  // Fonction pour récupérer les acteurs du film
  const fetchMovieCast = async () => {
    try {
      const config = useRuntimeConfig();
      const response = await $fetch(`https://api.themoviedb.org/3/movie/${route.params.id}/credits`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${config.public.TMDB_BEARER_TOKEN}`,
        },
      });
      cast.value = response.cast;
    } catch (error) {
      console.error('Erreur lors de la récupération des acteurs :', error);
    }
  };
  
  onMounted(fetchMovieCast);
  </script>
  