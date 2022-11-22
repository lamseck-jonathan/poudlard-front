<template>
  <q-page class="q-pt-md">
    <custom-datagrid
      row-key="id"
      :columns="columns"
      :rows="formattedSujetList"
      :action-btn="false"
      show-search-input
      use-context-menu
      @click:context-item="
        ({ itemMenu, data }) => handleContextMenuClick(itemMenu, data)
      "
    />
  </q-page>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import CustomDatagrid from 'src/components/CustomDatagrid.vue';
import { useConfirmationPopup } from 'src/composables/Popup.composable';
import { fakeSujetList } from 'src/data/sujets.fake';
import { PopupButton } from 'src/enums/Popup.enum';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { ItemContextMenu } from 'src/model/ItemContextMenu.interface';
import { SujetListing } from 'src/model/Sujet.interface';
import { Test } from 'src/model/Test.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { msToTime } from 'src/utils/timeConvertor.util';
import { onMounted } from 'vue';

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

const sujetList = ref<SujetListing[]>([...fakeSujetList]);

const formattedSujetList = computed((): SujetListing[] => {
  return sujetList.value.map((sujet) => ({
    id: sujet.id,
    titre: sujet.titre,
    description: sujet.description,
    niveau: sujet.niveau,
    tests: sujet.tests,
    totalPoint: totalPoint(sujet.tests),
    totalDuree: msToTime(totalDuree(sujet.tests)),
  }));
});

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

/**
 * @desc gestion des clicks sur les menus du contextMenu
 */
function handleContextMenuClick(itemMenu: ItemContextMenu, data: SujetListing) {
  switch (itemMenu.event) {
    case 'voir':
      console.log('sujet : ', itemMenu.event, data);
      break;
    case 'modifier':
      console.log('sujet : ', itemMenu.event, data);
      break;
    case 'supprimer':
      deleteSujet(data.id);
      break;
    default:
      break;
  }
}

/**
 * @desc Delete a sujet
 */
function deleteSujet(idSujet: string) {
  const { confirmationPopup } = useConfirmationPopup(
    'Confirmation',
    'Voulez vous vraiment supprimer définitivement cette élément de la base ?'
  );

  confirmationPopup.onOk(({ clicked }) => {
    if (clicked === PopupButton.YES) {
      const idx = sujetList.value.findIndex((el) => el.id === idSujet);

      if (idx > -1) {
        sujetList.value.splice(idx, 1); // delete sujet from array
      }
    }
  });
}
</script>
