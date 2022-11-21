<template>
  <q-form>
    <div class="row">
      <q-input
        outlined
        class="col-6 q-pr-sm"
        v-model="test.titre"
        label="Titre du test"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        outlined
        class="col-6"
        v-model="test.categorie"
        label="Categorie du test"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>

    <q-input
      outlined
      v-model="test.description"
      label="Description du test"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />
    <div class="row">
      <q-select
        outlined
        class="col-6 q-pr-sm"
        v-model="typeTest"
        :options="listeTypeTest"
        option-value="id"
        option-label="label"
        label="Type test"
      />
      <q-input
        class="col-3 q-pr-sm"
        outlined
        v-model="test.duree"
        label="Duree du test"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        class="col-3"
        outlined
        v-model="test.bareme"
        label="Bareme"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>
    <div v-if="typeTest?.type_test === 'QCM'" class="q-gutter-y-sm q-py-sm">
      <reponse-input label="Reponse 1" v-model="reponseQCM1"></reponse-input>
      <reponse-input label="Reponse 2" v-model="reponseQCM2"></reponse-input>
      <reponse-input label="Reponse 3" v-model="reponseQCM3"></reponse-input>
    </div>
    <div v-if="typeTest?.type_test === 'QCU'" class="q-gutter-y-sm q-py-sm">
      <qcu-input v-model="reponsesQCU"></qcu-input>
      {{ reponsesQCU }}
    </div>
    <div v-if="typeTest?.type_test === 'QR'" class="q-gutter-y-sm q-py-sm">
      <q-input outlined v-model="reponseQR" label="Reponse" />
    </div>
    <div class="row justify-between">
      <q-space />
      <q-btn @click="submit" label="ajouter" color="primary"></q-btn>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { Test } from 'src/model/Test.interface';
import { reactive, ref } from 'vue';
import { TypeTest } from 'src/model/Test.interface';
import ReponseInput from './ReponseInput.vue';
import QcuInput from './QcuInput.vue';
import { Reponse } from 'src/model/Reponse.interface';

const emit = defineEmits(['submitted']);

const typeTest = ref<TypeTest>();
const test = reactive<Test>({
  id: '',
  titre: '',
  description: '',
  categorie: 'QCMU',
  duree: 0,
  bareme: 0,
  choix: [],
  reponse: '',
  type: {} as TypeTest,
});
const listeTypeTest = ref<TypeTest[]>([
  {
    id: 1,
    type_test: 'QCM',
    label: 'Question Choix Multiple',
  },
  {
    id: 2,
    type_test: 'QCU',
    label: 'Question Choix Unique',
  },
  {
    id: 3,
    type_test: 'QR',
    label: 'Question Reponse',
  },
]);

const reponseQCM1 = ref();
const reponseQCM2 = ref();
const reponseQCM3 = ref();
const reponseQR = ref();
const reponsesQCU = ref();

function submit() {
  if (typeTest.value?.type_test === 'QCM') {
    test.choix?.push(reponseQCM1.value);
    test.choix?.push(reponseQCM2.value);
    test.choix?.push(reponseQCM3.value);
    console.log(test);
    console.log(reponseQCM1.value);
    console.log(reponseQCM2.value);
    console.log(reponseQCM3.value);
    emit('submitted', test);
  } else if (typeTest.value?.type_test === 'QCU') {
    reponsesQCU.value.forEach((item: Reponse) => {
      test.choix?.push(item);
    });
    console.log(test);
    console.log(reponsesQCU);
    emit('submitted', test);
  } else {
    test.reponse = reponseQR.value;
    console.log(test);
    console.log(reponseQR.value);
    emit('submitted', test);
  }
}
</script>
