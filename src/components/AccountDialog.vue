<template>
  <v-dialog v-model="visible" max-width="500">
    <v-card>
      <v-card-title>Новая запись</v-card-title>
      <v-card-text>
        <v-text-field label="Метка" />
        <v-select label="Тип записи" :items="[]" />
        <v-text-field label="Логин" />
        <v-text-field label="Пароль" type="password" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="closeDialog">Отмена</v-btn>
        <v-btn color="primary">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>();

function closeDialog() {
  visible.value = false;
}

</script>
