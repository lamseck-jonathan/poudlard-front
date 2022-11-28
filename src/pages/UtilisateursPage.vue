<template>
  <q-page class="q-pt-md">
    <custom-datagrid
      row-key="id"
      :columns="columns"
      :rows="rows"
      :action-btn="false"
      :context-menu-items="contextMenuItems"
      @click:context-item="
        ({ itemMenu, data }) => onContextMenuClick(itemMenu, data)
      "
      use-context-menu
      show-search-input
    />

    <base-modal
      v-model="showUtilisateurModal"
      title="Formulaire Utilisateur"
      width="800px"
    >
      <form-utilisateur
        v-model="utilisateurModel"
        :mode="utilisateurCrudAction"
      />
    </base-modal>
  </q-page>
</template>

<script lang="ts" setup>
import CustomDatagrid from 'src/components/CustomDatagrid.vue';
import BaseModal from 'src/components/BaseModal.vue';
import FormUtilisateur from 'src/components/FormUtilisateur.vue';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { onMounted, ref } from 'vue';
import { User, UserListing } from 'src/model/User.interface';
import { fakeUtilisateursList } from 'src/data/utilisateurs.fake';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { ItemContextMenu } from 'src/model/ItemContextMenu.interface';

/*-------- MainLayout Store --------*/
const mainLayoutStore = useMainLayoutStore();

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'mdi-account-multiple-outline',
    title: 'utilisateur',
    routeName: 'utilisateur',
    path: '/utilisateurs',
  });
});

/*-------- Handle modal --------*/
const showUtilisateurModal = ref<boolean>(false);

/*-------- Crud operations --------*/
const utilisateurModel = ref<User>({} as User);
const utilisateurCrudAction = ref<CrudAction>(CrudAction.READ);

function onContextMenuClick(itemMenu: ItemContextMenu, data: User) {
  switch (itemMenu.event) {
    case CrudAction.READ:
      utilisateurModel.value = { ...data };
      utilisateurCrudAction.value = CrudAction.READ;
      showUtilisateurModal.value = true;
      break;

    case CrudAction.UPDATE:
      utilisateurModel.value = { ...data };
      utilisateurCrudAction.value = CrudAction.UPDATE;
      showUtilisateurModal.value = true;
      break;

    default:
      break;
  }
}

/*-------- Listing operations --------*/
const contextMenuItems: ItemContextMenu[] = [
  {
    label: 'Voir',
    event: CrudAction.READ,
    appendIcon: 'mdi-eye-outline',
    isDisabled: false,
  },
  {
    label: 'Modifier',
    event: CrudAction.UPDATE,
    appendIcon: 'mdi-file-edit-outline',
    isDisabled: false,
  },
];
const columns: DatagridColumns[] = [
  {
    name: 'nom',
    required: true,
    label: 'Nom',
    align: 'left',
    field: (row) => row.nom,
    sortable: true,
  },
  {
    name: 'prenom',
    required: true,
    label: 'Prénom(s)',
    align: 'left',
    field: (row) => row.prenom,
    sortable: true,
  },
  {
    name: 'role',
    required: true,
    label: 'Role',
    align: 'left',
    field: (row) => row.role,
    sortable: true,
  },
  {
    name: 'adresse',
    required: true,
    label: 'adresse',
    align: 'center',
    field: (row) => row.adresse,
    sortable: true,
  },
  {
    name: 'email',
    required: true,
    label: 'email',
    align: 'center',
    field: (row) => row.email,
    sortable: true,
  },
  {
    name: 'telephone',
    required: true,
    label: 'Téléphone',
    align: 'center',
    field: (row) => row.telephone,
    sortable: true,
  },
  {
    name: 'actif',
    required: true,
    label: 'Actif',
    align: 'center',
    field: (row) => row.actif,
    sortable: true,
  },
];

const rows = ref<UserListing[]>([...fakeUtilisateursList]);
</script>
