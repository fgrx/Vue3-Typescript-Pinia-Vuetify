<script lang="ts" setup>
import IRessource from "@/interfaces/iRessource";
import { toRefs } from "vue";
import { computed } from "vue";

const props = defineProps<{ ressource?: IRessource }>();
const { ressource } = toRefs(props);

const isVideoModalOpen = defineModel<boolean>("isOpen", {
  default: "false",
});

const closeVideoModalAction = () => {
  isVideoModalOpen.value = false;
};

const embedVideo = computed(() =>
  ressource.value.url.replace(".com/watch?v=", ".com/embed/")
);
</script>

<template>
  <v-dialog width="auto" v-model="isVideoModalOpen">
    <v-card v-if="ressource">
      <v-card-title>defineModel {{ ressource.title }}</v-card-title>

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
        <v-btn color="primary" @click="closeVideoModalAction" type="primary">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
