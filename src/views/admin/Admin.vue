<script lang="ts" setup></script>

<template>
  <div>
    <h1>Administration</h1>

    <v-btn color="primary" :to="{ name: 'AdminManagement' }">Gestion</v-btn>
    <v-btn class="ml-2" color="primary" :to="{ name: 'AdminValidation' }"
      >Validation</v-btn
    >

    <div class="mt-8"><router-view></router-view></div>
  </div>
</template>
