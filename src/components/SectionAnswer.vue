<template>
  <q-card class="q-px-md" style="height: 550px">
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
      <div v-if="test?.type.type_test === 'QCU' && test.choix !== undefined">
        <RadioUniqueAnswer v-model="uniqueAnswer" :answers="test.choix" />
      </div>
      <div v-if="test?.type.type_test === 'QCM' && test.choix !== undefined">
        <RadioMultipleAnswer v-model="selectedAnswers" :answers="test.choix" />
      </div>
      <div
        style="width: 500px; height: 900px"
        v-if="test?.type.type_test === 'QR'"
      >
        <q-input v-model="textAnswer" filled type="textarea" />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <q-btn class="full-width" label="Question Suivante" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { Test } from 'src/model/Test.interface';
import { Reponse } from 'src/model/Reponse.interface';
import RadioMultipleAnswer from './RadioMultipleAnswer.vue';
import RadioUniqueAnswer from './RadioUniqueAnswer.vue';
import { PropType, ref } from 'vue';

defineProps({
  test: {
    type: Object as PropType<Test>,
    required: true,
  },
});
const selectedAnswers = ref<Reponse[]>([] as Reponse[]);
const uniqueAnswer = ref<Reponse>({} as Reponse);
const textAnswer = ref<string>('');
</script>
