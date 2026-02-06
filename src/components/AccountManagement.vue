<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      Учетные записи
      <v-spacer />
      <v-btn color="primary" @click="openDialog">
        <v-icon start>mdi-plus</v-icon>
        Добавить запись
      </v-btn>
    </v-card-title>
  </v-card>

  <AccountDialog v-model="dialog" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AccountDialog from './AccountDialog.vue';

const dialog = ref(false);

function openDialog() {
  dialog.value = true;
}
</script>
