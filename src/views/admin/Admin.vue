<script lang="ts" setup></script>

<template>
  <div>
    <h1>Administration</h1>

    <v-btn color="primary" :to="{ name: 'AdminManagement' }">{{
      $t("nav.management")
    }}</v-btn>
    <v-btn class="ml-2" color="primary" :to="{ name: 'AdminValidation' }">{{
      $t("nav.validation")
    }}</v-btn>

    <div class="mt-8"><router-view></router-view></div>
  </div>
</template>
