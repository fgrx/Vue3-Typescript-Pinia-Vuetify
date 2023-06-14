<script lang="ts" setup>
import { computed, ref } from "vue";
import useGeneralStore from "@/stores/generalStore";
import { storeToRefs } from "pinia";

const { videoPlayer } = storeToRefs(useGeneralStore());

const embedVideo = computed(() =>
  videoPlayer.value.ressource.url.replace(".com/watch?v=", ".com/embed/")
);
</script>

<template>
  <v-dialog width="auto" v-model="videoPlayer.isOpen">
    <v-card>
      <v-card-title>{{ videoPlayer.ressource.title }}</v-card-title>

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
        <v-btn
          color="primary"
          @click="videoPlayer.isOpen = false"
          type="primary"
        >
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
