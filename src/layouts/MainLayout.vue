<template>
  <q-layout view="LHh lpR lFf">
    <q-header>
      <q-toolbar class="bg-white nav-bar">
        <q-toolbar-title class="text-weight-bold text-primary text-uppercase">
          Utilisateurs
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      :model-value="true"
      show-if-above
      side="left"
      :width="275"
      :mini-width="70"
      :breakpoint="0"
    >
      <q-toolbar class="navbar_app_logo">
        <q-img
          src="M_high_logo_transparent.png"
          alt="logo-app-side-menu"
          width="200px"
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
            <q-item-label class="user_name text-uppercase">
              {{ 'Tafita' + ' ' + 'Raza' }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-for="item in menuItems"
          :key="item.title"
          class="item-menu"
          active-class="text-primary"
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

    <!-- content area -->
    <q-page-container class="q-ml-lg q-pr-lg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { SideBarMenu } from 'src/model/SideBarMenu.interface';

// Simple menu items (not expandable)
const menuItems: Array<SideBarMenu> = [
  {
    icon: 'mdi-account-multiple',
    title: 'utilisateur',
    routeName: 'utilisateur',
  },
  {
    icon: 'quiz',
    title: 'test',
    routeName: 'tests',
  },
  {
    icon: 'mdi-text-subject',
    title: 'sujet',
    routeName: 'sujets',
  },
  {
    icon: 'emoji_events',
    title: 'candidat',
    routeName: 'candidats',
  },
  {
    icon: 'present_to_all',
    title: 'entretien',
    routeName: 'entretiens  ',
  },
];
</script>

<style lang="scss">
.q-drawer {
  z-index: 2000;
  box-shadow: 1px 0px 10px rgb(195, 194, 194);
}

.navbar_app_logo {
  padding: 0.5rem;
  height: 5rem;
  justify-content: center;
}

.item-menu:hover {
  color: $primary;
}

.item-menu {
  color: $primary-dark;
}

.nav-bar {
  border-bottom: solid rgb(232, 232, 232) 0.5px;
  padding: 1rem 3rem;
}
</style>
