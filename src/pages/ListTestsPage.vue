<template>
  <div class="q-pa-md q-gutter-y-lg">
    <div>
      <q-btn
        @click="showAjoutModal = true"
        icon="add"
        color="primary"
        outline
        label="Ajouter"
      />
    </div>
    <form-modal title="Ajouter un test" v-model="showAjoutModal">
      <form-ajout-test @submitted="addTest"></form-ajout-test>
    </form-modal>
    <item-test v-for="test in tests" :key="test.id" :test="test" />
  </div>
</template>

<script setup lang="ts">
import FormAjoutTest from 'src/components/Form/FormAjoutTest.vue';
import ItemTest from 'src/components/ItemTest.vue';
import FormModal from 'src/components/Modal/FormModal.vue';
import { Test } from 'src/model/Test.interface';
import { ref } from 'vue';

const showAjoutModal = ref<boolean>(false);
const tests = ref<Test[]>([
  {
    id: '1',
    titre: 'Js Callback',
    description: 'Decrivez ce que vous entendez par Callback ',
    categorie: 'QCMM',
    duree: 30000,
    bareme: 4,
    type: {
      id: 1,
      type_test: 'QCM',
      label: 'Question Choix Multiple',
    },
    choix: [
      {
        id: 1,
        reponse: "C'est rien",
        isTrue: false,
      },
      {
        id: 2,
        reponse: "C'est un callBack",
        isTrue: true,
      },
      {
        id: 3,
        reponse: "C'est CB",
        isTrue: false,
      },
    ],
  },
  {
    id: '2',
    titre: 'Js Promise',
    description: 'Decrivez ce que vous entendez par Promise',
    categorie: 'QCMM',
    duree: 30000,
    bareme: 4,
    type: {
      id: 1,
      type_test: 'QCM',
      label: 'Question Choix Multiple',
    },
    choix: [
      {
        id: 1,
        reponse: "C'est rien",
        isTrue: false,
      },
      {
        id: 2,
        reponse: "C'est un callBack",
        isTrue: true,
      },
      {
        id: 3,
        reponse: "C'est CB",
        isTrue: false,
      },
    ],
  },
]);
function addTest(test: Test) {
  console.log('submitted', test);
  tests.value.push(test);
}
</script>
