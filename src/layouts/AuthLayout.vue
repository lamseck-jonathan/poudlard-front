<template>
  <q-layout view="hHh lpR fFf" class="bg-light">
    <q-header style="background: transparent">
      <q-tabs
        dense
        inline-label
        class="text-primary shadow-2 q-px-lg"
        :align="'left'"
        style="box-shadow: none"
      >
        <q-tab
          name="mails"
          label="Connexion"
          :ripple="false"
          @click.prevent="goTo('login')"
        />
        <q-tab
          name="alarms"
          label="Inscription"
          :ripple="false"
          @click.prevent="goTo('signIn')"
        />
      </q-tabs>
    </q-header>

    <!-- content area -->
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 * Navigate
 * @param { string } routeName
 */
function goTo(routeName: string) {
  router.push({ name: routeName });
}
</script>
