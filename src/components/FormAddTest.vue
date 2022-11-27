<template>
  <q-form
    class="q-gutter-md"
    @submit="onSubmit"
    @validationError="displayInvalidFormError"
    greedy
  >
    <div class="row">
      <q-input
        class="col-4 q-pr-md"
        v-model="testModel.id"
        label="Id"
        readonly
        hide-bottom-space
        outlined
        dense
      />

      <q-input
        class="col-8"
        v-model="testModel.titre"
        label="Titre"
        :rules="[required]"
        hide-bottom-space
        outlined
        dense
      />
    </div>

    <div class="row">
      <div class="col-4 q-pr-md q-gutter-y-md">
        <q-input
          v-model="testModel.categorie"
          label="Catégorie"
          :rules="[required]"
          hide-bottom-space
          outlined
          dense
        />

        <q-input
          v-model="testModel.duree"
          label="Durée (ms)"
          type="number"
          :rules="[required]"
          hide-bottom-space
          outlined
          dense
        />

        <q-input
          v-model="testModel.bareme"
          type="number"
          label="Point"
          :rules="[required]"
          hide-bottom-space
          outlined
          dense
        />

        <q-select
          v-model="testModel.type"
          label="Type"
          :options="testType"
          hide-bottom-space
          outlined
          dense
        />
      </div>

      <q-input
        class="col-8 description-textarea"
        v-model="testModel.description"
        label="Description"
        type="textarea"
        :rules="[required]"
        hide-bottom-space
        outlined
        dense
      />
    </div>

    <!-- TYPE QR -->
    <div v-show="testModel.type === TestType.QR" class="row">
      <q-input
        class="col-12"
        v-model="testModel.reponse"
        label="Reponse"
        :rules="[required]"
        hide-bottom-space
        outlined
        dense
      />
    </div>

    <!-- TYPE QCMU -->
    <div v-show="testModel.type === TestType.QCMU" class="row q-gutter-y-md">
      <q-btn
        color="blue-grey-5"
        label="Ajouter une ligne de choix"
        style="width: 100%"
        outline
        @click="addNewChoix"
      />

      <template v-for="c in testModel.choix" :key="c.id">
        <q-input
          class="col-10"
          v-model="c.reponse"
          label="Réponse"
          :rules="[required]"
          hide-bottom-space
          outlined
          dense
        />

        <q-radio
          class="col-1 justify-center"
          v-model="trueResponseId"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          :val="c.id"
        />

        <q-btn
          round
          flat
          class="text-red justify-center"
          icon="mdi-close"
          @click="deleteTestChoix(c.id)"
        />
      </template>
    </div>

    <!-- TYPE QCMM -->
    <div v-show="testModel.type === TestType.QCMM" class="row q-gutter-y-md">
      <q-btn
        color="blue-grey-5"
        label="Ajouter une ligne de choix"
        style="width: 100%"
        outline
        @click="addNewChoix"
      />

      <template v-for="c in testModel.choix" :key="c.id">
        <q-input
          class="col-10"
          v-model="c.reponse"
          label="Réponse"
          :rules="[required]"
          hide-bottom-space
          outlined
          dense
        />

        <q-checkbox class="col-1 justify-center" v-model="c.isTrue" dense />

        <q-btn
          round
          flat
          class="text-red justify-center"
          icon="mdi-close"
          @click="deleteTestChoix(c.id)"
        />
      </template>
    </div>

    <q-btn
      class="row"
      type="submit"
      color="blue-grey-7"
      label="Ajouter"
      style="width: 98%"
    ></q-btn>
  </q-form>
</template>

<script lang="ts" setup>
import { TestType } from 'src/enums/TestType.enum';
import { Test } from 'src/model/Test.interface';
import { ref } from 'vue';
import { required } from 'src/utils/validationRules.util';

const testModel = ref<Test>(getEmptyTestModel());
const testType: TestType[] = [TestType.QCMM, TestType.QCMU, TestType.QR];
const trueResponseId = ref<number>();

function onSubmit() {
  console.log('on test submit');
}

function displayInvalidFormError() {
  console.log('invalid form Error');
}

function addNewChoix() {
  const choiceLength = testModel.value.choix?.length || 0;

  if (choiceLength < 4) {
    testModel.value.choix?.push({
      id: testModel.value.choix.length + 1,
      reponse: '',
      isTrue: false,
    });
  }
}

function getEmptyTestModel() {
  return {
    id: '',
    titre: '',
    description: '',
    categorie: '',
    duree: 0,
    bareme: 0,
    choix: [
      {
        id: 1,
        reponse: '',
        isTrue: false,
      },
      {
        id: 2,
        reponse: '',
        isTrue: false,
      },
    ],
    reponse: '',
    type: TestType.QCMU,
  };
}

function deleteTestChoix(id: number) {
  if (testModel.value.choix && testModel.value.choix.length > 2) {
    const idx = testModel.value.choix.findIndex((el) => el.id === id);

    if (idx > -1) {
      testModel.value.choix?.splice(idx, 1);
    }
  }
}
</script>

<style lang="scss">
.description-textarea textarea {
  height: 12rem;
}
</style>
