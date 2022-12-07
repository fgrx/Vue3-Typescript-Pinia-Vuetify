<script lang="ts" setup>
import eventBus from "@/plugins/eventBus";

import type IRessource from "@/interfaces/iRessource";
import { computed, ref } from "vue";

const isOpen = ref(false);

eventBus.on("open-ressource-form", () => {
  isOpen.value = true;
});
</script>

<template>
  <v-dialog v-model="isOpen" width="80%">
    <v-card>
      <v-card-title>Ajout d'une nouvelle ressource</v-card-title>

      <v-card-text> </v-card-text>

      <v-card-actions>
        <v-btn variant="tonal" color="primary">Ajouter</v-btn>
        <v-btn>Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
