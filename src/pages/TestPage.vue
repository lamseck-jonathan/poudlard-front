<template>
  <div class="row window-height">
    <div class="col-md-6 col-sm-12 flex justify-center q-py-md q-pl-md q-pr-sm">
      <section-test :test="test" />
    </div>
    <div class="col-md-6 col-sm-12 flex justify-center q-py-md q-pl-sm q-pr-md">
      <section-answer :test="test" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionAnswer from 'src/components/SectionAnswer.vue';
import SectionTest from 'src/components/SectionTest.vue';
import Test from 'src/models/Test';
import { reactive } from 'vue';
const test = reactive<Test>({
  id: 0,
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
});
</script>
