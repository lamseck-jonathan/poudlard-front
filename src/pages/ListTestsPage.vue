<template>
  <div class="q-pa-md q-gutter-y-lg">
    <item-test v-for="test in tests" :key="test.id" :test="test" />
  </div>
</template>

<script setup lang="ts">
import ItemTest from 'src/components/ItemTest.vue';
import { Test } from 'src/model/Test.interface';

const tests: Test[] = [
  {
    id: '1',
    titre: 'Js Callback',
    description: 'Decrivez ce que vous entendez par Callback ',
    categorie: 'QCMM',
    duree: 30000,
    bareme: 4,
    type: 'QuestionChoixMultiple',
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
    type: 'QuestionChoixMultiple',
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
];
</script>
