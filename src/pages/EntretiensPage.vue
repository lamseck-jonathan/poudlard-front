<template>
  <q-page class="q-pt-md">
    <custom-datagrid
      row-key="id"
      :columns="columns"
      :rows="rows"
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
import CustomDatagrid from 'src/components/CustomDatagrid.vue';
import { fakeEntretiensList } from 'src/data/fakeEntretiens.fake';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { Entretien } from 'src/model/Entretien.interface';
import { ItemContextMenu } from 'src/model/ItemContextMenu.interface';
import { useEntretienStore } from 'src/stores/entretien-store';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const entretienStore = useEntretienStore();
const mainLayoutStore = useMainLayoutStore();

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'present_to_all',
    title: 'entretien',
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
  console.log(entretienStore.FormEntretien);

  switch (itemMenu.event) {
    case CrudAction.READ:
      entretienStore.crudAction = CrudAction.READ;
      router.push({ name: 'formulaire-entretien' });
      break;

    case CrudAction.UPDATE:
      entretienStore.crudAction = CrudAction.UPDATE;
      router.push({ name: 'formulaire-entretien' });

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

entretienStore.fetchEntretienList();
const rows = computed<Entretien[]>(() => {
  return entretienStore.entretiens as Entretien[];
});
</script>
