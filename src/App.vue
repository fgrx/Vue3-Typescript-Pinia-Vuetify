<script lang="ts" setup>
import RessourceForm from "@/components/RessourceForm.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import Message from "@/components/Message.vue";
import useRessourceStore from "@/stores/ressourceStore";
import useAuthStore from "@/stores/AuthStore";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useGeneralStore from "./stores/generalStore";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const router = useRouter();

const isRessourceFormOpen = ref(false);

const authStore = useAuthStore();

const ressourceStore = useRessourceStore();
ressourceStore.loadRessources();

const isConnected = computed(() => authStore.isConnected);

const disconnectAction = () => {
  authStore.disconnect();
  router.push({ name: "Home" });
};

const { availableLocales } = useI18n();

const itemsLocales = computed(() =>
  availableLocales.map((locale) => ({ text: locale, value: locale }))
);
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
      <v-btn :to="{ name: 'About' }">{{ $t("nav.about") }}</v-btn>
      <v-btn :to="{ name: 'Admin' }" class="ml-2">{{ $t("nav.admin") }}</v-btn>
      <v-btn
        variant="tonal"
        color="outlined"
        @click="isRessourceFormOpen = true"
        class="ml-2"
      >
        <v-icon icon="mdi-plus"></v-icon>
        {{ $t("nav.add") }}</v-btn
      >

      <v-form class="mx-4">
        <v-select
          v-model="$i18n.locale"
          :label="$t('nav.languageChoice')"
          :items="itemsLocales"
          item-title="text"
          item-value="value"
        />
      </v-form>

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
    <RessourceForm
      :isOpen="isRessourceFormOpen"
      @close-ressource-form="isRessourceFormOpen = false"
    />
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
