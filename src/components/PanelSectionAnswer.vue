<template>
  <q-card class="q-px-md w-full" style="height: 100%">
    <q-item>
      <q-item-section avatar>
        <q-icon size="30px" color="primary" name="code" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-h6">Réponse</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-card-section
      class="flex justify-center items-center"
      style="height: 440px"
    >
      <div
        v-if="
          props.test?.type === TestType.QCMU && props.test.choix !== undefined
        "
      >
        <RadioUniqueAnswer v-model="uniqueAnswer" :answers="props.test.choix" />
      </div>

      <div
        v-if="
          props.test?.type === TestType.QCMM && props.test.choix !== undefined
        "
      >
        <RadioMultipleAnswer
          v-model="selectedAnswers"
          :answers="props.test.choix"
        />
      </div>
      <div
        style="width: 500px; height: 900px"
        v-if="props.test?.type === TestType.QR"
      >
        <q-input v-model="textAnswer" filled type="textarea" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import RadioMultipleAnswer from './RadioMultipleAnswer.vue';
import RadioUniqueAnswer from './RadioUniqueAnswer.vue';
import { TestType } from 'src/enums/TestType.enum';
import { Test } from 'src/model/Test.interface';
import { Reponse, ReponseCandidat } from 'src/model/Reponse.interface';
import { onBeforeUnmount, PropType, ref, watchPostEffect } from 'vue';

const props = defineProps({
  test: {
    type: Object as PropType<Test>,
    required: true,
  },
  answer: {
    type: Object as PropType<ReponseCandidat>,
    required: true,
  },
});

const selectedAnswers = ref<Reponse[]>([]);
const uniqueAnswer = ref<Reponse>({} as Reponse);
const textAnswer = ref<string>('');

const emit = defineEmits(['update:answer']);

const unwatch = watchPostEffect(() => {
  const response: ReponseCandidat = props.answer;

  switch (response.test.type) {
    case TestType.QCMM:
      response.reponseQCMM = selectedAnswers.value;
      break;

    case TestType.QCMU:
      response.reponseQCMU = uniqueAnswer.value;
      break;

    case TestType.QR:
      response.reponseQR = textAnswer.value;
      break;

    default:
      break;
  }

  emit('update:answer', response);
});

onBeforeUnmount(() => {
  unwatch();
});
</script>
