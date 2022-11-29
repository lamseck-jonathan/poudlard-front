<template>
  <q-page class="column items-center justify-center">
    <div class="row">
      <img
        src="~assets/logo/M_high_logo_transparent.png"
        style="width: 300px"
      />
    </div>

    <q-form
      v-if="!authStore.isLoading && !fakeLoader"
      @submit.stop="onSubmit"
      class="q-mt-md q-gutter-y-md"
      style="width: 300px"
    >
      <q-input
        v-model="userLogin.email"
        label="Email"
        :rules="[required, isValidEmail]"
        hide-bottom-space
        outlined
        dense
      >
        <template v-slot:append>
          <q-icon name="alternate_email" />
        </template>
      </q-input>

      <q-input
        v-model="userLogin.password"
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

      <q-btn
        color="primary"
        label="Se connecter"
        class="w-full"
        style="margin-top: 2rem"
        type="submit"
      />
    </q-form>

    <!-- loading  -->
    <div v-else class="flex-center column" data-cy="login_loading_wrapper">
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

<script lang="ts" setup>
import { UserLogin } from 'src/model/User.interface';
import { onBeforeMount, reactive, ref } from 'vue';
import { required, isValidEmail } from 'src/utils/validationRules.util';
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/user-store';

const isPwd = ref<boolean>(true); // for password field
const userLogin = reactive<UserLogin>({
  email: '',
  password: '',
});

const fakeLoader = ref<boolean>(false);
const router = useRouter();
const authStore = useAuthStore();
const usersStore = useUserStore();

onBeforeMount(async () => {
  await usersStore.fetchCandidatList();
});

/**
 * @desc Submit form
 */
function onSubmit() {
  fakeLoader.value = true;
  authStore
    .login(userLogin)
    .then(() => {
      if (foundInCandidat(userLogin.email)) {
        router.push({ name: 'interview-home' });
      } else {
        router.push({ name: 'dashboard' });
      }
    })
    .finally(() => {
      setTimeout(() => (fakeLoader.value = false), 3000);
    });
}

function foundInCandidat(userEmail: string) {
  const idx = usersStore.users.findIndex((el) => el.email === userEmail);
  return idx > -1;
}
</script>

<style lang="scss" scoped>
.width_330 {
  width: 330px;
}
</style>
