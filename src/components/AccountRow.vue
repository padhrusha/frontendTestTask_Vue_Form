<template>
  <v-card
    class="mb-2"
    :class="{'create-mode': editing }"
    variant="outlined"
    @mouseleave="onMouseLeave"
  >
    <v-card-text>
      <v-row align="start">
        <v-col cols="12" sm="6" :md="hasPassword ? 3 : 4">
          <v-text-field
            v-model="account.labelInput"
            label="Метка"
            maxlength="50"
            counter
            hint="значения разделяются символом ;"
            :rules="labelRules"
            validate-on="blur"
            @blur="parseLabels"
            density="compact"
            persistent-hint
          />
        </v-col>
        <v-col cols="12" sm="6" :md="hasPassword ? 2 : 3">
          <v-select
            v-model="account.entryType"
            label="Тип записи"
            :items="entryTypes"
            density="compact"
            persistent-hint
          />
        </v-col>
        <v-col cols="12" sm="6" :md="hasPassword ? 3 : 4">
          <v-text-field
            v-model="account.login"
            label="Логин"
            :rules="requiredRules"
            maxlength="100"
            density="compact"
            persistent-hint
          />
        </v-col>
        <v-col v-if="hasPassword" cols="12" sm="6" md="3">
          <v-text-field
            v-model="account.password"
            label="Пароль"
            type="password"
            :rules="requiredRules"
            maxlength="100"
            density="compact"
            persistent-hint
          />
        </v-col>
        <v-col cols="auto">
          <v-btn icon="mdi-delete" variant="text" color="error" @click="emit('remove')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import type { Account } from '@/types/account';

const props = withDefaults(defineProps<{
  account: Account
  editing?: boolean
}>(), {
  editing: false,
});

const emit = defineEmits<{
  remove: []
  saved: []
}>();

const hasPassword = computed(() => props.account.entryType !== 'LDAP');

const entryTypes = ['LDAP', 'Локальная'];

const requiredRules = [
  (v: string) => !!v || 'Поле обязательно для заполнения',
];

const labelPattern = /^[\p{L}\p{N}\s]+(;[\p{L}\p{N}\s]+)*;?$/u;

const labelRules = [
  (v: string) => !v || labelPattern.test(v) || 'Допускаются только буквы, цифры и пробелы, разделённые символом ;',
];

function isComplete(): boolean {
  if (!props.account.entryType || !props.account.login) return false;
  if (hasPassword.value && !props.account.password) return false;
  if (props.account.labelInput && !labelPattern.test(props.account.labelInput)) return false;
  return true;
}

function parseLabels() {
  props.account.label = (props.account.labelInput || '')
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => ({ test: s }));
}

function onMouseLeave() {
  parseLabels();
  if (isComplete()) {
    emit('saved');
  }
}

watch(() => props.account.entryType, (value) => {
  if (value === 'LDAP') {
    props.account.password = null;
  }
});
</script>


<style scoped>
.create-mode {
  border-color: rgb(var(--v-theme-primary));
}
</style>
