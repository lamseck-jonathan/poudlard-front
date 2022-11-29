<template>
  <q-page class="q-pt-md">
    <custom-datagrid
      row-key="id"
      :columns="columns"
      :rows="rows"
      :action-btn="false"
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
import { TestType } from 'src/enums/TestType.enum';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { Entretien } from 'src/model/Entretien.interface';
import { ItemContextMenu } from 'src/model/ItemContextMenu.interface';
import { ReponseCandidat } from 'src/model/Reponse.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { totalPoint } from 'src/utils/sujet.util';
import { computed, onBeforeMount } from 'vue-demi';

const allEntretien: Entretien[] = [...fakeEntretiensList];

function handleContextMenuClick(itemMenu: ItemContextMenu, data: Entretien) {
  switch (itemMenu.event) {
    case CrudAction.READ:
      console.log('data', data);
      break;

    default:
      break;
  }
}

const rows = computed(() => {
  return allEntretien.map((el) => ({
    candidat: `${el.candidat.nom} ${el.candidat.prenom}`,
    email: el.candidat.email,
    date: el.date,
    note: `${calcResultatNote([...(el.reponseCandidat || [])])} / ${totalPoint(
      el.sujet.tests
    )}`,
  }));
});

const columns: DatagridColumns[] = [
  {
    name: 'candidat',
    label: 'Candidat',
    align: 'left',
    field: (row) => row.candidat,
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: (row) => row.email,
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
    name: 'note',
    label: 'Note',
    align: 'left',
    field: (row) => row.note,
    sortable: true,
    sort: (a, b) => a - b,
  },
];

function calcResultatNote(responses: ReponseCandidat[]) {
  let note = 0;

  for (const res of responses) {
    const { test } = res;
    switch (test.type) {
      case TestType.QR:
        if (res.reponseQR && res.reponseQR === test.reponse) {
          note += test.bareme;
        }
        break;

      case TestType.QCMU:
        if (res.reponseQCMU && res.reponseQCMU.isTrue) {
          note += test.bareme;
        }

        break;

      case TestType.QCMM:
        if (res.reponseQCMM && res.reponseQCMM.length > 0) {
          let isValid = true;
          res.reponseQCMM.forEach((r) => {
            if (!r.isTrue) isValid = false;
          });

          if (isValid) note += test.bareme;
        }
        break;

      default:
        break;
    }
  }

  return note;
}

const mainLayoutStore = useMainLayoutStore();

onBeforeMount(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'mdi-clipboard-text-outline',
    title: 'resultat',
    routeName: 'resultats  ',
    path: '/resultats',
  });
});
</script>
