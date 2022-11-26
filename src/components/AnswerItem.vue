<template>
  <q-btn
    class="full-border q-pa-md cursor-pointer type-item"
    style="width: 400px"
    :class="active ? 'active' : ''"
    @click="click(item)"
    type="button"
  >
    {{ item.reponse }}
  </q-btn>
</template>

<script setup lang="ts">
import { PropType, reactive, ref } from 'vue';
import { Reponse } from 'src/model/Reponse.interface';
import { ChoixReponse } from 'src/model/Reponse.interface';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  item: { type: Object as PropType<Reponse>, default: {} as Reponse },
  active: { type: Boolean, default: false },
});
const active = ref<boolean>(props.active);
const choix = reactive<ChoixReponse>({
  reponse: {} as Reponse,
  isActive: false,
});
function click(item: Reponse) {
  active.value = !active.value;
  choix.reponse = item;
  choix.isActive = active.value;
  emit('update:modelValue', choix);
}
</script>

<style lang="sass">
.active-btn
    box-shadow:0px 0px 0px 3px #333399 inset
</style>
