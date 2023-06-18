<script lang="ts" setup>
import eventBus from "@/plugins/eventBus";
import type IRessource from "@/interfaces/iRessource";
import { ref, computed } from "vue";
import IMessage from "@/interfaces/IMessage";
import useRessourceStore from "@/stores/ressourceStore";
import { storeToRefs } from "pinia";
import useGeneralStore from "@/stores/generalStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const ressourceStore = useRessourceStore();

const generalStore = useGeneralStore();
const { ressourceForm } = storeToRefs(generalStore);

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

const itemsLang = computed(() => [
  { text: t("languages.en"), value: "en" },
  { text: t("languages.fr"), value: "fr" },
]);

const itemsMedia = computed(() => [
  { text: t("mediaTypes.book"), value: "book" },
  { text: t("mediaTypes.video"), value: "video" },
  { text: t("mediaTypes.post"), value: "post" },
]);

generalStore.$subscribe((mutation, state) => {
  if (state.ressourceForm.isOpen) {
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
  }
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
    ressourceForm.value.isOpen = false;
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
  <v-dialog v-model="ressourceForm.isOpen" width="80%">
    <v-card>
      <v-card-title>{{ $t("form.formTitle") }}</v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-alert v-if="message.text" :type="message.type">{{
            message.text
          }}</v-alert>

          <v-text-field
            v-model="ressource.title"
            :label="$t('form.title')"
            :rules="titleRules"
          ></v-text-field>

          <v-text-field
            v-model="ressource.url"
            :label="$t('form.url')"
            :rules="urlRules"
          ></v-text-field>

          <v-text-field
            v-model="ressource.image"
            :label="$t('form.image')"
          ></v-text-field>

          <v-textarea
            v-model="ressource.description"
            :label="$t('form.description')"
          ></v-textarea>

          <v-rating
            v-model="ressource.rating"
            :label="$t('form.rating')"
          ></v-rating>

          <v-select
            v-model="ressource.lang"
            :label="$t('form.language')"
            :items="itemsLang"
            item-title="text"
            item-value="value"
          ></v-select>

          <v-select
            v-model="ressource.media"
            :label="$t('form.mediaType')"
            :items="itemsMedia"
            item-title="text"
            item-value="value"
          ></v-select>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="addRessourceAction" variant="tonal" color="primary">{{
          $t("form.add")
        }}</v-btn>
        <v-btn @click="ressourceForm.isOpen = false">{{
          $t("form.cancel")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
