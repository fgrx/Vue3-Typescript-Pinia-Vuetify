<script lang="ts" setup>
import type IRessource from "@/interfaces/iRessource";
import RessourceItem from "@/components/RessourceItem.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import { ref } from "vue";

import data from "@/data/db";

const ressources = data as Array<IRessource>;
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
  <v-app>
    <v-app-bar color="primary" light>
      <v-app-bar-title> DevWall </v-app-bar-title>
      <v-spacer />
      <v-btn>Menu 1</v-btn>
      <v-btn>Menu 2</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-card class="mb-10 pa-8" v-if="bookmarks.length">
          <v-card-title> Liste de lecture </v-card-title>

          <v-card-text>
            <v-row>
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
            </v-row>
          </v-card-text>
        </v-card>

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
      </v-container>
    </v-main>
    <VideoPlayer />
  </v-app>
</template>

<style>
/* .ressource-item-top-card {
  background-color: rgb(242, 249, 207);
} */
</style>
