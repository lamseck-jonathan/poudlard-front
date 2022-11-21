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
import { Role } from 'src/enums/Role.enum';

const mainLayoutStore = useMainLayoutStore();

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'mdi-account-multiple',
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

const rows = ref<UserListing[]>([
  {
    id: '1',
    nom: 'Razafiarison',
    prenom: 'Tafitasoa',
    role: Role.ADMIN,
    adresse: 'Ampopoka Golf Fianarantsoa',
    email: 'tafita@email.com',
    telephone: '0342821847',
    actif: true,
  },
  {
    id: '2',
    nom: 'Rasoanambinina',
    prenom: 'Patricia',
    role: Role.RECRUITER,
    adresse: 'Tanambao Fianarantsoa',
    email: 'patricia@email.com',
    telephone: '0349072975',
    actif: true,
  },
  {
    id: '3',
    nom: 'JEAN MARC',
    prenom: 'Leon',
    role: Role.CANDIDAT,
    adresse: 'Andrefanambohijanahary Antananarivo',
    email: 'leon@email.com',
    telephone: '0344745682',
    actif: true,
  },
  {
    id: '4',
    nom: 'Doe',
    prenom: 'John',
    role: Role.CANDIDAT,
    adresse: 'Chartre France',
    email: 'john@email.com',
    telephone: '+334563218654',
    actif: false,
  },
]);
</script>
