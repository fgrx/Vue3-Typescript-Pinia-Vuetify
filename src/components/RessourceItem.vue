<script setup lang="ts">
import type IRessource from "@/interfaces/iRessource";

import defaultImage from "@/assets/default-image.png";
import frenchFlag from "@/assets/frenchFlag.svg";
import { computed } from "vue";

const props = defineProps<{ ressource: IRessource; isBookmark?: boolean }>();

const dateInFrench = computed(() => {
  const ressourceDate = new Date(props.ressource.date);
  return ressourceDate.toLocaleDateString();
});

const mediaInFrench = computed(() => {
  switch (props.ressource.media) {
    case "video":
      return "Vidéo";
    case "post":
      return "Article";
    case "book":
      return "Livre";
    default:
      return "Autre";
  }
});

const emit = defineEmits(["add-to-bookmarks", "remove-from-bookmarks"]);

const addToBookmarksAction = (ressource: IRessource) => {
  emit("add-to-bookmarks", ressource);
};

const removeFromBookmarksAction = (ressource: IRessource) => {
  emit("remove-from-bookmarks", ressource);
};
</script>

<template>
  <v-card
    :class="ressource.isTop ? 'ressource-item-top-card bg-secondary' : ''"
    :body-style="{ padding: '0px' }"
  >
    <v-img
      height="250"
      :src="ressource.image || defaultImage"
      class="ressource-image"
    />
    <div style="padding: 14px">
      <v-img v-if="ressource.lang === 'fr'" height="20" :src="frenchFlag" />
      <v-card-title>
        {{ ressource.title }}
      </v-card-title>

      <v-card-subtitle>
        {{ mediaInFrench }} ajouté(e) le
        {{ dateInFrench }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
          @click="addToBookmarksAction(ressource)"
          color="primary"
          v-if="!isBookmark"
          >+ liste</v-btn
        >
        <v-btn
          v-if="isBookmark"
          @click="removeFromBookmarksAction(ressource)"
          color="error"
          >- liste</v-btn
        >
      </v-card-actions>
    </div>
  </v-card>
</template>

<style scoped></style>
