<template>
  <div class="q-gutter-y-sm">
    <div class="row">
      <q-input
        class="col-6 q-pr-sm"
        outlined
        label="Reponse 1"
        v-model="reponse1.reponse"
        @change="onChangeInput"
      />
      <div class="col-6 row justify-evenly">
        <q-radio
          color="green"
          @update:model-value="onChange('1')"
          :model-value="trueReponse"
          val="1"
        />
      </div>
    </div>
    <div class="row">
      <q-input
        class="col-6 q-pr-sm"
        outlined
        label="Reponse 2"
        v-model="reponse2.reponse"
        @change="onChangeInput"
      />
      <div class="col-6 row justify-evenly">
        <q-radio
          color="green"
          @update:model-value="onChange('2')"
          :model-value="trueReponse"
          val="2"
        />
      </div>
    </div>
    <div class="row">
      <q-input
        class="col-6 q-pr-sm"
        outlined
        label="Reponse 3"
        v-model="reponse3.reponse"
        @change="onChangeInput"
      />
      <div class="col-6 row justify-evenly">
        <q-radio
          color="green"
          @update:model-value="onChange('3')"
          :model-value="trueReponse"
          val="3"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Reponse } from 'src/model/Reponse.interface';
import { PropType, reactive, ref } from 'vue';

defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Object as PropType<Reponse>,
  },
});
const emit = defineEmits(['update:modelValue']);

const trueReponse = ref();
const reponse1 = reactive<Reponse>({
  id: 1,
  reponse: '',
  isTrue: false,
});
const reponse2 = reactive<Reponse>({
  id: 2,
  reponse: '',
  isTrue: false,
});
const reponse3 = reactive<Reponse>({
  id: 3,
  reponse: '',
  isTrue: false,
});
const reponses = [reponse1, reponse2, reponse3];
function onChange(value: string) {
  switch (value) {
    case '1':
      trueReponse.value = '1';
      reponse1.isTrue = true;
      reponse2.isTrue = false;
      reponse3.isTrue = false;
      break;
    case '2':
      trueReponse.value = '2';
      reponse1.isTrue = false;
      reponse2.isTrue = true;
      reponse3.isTrue = false;
      break;
    case '3':
      trueReponse.value = '3';
      reponse1.isTrue = false;
      reponse2.isTrue = false;
      reponse3.isTrue = true;
      break;
  }
  emit('update:modelValue', reponses);
}
function onChangeInput() {
  emit('update:modelValue', reponses);
}
</script>
