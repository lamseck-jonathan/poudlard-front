<template>
  <q-table
    v-model:pagination="mainLayoutStore.pagination"
    class="neo_datagrid full-width"
    :separator="props.separator"
    :filter="filter"
    :title="props.title"
    :rows="props.rows"
    :columns="props.columns"
    :row-key="props.rowKey"
    :loading-label="'Chargement'"
    :no-data-label="'Aucune données à afficher'"
    :dense="isCompactMode"
    flat
  >
    <!-- table top bar customization -->
    <template v-slot:top-left v-if="true">
      <slot name="header-content" />

      <q-btn
        round
        :color="isCompactMode ? 'blue-grey' : 'primary'"
        size="sm"
        icon="vertical_align_center"
        @click="isCompactMode = !isCompactMode"
      />
    </template>

    <template v-slot:top-right="props" v-if="true">
      <q-input
        v-if="showSearchInput"
        v-model="filter"
        class="q-ml-md"
        label="Search"
        borderless
        dense
        outlined
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        v-if="showFullScreenBtn"
        class="q-ml-md"
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        flat
        round
        dense
        @click="props.toggleFullscreen"
      />
      <q-btn
        color="primary"
        class="q-ml-md q-px-lg"
        v-if="actionBtn"
        :label="actionBtnLabel"
        @click="() => emit('click:add')"
        unelevated
      />
    </template>

    <!-- table header customization -->
    <template v-slot:header="props">
      <q-tr :props="props" class="bg-blue-grey-14 text-white">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          :style="col.style"
        >
          {{ col.label }}
        </q-th>
        <q-th v-if="showDeleteBtn">
          {{ deleteBtnColumnLabel }}
        </q-th>
      </q-tr>
    </template>

    <!-- table body customization -->
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td
          v-for="column in props.cols"
          :key="column.name"
          :props="props"
          :style="styleObject"
        >
          <span :id="props.row?.templateId">
            <template v-if="typeof props.row[column.name] === 'boolean'">
              <q-badge
                color="positive"
                :label="'Oui'"
                v-if="props.row[column.name]"
              />
              <q-badge color="negative" :label="'Non'" v-else />
            </template>
            <template v-else>
              {{ props.row[column.name] }}
            </template>
          </span>
        </q-td>

        <q-td v-if="showDeleteBtn" class="text-center">
          <q-btn
            size="sm"
            icon="delete"
            class="negative_btn"
            flat
            round
            dense
            @click.stop="emit('click:delete', props.row[rowKey])"
          />
        </q-td>
      </q-tr>
    </template>

    <!-- table bottom customization  -->
    <template #bottom>
      <q-space />

      <div class="q-mr-lg row items-center">
        <span class="q-mr-sm"> Ligne par page </span>
        <q-select
          dense
          borderless
          bg-color="transparent"
          label-color="white"
          emit-value
          map-options
          :model-value="mainLayoutStore.pagination.rowsPerPage"
          @update:model-value="(evt:any) => mainLayoutStore.setRowsPerPage(evt)"
          :options="[
            { label: '5', value: 5 },
            { label: '10', value: 10 },
            { label: '15', value: 15 },
            { label: '25', value: 25 },
            { label: '50', value: 50 },
            { label: '100', value: 100 },
            { label: 'tous', value: 0 },
          ]"
        />
      </div>

      <q-pagination
        v-model="mainLayoutStore.pagination.page"
        :boundary-numbers="false"
        :max="pagesNumber"
        :max-pages="4"
        icon-first="keyboard_double_arrow_left"
        icon-last="keyboard_double_arrow_right"
        active-color="primary"
        direction-links
        boundary-links
      />
    </template>

    <!-- bottom customization when no-data -->
    <template #no-data>
      <q-icon name="warning" size="1rem" />
      <div class="q-ml-md">Aucune données à afficher</div>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { computed, PropType, ref } from 'vue';

const mainLayoutStore = useMainLayoutStore();

const emit = defineEmits(['click:add', 'click:delete']);

const filter = ref<string>('');
const isCompactMode = ref<boolean>(false);

const pagesNumber = computed(() =>
  mainLayoutStore.pagination.rowsPerPage !== 0
    ? Math.ceil(props.rows.length / mainLayoutStore.pagination.rowsPerPage)
    : 1
);

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  rows: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array as PropType<Array<DatagridColumns>>,
    required: false,
  },
  rowKey: {
    type: String || Number,
    required: true,
  },
  rowsPerPage: {
    type: Number,
    default: 10,
  },
  actionBtnLabel: {
    type: String,
    default: 'Ajouter',
  },
  actionBtn: {
    type: Boolean,
    default: true,
  },
  showDeleteBtn: {
    type: Boolean,
    default: false,
  },
  showSearchInput: {
    type: Boolean,
    default: false,
  },
  showFullScreenBtn: {
    type: Boolean,
    default: false,
  },
  separator: {
    type: String as PropType<
      'none' | 'horizontal' | 'vertical' | 'cell' | undefined
    >,
    required: false,
  },
  verticalAlign: {
    type: String as PropType<
      'top' | 'middle' | 'bottom' | 'baseline' | 'inherit'
    >,
    default: 'inherit',
  },
  deleteBtnColumnLabel: {
    type: String,
    required: false,
  },
});

const styleObject = { verticalAlign: props.verticalAlign };
</script>
