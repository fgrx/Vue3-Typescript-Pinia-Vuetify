<script lang="ts" setup>
import type IRessource from "@/interfaces/iRessource";
import defaultImage from "@/assets/default-image.png";
import frenchFlag from "@/assets/frenchFlag.svg";

import data from "@/data/db";

const ressources = data as Array<IRessource>;
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
        <v-row>
          <v-col
            :cols="12"
            :md="4"
            :lg="3"
            v-for="ressource in ressources"
            :key="ressource.id"
          >
            <v-card
              :class="
                ressource.isTop ? 'ressource-item-top-card bg-secondary' : ''
              "
              :body-style="{ padding: '0px' }"
            >
              <v-img
                height="250"
                :src="ressource.image || defaultImage"
                class="ressource-image"
              />
              <div style="padding: 14px">
                <v-img
                  v-if="ressource.lang === 'fr'"
                  height="20"
                  :src="frenchFlag"
                />
                <v-card-title>
                  {{ ressource.title }}
                </v-card-title>

                <v-card-subtitle>
                  {{ ressource.media }} ajouté(e) le
                  {{ ressource.date }}
                </v-card-subtitle>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* .ressource-item-top-card {
  background-color: rgb(242, 249, 207);
} */
</style>
