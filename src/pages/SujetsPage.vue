<template>
  <q-page class="q-pt-md">
    <custom-datagrid
      row-key="id"
      :columns="columns"
      :rows="formattedSujetList"
      show-search-input
      use-context-menu
      @click:add="onAddSujet"
      @click:context-item="
        ({ itemMenu, data }) => handleContextMenuClick(itemMenu, data)
      "
    />

    <base-modal v-model="showSujetModal" title="Formulaire sujet" width="95%">
      <form-sujet
        v-model="sujetModel"
        :mode="sujetCrudAction"
        @submit="onFormSubmit"
      />
    </base-modal>
  </q-page>
</template>

<script lang="ts" setup>
import CustomDatagrid from 'src/components/CustomDatagrid.vue';
import BaseModal from 'src/components/BaseModal.vue';
import FormSujet from '../components/FormSujet.vue';
import { computed, ref } from 'vue';
import { useConfirmationPopup } from 'src/composables/Popup.composable';
import { fakeSujetList } from 'src/data/sujets.fake';
import { PopupButton } from 'src/enums/Popup.enum';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { ItemContextMenu } from 'src/model/ItemContextMenu.interface';
import { Sujet, SujetListing } from 'src/model/Sujet.interface';
import { Test } from 'src/model/Test.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { msToTime } from 'src/utils/timeConvertor.util';
import { onMounted } from 'vue';
import { CrudAction } from 'src/enums/CrudAction.enum';
import getEmptySujetModel from 'src/utils/getEmptySujet.util';

/*-------- MainLayout Store --------*/

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

/*-------- Listing Operation --------*/

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
/*-------- Modal handler --------*/

const showSujetModal = ref<boolean>(false);

/**
 * @desc close modal
 */
function closeModal() {
  showSujetModal.value = false;
}

/*-------- Crud Operation --------*/

const sujetCrudAction = ref<CrudAction>(CrudAction.CREATE);
const sujetModel = ref<Sujet>(getEmptySujetModel());

/**
 * @desc gestion des clicks sur les menus du contextMenu
 */
function handleContextMenuClick(itemMenu: ItemContextMenu, data: SujetListing) {
  switch (itemMenu.event) {
    case CrudAction.READ:
      openSujetForm(CrudAction.READ);
      sujetModel.value = data;
      break;

    case CrudAction.UPDATE:
      openSujetForm(CrudAction.UPDATE);
      sujetModel.value = data;
      break;

    case CrudAction.DELETE:
      deleteSujet(data.id);
      break;

    default:
      break;
  }
}

/**
 * @desc handle onAdd button clicked
 */
function onAddSujet() {
  openSujetForm(CrudAction.CREATE);
}

/**
 * @desc open sujet form
 */
function openSujetForm(crudAction: CrudAction) {
  sujetModel.value = getEmptySujetModel();
  sujetCrudAction.value = crudAction;
  showSujetModal.value = true;
}

/**
 * @desc hangle on form submit
 */
function onFormSubmit() {
  switch (sujetCrudAction.value) {
    case CrudAction.CREATE:
      sujetList.value.push(sujetModel.value);
      closeModal();
      break;

    case CrudAction.UPDATE:
      const idx = sujetList.value.findIndex(
        (el) => el.id === sujetModel.value.id
      );
      sujetList.value[idx] = sujetModel.value;
      closeModal();
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
