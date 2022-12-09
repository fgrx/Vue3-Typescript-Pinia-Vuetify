<script lang="ts" setup>
import useAdmin from "@/composables/useAdmin";

const { deleteRessourceAction, validateRessourceAction, invalidRessources } =
  useAdmin();
</script>

<template>
  <div>
    <v-card>
      <v-card-title>Validation</v-card-title>

      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Titre</th>
              <th class="text-left">date</th>
              <th>Opérations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ressource in invalidRessources" :key="ressource.id">
              <td>{{ ressource.title }}</td>
              <td>{{ ressource.date }}</td>
              <td>
                <v-btn
                  @click="validateRessourceAction(ressource)"
                  color="success"
                >
                  <v-icon icon="mdi-check"></v-icon>
                  Valider</v-btn
                >

                <v-btn
                  @click="deleteRessourceAction(ressource)"
                  class="ml-2"
                  color="warning"
                >
                  <v-icon icon="mdi-delete"></v-icon>
                  Supprimer</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </div>
</template>
