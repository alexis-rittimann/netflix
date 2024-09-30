<template>
  <div class="relative w-full h-screen bg-black text-white">
  <!-- Section de la bannière en haut qui change avec le survol -->
    <section 
      class="relative inset-x-0 top-0 h-screen bg-cover bg-center flex items-start justify-start transition-all duration-500"
      :style="{
        backgroundImage: hoveredMovie
          ? `url(https://image.tmdb.org/t/p/original${
              hoveredMovie.backdrop_path || hoveredMovie.poster_path
            })`
          : 'none',
      }"
    >
      <!-- Overlay sombre -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <!-- Contenu des informations du film lors du hover -->
      <div v-if="hoveredMovie" class="relative z-10 p-8 w-full md:w-1/2 lg:w-1/3 text-left ml-24 mt-32">
        <h1 class="text-4xl font-bold mb-4">{{ hoveredMovie.title }}</h1>
        <p class="mb-4 text-gray-300">{{ hoveredMovie.overview }}</p>

        <div class="flex flex-col space-y-2">
          <div v-if="hoveredMovie.runtime">
            <strong>Durée :</strong> {{ hoveredMovie.runtime }} min
          </div>
          <div v-if="Array.isArray(hoveredMovie.genres) && hoveredMovie.genres.length">
            <strong>Genres :</strong>
            {{ hoveredMovie.genres.map((genre) => genre.name).join(", ") }}
          </div>
          <div v-if="hoveredMovie.release_date">
            <strong>Date de sortie :</strong> {{ hoveredMovie.release_date }}
          </div>
        </div>
      </div>
    </section>


    <!-- Section de la liste horizontale des films -->
    <section class="absolute bottom-0 w-full overflow-x-auto  p-4 z-20">
      <div class="flex space-x-4 items-center">
        <NuxtLink 
          v-for="movie in latestMovies" 
          :key="movie.id" 
          :to="`/movie/${movie.id}`" 
          @mouseover="setHoveredMovie(movie)" 
          class="flex-shrink-0 w-40 cursor-pointer transition-transform transform hover:scale-105"
        >
          <img 
            :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" 
            alt="Affiche du film" 
            class="w-full h-auto rounded-md"
          />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";

const latestMovies = ref([]);
const hoveredMovie = ref(null);

// Fonction qui définit le film survolé
const setHoveredMovie = (movie) => {
  hoveredMovie.value = movie;
  console.log("Hovered movie:", hoveredMovie.value); // Ajoute un console.log pour vérifier si la fonction est appelée
};

// Fonction pour récupérer les derniers films
const fetchLatestMovies = async () => {
  try {
    const config = useRuntimeConfig();
    const response = await $fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${config.public.TMDB_BEARER_TOKEN}`,
        },
        params: {
          language: "fr-FR",
          page: 1,
        },
      }
    );
    latestMovies.value = response.results;
    if (latestMovies.value.length > 0) {
      hoveredMovie.value = latestMovies.value[0]; // Définir le premier film comme valeur par défaut
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des derniers films :", error);
  }
};

onMounted(fetchLatestMovies);
</script>


<style scoped>
/* Styles pour l'affichage horizontal */
.overflow-x-auto {
  overflow-x: auto;
  white-space: nowrap;
}

.flex-shrink-0 {
  min-width: 200px;
}

.bg-cover {
  background-size: cover;
}
</style>
