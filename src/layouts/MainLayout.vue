<template>
  <q-layout view="LHh lpR lFf">
    <q-header>
      <q-toolbar class="bg-white nav-bar">
        <q-toolbar-title class="text-primary flex items-center">
          <q-icon :name="mainLayoutStore.navbarPageInfo.icon" size="1.5rem" />
          <div class="text-weight-bold text-uppercase">
            {{ mainLayoutStore.navbarPageInfo.title }}
          </div>
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { SideBarMenu } from 'src/model/SideBarMenu.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';

const menuItems: SideBarMenu[] = [
  {
    icon: 'dashboard',
    title: 'Tableau de bord',
    routeName: 'dashboard',
    path: '/dashboard',
  },
  {
    icon: 'mdi-account-multiple',
    title: 'utilisateur',
    routeName: 'utilisateur',
    path: '/utilisateurs',
  },
  {
    icon: 'quiz',
    title: 'test',
    routeName: 'tests',
    path: '/tests',
  },
  {
    icon: 'mdi-text-subject',
    title: 'sujet',
    routeName: 'sujets',
    path: '/sujets',
  },
  {
    icon: 'emoji_events',
    title: 'candidat',
    routeName: 'candidats',
    path: '/candidats',
  },
  {
    icon: 'present_to_all',
    title: 'entretien',
    routeName: 'entretiens  ',
    path: '/entretiens',
  },
];

const mainLayoutStore = useMainLayoutStore();
</script>
