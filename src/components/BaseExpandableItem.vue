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
          'row items-center': true,
          'text-white': isExpanded,
        }"
        style="width: 100%"
      >
        <slot name="header"></slot>
      </div>
    </template>

    <q-card style="border-radius: 0 0 5px 5px; border-top: 1px solid #ababab">
      <slot name="body"> </slot>

      <q-card-section
        v-show="props.showActionButtons"
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
import { ref } from 'vue';

const emit = defineEmits(['click:show', 'click:edit', 'click:delete']);

const props = defineProps({
  showActionButtons: {
    type: Boolean,
    recard: false,
  },
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
