<template>
  <base-expandable-item
    @click:show="emit('click:show', props.test)"
    @click:edit="emit('click:edit', props.test)"
    @click:delete="emit('click:delete', props.test)"
    show-action-buttons
  >
    <template #header>
      <div class="col-4 text-left">{{ props.test.titre }}</div>
      <div class="col-4 text-center">{{ props.test.categorie }}</div>
      <div class="col-1 text-center">{{ props.test.type }}</div>
      <div class="col-1 text-center">{{ props.test.bareme }}</div>
      <div class="col-2 text-center">{{ msToTime(test.duree) }}</div>
    </template>

    <template #body>
      <q-card-section class="row" style="padding-bottom: 0.5rem">
        <div class="col-3 q-pr-lg">
          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Id :</span>
            <span class="text-justify">{{ props.test.id }}</span>
          </div>

          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Titre :</span>
            <span class="text-justify">{{ props.test.titre }}</span>
          </div>
        </div>

        <div class="col-3 q-pr-lg">
          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Type :</span>
            <span class="text-justify">{{ props.test.type }}</span>
          </div>

          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Categorie :</span>
            <span class="text-justify">{{ props.test.categorie }}</span>
          </div>
        </div>

        <div class="col-4 q-pr-lg">
          <div class="text-weight-bold q-mr-lg q-mb-sm">Description :</div>
          <div>{{ props.test.description }}</div>
        </div>

        <div class="col-2">
          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Point :</span>
            <span class="text-justify">{{ props.test.bareme }}</span>
          </div>

          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Durée :</span>
            <span class="text-justify">{{ msToTime(props.test.duree) }}</span>
          </div>
        </div>
      </q-card-section>
    </template>
  </base-expandable-item>
</template>

<script lang="ts" setup>
import BaseExpandableItem from './BaseExpandableItem.vue';
import { Test } from 'src/model/Test.interface';
import { msToTime } from 'src/utils/timeConvertor.util';
import { PropType } from 'vue';

const emit = defineEmits(['click:show', 'click:edit', 'click:delete']);

const props = defineProps({
  test: { type: Object as PropType<Test>, required: true },
});
</script>
