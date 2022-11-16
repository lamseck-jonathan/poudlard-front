<template>
    <ul class="column justify-center items-center q-gutter-lg" data-test="type">
        <li class="col" v-for="item in answers" :key="item.id" >
            <q-btn
            class="full-border q-pa-md cursor-pointer type-item"
            style="width:400px"
            :class="{active: activeOption === item.reponse}" 
            @click="activate(item)" type="button"
            >
                {{item.reponse}}
            </q-btn>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import Reponse from '../models/Reponse'

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    answers : {type: Array as PropType<Reponse[]>},
    modelValue : {type: Object as PropType<Reponse>},
});
const activeOption = ref<string | undefined>(props?.modelValue?.reponse)
function activate(option:Reponse){
    emit('update:modelValue',option)
    activeOption.value = option.reponse
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