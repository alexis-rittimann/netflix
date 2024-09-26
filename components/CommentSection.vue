<template>
    <div class="mt-8">
      <!-- Formulaire de commentaire -->
      <h2 class="text-2xl font-bold text-white mb-4">Laisser un commentaire</h2>
      <form @submit.prevent="submitComment" class="bg-gray-800 p-4 rounded-md">
        <div class="mb-4">
          <label class="block text-white mb-1">Nom d'utilisateur :</label>
          <input v-model="username" type="text" class="w-full p-2 rounded bg-gray-700 text-white" required minlength="3" maxlength="50" />
        </div>
        <div class="mb-4">
          <label class="block text-white mb-1">Commentaire :</label>
          <textarea v-model="commentText" class="w-full p-2 rounded bg-gray-700 text-white" required minlength="3" maxlength="500"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-white mb-1">Note du film (1 à 10) :</label>
          <input v-model.number="rating" type="number" min="1" max="10" class="w-full p-2 rounded bg-gray-700 text-white" required />
        </div>
        <button type="submit" class="bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Ajouter le commentaire</button>
      </form>
  
      <!-- Affichage des commentaires -->
      <div class="mt-8">
        <h2 class="text-2xl font-bold text-white mb-4">Commentaires</h2>
        <div v-if="comments.length" class="space-y-4">
          <div v-for="comment in comments" :key="comment.id" class="bg-gray-800 p-4 rounded-md">
            <h3 class="text-lg font-bold text-primary">{{ comment.username }}</h3>
            <p class="text-gray-300">{{ comment.text }}</p>
            <p class="text-sm text-gray-500">Note : {{ comment.rating }} / 10</p>
            <p class="text-xs text-gray-500">{{ comment.date }}</p>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-500">Aucun commentaire pour le moment.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  // Champs du formulaire
  const username = ref('');
  const commentText = ref('');
  const rating = ref(1);
  
  // Liste des commentaires
  const comments = ref([]);
  const route = useRoute();
  
  // Charger les commentaires depuis le Local Storage
  const loadComments = () => {
    const savedComments = JSON.parse(localStorage.getItem(`comments-${route.params.id}`)) || [];
    comments.value = savedComments;
  };
  
  // Ajouter un nouveau commentaire
  const submitComment = () => {
    const newComment = {
      id: Date.now(),
      username: username.value,
      text: commentText.value,
      rating: rating.value,
      date: new Date().toLocaleString(),
    };
  
    comments.value.unshift(newComment); // Ajouter le nouveau commentaire en haut de la liste
    localStorage.setItem(`comments-${route.params.id}`, JSON.stringify(comments.value)); // Sauvegarder dans le Local Storage
  
    // Réinitialiser les champs du formulaire
    username.value = '';
    commentText.value = '';
    rating.value = 1;
  };
  
  // Charger les commentaires au montage du composant
  onMounted(loadComments);
  
  // Mettre à jour les commentaires lorsque l'ID de la route change
  watch(() => route.params.id, loadComments);
  </script>
  