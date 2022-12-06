<script lang="ts" setup>
import VideoPlayer from "@/components/VideoPlayer.vue";
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
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <VideoPlayer />
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
