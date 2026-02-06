import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import type { Account } from '@/types/account';

const STORAGE_KEY = 'accounts';

function loadFromStorage(): Account[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

function saveToStorage(accounts: Account[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

export const useAccountStore = defineStore('account', () => {
  const accounts = reactive<Account[]>(loadFromStorage());

  watch(accounts, () => {
    saveToStorage(accounts);
  }, { deep: true });

  function addAccount(account: Account) {
    accounts.push(account);
  }

  function removeAccount(index: number) {
    accounts.splice(index, 1);
  }

  return { accounts, addAccount, removeAccount };
});
