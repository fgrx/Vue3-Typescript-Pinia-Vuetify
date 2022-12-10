<script lang="ts">
import IRessource from "@/interfaces/iRessource";
import { defineComponent, PropType } from "vue";
import defaultImage from "@/assets/default.jpg";
import frenchFlag from "@/assets/frenchflag.png";
import eventBus from "@/plugins/eventBus";

export default defineComponent({
  props: {
    ressource: {
      type: Object as PropType<IRessource>,
      default: {},
    },
    isBookmark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      frenchFlag,
      defaultImage,
    };
  },
  computed: {
    dateInFrench() {
      const dateObj = new Date(this.ressource.date);
      return dateObj.toLocaleDateString();
    },
    mediaInFrench() {
      switch (this.ressource.media) {
        case "book":
          return "Livre";
        case "post":
          return "Article";
        case "video":
          return "Vidéo";
        default:
          return "Ressource";
      }
    },
  },
  methods: {
    addToListAction(ressource: IRessource) {
      this.$emit("add-ressource", ressource);
    },
    removeFormListAction(ressource: IRessource) {
      this.$emit("remove-ressource", ressource);
    },
    openPlayerAction(ressource: IRessource) {
      eventBus.emit("open-video-player", ressource);
    },
  },
});
</script>

<template>
  <v-card
    class="ressource"
    :class="ressource.isTop ? 'ressource-item-top-card' : ''"
  >
    <router-link :to="{ name: 'Ressource', params: { id: ressource.id } }">
      <v-img height="250" :src="ressource.image || defaultImage" />
    </router-link>

    <v-img v-if="ressource.lang === 'fr'" height="20" :src="frenchFlag" />
    <v-card-title>{{ ressource.title }}</v-card-title>
    <v-card-text
      >{{ mediaInFrench }} posté(e) le {{ dateInFrench }}</v-card-text
    >
    <v-card-actions>
      <v-btn
        v-if="!isBookmark"
        @click="addToListAction(ressource)"
        color="primary"
        >+ Liste</v-btn
      >
      <v-btn
        v-if="isBookmark"
        @click="removeFormListAction(ressource)"
        color="error"
        >- Liste</v-btn
      >

      <v-btn
        v-if="ressource.media === 'video'"
        @click="openPlayerAction(ressource)"
        icon="mdi-play-circle"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
.ressource-item-top-card {
  background-color: rgb(242, 249, 207) !important;
}

.test {
  p {
    border: 1px solid black;
  }
}
</style>
