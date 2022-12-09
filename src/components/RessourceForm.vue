<script lang="ts" setup>
import eventBus from "@/plugins/eventBus";
import ressourceService from "@/services/ressourceService";
import type IRessource from "@/interfaces/iRessource";
import { ref } from "vue";
import IMessage from "@/interfaces/IMessage";
import useRessourceStore from "@/stores/ressourceStore";

const ressourceStore = useRessourceStore();

const isOpen = ref(false);
const message = ref<{
  text: string;
  type: "error" | "success" | "warning" | "info" | undefined;
}>({
  type: "error",
  text: "",
});

const ressource = ref<IRessource>({
  title: "",
  url: "",
  image: "",
  description: "",
  rating: 3,
  lang: "fr",
  media: "post",
  isTop: false,
  date: "",
  isValid: false,
});

const itemsLang = [
  { text: "Anglais", value: "en" },
  { text: "Français", value: "fr" },
];

const itemsMedia = [
  { text: "Livre", value: "book" },
  { text: "Vidéo", value: "video" },
  { text: "Article", value: "post" },
];

eventBus.on("open-ressource-form", () => {
  isOpen.value = true;

  message.value.text = "";
  message.value.type = "success";

  ressource.value = {
    title: "",
    url: "",
    image: "",
    description: "",
    rating: 3,
    lang: "fr",
    media: "post",
    isTop: false,
    date: "",
    isValid: false,
  };
});

const addRessourceAction = async () => {
  const validationResult = await form.value.validate();
  if (validationResult.valid) saveRessource();
};

const saveRessource = async () => {
  const dateObj = new Date();
  ressource.value.date = dateObj.toISOString();

  const createdRessource = await ressourceStore.addRessource(ressource.value);

  if (createdRessource) {
    const message: IMessage = {
      text: "Ressource ajoutée avec succès ! 👍",
      color: "success",
    };
    eventBus.emit("show-message", message);
    isOpen.value = false;
  } else {
    const message: IMessage = {
      text: "Une erreur s'est produite 😔",
      color: "error",
    };
    eventBus.emit("show-message", message);
  }
};

//Form Validation
const form = ref();

const titleRules = [
  (v: string) => !!v || "Le titre est requis",
  (v: string) =>
    (v && v.length >= 5) || "Le titre doit avoir plus de 5 caractères",
];

const urlRules = [
  (v: string) => !!v || "Une URL est requise",
  (v: string) => (v && v.includes("http")) || "Une url doit contenir http",
];
</script>

<template>
  <v-dialog v-model="isOpen" width="80%">
    <v-card>
      <v-card-title>Ajout d'une nouvelle ressource</v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-alert v-if="message.text" :type="message.type">{{
            message.text
          }}</v-alert>

          <v-text-field
            v-model="ressource.title"
            label="Title"
            :rules="titleRules"
          ></v-text-field>

          <v-text-field
            v-model="ressource.url"
            label="url"
            :rules="urlRules"
          ></v-text-field>

          <v-text-field v-model="ressource.image" label="image"></v-text-field>

          <v-textarea
            v-model="ressource.description"
            label="Description"
          ></v-textarea>

          <v-rating v-model="ressource.rating" label="Note"></v-rating>

          <v-select
            v-model="ressource.lang"
            label="Langue"
            :items="itemsLang"
            item-title="text"
            item-value="value"
          ></v-select>

          <v-select
            v-model="ressource.media"
            label="Type"
            :items="itemsMedia"
            item-title="text"
            item-value="value"
          ></v-select>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="addRessourceAction" variant="tonal" color="primary"
          >Ajouter</v-btn
        >
        <v-btn @click="isOpen = false">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
