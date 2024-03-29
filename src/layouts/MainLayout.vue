<template>
  <q-layout view="LHh lpR lFf">
    <q-header>
      <q-toolbar class="bg-white nav-bar">
        <q-toolbar-title class="text-primary flex items-center">
          <q-icon
            :name="mainLayoutStore.navbarPageInfo.icon"
            class="q-mr-sm"
            size="2rem"
          />
          <div class="text-weight-bold text-uppercase">
            {{ mainLayoutStore.navbarPageInfo.title }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      :model-value="true"
      class="text-blue-grey-9"
      show-if-above
      side="left"
      :width="275"
      :mini-width="70"
      :breakpoint="0"
    >
      <q-toolbar class="row justify-center">
        <q-img
          src="M_high_logo_transparent.png"
          alt="logo-app-side-menu"
          width="180px"
        />
      </q-toolbar>

      <q-list class="q-py-md">
        <q-item class="q-mb-md">
          <q-item-section avatar>
            <q-avatar size="40px">
              <q-img
                :src="`https://ui-avatars.com/api/?name=Tafita+Raza&background=0D8ABC&color=fff`"
                alt="avatar"
              />
            </q-avatar>
          </q-item-section>
          <q-item-section class="navbar_title text-gray">
            <q-item-label class="user_name text-uppercase text-weight-bold">
              {{
                mainLayoutStore.currentUser.prenom +
                ' ' +
                mainLayoutStore.currentUser.nom
              }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-for="item in menuItems"
          :key="item.title"
          class="item-menu"
          active-class="text-primary"
          :to="item.path"
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" class="q-pl-sm"></q-icon>
          </q-item-section>

          <q-item-section class="text-uppercase">
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-item
        class="text-blue__dark item-menu fixed-bottom q-mb-sm"
        active-class="text-primary"
        @click="onDeconnexion"
        clickable
      >
        <q-item-section avatar>
          <q-icon name="mdi-logout" class="q-pl-sm"></q-icon>
        </q-item-section>

        <q-item-section class="text-uppercase">
          <q-item-label>Déconnexion</q-item-label>
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container class="q-ml-lg q-pr-lg">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useConfirmationPopup } from 'src/composables/Popup.composable';
import { PopupButton } from 'src/enums/Popup.enum';
import { SideBarMenu } from 'src/model/SideBarMenu.interface';
import { useAuthStore } from 'src/stores/auth-store';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const menuItems: SideBarMenu[] = [
  {
    icon: 'dashboard',
    title: 'Tableau de bord',
    routeName: 'dashboard',
    path: '/dashboard',
  },
  {
    icon: 'mdi-account-multiple-outline',
    title: 'utilisateurs',
    routeName: 'utilisateur',
    path: '/utilisateurs',
  },
  {
    icon: 'quiz',
    title: 'tests',
    routeName: 'tests',
    path: '/tests',
  },
  {
    icon: 'mdi-text-subject',
    title: 'sujets',
    routeName: 'sujets',
    path: '/sujets',
  },
  {
    icon: 'emoji_events',
    title: 'candidats',
    routeName: 'candidats',
    path: '/candidats',
  },
  {
    icon: 'present_to_all',
    title: 'entretiens',
    routeName: 'entretiens  ',
    path: '/entretiens',
  },
  {
    icon: 'mdi-clipboard-text-outline',
    title: 'resultats',
    routeName: 'resultats  ',
    path: '/resultats',
  },
];

const mainLayoutStore = useMainLayoutStore();
const authStore = useAuthStore();
const router = useRouter();

onBeforeMount(() => {
  authStore.getCurrentUser().then((user) => {
    if (user) {
      mainLayoutStore.currentUser = user;
    }
  });
});

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

<style lang="scss">
.q-drawer {
  z-index: 2000;
  box-shadow: 1px 0px 10px rgb(195, 194, 194);
}

.nav-bar {
  border-bottom: solid rgb(232, 232, 232) 0.5px;
  height: 4rem;
  padding: 0px 2.5rem;
}
</style>
