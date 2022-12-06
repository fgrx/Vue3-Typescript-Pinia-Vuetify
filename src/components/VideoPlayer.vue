<script lang="ts" setup>
import eventBus from "@/plugins/eventBus";

import type IRessource from "@/interfaces/iRessource";
import { computed, ref } from "vue";

const isOpen = ref(false);

const ressource = ref();

eventBus.on("open-video-modal", (ressourceSent) => {
  isOpen.value = true;
  ressource.value = ressourceSent as IRessource;
});

const embedVideo = computed(() =>
  ressource.value.url.replace(".com/watch?v=", ".com/embed/")
);
</script>

<template>
  <v-dialog width="auto" v-model="isOpen">
    <v-card>
      <v-card-title>{{ ressource.title }}</v-card-title>

      <v-card-text>
        <iframe
          width="560"
          height="315"
          :src="embedVideo"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="isOpen = false" type="primary">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
