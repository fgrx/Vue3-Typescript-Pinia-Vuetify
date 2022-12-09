<script lang="ts" setup>
import RessourceForm from "@/components/RessourceForm.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import Message from "@/components/Message.vue";
import eventBus from "@/plugins/eventBus";
import useRessourceStore from "@/stores/ressourceStore";

const ressourceStore = useRessourceStore();
ressourceStore.loadRessources();

const openRessourceFormAction = () => {
  eventBus.emit("open-ressource-form");
};
</script>

<template>
  <v-app>
    <v-app-bar color="primary" light>
      <v-app-bar-title
        ><router-link class="title-site" :to="{ name: 'Home' }">
          DevWall
        </router-link></v-app-bar-title
      >
      <v-spacer />
      <v-btn :to="{ name: 'About' }">A propos</v-btn>
      <v-btn :to="{ name: 'Admin' }">Administration</v-btn>
      <v-btn variant="tonal" color="outlined" @click="openRessourceFormAction">
        <v-icon icon="mdi-plus"></v-icon>
        Ajouter</v-btn
      >
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <VideoPlayer />
    <Message />
    <RessourceForm />
  </v-app>
</template>

<style>
.title-site {
  text-decoration: none;
  color: white;
  font-size: 1.5em;
}

/* .ressource-item-top-card {
  background-color: rgb(242, 249, 207);
} */
</style>
