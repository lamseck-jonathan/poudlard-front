<template>
  <q-page class="row justify-center items-center q-pt-md">
    <!-- Si le candidat n'a aucun test à effectué -->
    <q-card v-if="false" flat>
      <q-card-section>
        <span class="text-h5 text-weight-bold q-mb-lg"
          >Vous avez aucun test à effectuer!</span
        >
        <br />
        Pour plus d'information, veuillez contacter le recruteur.
      </q-card-section>
    </q-card>

    <!-- Si un sujet est prêt pour le candidat -->
    <div v-if="true" class="width-fulls">
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
import { fakeSujetList } from 'src/data/sujets.fake';
import { Sujet } from 'src/model/Sujet.interface';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const sujetModel = ref<Sujet>({ ...fakeSujetList[0] });

function onCommencer() {
  router.push('/interview/performing');
}
</script>
