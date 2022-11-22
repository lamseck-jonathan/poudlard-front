<template>
  <q-page class="q-pt-md">
    <custom-datagrid
      row-key="id"
      :columns="columns"
      :rows="rows"
      :action-btn="false"
      show-search-input
    />
  </q-page>
</template>

<script lang="ts" setup>
import CustomDatagrid from 'src/components/CustomDatagrid.vue';
import { fakeSujetList } from 'src/data/sujets.fake';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { SujetListing } from 'src/model/Sujet.interface';
import { Test } from 'src/model/Test.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { msToTime } from 'src/utils/timeConvertor.util';
import { onMounted, ref } from 'vue';

const mainLayoutStore = useMainLayoutStore();

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'mdi-text-subject',
    title: 'sujet',
    routeName: 'sujets',
    path: '/sujets',
  });
});

const columns: DatagridColumns[] = [
  {
    name: 'titre',
    required: true,
    label: 'Titre',
    align: 'left',
    field: (row) => row.titre,
    sortable: true,
  },
  {
    name: 'niveau',
    required: true,
    label: 'Niveau',
    align: 'left',
    field: (row) => row.niveau,
    sortable: true,
  },
  {
    name: 'totalPoint',
    required: true,
    label: 'Total Points',
    align: 'center',
    field: (row) => row.totalPoint,
    sortable: true,
  },
  {
    name: 'totalDuree',
    required: true,
    label: 'durée',
    align: 'center',
    field: (row) => row.totalDuree,
    sortable: true,
  },
];

const rows = ref<SujetListing[]>([...formatSujetList()]);

function formatSujetList(): SujetListing[] {
  return fakeSujetList.map((sujet) => ({
    id: sujet.id,
    titre: sujet.titre,
    description: sujet.description,
    niveau: sujet.niveau,
    tests: sujet.tests,
    totalPoint: totalPoint(sujet.tests),
    totalDuree: msToTime(totalDuree(sujet.tests)),
  }));
}

/**
 * @desc calcule la total des durées des tests
 */
function totalDuree(tests: Test[]) {
  let totalDuree = 0;

  for (const test of tests) {
    totalDuree += test.duree;
  }

  return totalDuree;
}

/**
 * @desc calcule la total des points des tests
 */
function totalPoint(tests: Test[]) {
  let totalPoint = 0;

  for (const test of tests) {
    totalPoint += test.bareme;
  }

  return totalPoint;
}
</script>
