<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      Учетные записи
      <v-spacer />
      <v-btn color="primary" :disabled="!canAdd" @click="startEditing">
        <v-icon start>mdi-plus</v-icon>
        Добавить запись
      </v-btn>
    </v-card-title>

    <v-card-text>
      <AccountRow
        v-for="(account, index) in store.accounts"
        :key="'added-' + index"
        :account="account"
        @remove="store.removeAccount(index)"
      />

      <v-divider v-if="store.accounts.length && editingAccount" class="my-10" />

      <AccountRow
        v-if="editingAccount"
        :account="editingAccount"
        editing
        @remove="editingAccount = null"
        @saved="onAccountSaved"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import AccountRow from './AccountRow.vue';
import { useAccountStore } from '@/stores/account';
import type { Account } from '@/types/account';

const store = useAccountStore();
const editingAccount = ref<Account | null>(null);

const canAdd = computed(() => !editingAccount.value);

function startEditing() {
  if (!canAdd.value) return;
  editingAccount.value = reactive<Account>({
    labelInput: '',
    label: [],
    entryType: '',
    login: '',
    password: null,
    saved: false,
  });
}

function onAccountSaved() {
  if (!editingAccount.value) return;
  editingAccount.value.saved = true;
  store.addAccount(editingAccount.value);
  editingAccount.value = null;
}
</script>
