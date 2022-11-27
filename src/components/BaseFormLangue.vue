<template>
  <div class="flex items-center q-gutter-x-md">
    <div class="text-weight-bold q-mr-lg" style="width: 15%">
      {{ props.groupLibelle }} :
    </div>

    <q-input
      v-model="langueModel.lu"
      label="Lu (/5)"
      type="number"
      :readonly="props.readonly"
      hide-bottom-space
      outlined
      dense
    />

    <q-input
      v-model="langueModel.parle"
      label="Parlé (/5)"
      type="number"
      :readonly="props.readonly"
      hide-bottom-space
      outlined
      dense
    />

    <q-input
      v-model="langueModel.ecrit"
      label="Ecrit (/5)"
      type="number"
      :readonly="props.readonly"
      hide-bottom-space
      outlined
      dense
    />
  </div>
</template>

<script lang="ts" setup>
import { NiveauLinguistique } from 'src/model/FicheCandidat.interface';
import { computed, PropType } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  groupLibelle: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Object as PropType<NiveauLinguistique>,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const langueModel = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>
