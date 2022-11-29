<template>
  <q-layout view="hHh lpR fFf" class="bg-light">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn
            label="Déconnexion"
            icon="mdi-arrow-left"
            color="white"
            @click="onDeconnexion"
            outline
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- content area -->
    <q-page-container class="q-px-md">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { useConfirmationPopup } from 'src/composables/Popup.composable';
import { PopupButton } from 'src/enums/Popup.enum';
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

function onDeconnexion() {
  const { confirmationPopup } = useConfirmationPopup(
    'Confirmation',
    'Voulez vous vraiment vous déconnecté ?'
  );

  confirmationPopup.onOk(({ clicked }) => {
    if (clicked === PopupButton.YES) {
      authStore.logout().then(() => {
        router.push({ name: 'login' });
      });
    }
  });
}
</script>
