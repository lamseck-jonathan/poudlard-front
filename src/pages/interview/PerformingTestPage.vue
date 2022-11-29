<template>
  <q-page>
    <div class="row" style="height: 85vh">
      <div
        class="col-md-6 col-sm-12 flex justify-center q-py-md q-pl-md q-pr-sm"
      >
        <panel-section-test
          :test="currentTest"
          @click:next-question="displayNextTest()"
        />
      </div>
      <div
        class="col-md-6 col-sm-12 flex justify-center q-py-md q-pl-sm q-pr-md"
      >
        <panel-section-answer
          :test="currentTest"
          v-model:answer="answerModel"
        />
      </div>
    </div>

    <div class="row justify-end q-px-md">
      <div class="col-6 q-pl-sm">
        <q-btn
          class="full-width"
          label="Question Suivante"
          color="primary"
          @click="displayNextTest"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import PanelSectionAnswer from 'src/components/PanelSectionAnswer.vue';
import PanelSectionTest from 'src/components/PanelSectionTest.vue';
// import { fakeBackendTestList, fakeFrontendTestList } from 'src/data/tests.fake';
import { Test } from 'src/model/Test.interface';
import { ReponseCandidat } from 'src/model/Reponse.interface';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useEntretienStore } from 'src/stores/entretien-store';

const counter = ref<number>(0);
const currentTest = ref<Test>({} as Test);
const answerModel = ref<ReponseCandidat>({} as ReponseCandidat);

const entretienStore = useEntretienStore();
const testList = reactive<Test[]>(entretienStore.currentInterview.sujet.tests);
const router = useRouter();

const reponseCandidats = reactive<ReponseCandidat[]>([]);

onBeforeMount(() => {
  initCurrentTest();
  initAnswerModel(currentTest.value);
});

function displayNextTest() {
  // save response
  console.log(answerModel.value);

  reponseCandidats.push(answerModel.value);

  // display next
  counter.value++;

  if (counter.value < testList.length) {
    initCurrentTest();
    initAnswerModel(currentTest.value);
  } else {
    console.log('resultat : ', reponseCandidats);
    // modifié le sujet (ajouter les reponses de tests et statut = achevé)
    router.push({ name: 'interview-finished' });
  }
}

function initCurrentTest() {
  currentTest.value = { ...testList[counter.value] };
}

function initAnswerModel(test: Test) {
  answerModel.value = { test };
}
</script>
