<template>
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-white mb-4">Distribution</h2>
      <div class="overflow-x-auto">
        <div class="flex space-x-4">
          <div 
            v-for="actor in cast" 
            :key="actor.cast_id" 
            class="flex-shrink-0 flex items-center  p-4 rounded-md w-80"
          >
            <!-- Image de l'acteur en forme ronde -->
            <img 
              :src="actor.profile_path ? 'https://image.tmdb.org/t/p/w200' + actor.profile_path : '/default-profile.png'" 
              alt="Photo de l'acteur" 
              class="w-16 h-16 rounded-full object-cover mr-4"
            />
            <!-- Nom de l'acteur et son rôle -->
            <div class="text-left">
              <h3 class="text-white font-bold text-sm">{{ actor.name }}</h3>
              <p class="text-gray-400 text-xs">{{ actor.character }}</p>
            </div>
          </div>
        </div>
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
  
  <style scoped>
  /* Style de l'overflow pour permettre un défilement */
  .overflow-x-auto {
    overflow-x: auto;
    white-space: nowrap;
  }
  .flex-shrink-0 {
    min-width: 200px;
  }
  </style>
  