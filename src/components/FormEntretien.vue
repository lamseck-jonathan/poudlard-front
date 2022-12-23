<template>
  <q-form @submit="onSubmit" @validationError="displayInvalidFormError" greedy>
    <div class="formulaire-entretien-header">Propriété de générale</div>
    <div class="column q-gutter-md q-px-md q-mb-md">
      <div class="col">
        <div class="q-mb-sm">Date :</div>
        <q-input
          v-model="entretienStore.FormEntretien.date"
          :rules="[required]"
          :type="entretienStore.isInAddMode ? 'date' : 'text'"
          :readonly="entretienStore.isInReadMode"
          hide-bottom-space
          outlined
          dense
        />
      </div>

      <div class="col">
        <div class="q-mb-sm">Date Limite :</div>
        <q-input
          v-model="entretienStore.FormEntretien.dateLimite"
          :rules="[required]"
          :type="entretienStore.isInAddMode ? 'date' : 'text'"
          locale="DD/MM/YYYY"
          :readonly="entretienStore.isInReadMode"
          hide-bottom-space
          outlined
          dense
        />
      </div>

      <div class="col">
        <div class="q-mb-sm">Statut :</div>
        <q-select
          v-model="entretienStore.FormEntretien.statut"
          :rules="[required]"
          :options="entretienStatutOptions"
          :readonly="entretienStore.isInReadMode"
          hide-bottom-space
          outlined
          dense
        />
      </div>
    </div>

    <div class="formulaire-entretien-header q-mt-lg">Candidat</div>
    <div class="row items-center">
      <div class="col-5 entretien-display-item">
        <entretien-display-candidat-item
          :candidat="entretienStore.FormEntretien.candidat"
        />
      </div>

      <div class="col q-pl-md">
        <custom-datagrid
          row-key="id"
          :columns="candidatColumns"
          :rows="candidatRows"
          :action-btn="false"
          @click:row="onSelectCandidat"
          show-search-input
        />
      </div>
    </div>

    <div class="formulaire-entretien-header q-mt-lg">Sujet</div>
    <div class="entretien-display-item q-px-md q-mb-md">
      <entretien-display-sujet-item
        :sujet="entretienStore.FormEntretien.sujet"
      />
    </div>

    <custom-datagrid
      row-key="id"
      :columns="sujetColumns"
      :rows="sujetRows"
      :action-btn="false"
      @click:row="onSelectSujet"
      show-search-input
    />

    <form v-if="entretienStore.isInReadMode" ref="formRef" @submit.prevent="sendMail()">
      <input
        type="hidden"
        name="to_email"
        :value="entretienStore.FormEntretien.candidat.email"
      />

      <input
        type="hidden"
        name="to_name"
        :value="entretienStore.FormEntretien.candidat.prenom"
      />

      <q-btn
        v-if="entretienStore.isInReadMode"
        class="row"
        color="primary"
        label="Notifier le candidat"
        type="submit"
      ></q-btn>
    </form>

    <div class="row" style="margin-top: 2rem">
      <q-btn
        class="col bg-blue-grey-4 text-white q-mr-sm"
        :label="entretienStore.isInReadMode ? 'retour' : 'annuler'"
        @click="onAnnuler"
      />

      <q-btn
        v-if="!entretienStore.isInReadMode"
        class="col q-ml-sm"
        type="submit"
        color="primary"
        :label="entretienStore.isInAddMode ? 'Ajouter' : 'Mettre à jour'"
      />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import CustomDatagrid from 'src/components/CustomDatagrid.vue';
import EntretienDisplayCandidatItem from 'src/components/EntretienDisplayCandidatItem.vue';
import EntretienDisplaySujetItem from 'src/components/EntretienDisplaySujetItem.vue';
import { useLoadingPopup } from 'src/composables/Popup.composable';
import { useToast } from 'src/composables/Toast.composable';
import { EntretienStatut } from 'src/enums/EntretienStatut.enum';
import { ToastType } from 'src/enums/ToastType.enum';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { Sujet, SujetListing } from 'src/model/Sujet.interface';
import { User } from 'src/model/User.interface';
import { useEntretienStore } from 'src/stores/entretien-store';
import { useSujetStore } from 'src/stores/sujet-store';
import { useUserStore } from 'src/stores/user-store';
import { totalDuree, totalPoint } from 'src/utils/sujet.util';
import { msToTime } from 'src/utils/timeConvertor.util';
import { required } from 'src/utils/validationRules.util';
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import emailjs from '@emailjs/browser';

const emit = defineEmits(['submit']);
const entretienStore = useEntretienStore();
const userStore = useUserStore();
const sujetStore = useSujetStore();

onBeforeMount(() => {
  sujetStore.fetchSujetList();
  userStore.fetchCandidatList();
});

const entretienStatutOptions: EntretienStatut[] = [
  EntretienStatut.EN_COURS,
  EntretienStatut.ANNULE,
  EntretienStatut.ACHEVE,
];

const candidatColumns: DatagridColumns[] = [
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
    name: 'email',
    required: true,
    label: 'email',
    align: 'center',
    field: (row) => row.email,
    sortable: true,
  },
];

/*---------------- Candidat ----------------*/

const candidatRows = computed(() => {
  const allCandidats = userStore.candidats.filter((user) => {
    return user.actif;
  });

  return allCandidats;
});

function onSelectCandidat(candidat: User) {
  if (!entretienStore.isInReadMode) {
    entretienStore.FormEntretien.candidat = candidat;
  }
}

/*---------------- Sujet ----------------*/
const router = useRouter();
const sujetColumns: DatagridColumns[] = [
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

const sujetRows = computed((): SujetListing[] => {
  return sujetStore.sujets.map((sujet) => ({
    id: sujet.id,
    titre: sujet.titre,
    description: sujet.description,
    niveau: sujet.niveau,
    tests: sujet.tests,
    totalPoint: totalPoint(sujet.tests),
    totalDuree: msToTime(totalDuree(sujet.tests)),
  }));
});

function onSelectSujet(sujet: Sujet) {
  if (!entretienStore.isInReadMode) {
    entretienStore.FormEntretien.sujet = sujet;
  }
}

function onAnnuler() {
  router.push({ name: 'entretien' });
}

function onSubmit() {
  emit('submit');
}

function displayInvalidFormError() {
  useToast(
    'Error',
    'Veuillez corriger les erreurs dans les champs',
    ToastType.ERROR
  );
}

const formRef = ref<HTMLElement>();
const { loadingPopup } = useLoadingPopup();

function sendMail() {
  loadingPopup.show();

  emailjs
    .sendForm(
      'service_v2rkscu', // service ID
      'template_6i37ebdd', // template ID
      formRef.value,
      'N74lDjcCiDXuYrvtV' // public Key
    )
    .then(
      () => {
        useToast('SUCCESS', 'Email envoyé avec succès', ToastType.SUCCESS);
      },
      () => {
        useToast('ERROR', "Echec de l'envoi du mail", ToastType.ERROR);
      }
    )
    .finally(() => loadingPopup.hide());
}
</script>

<style lang="scss" scoped>
.formulaire-entretien-header {
  padding: 0.3rem 0px;
  text-align: center;
  background-color: rgb(234, 234, 234);
  font-weight: bolder;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.entretien-display-item {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 1rem;
}
</style>
