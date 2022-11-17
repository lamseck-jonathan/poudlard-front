<template>
  <q-page class="column items-center justify-center" style="padding: 0px 3rem">
    <div>
      <img
        src="~assets/logo/M_high_logo_transparent.png"
        style="width: 300px"
      />
    </div>
    <q-form v-if="!authIsLoading" @submit.stop="onSubmit">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-bold text-uppercase">Formulaire d'Inscription</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-gutter-y-md">
          <q-input
            v-model="userSingIn.nom"
            label="Nom"
            :rules="[required]"
            hide-bottom-space
            outlined
            dense
          />

          <q-input
            v-model="userSingIn.prenom"
            label="Prénom(s)"
            :rules="[required]"
            hide-bottom-space
            outlined
            dense
          />

          <div class="row">
            <q-input
              v-model="userSingIn.email"
              label="Email"
              class="q-pr-sm col-md-6"
              :rules="[required, isValidEmail]"
              hide-bottom-space
              outlined
              dense
            />

            <q-input
              v-model="userSingIn.role"
              label="Role"
              class="q-pl-sm col-md-6"
              readonly
              hide-bottom-space
              outlined
              dense
            />
          </div>

          <q-input
            model-value=""
            label="Clef d'inscription"
            class="w-full"
            readonly
            hide-bottom-space
            outlined
            dense
          />

          <div class="row">
            <q-input
              v-model="userSingIn.telephone"
              label="Téléphone"
              class="q-pr-sm col-md-6"
              hide-bottom-space
              outlined
              dense
            />

            <q-input
              v-model="userSingIn.adresse"
              label="Adresse"
              class="q-pl-sm col-md-6"
              hide-bottom-space
              outlined
              dense
            />
          </div>

          <q-input
            v-model="userSingIn.mdp"
            label="Mot de passe"
            :type="isPwd ? 'password' : 'text'"
            :rules="[required]"
            hide-bottom-space
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-input
            v-model="userSingIn.mdpVerif"
            label="Confirmer mot de passe"
            :type="isPwd ? 'password' : 'text'"
            :rules="[required, isPwdMatch]"
            hide-bottom-space
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section>
          <q-btn
            color="primary"
            label="S'inscrire"
            class="w-full"
            type="submit"
          />
        </q-card-section>
      </q-card>
    </q-form>

    <!-- loading  -->
    <div
      v-else
      class="flex-center column"
      data-cy="login_loading_wrapper"
      style="width: 300px"
    >
      <q-linear-progress
        indeterminate
        stripe
        rounded
        size="20px"
        color="primary"
        class="q-mt-sm width_330"
      />
      <p class="q-my-md">Chargement...</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { required, isValidEmail } from 'src/utils/validationRules.util';
import { UserSignIn } from 'src/model/User.interface';

const authIsLoading = ref<boolean>(false);
const isPwd = ref<boolean>(true); // for password field

const userSingIn = reactive<UserSignIn>({
  nom: '',
  prenom: '',
  email: '',
  role: '',
  telephone: '',
  adresse: '',
  mdp: '',
  mdpVerif: '',
});

const isPwdMatch = () =>
  userSingIn.mdp === userSingIn.mdpVerif ||
  'Les mots de passent ne se correspondent pas';

function onSubmit() {
  authIsLoading.value = true;
  setTimeout(() => {
    authIsLoading.value = false;
  }, 2000);
}
</script>
