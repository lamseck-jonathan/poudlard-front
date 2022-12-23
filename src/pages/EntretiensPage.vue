<template>
  <q-page class="q-pt-md">
    <custom-datagrid
      row-key="id"
      :columns="columns"
      :rows="rows"
      :loading="entretienStore.isLoading"
      @click:add="onAdd"
      @click:context-item="
        ({ itemMenu, data }) => handleContextMenuClick(itemMenu, data)
      "
      use-context-menu
      show-search-input
    />
  </q-page>
</template>

<script lang="ts" setup>
import { deleteDoc, doc, getFirestore } from 'firebase/firestore/lite';
import CustomDatagrid from 'src/components/CustomDatagrid.vue';
import { useConfirmationPopup } from 'src/composables/Popup.composable';
import { useToast } from 'src/composables/Toast.composable';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { PopupButton } from 'src/enums/Popup.enum';
import { ToastType } from 'src/enums/ToastType.enum';
import { firebaseApp } from 'src/firebase';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { Entretien } from 'src/model/Entretien.interface';
import { ItemContextMenu } from 'src/model/ItemContextMenu.interface';
import { useEntretienStore } from 'src/stores/entretien-store';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { computed, onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const entretienStore = useEntretienStore();
const mainLayoutStore = useMainLayoutStore();
const db = getFirestore(firebaseApp);

onBeforeMount(() => {
  entretienStore.FormEntretien = <Entretien>{};
  entretienStore.fetchEntretienList();
}),
  onMounted(() => {
    mainLayoutStore.setNavBarpageInfo({
      icon: 'present_to_all',
      title: 'entretiens',
      routeName: 'entretiens  ',
      path: '/entretiens',
    });
  });

const router = useRouter();

function onAdd() {
  entretienStore.crudAction = CrudAction.CREATE;
  router.push({ name: 'formulaire-entretien' });
}

function handleContextMenuClick(itemMenu: ItemContextMenu, data: Entretien) {
  entretienStore.FormEntretien = data;

  switch (itemMenu.event) {
    case CrudAction.READ:
      entretienStore.crudAction = CrudAction.READ;
      router.push({ name: 'formulaire-entretien' });
      break;

    case CrudAction.UPDATE:
      entretienStore.crudAction = CrudAction.UPDATE;
      router.push({ name: 'formulaire-entretien' });
      break;

    case CrudAction.DELETE:
      entretienStore.crudAction = CrudAction.DELETE;
      onDeleteEntretien(entretienStore.FormEntretien);
      break;

    default:
      break;
  }
}

const columns: DatagridColumns[] = [
  {
    name: 'candidat',
    label: 'Candidat',
    align: 'left',
    field: (row) => row.candidat.nom,
    format: (user) => `${user.nom} ${user.prenom}`,
    sortable: true,
  },
  {
    name: 'date',
    label: 'Date',
    align: 'left',
    field: (row) => row.date,
    sortable: true,
  },
  {
    name: 'dateLimite',
    label: 'Date limite',
    align: 'left',
    field: (row) => row.dateLimite,
    sortable: true,
  },
  {
    name: 'statut',
    label: 'Statut',
    align: 'left',
    field: (row) => row.statut,
    sortable: true,
  },
];

const rows = computed<Entretien[]>(() => {
  return entretienStore.entretiens as Entretien[];
});

/**
 * @desc handle on delete test
 */
function onDeleteEntretien(entretien: Entretien) {
  const { confirmationPopup } = useConfirmationPopup(
    'Confirmation',
    'Voulez vous vraiment supprimer définitivement cette élément de la base ?'
  );

  confirmationPopup.onOk(async ({ clicked }) => {
    if (clicked === PopupButton.YES) {
      await deleteDoc(doc(db, 'entretien', entretien.id));

      useToast('SUCCES', 'Supression réussie', ToastType.SUCCESS);

      const idx = entretienStore.entretiens.findIndex(
        (el) => el.id === entretien.id
      );

      entretienStore.entretiens.splice(idx, 1);
    }
  });
}
</script>
