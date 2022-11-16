<template>
  <div class="q-pa-md q-gutter-y-lg">
    <item-test v-for="test in tests" :key="test.id" :test="test" />
  </div>
</template>

<script setup lang="ts">
import ItemTest from 'src/components/ItemTest.vue';
import Test from 'src/models/Test';

const tests: Test[] = [
  {
    id: 1,
    test_libelle: 'Js Callback',
    test_description: 'Decrivez ce que vous entendez par Callback ',
    test_categorie: '"Js',
    test_duree: 30000,
    test_bareme: 4,
    test_type: 'QuestionChoixMultiple',
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
    id: 2,
    test_libelle: 'Js Callback',
    test_description: 'Decrivez ce que vous entendez par Callback ',
    test_categorie: '"Js',
    test_duree: 30000,
    test_bareme: 4,
    test_type: 'QuestionChoixMultiple',
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
