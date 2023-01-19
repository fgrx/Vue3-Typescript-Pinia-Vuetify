<script setup lang="ts">
import { ref } from "vue";
import eventBus from "@/plugins/eventBus";
import IMessage from "@/interfaces/IMessage";

const isOpen = ref(false);
const message = ref<IMessage>({ text: "", color: "" });

eventBus.on("show-message", (params) => {
  const messageSent = params as IMessage;

  message.value.text = messageSent.text;
  message.value.color = messageSent.color;
  isOpen.value = true;
});
</script>

<template>
  <v-snackbar :color="message.color" v-model="isOpen">
    <span data-test-id="snackbar-message">{{ message.text }}</span>
  </v-snackbar>
</template>
