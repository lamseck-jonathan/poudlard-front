<template>
  <q-form
    class="q-gutter-md form-test"
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
        :readonly="isInReadMode()"
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
          :readonly="isInReadMode()"
          hide-bottom-space
          outlined
          dense
        />

        <q-input
          v-model="testModel.duree"
          label="Durée (ms)"
          type="number"
          :rules="[required]"
          :readonly="isInReadMode()"
          hide-bottom-space
          outlined
          dense
        />

        <q-input
          v-model="testModel.bareme"
          type="number"
          label="Point"
          :rules="[required]"
          :readonly="isInReadMode()"
          hide-bottom-space
          outlined
          dense
        />

        <q-select
          v-model="testModel.type"
          label="Type"
          :options="testType"
          :rules="[required]"
          :readonly="isInReadMode()"
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
        :readonly="isInReadMode()"
        hide-bottom-space
        outlined
        dense
      />
    </div>

    <!-- TYPE QR -->
    <div v-if="testModel.type === TestType.QR" class="row">
      <q-input
        class="col-12"
        v-model="testModel.reponse"
        label="Reponse"
        :rules="[required]"
        :readonly="isInReadMode()"
        hide-bottom-space
        outlined
        dense
      />
    </div>

    <!-- TYPE QCMU -->
    <div v-if="testModel.type === TestType.QCMU" class="row q-gutter-y-md">
      <q-btn
        v-show="!isInReadMode()"
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
          :readonly="isInReadMode()"
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
          :disable="isInReadMode()"
        />

        <q-btn
          v-show="!isInReadMode()"
          round
          flat
          class="text-red justify-center"
          icon="mdi-close"
          @click="deleteTestChoix(c.id)"
        />
      </template>
    </div>

    <!-- TYPE QCMM -->
    <div v-if="testModel.type === TestType.QCMM" class="row q-gutter-y-md">
      <q-btn
        v-show="!isInReadMode()"
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
          :readonly="isInReadMode()"
          hide-bottom-space
          outlined
          dense
        />

        <q-checkbox
          class="col-1 justify-center"
          v-model="c.isTrue"
          :disable="isInReadMode()"
          dense
        />

        <q-btn
          v-show="isInReadMode()"
          round
          flat
          class="text-red justify-center"
          icon="mdi-close"
          @click="deleteTestChoix(c.id)"
        />
      </template>
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
import { TestType } from 'src/enums/TestType.enum';
import { Test } from 'src/model/Test.interface';
import { onMounted, PropType, ref, watch } from 'vue';
import { required } from 'src/utils/validationRules.util';
import { CrudAction } from 'src/enums/CrudAction.enum';
import getEmptyTestModel from 'src/utils/getEmptyTest.util';

const testModel = ref<Test>(getEmptyTestModel());
const testType: TestType[] = [TestType.QCMM, TestType.QCMU, TestType.QR];
const trueResponseId = ref<number>();

const emit = defineEmits(['update:modelValue', 'submit']);
const props = defineProps({
  modelValue: {
    type: Object as PropType<Test>,
    required: true,
  },
  mode: {
    type: String as PropType<CrudAction>,
    required: true,
  },
});

onMounted(() => {
  affectTestModel();
});

// custom v-model
watch(
  () => props.modelValue,
  () => (testModel.value = props.modelValue),
  { deep: true }
);

watch(
  () => testModel.value,
  () => emit('update:modelValue', testModel.value),
  { deep: true }
);

/**
 *@esc affectation opération
 */
function affectTestModel() {
  testModel.value = props.modelValue;

  if (testModel.value.type === TestType.QCMU) {
    testModel.value.choix?.forEach((c) => {
      if (c.isTrue) trueResponseId.value = c.id;
    });
  }
}

/**
 * @desc handle on submit
 */
function onSubmit() {
  // add QCMU choix value
  if (testModel.value.type === TestType.QCMU) {
    testModel.value.choix?.forEach((c) => {
      c.isTrue = false;
      if (c.id === trueResponseId.value) c.isTrue = true;
    });
  }

  emit('submit', testModel);
}

/**
 * @desc handle on validation are not all passed
 */
function displayInvalidFormError() {
  console.log('invalid form Error');
}

/**
 * @desc handle add New choix
 */
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

function deleteTestChoix(id: number) {
  if (testModel.value.choix && testModel.value.choix.length > 2) {
    const idx = testModel.value.choix.findIndex((el) => el.id === id);

    if (idx > -1) {
      testModel.value.choix?.splice(idx, 1);
    }
  }
}
/**
 * @desc mode status
 */
function isInReadMode(): boolean {
  return props.mode === CrudAction.READ;
}
</script>

<style lang="scss">
.form-test {
  .description-textarea textarea {
    height: 12rem;
  }
}
</style>
