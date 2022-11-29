<template>
  <div class="row">
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
import { TestType } from 'src/enums/TestType.enum';
import { Test } from 'src/model/Test.interface';
import { reactive } from 'vue';
const test = reactive<Test>({
  id: '1',
  titre: 'Js Callback',
  description: 'Decrivez ce que vous entendez par Callback ',
  categorie: 'QCMU',
  duree: 30000,
  bareme: 4,
  type: TestType.QCMU,
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
