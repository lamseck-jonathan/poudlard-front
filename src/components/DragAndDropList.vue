<template>
  <div class="row">
    <div class="col">
      <draggable
        v-model="listing1"
        class="drop-zone"
        style="margin-right: 0.2rem"
        group="people"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #header>
          <div class="drop-zone-header">Liste des tests</div>
        </template>

        <template #item="{ element }">
          <q-item class="drag-el row items-center" clickable>
            <span class="col">{{ element.titre }}</span>
            <span class="col-2">{{ element.type }}</span>
            <span class="col-1">{{ element.bareme }}</span>
          </q-item>
        </template>
      </draggable>
    </div>

    <div class="col">
      <draggable
        v-model="listing2"
        class="drop-zone"
        style="margin-left: 0.2rem"
        group="people"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #header>
          <div class="drop-zone-header">Sujet Tests</div>
        </template>

        <template #item="{ element }">
          <q-item class="drag-el row items-center" clickable>
            <span class="col">{{ element.titre }}</span>
            <span class="col-2">{{ element.type }}</span>
            <span class="col-1">{{ element.bareme }}</span>
          </q-item>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Test } from 'src/model/Test.interface';
import { computed, PropType, ref } from 'vue';
import draggable from 'vuedraggable';

const emit = defineEmits(['update:list1', 'update:list2']);
const props = defineProps({
  list1: {
    type: Array as PropType<Test[]>,
    required: true,
  },

  list2: {
    type: Array as PropType<Test[]>,
    required: true,
  },
});

const listing1 = computed({
  get() {
    return props.list1;
  },
  set(newValue) {
    emit('update:list1', newValue);
  },
});

const listing2 = computed({
  get() {
    return props.list2;
  },
  set(newValue) {
    emit('update:list2', newValue);
  },
});

const drag = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.drop-zone {
  overflow-y: scroll;
  padding: 0.25rem;
  border: solid 1px rgb(197, 197, 197);
  height: 33rem;
  border-radius: 1px;
  scrollbar-width: thin;
  scrollbar-color: #e9e9e9;

  &-header {
    top: 0px;
    padding: 0.4rem 0px;
    margin-bottom: 0.2rem;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    align-items: center;
  }

  .drag-el {
    margin-bottom: 0.2rem;
    padding: 0.5rem;
    background: rgb(232, 233, 234);
    border-radius: 0.3rem;
  }
}

::-webkit-scrollbar {
  width: 8px;
  background: #e9e9e9;
}

::-webkit-scrollbar-thumb {
  background: #c0bfbf;
}
</style>
