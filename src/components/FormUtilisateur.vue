<template>
  <q-form
    class="q-gutter-md form-sujet"
    @submit="onSubmit"
    @validationError="displayInvalidFormError"
    greedy
  >
    <div class="row">
      <q-input
        v-model="utilisateurModel.nom"
        class="col q-pr-sm"
        label="Nom"
        :rules="[required]"
        :readonly="isInReadMode()"
        hide-bottom-space1
        outlined
        dense
      />

      <q-input
        v-model="utilisateurModel.prenom"
        class="col q-pl-sm"
        label="Prénom(s)"
        :rules="[required]"
        :readonly="isInReadMode()"
        hide-bottom-space
        outlined
        dense
      />
    </div>

    <div class="row">
      <q-select
        v-model="utilisateurModel.role"
        class="col q-pr-md"
        label="Role"
        :options="[Role.ADMIN, Role.RECRUITER]"
        :rules="[required]"
        :readonly="isInReadMode()"
        hide-bottom-space
        outlined
        dense
      />

      <q-checkbox
        class="col"
        label="Actif"
        v-model="utilisateurModel.actif"
        :disable="isInReadMode()"
      />
    </div>

    <div class="row">
      <q-input
        v-model="utilisateurModel.email"
        class="col q-pr-sm"
        label="Email"
        type="email"
        readonly
        hide-bottom-space
        outlined
        dense
      />

      <q-input
        v-model="utilisateurModel.telephone"
        class="col q-pl-sm"
        label="Téléphone"
        type="tel"
        :rules="[required]"
        :readonly="isInReadMode()"
        hide-bottom-space
        outlined
        dense
      />
    </div>

    <q-btn
      v-show="!isInReadMode()"
      class="row"
      type="submit"
      color="blue-grey-7"
      label="Enregistrer"
      style="width: 98%"
    />
  </q-form>
</template>

<script lang="ts" setup>
import { CrudAction } from 'src/enums/CrudAction.enum';
import { Role } from 'src/enums/Role.enum';
import { User } from 'src/model/User.interface';
import { PropType, computed } from 'vue';
import { required } from 'src/utils/validationRules.util';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Object as PropType<User>,
    required: true,
  },

  mode: {
    type: String as PropType<CrudAction>,
    required: true,
  },
});

const utilisateurModel = computed({
  get() {
    return props.modelValue;
  },

  set(newValue) {
    emit('update:modelValue', newValue);
  },
});

function isInReadMode() {
  return props.mode === CrudAction.READ;
}

function onSubmit() {
  console.log('submit', utilisateurModel.value);
}

function displayInvalidFormError() {
  console.log('form error');
}
</script>
