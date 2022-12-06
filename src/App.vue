<script lang="ts" setup>
const name = "Fabien";
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
        <h1>Hello {{ name }} !</h1>
      </v-container>
    </v-main>
  </v-app>
</template>
