<script lang="ts" setup>
import RessourceForm from "@/components/RessourceForm.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import Message from "@/components/Message.vue";
import eventBus from "@/plugins/eventBus";
import useRessourceStore from "@/stores/ressourceStore";
import useAuthStore from "@/stores/AuthStore";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();

const ressourceStore = useRessourceStore();
ressourceStore.loadRessources();

const openRessourceFormAction = () => {
  eventBus.emit("open-ressource-form");
};

const isConnected = computed(() => authStore.isConnected);

const disconnectAction = () => {
  authStore.disconnect();
  router.push({ name: "Home" });
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
      <v-btn
        @click="disconnectAction"
        v-if="isConnected"
        icon="mdi-logout"
        color="secondary"
      />
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
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

/* Transition de page */
.fade-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
</style>
