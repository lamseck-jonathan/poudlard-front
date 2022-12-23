<template>
  <q-page class="q-pt-md">
    <custom-datagrid
      row-key="id"
      :columns="columns"
      :rows="rows"
      :action-btn="false"
      :context-menu-items="contextMenuItems"
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
import { CrudAction } from 'src/enums/CrudAction.enum';
import { EntretienStatut } from 'src/enums/EntretienStatut.enum';
import { TestType } from 'src/enums/TestType.enum';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { Entretien } from 'src/model/Entretien.interface';
import { ItemContextMenu } from 'src/model/ItemContextMenu.interface';
import { ReponseCandidat } from 'src/model/Reponse.interface';
import { useEntretienStore } from 'src/stores/entretien-store';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { totalPoint } from 'src/utils/sujet.util';
import { computed, onBeforeMount } from 'vue-demi';
import { useRouter } from 'vue-router';

const entretienStore = useEntretienStore();
const mainLayoutStore = useMainLayoutStore();
const router = useRouter();

onBeforeMount(() => {
  entretienStore.getAllEntretien();

  mainLayoutStore.setNavBarpageInfo({
    icon: 'mdi-clipboard-text-outline',
    title: 'resultats',
    routeName: 'resultats  ',
    path: '/resultats',
  });
});

function handleContextMenuClick(itemMenu: ItemContextMenu, data: Entretien) {
  switch (itemMenu.event) {
    case CrudAction.READ:
      entretienStore.selectedResultat = data;
      console.log('selected ', entretienStore.selectedResultat);
      router.push({ name: 'see-result' });
      break;

    default:
      break;
  }
}
const allAchievedEntretiens = computed(() => {
  return entretienStore.entretiens.filter(
    (el) => el.statut === EntretienStatut.ACHEVE
  );
});

const rows = computed(() => {
  return allAchievedEntretiens.value.map((el) => ({
    id: el.id,
    dateLimite: el.dateLimite,
    candidatLabel: `${el.candidat.nom} ${el.candidat.prenom}`,
    email: el.candidat.email,
    date: el.date,
    note: `${calcResultatNote([...(el.reponseCandidat || [])])} / ${totalPoint(
      el.sujet.tests
    )}`,
    candidat: el.candidat,
    statut: el.statut,
    sujet: el.sujet,
    titreSujet: el.sujet.titre,
    reponseCandidat: el.reponseCandidat,
  }));
});

const columns: DatagridColumns[] = [
  {
    name: 'candidatLabel',
    label: 'Candidat',
    align: 'left',
    field: (row) => row.candidatLabel,
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
    name: 'titreSujet',
    label: 'Titre du sujet',
    align: 'left',
    field: (row) => row.candidatLabel,
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
  },
];

function calcResultatNote(responses: ReponseCandidat[]) {
  let note = 0;
  console.log('response', responses);

  for (const res of responses) {
    const { test } = res;
    switch (test.type) {
      case TestType.QR:
        if (res.reponseQR && res.reponseQR === test.reponse) {
          note += Number(test.bareme);
        }
        break;

      case TestType.QCMU:
        if (res.reponseQCMU && res.reponseQCMU.isTrue) {
          note += Number(test.bareme);
        }

        break;

      case TestType.QCMM:
        if (res.reponseQCMM && res.reponseQCMM.length > 0) {
          let isValid = true;
          res.reponseQCMM.forEach((r) => {
            if (!r.isTrue) isValid = false;
          });

          if (isValid) note += Number(test.bareme);
        }
        break;

      default:
        break;
    }
  }

  return note;
}

const contextMenuItems: ItemContextMenu[] = [
  {
    label: 'Voir les détails',
    event: CrudAction.READ,
    appendIcon: 'mdi-eye-outline',
    isDisabled: false,
  },
];
</script>
