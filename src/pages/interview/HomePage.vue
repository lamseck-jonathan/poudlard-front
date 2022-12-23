<template>
  <q-page class="row justify-center items-center q-pt-md">
    <!-- Si le candidat n'a aucun test à effectué -->
    <q-card v-if="!sujetModel" flat>
      <q-card-section>
        <span class="text-h5 text-weight-bold q-mb-lg"
          >Vous avez aucun test à effectuer!</span
        >
        <br />
        Pour plus d'information, veuillez contacter le recruteur.
      </q-card-section>
    </q-card>

    <!-- Si un sujet est prêt pour le candidat -->
    <div v-if="sujetModel" class="width-fulls">
      <div class="text-h5 text-weight-bold q-mb-lg">Votre test est prêt!</div>

      <interview-display-sujet class="q-mb-lg bg-grey-" :sujet="sujetModel" />

      <div class="q-mb-sm">
        NB: Une fois le bouton "commencer" cliqué, vous serez dirigé vers une
        page et commencer votre test.
      </div>

      <div class="q-mb-lg">
        ATTENTION! le test ne pourra en n'aucun cas s'annuler
      </div>

      <q-btn
        class="text-weight-bold"
        label="commencer"
        color="primary"
        dense
        style="width: 22rem"
        @click="onCommencer"
      />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import InterviewDisplaySujet from 'src/components/InterviewDisplaySujet.vue';
import { Sujet } from 'src/model/Sujet.interface';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useEntretienStore } from 'src/stores/entretien-store';
// import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { EntretienStatut } from 'src/enums/EntretienStatut.enum';
import { getAuth } from '@firebase/auth';

const router = useRouter();
const sujetModel = ref<Sujet>();
const entretienStore = useEntretienStore();
// const mainLayoutStore = useMainLayoutStore();

onBeforeMount(() => {
  entretienStore.getAllEntretien().then(async () => {
    const auth = await getAuth();
    const user = auth.currentUser;

    const entretiensDispos = entretienStore.entretiens.filter((el) => {
      if (user) {
        return (
          el.candidat.email === user.email &&
          el.statut === EntretienStatut.EN_COURS
        );
      } else {
        return (
          el.candidat.email === 'tafita.raza1@gmail.com' &&
          el.statut === EntretienStatut.EN_COURS
        );
      }
    });

    if (entretiensDispos.length > 0) {
      sujetModel.value = entretiensDispos[0].sujet;
      entretienStore.currentInterview = entretiensDispos[0];
    }
  });
});

function onCommencer() {
  router.push({ name: 'performing-test' });
}
</script>
