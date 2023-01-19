<script lang="ts" setup>
import { ref } from "vue";
import useAuthStore from "@/stores/AuthStore";
import { useRouter } from "vue-router";

const credentials = ref({ email: "admin@gmail.com", password: "12345" });

const authStore = useAuthStore();

const router = useRouter();

const connectAction = async () => {
  const res = await authStore.connect(credentials.value);

  if (res) {
    router.push({ name: "Admin" });
  }
};
</script>

<template>
  <div>
    <h1>Connexion</h1>

    <v-card>
      <v-card-text>
        <v-form>
          <v-text-field
            data-test-id="email"
            v-model="credentials.email"
            label="Adresse email"
          ></v-text-field>
          <v-text-field
            data-test-id="password"
            v-model="credentials.password"
            type="password"
            label="Mot de passe"
          ></v-text-field>

          <v-btn data-test-id="button" @click="connectAction" color="primary"
            >Connexion</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
