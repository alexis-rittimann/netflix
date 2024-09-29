<template>
  <div v-if="movie">
    <!-- Hero Section -->
    <section 
      class="relative w-full h-screen flex items-center justify-center text-white bg-cover bg-center" 
      :style="{ backgroundImage: movie.backdrop_path ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` : (movie.poster_path ? `url(https://image.tmdb.org/t/p/original${movie.poster_path})` : 'none') }"
    >
      <!-- Overlay pour un effet sombre -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <!-- Contenu du Hero -->
      <div class="relative z-10 container mx-auto px-4 text-center md:text-left md:max-w-3xl lg:max-w-4xl">
        <h1 class="text-5xl md:text-6xl font-bold mb-4">{{ movie.title }}</h1>
        <p class="text-gray-300 mb-4">{{ movie.overview }}</p>
        
        <div class="flex flex-col md:flex-row md:items-center mt-4 space-y-4 md:space-y-0 md:space-x-8">
          <div class="text-sm md:text-base">
            <strong class="font-semibold">Première :</strong> {{ movie.release_date }}
          </div>
          <div class="text-sm md:text-base" v-if="director">
            <strong class="font-semibold">Réalisateur :</strong> {{ director }}
          </div>
          <div class="text-sm md:text-base">
            <strong class="font-semibold">Genres :</strong> {{ movie.genres.map(genre => genre.name).join(', ') }}
          </div>
          <div class="text-sm md:text-base">
            <strong class="font-semibold">Note :</strong> {{ movie.vote_average }} / 10
          </div>
        </div>

        <!-- Bouton pour voir la bande-annonce (si disponible) -->
        <div class="mt-6">
          <a 
            v-if="movie.trailerUrl"
            :href="movie.trailerUrl"
            target="_blank"
            class="inline-block bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
          >
            Voir la bande-annonce
          </a>
        </div>
      </div>
    </section>

    <!-- Section des commentaires et acteurs -->
    <div class="container mx-auto py-8 px-4">
      <MovieCast />

      <CommentSection />
    </div>
  </div>

  <!-- Afficher un message de chargement si le film est en cours de chargement -->
  <div v-else>
    <p class="text-center text-gray-500">Chargement du film...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CommentSection from '~/components/CommentSection.vue';
import MovieCast from '~/components/MovieCast.vue';

const route = useRoute();
const movie = ref(null);
const director = ref('');

// Fonction pour récupérer les détails du film
const fetchMovieDetails = async () => {
  try {
    const config = useRuntimeConfig();
    const response = await $fetch(`https://api.themoviedb.org/3/movie/${route.params.id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.public.TMDB_BEARER_TOKEN}`,
      },
      params: {
          language: "fr-FR",
          page: 1,
        },
    });
    movie.value = response;

    // Rechercher les informations de casting pour trouver le réalisateur
    const creditsResponse = await $fetch(`https://api.themoviedb.org/3/movie/${route.params.id}/credits`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.public.TMDB_BEARER_TOKEN}`,
      },
      params: {
          language: "fr-FR",
          page: 1,
        },
    });

    const directorData = creditsResponse.crew.find(member => member.job === 'Director');
    director.value = directorData ? directorData.name : 'Inconnu';

  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film :', error);
  }
};

onMounted(fetchMovieDetails);
</script>
