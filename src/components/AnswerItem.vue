<template>
    <q-btn
    class="full-border q-pa-md cursor-pointer type-item"
    style="width:400px"
    :class="active ? 'active' : ''" 
    @click="click(item)" type="button"
    >
        {{item.reponse}}
    </q-btn>
</template>

<script setup lang="ts">
import {PropType, ref } from 'vue'
import Reponse from 'src/models/Reponse'

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    item:{type:Object as PropType<Reponse>,default:{} as Reponse},
    active:{type:Boolean,default:false}
})
const active = ref<boolean>(props.active)
function click(item:Reponse){
    active.value = !active.value
    emit('update:modelValue',{item:item,isActive:active.value})
}
</script>

<style lang="sass">
    .active-btn
        box-shadow:0px 0px 0px 3px #333399 inset
</style>