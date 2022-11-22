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
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { onMounted, ref } from 'vue';
import { UserListing } from 'src/model/User.interface';
import { fakeUtilisateursList } from 'src/data/utilisateurs.fake';

const mainLayoutStore = useMainLayoutStore();

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'mdi-account-multiple-outline',
    title: 'utilisateur',
    routeName: 'utilisateur',
    path: '/utilisateurs',
  });
});

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
