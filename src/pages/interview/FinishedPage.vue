<template>
  <q-page class="column justify-center items-center q-pt-md">
    <div style="width: 40rem">
      <q-card class="q-mb-lg" flat>
        <q-card-section>
          <span class="text-h5 text-weight-bold q-mb-lg"
            >Vous avez fini votre test 😊</span
          >
          <br />
          Pour la suite, veuillez contactez le recruteur.
        </q-card-section>
      </q-card>

      <div class="q-pl-md">
        <div class="text-h6 q-mb-sm">Voudriez-vous faire un retour ?</div>
        <q-input
          v-model="retourModel"
          type="textarea"
          hide-bottom-space
          outlined
          dense
        />

        <q-btn
          class="q-mt-md"
          label="envoyer"
          color="primary"
          style="width: 100%"
          dense
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const retourModel = ref<string>(''); // à envoyer via email.js
</script>
