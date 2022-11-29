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

      <form
        v-if="!isRetourSent"
        class="q-pl-md"
        ref="formRef"
        @submit.prevent="sendEmail()"
      >
        <div class="text-h6 q-mb-sm">Voudriez-vous faire un retour ?</div>

        <input
          type="hidden"
          name="contact"
          :value="entretienStore.currentInterview.candidat.email"
        />

        <q-input
          v-model="retourModel"
          type="textarea"
          name="message"
          hide-bottom-space
          outlined
          dense
        />

        <q-btn
          :loading="retourIsLoading"
          class="q-mt-md"
          label="envoyer"
          color="primary"
          type="submit"
          style="width: 100%"
          dense
        />
      </form>

      <div v-else class="q-pl-md text-h5 text-weight-bold">Retour envoyé!</div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import emailjs from '@emailjs/browser';
import { QForm } from 'quasar';
import { useEntretienStore } from 'src/stores/entretien-store';
import { ref } from 'vue';

const retourModel = ref<string>('');
const isRetourSent = ref<boolean>(false);
const formRef = ref<QForm>();
const retourIsLoading = ref<boolean>(false);

const entretienStore = useEntretienStore();

function sendEmail() {
  retourIsLoading.value = true;
  emailjs
    .sendForm(
      'service_v2rkscu', // service ID
      'template_aum7t0r', // template ID
      formRef.value,
      'N74lDjcCiDXuYrvtV' // public Key
    )
    .then(
      (result: unknown) => {
        console.log('SUCCESS!', result);
        isRetourSent.value = true;
        retourModel.value = '';
      },
      (error: unknown) => {
        console.log('FAILED...', error);
      }
    )
    .finally(() => (retourIsLoading.value = false));
}
</script>
