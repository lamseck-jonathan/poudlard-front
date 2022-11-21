<template>
  <q-expansion-item
    v-model="isExpanded"
    :expand-icon-class="isExpanded ? 'text-white' : ''"
    :class="{
      'test-item-display': true,
      'bg-blue-grey-5': isExpanded,
    }"
    bordered
    expand-separator
  >
    <template #header>
      <div
        :class="{
          'row items-center text-weight-bold': true,
          'text-white': isExpanded,
        }"
        style="width: 100%"
      >
        <div class="col-4 text-left">{{ props.test.titre }}</div>
        <div class="col-4 text-center">{{ props.test.categorie }}</div>
        <div class="col-1 text-center">{{ props.test.type }}</div>
        <div class="col-1 text-center">{{ props.test.bareme }}</div>
        <div class="col-2 text-center">{{ msToTime(test.duree) }}</div>
      </div>
    </template>

    <q-card style="border-radius: 0 0 5px 5px; border-top: 1px solid #ababab">
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

      <q-card-section
        class="flex justify-end q-gutter-x-sm"
        style="padding-top: 0px; padding-bottom: 0.5rem"
      >
        <q-btn
          round
          flat
          class="text-blue-grey-5"
          icon="mdi-eye-outline"
          @click="emit('click:show')"
        />
        <q-btn
          round
          flat
          class="text-primary"
          icon="mdi-file-edit-outline"
          @click="emit('click:edit')"
        />
        <q-btn
          round
          flat
          class="text-red"
          icon="mdi-trash-can-outline"
          @click="emit('click:delete')"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script lang="ts" setup>
import { Test } from 'src/model/Test.interface';
import { msToTime } from 'src/utils/timeConvertor.util';
import { PropType, ref } from 'vue';

const emit = defineEmits(['click:show', 'click:edit', 'click:delete']);

const props = defineProps({
  test: { type: Object as PropType<Test>, required: true },
});

const isExpanded = ref<boolean>(false);
</script>

<style lang="scss">
.test-item-display {
  border: 1px solid #ababab;
  border-radius: 3px;
}

.test-item-display:hover .q-item {
  color: $primary;
}
</style>
