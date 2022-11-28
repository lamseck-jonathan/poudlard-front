<template>
  <q-layout view="hHh lpR fFf" class="bg-light">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn
            v-show="false"
            label="Abandonner"
            icon="mdi-arrow-left"
            color="white"
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
