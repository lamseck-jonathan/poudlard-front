<template>
  <div class="row">
    <q-input
      class="col-6 q-pr-sm flex justify-center items-center"
      outlined
      :label="label"
      v-model="reponse.reponse"
      @change="onChangeInput"
    />
    <div class="col-6 row justify-evenly">
      <q-radio
        color="green"
        @update:model-value="onChange(true)"
        :model-value="trueOrFalse"
        val="true"
        label="Vrai"
        @change="onChange"
      />
      <q-radio
        @update:model-value="onChange(false)"
        :model-value="trueOrFalse"
        color="red"
        val="false"
        label="Faux"
      />
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
const reponse = reactive<Reponse>({
  id: 0,
  reponse: '',
  isTrue: false,
});
const trueOrFalse = ref();
function onChange(value: any) {
  if (value == true) {
    trueOrFalse.value = 'true';
    reponse.isTrue = true;
  } else {
    trueOrFalse.value = 'false';
    reponse.isTrue = false;
  }
  emit('update:modelValue', reponse);
}
function onChangeInput() {
  emit('update:modelValue', reponse);
}
</script>
