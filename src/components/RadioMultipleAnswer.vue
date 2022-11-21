<template>
  <ul class="column justify-center items-center q-gutter-lg" data-test="type">
    <li class="col" v-for="item in answers" :key="item.id">
      <AnswerItem :item="item" @update:model-value="selectAnswer" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { Reponse } from '../model/Reponse.interface';
import { ChoixReponse } from '../model/Reponse.interface';
import AnswerItem from './AnswerItem.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  answers: {
    type: Array as PropType<Reponse[]>,
    required: true,
  },
  modelValue: {
    type: Array as PropType<Reponse[]>,
  },
});
const selected = ref<Reponse[]>(props.modelValue as Reponse[]);
function selectAnswer(option: ChoixReponse) {
  if (option.isActive === true) {
    if (selected.value.length < props.answers?.length - 1) {
      selected.value.push(option.reponse);
    }
  } else {
    for (let i = 0; i < selected.value.length; i++) {
      if (selected.value[i].id == option.reponse.id) {
        selected.value.splice(selected.value.indexOf(selected.value[i]), 1);
        break;
      }
    }
  }
  emit('update:modelValue', selected);
}
</script>

<style lang="sass">
ul
    list-style: none
    padding: 0
    margin: 0.5rem

.active
    box-shadow:0px 0px 0px 3px #1976D2 inset
    background: #fafafa
    border-radius: 5px
    color:#1976D2
</style>
