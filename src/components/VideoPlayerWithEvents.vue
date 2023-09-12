<script lang="ts" setup>
import IRessource from "@/interfaces/iRessource";
import { toRefs } from "vue";
import { computed, ref } from "vue";

const emit = defineEmits(["close-video-modal"]);

const props = defineProps<{ ressource: IRessource; isOpen: boolean }>();
const { isOpen, ressource } = toRefs(props);

const embedVideo = computed(() =>
  ressource.value.url.replace(".com/watch?v=", ".com/embed/")
);

const closeModalAction = () => {
  emit("close-video-modal");
};
</script>

<template>
  <v-dialog width="auto" v-model="isOpen" persistent>
    <v-card v-if="ressource">
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
        <v-btn color="primary" @click="closeModalAction" type="primary">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
