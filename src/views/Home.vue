<script lang="ts" setup>
import type IRessource from "@/interfaces/iRessource";
import RessourceItem from "@/components/RessourceItem.vue";
import Loading from "@/components/Loading.vue";
import { ref, computed } from "vue";
import useRessourceStore from "@/stores/ressourceStore";
import { storeToRefs } from "pinia";

const { validRessources: ressources } = storeToRefs(useRessourceStore());

const bookmarks = ref<IRessource[]>([]);

const addToBookmarksAction = (ressource: IRessource) => {
  if (!bookmarks.value.includes(ressource)) bookmarks.value.push(ressource);
};

const removeFromBookmarksAction = (ressourceToRemove: IRessource) => {
  bookmarks.value = bookmarks.value.filter(
    (ressource) => ressource.id !== ressourceToRemove.id
  );

  //ou
  // const position = bookmarks.value.indexOf(ressourceToRemove);
  // bookmarks.value.splice(position, 1);
};
</script>

<template>
  <div>
    <transition name="fade">
      <v-card class="mb-10 pa-8" v-if="bookmarks.length">
        <v-card-title> Liste de lecture </v-card-title>
        <v-card-text>
          <TransitionGroup tag="div" class="v-row" name="fade-down">
            <v-col
              :cols="12"
              :md="4"
              :lg="3"
              v-for="bookmark in bookmarks"
              :key="bookmark.id"
            >
              <RessourceItem
                @remove-from-bookmarks="removeFromBookmarksAction($event)"
                :ressource="bookmark"
                :isBookmark="true"
              />
            </v-col>
          </TransitionGroup>
        </v-card-text>
      </v-card>
    </transition>

    <v-row>
      <v-col
        :cols="12"
        :md="4"
        :lg="3"
        v-for="ressource in ressources"
        :key="ressource.id"
      >
        <RessourceItem
          @add-to-bookmarks="addToBookmarksAction($event)"
          :ressource="ressource"
        />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.fade-down-enter-from {
  opacity: 0;
}
.fade-down-leave-to {
  opacity: 0;
  transform: translatey(100px);
}
.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 0.5s ease-out;
}
</style>
