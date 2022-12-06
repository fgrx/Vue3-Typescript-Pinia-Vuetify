<script setup lang="ts">
import type IRessource from "@/interfaces/iRessource";

import defaultImage from "@/assets/default-image.png";
import frenchFlag from "@/assets/frenchFlag.svg";
import { computed } from "vue";

const props = defineProps<{ ressource: IRessource }>();

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
    </div>
  </v-card>
</template>

<style scoped></style>
