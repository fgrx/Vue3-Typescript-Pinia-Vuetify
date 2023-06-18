<script lang="ts" setup>
import { useRoute } from "vue-router";
import ressourceService from "@/services/ressourceService";
import defaultImage from "@/assets/default-image.png";
import { ref } from "vue";

import type IRessource from "@/interfaces/iRessource";

const id = useRoute().params.id;

const ressource = ref<IRessource>();
const rating = ref<number>(0);

ressourceService.getRessourceById(id as string).then((result) => {
  ressource.value = result;
  rating.value = result.rating;
});
</script>

<template>
  <div v-if="ressource">
    <h1>{{ $t("pages.resourceDetails.titlePage") }}</h1>

    <v-row>
      <v-col cols="12" md="5">
        <v-img
          height="250"
          :src="ressource.image || defaultImage"
          class="ressource-image"
        />
      </v-col>
      <v-col cols="12" md="7">
        <h1>{{ ressource.title }}</h1>
        <p><v-rating v-model="rating" disabled> </v-rating></p>
        <p>{{ ressource.description }}</p>

        <p class="mt-4">
          <a :href="ressource.url" target="blank">
            <v-btn color="primary">{{
              $t("pages.resourceDetails.seeResource")
            }}</v-btn>
          </a>
        </p>
      </v-col>
    </v-row>
  </div>
</template>
