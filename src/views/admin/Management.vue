<script lang="ts" setup>
import useAdmin from "@/composables/useAdmin";

const { deleteRessourceAction, validRessources } = useAdmin();
</script>

<template>
  <div>
    <v-card>
      <v-card-title>Gestion</v-card-title>

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
            <tr v-for="ressource in validRessources" :key="ressource.id">
              <td>{{ ressource.title }}</td>
              <td>{{ ressource.date }}</td>
              <td>
                <v-btn @click="deleteRessourceAction(ressource)" color="warning"
                  >Supprimer</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </div>
</template>
