<template>
  <q-page class="q-pt-md">
    <custom-datagrid
      row-key="id"
      :columns="columns"
      :rows="users"
      :action-btn="false"
      :context-menu-items="menuItems"
      @click:context-item="
        ({ itemMenu, data }) => onContextMenuClick(itemMenu, data)
      "
      use-context-menu
      show-search-input
    />
  </q-page>
</template>

<script lang="ts" setup>
import CustomDatagrid from 'src/components/CustomDatagrid.vue';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { ItemContextMenu } from 'src/model/ItemContextMenu.interface';
import { UserListing } from 'src/model/User.interface';
import { useFicheCandidatStore } from 'src/stores/fiche-candidat-store';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { useUserStore } from 'src/stores/user-store';
import { computed, onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';

/*--------------- Managing Store -------------*/
const mainLayoutStore = useMainLayoutStore();
const userStore = useUserStore();
onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'emoji_events',
    title: 'candidat',
    routeName: 'candidats',
    path: '/candidats',
  });
});

onBeforeMount(() => {
  userStore.fetchCandidatList();
  ficheCandidatStore.getAllFicheCandidats();
});

/*--------------- Crud operation -------------*/
const router = useRouter();
const ficheCandidatStore = useFicheCandidatStore();

function onContextMenuClick(itemMenu: ItemContextMenu, data: UserListing) {
  ficheCandidatStore.selectedCandidat = data;

  switch (itemMenu.event) {
    case CrudAction.READ:
      ficheCandidatStore.crudAction = CrudAction.READ;
      router.push({ name: 'fiche-candidat' });
      break;

    case CrudAction.UPDATE:
      ficheCandidatStore.crudAction = CrudAction.UPDATE;
      router.push({ name: 'fiche-candidat' });
      break;

    default:
      break;
  }
}

/*--------------- Listing operation -------------*/
const menuItems: ItemContextMenu[] = [
  {
    label: 'Voir',
    event: CrudAction.READ,
    appendIcon: 'mdi-eye-outline',
    isDisabled: false,
  },
  {
    label: 'Mettre à jour',
    event: CrudAction.UPDATE,
    appendIcon: 'mdi-file-edit-outline',
    isDisabled: false,
  },
  {
    label: 'Vider la fiche',
    event: CrudAction.DELETE,
    appendIcon: 'mdi-trash-can-outline',
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

const users = computed<UserListing[]>(() => {
  return userStore.users as UserListing[];
});
</script>
