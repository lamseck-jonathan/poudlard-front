<template>
  <q-form
    class="q-gutter-md form-sujet"
    @submit="onSubmit"
    @validationError="displayInvalidFormError"
    greedy
  >
    <div class="row">
      <div class="col-4 q-gutter-y-md q-pr-md">
        <q-input
          class="row"
          v-model="sujetModel.id"
          label="Id"
          readonly
          hide-bottom-space
          outlined
          dense
        />

        <q-input
          class="row"
          v-model="sujetModel.titre"
          label="Titre"
          :rules="[required]"
          :readonly="isInReadMode()"
          hide-bottom-space
          outlined
          dense
        />

        <q-input
          class="row"
          v-model="sujetModel.auteur"
          label="Auteur"
          :readonly="isInReadMode()"
          hide-bottom-space
          outlined
          dense
        />

        <q-select
          class="row"
          v-model="sujetModel.niveau"
          label="Type"
          :options="niveauOptions"
          :rules="[required]"
          :readonly="isInReadMode()"
          hide-bottom-space
          outlined
          dense
        />

        <q-input
          class="row description-textarea"
          v-model="sujetModel.description"
          label="Description"
          type="textarea"
          :rules="[required]"
          :readonly="isInReadMode()"
          hide-bottom-space
          outlined
          dense
        />

        <q-input
          class="row"
          label="Total durée"
          :modelValue="msToTime(totalDuree)"
          readonly
          hide-bottom-space
          outlined
          dense
        />

        <q-input
          :modelValue="totalPoint"
          class="row"
          label="Total point"
          readonly
          hide-bottom-space
          outlined
          dense
        />
      </div>

      <div class="col">
        <drag-and-drop-list
          v-model:list1="allTests"
          v-model:list2="sujetModel.tests"
        />
      </div>
    </div>

    <q-btn
      v-show="!isInReadMode()"
      class="row"
      type="submit"
      color="blue-grey-7"
      label="Ajouter"
      style="width: 98%"
    />
  </q-form>
</template>

<script lang="ts" setup>
import DragAndDropList from './DragAndDropList.vue';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { Niveau } from 'src/enums/Niveau.enum';
import { Sujet } from 'src/model/Sujet.interface';
import { computed, onBeforeMount, onMounted, PropType, ref, watch } from 'vue';
import { required } from 'src/utils/validationRules.util';
import { fakeBackendTestList, fakeFrontendTestList } from 'src/data/tests.fake';
import { Test } from 'src/model/Test.interface';
import { msToTime } from 'src/utils/timeConvertor.util';
import getEmptySujetModel from 'src/utils/getEmptySujet.util';

const sujetModel = ref<Sujet>(getEmptySujetModel());
const allTests = ref<Test[]>([...fakeFrontendTestList, ...fakeBackendTestList]);

const emit = defineEmits(['update:modelValue', 'submit']);
const props = defineProps({
  modelValue: {
    type: Object as PropType<Sujet>,
    required: true,
  },
  mode: {
    type: String as PropType<CrudAction>,
    required: true,
  },
});

onMounted(() => {
  sujetModel.value = props.modelValue;
});

// custom v-model
watch(
  () => props.modelValue,
  () => (sujetModel.value = props.modelValue),
  { deep: true }
);

watch(
  () => sujetModel.value,
  () => emit('update:modelValue', sujetModel.value),
  { deep: true }
);

const totalDuree = computed(() => {
  let sujetDuree = 0;

  sujetModel.value.tests.forEach((test) => {
    sujetDuree += test.duree;
  });

  return sujetDuree;
});

const totalPoint = computed(() => {
  let sujetPoint = 0;

  sujetModel.value.tests.forEach((test) => {
    sujetPoint += test.bareme;
  });

  return sujetPoint;
});

const niveauOptions: Niveau[] = [
  Niveau.DEBUTANT,
  Niveau.INTERMEDIAIRE,
  Niveau.AVANCE,
];

onBeforeMount(() => {
  allTests.value = allTests.value.filter(
    (test) => sujetModel.value.tests.findIndex((el) => el.id === test.id) === -1
  );
});

function onSubmit() {
  emit('submit', sujetModel.value);
}

function displayInvalidFormError() {
  alert('error');
}

function isInReadMode(): boolean {
  return props.mode === CrudAction.READ;
}
</script>

<style lang="scss">
.form-sujet {
  .description-textarea textarea {
    height: 11rem;
  }
}
</style>
