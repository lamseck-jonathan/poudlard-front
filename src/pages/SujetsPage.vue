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
import { computed, onBeforeMount, ref } from 'vue';
import { useConfirmationPopup } from 'src/composables/Popup.composable';
import { PopupButton } from 'src/enums/Popup.enum';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { ItemContextMenu } from 'src/model/ItemContextMenu.interface';
import { Sujet, SujetListing } from 'src/model/Sujet.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { msToTime } from 'src/utils/timeConvertor.util';
import { onMounted } from 'vue';
import { CrudAction } from 'src/enums/CrudAction.enum';
import getEmptySujetModel from 'src/utils/getEmptySujet.util';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore/lite';
import { useSujetStore } from 'src/stores/sujet-store';
import { firebaseApp } from 'src/firebase';
import { totalDuree, totalPoint } from 'src/utils/sujet.util';

/*-------- MainLayout Store --------*/

const mainLayoutStore = useMainLayoutStore();
const sujetStore = useSujetStore();
const db = getFirestore(firebaseApp);

onBeforeMount(() => {
  sujetStore.fetchSujetList();
});

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

const sujetList = computed(() => {
  return sujetStore.sujets;
});

async function addSujet(sujetItem: Sujet) {
  const addResult = await addDoc(collection(db, 'sujet'), sujetItem);
  const docRef = doc(db, 'sujet', addResult.id);
  await updateDoc(docRef, {
    id: addResult.id,
  });
  const docSnap = await getDoc(docRef);
  const newSujet: Sujet = docSnap.data() as Sujet;
  sujetStore.sujets.push(newSujet);
  console.log(sujetStore.sujets);
}

async function updateSujet(sujetItem: Sujet) {
  const docRef = doc(db, 'sujet', sujetItem.id);
  await updateDoc(docRef, {
    ...sujetItem,
  });
}

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
      console.log(data);
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
async function onFormSubmit() {
  switch (sujetCrudAction.value) {
    case CrudAction.CREATE:
      await addSujet(sujetModel.value);
      //sujetList.value.push(sujetModel.value);
      closeModal();
      break;

    case CrudAction.UPDATE:
      await updateSujet(sujetModel.value);
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

  confirmationPopup.onOk(async ({ clicked }) => {
    if (clicked === PopupButton.YES) {
      const idx = sujetList.value.findIndex((el) => el.id === idSujet);

      if (idx > -1) {
        await deleteDoc(doc(db, 'sujet', idSujet));
        sujetList.value.splice(idx, 1); // delete sujet from array
      }
    }
  });
}
</script>
