<template>
  <q-dialog class="full-width" v-model="showModal">
    <q-card
      :style="{ width: props.width, maxWidth: '1500px', height: props.height }"
    >
      <q-card-section
        class="row items-center q-py-md bg-blue-grey-7 text-white"
      >
        <div class="text-h6 text-uppercase">{{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '900px',
  },
  height: {
    type: String,
    required: false,
  },
});

const showModal = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>
