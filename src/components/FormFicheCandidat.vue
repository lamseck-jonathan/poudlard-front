<template>
  <q-form
    class="q-gutter-md"
    @submit="onSubmit"
    @validationError="displayInvalidFormError"
    greedy
  >
    <!-------------- Start header ---------------->
    <div class="row">
      <div class="col-2 text-uppercase text-weight-bold">Nom :</div>
      <div class="col">{{ ficheCandidatStore.formFicheCandidat.user.nom }}</div>

      <div class="col-2 text-uppercase text-weight-bold">Mail :</div>
      <div class="col">
        {{ ficheCandidatStore.formFicheCandidat.user.email }}
      </div>
    </div>

    <div class="row">
      <div class="col-2 text-uppercase text-weight-bold">Prénom(s) :</div>
      <div class="col">
        {{ ficheCandidatStore.formFicheCandidat.user.prenom }}
      </div>

      <div class="col-2 text-uppercase text-weight-bold">Téléphone :</div>
      <div class="col">
        {{ ficheCandidatStore.formFicheCandidat.user.telephone }}
      </div>
    </div>

    <q-separator></q-separator>
    <div class="flex">
      <div class="text-uppercase text-weight-bold q-mr-lg">
        Poste Convoité :
      </div>
      <div>Développeur</div>
    </div>
    <q-separator></q-separator>
    <!-------------- End header ---------------->

    <!-------------- Start Competences ---------------->
    <div class="fiche-candidat-header">Compétences</div>
    <base-form-competence
      :competenceNumber="1"
      v-model="competence1"
      :readonly="ficheCandidatStore.isInReadMode"
    />
    <base-form-competence
      :competenceNumber="2"
      v-model="competence2"
      :readonly="ficheCandidatStore.isInReadMode"
    />
    <base-form-competence
      :competenceNumber="3"
      v-model="competence3"
      :readonly="ficheCandidatStore.isInReadMode"
    />
    <div class="flex items-center">
      <div class="q-mr-lg">Années d'expériences réelles en développement :</div>
      <q-input
        class="col"
        v-model="ficheCandidatStore.formFicheCandidat.anneeExperienceReelle"
        type="number"
        :readonly="ficheCandidatStore.isInReadMode"
        hide-bottom-space
        outlined
        dense
      />
    </div>
    <!-------------- End Competences ---------------->

    <!-------------- Niveau d'étude ---------------->
    <div class="fiche-candidat-header">Niveau d'étude</div>
    <div class="row">
      <q-select
        class="col q-pr-sm"
        v-model="ficheCandidatStore.formFicheCandidat.niveauAcademique.diplome"
        label="Diplôme"
        :options="diplomeOptions"
        :readonly="ficheCandidatStore.isInReadMode"
        hide-bottom-space
        outlined
        dense
      />

      <q-input
        class="col q-pl-sm"
        v-model="ficheCandidatStore.formFicheCandidat.niveauAcademique.date"
        :type="
          ficheCandidatStore.formFicheCandidat.niveauAcademique.date
            ? 'text'
            : 'date'
        "
        :label="
          ficheCandidatStore.formFicheCandidat.niveauAcademique.date
            ? 'Date d\'obtention'
            : ''
        "
        :readonly="ficheCandidatStore.isInReadMode"
        hide-bottom-space
        outlined
        dense
      />
    </div>

    <div class="row">
      <q-input
        class="col q-pr-sm"
        v-model="ficheCandidatStore.formFicheCandidat.niveauAcademique.option"
        label="Option"
        :readonly="ficheCandidatStore.isInReadMode"
        hide-bottom-space
        outlined
        dense
      />

      <q-input
        class="col q-pl-sm"
        v-model="ficheCandidatStore.formFicheCandidat.niveauAcademique.institut"
        label="Institut"
        :readonly="ficheCandidatStore.isInReadMode"
        hide-bottom-space
        outlined
        dense
      />
    </div>

    <q-input
      class="row"
      v-model="ficheCandidatStore.formFicheCandidat.niveauAcademique.autre"
      label="Autre"
      type="textarea"
      :readonly="ficheCandidatStore.isInReadMode"
      hide-bottom-space
      outlined
      dense
    />
    <!-------------- End Niveau d'étude ---------------->

    <!--------------Start competence linguistique ---------------->
    <div class="fiche-candidat-header">Compétences linguistique</div>
    <base-form-langue
      v-model="ficheCandidatStore.formFicheCandidat.niveauFrancais"
      :readonly="ficheCandidatStore.isInReadMode"
      :groupLibelle="'Français '"
    />

    <base-form-langue
      v-model="ficheCandidatStore.formFicheCandidat.niveauAnglais"
      :readonly="ficheCandidatStore.isInReadMode"
      :groupLibelle="'Anglais '"
    />
    <!--------------Start competence linguistique ---------------->

    <!--------------Start Candidat & société ---------------->
    <div class="fiche-candidat-header">Candidat & Société</div>
    <q-checkbox
      v-model="ficheCandidatStore.formFicheCandidat.connaisSociete"
      :disable="ficheCandidatStore.isInReadMode"
      label="Connaissance de la société"
    />

    <q-input
      v-model="ficheCandidatStore.formFicheCandidat.motivation"
      label="Motivation"
      type="textarea"
      :readonly="ficheCandidatStore.isInReadMode"
      hide-bottom-space
      outlined
      dense
    />
    <!--------------End Candidat & société ---------------->

    <!--------------Start Situation du candidat ---------------->
    <div class="fiche-candidat-header">Situation du candidat</div>
    <div class="row q-gutter-md">
      <q-select
        class="col"
        v-model="ficheCandidatStore.formFicheCandidat.situationActuelle"
        label="Situation Actuelle"
        :options="situationActuelleOptions"
        :readonly="ficheCandidatStore.isInReadMode"
        hide-bottom-space
        outlined
        dense
      />

      <q-input
        class="col"
        v-model="ficheCandidatStore.formFicheCandidat.disponibilite"
        label="Disponibilité"
        :readonly="ficheCandidatStore.isInReadMode"
        hide-bottom-space
        outlined
        dense
      />

      <q-input
        class="col"
        v-model="ficheCandidatStore.formFicheCandidat.pretention"
        label="Prétention salariale"
        :readonly="ficheCandidatStore.isInReadMode"
        hide-bottom-space
        outlined
        dense
      />
    </div>
    <!--------------END Situation du candidat ---------------->

    <div class="row q-mt-lg">
      <q-btn
        class="col bg-blue-grey-4 text-white q-mr-sm"
        label="annuler"
        @click="onAnnuler"
      />

      <q-btn
        v-if="!ficheCandidatStore.isInReadMode"
        class="col q-ml-sm"
        type="submit"
        color="primary"
        label="mettre à jour"
      />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import BaseFormCompetence from './BaseFormCompetence.vue';
import BaseFormLangue from './BaseFormLangue.vue';
import { Competence } from 'src/model/FicheCandidat.interface';
import { useFicheCandidatStore } from 'src/stores/fiche-candidat-store';
import { computed, onBeforeMount } from 'vue';
import { SituationActuelle } from 'src/enums/SituationActuelle.enum';
import { useRouter } from 'vue-router';
import { Diplome } from 'src/enums/Diplome.enum';
import { useToast } from 'src/composables/Toast.composable';
import { ToastType } from 'src/enums/ToastType.enum';
import {
  useConfirmationPopup,
  useLoadingPopup,
} from 'src/composables/Popup.composable';
import { PopupButton } from 'src/enums/Popup.enum';

const router = useRouter();
const ficheCandidatStore = useFicheCandidatStore();
const { loadingPopup } = useLoadingPopup();

const competence1 = computed({
  get() {
    return ficheCandidatStore.formFicheCandidat.competences[0];
  },

  set(newValue: Competence) {
    ficheCandidatStore.formFicheCandidat.competences[0] = newValue;
  },
});

const competence2 = computed({
  get() {
    return ficheCandidatStore.formFicheCandidat.competences[1];
  },

  set(newValue: Competence) {
    ficheCandidatStore.formFicheCandidat.competences[1] = newValue;
  },
});

const competence3 = computed({
  get() {
    return ficheCandidatStore.formFicheCandidat.competences[2];
  },

  set(newValue: Competence) {
    ficheCandidatStore.formFicheCandidat.competences[2] = newValue;
  },
});

const situationActuelleOptions: SituationActuelle[] = [
  SituationActuelle.EN_FREELANCE,
  SituationActuelle.EN_PAUSE_PRO,
  SituationActuelle.EN_POSTE,
  SituationActuelle.EN_RECHERCHE_D_EMPLOI,
];

const diplomeOptions: Diplome[] = [
  Diplome.BAC,
  Diplome.BAC1,
  Diplome.BAC2,
  Diplome.BAC3,
  Diplome.BAC4,
  Diplome.BAC5,
  Diplome.LICENCE,
  Diplome.MASTER,
  Diplome.DOCTORAT,
];

onBeforeMount(() => {
  ficheCandidatStore.initFormFicheCandidat();
  ficheCandidatStore.getFicheCandidat(ficheCandidatStore.selectedCandidat.id);

  if (ficheCandidatStore.formFicheCandidat.competences) {
    ficheCandidatStore.formFicheCandidat.competences.forEach((comp, idx) => {
      switch (idx) {
        case 0:
          competence1.value = comp;
          break;
        case 1:
          competence2.value = comp;
          break;
        case 2:
          competence3.value = comp;
          break;

        default:
          break;
      }
    });
  }
});

function onAnnuler() {
  const { confirmationPopup } = useConfirmationPopup(
    'Confirmation',
    'Voulez vous vraiment quitter cette page ?'
  );

  confirmationPopup.onOk(async ({ clicked }) => {
    if (clicked === PopupButton.YES) {
      router.push({ name: 'candidat' });
    }
  });
}

async function onSubmit() {
  loadingPopup.show();
  await ficheCandidatStore.updateFicheCandidat();
  loadingPopup.hide();
  router.push({ name: 'candidat' });
}

function displayInvalidFormError() {
  useToast(
    'Erreur',
    'Veuillez verifier les valeurs dans les champs',
    ToastType.ERROR
  );
}
</script>

<style lang="scss" scoped>
.fiche-candidat-header {
  padding: 0.3rem 0px;
  text-align: center;
  background-color: rgb(234, 234, 234);
  font-weight: bolder;
  margin-top: 2rem;
}
</style>
