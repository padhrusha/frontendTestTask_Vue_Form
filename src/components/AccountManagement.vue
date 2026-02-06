<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      Учетные записи
      <v-spacer />
      <v-btn color="primary" :disabled="!canAdd" @click="addAccount">
        <v-icon start>mdi-plus</v-icon>
        Добавить запись
      </v-btn>
    </v-card-title>

    <v-card-text>
      <AccountRow
        v-for="(account, index) in addedAccounts"
        :key="'added-' + index"
        :account="account"
        @remove="removeAdded(index)"
      />

      <v-divider v-if="addedAccounts.length && editingAccount" class="my-10" />

      <AccountRow
        v-if="editingAccount"
        :account="editingAccount"
        editing
        @remove="removeEditing"
        @saved="onAccountSaved"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import AccountRow from './AccountRow.vue';
import type { Account } from '@/types/account';

const addedAccounts = reactive<Account[]>([]);
const editingAccount = ref<Account | null>(null);

const canAdd = computed(() => !editingAccount.value);

function createEmptyAccount(): Account {
  return {
    labelInput: '',
    label: [],
    entryType: '',
    login: '',
    password: null,
    saved: false,
  };
}

function addAccount() {
  if (!canAdd.value) return;
  editingAccount.value = reactive(createEmptyAccount());
}

function onAccountSaved() {
  if (!editingAccount.value) return;
  editingAccount.value.saved = true;
  addedAccounts.push(editingAccount.value);
  editingAccount.value = null;
}

function removeAdded(index: number) {
  addedAccounts.splice(index, 1);
}

function removeEditing() {
  editingAccount.value = null;
}
</script>
