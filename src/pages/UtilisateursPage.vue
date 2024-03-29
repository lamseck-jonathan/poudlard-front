<template>
  <q-page class="q-pt-md">
    <custom-datagrid
      row-key="id"
      :columns="columns"
      :rows="users"
      :action-btn="false"
      :context-menu-items="contextMenuItems"
      :loading="userStore.isLoading"
      @click:context-item="
        ({ itemMenu, data }) => onContextMenuClick(itemMenu, data)
      "
      use-context-menu
      show-search-input
    />

    <base-modal
      v-model="showUtilisateurModal"
      title="Formulaire Utilisateur"
      width="800px"
    >
      <form-utilisateur
        v-model="utilisateurModel"
        :mode="utilisateurCrudAction"
        @submit="onFormSubmit"
      />
    </base-modal>
  </q-page>
</template>

<script lang="ts" setup>
import CustomDatagrid from 'src/components/CustomDatagrid.vue';
import BaseModal from 'src/components/BaseModal.vue';
import FormUtilisateur from 'src/components/FormUtilisateur.vue';
import { DatagridColumns } from 'src/model/DatagridColumns.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { User, UserListing } from 'src/model/User.interface';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { ItemContextMenu } from 'src/model/ItemContextMenu.interface';
import { useUserStore } from 'src/stores/user-store';
import { doc, getFirestore, updateDoc } from 'firebase/firestore/lite';
import { firebaseApp } from 'src/firebase';
import { useToast } from 'src/composables/Toast.composable';
import { ToastType } from 'src/enums/ToastType.enum';
import { useLoadingPopup } from 'src/composables/Popup.composable';

const userStore = useUserStore();
const db = getFirestore(firebaseApp);

const { loadingPopup } = useLoadingPopup();

/*-------- MainLayout Store --------*/
const mainLayoutStore = useMainLayoutStore();

onBeforeMount(() => {
  userStore.fetchUserList();
});

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'mdi-account-multiple-outline',
    title: 'utilisateurs',
    routeName: 'utilisateur',
    path: '/utilisateurs',
  });
});

/*-------- Handle modal --------*/
const showUtilisateurModal = ref<boolean>(false);

/*-------- Crud operations --------*/
const utilisateurModel = ref<User>({} as User);
const utilisateurCrudAction = ref<CrudAction>(CrudAction.READ);

function onContextMenuClick(itemMenu: ItemContextMenu, data: User) {
  switch (itemMenu.event) {
    case CrudAction.READ:
      utilisateurModel.value = { ...data };
      utilisateurCrudAction.value = CrudAction.READ;
      showUtilisateurModal.value = true;
      break;

    case CrudAction.UPDATE:
      utilisateurModel.value = { ...data };
      utilisateurCrudAction.value = CrudAction.UPDATE;
      showUtilisateurModal.value = true;
      break;

    default:
      break;
  }
}

/*-------- Listing operations --------*/
const contextMenuItems: ItemContextMenu[] = [
  {
    label: 'Voir',
    event: CrudAction.READ,
    appendIcon: 'mdi-eye-outline',
    isDisabled: false,
  },
  {
    label: 'Modifier',
    event: CrudAction.UPDATE,
    appendIcon: 'mdi-file-edit-outline',
    isDisabled: false,
  },
];
const columns: DatagridColumns[] = [
  {
    name: 'nom',
    required: true,
    label: 'Nom',
    align: 'left',
    field: (row) => row.nom,
    sortable: true,
  },
  {
    name: 'prenom',
    required: true,
    label: 'Prénom(s)',
    align: 'left',
    field: (row) => row.prenom,
    sortable: true,
  },
  {
    name: 'role',
    required: true,
    label: 'Role',
    align: 'left',
    field: (row) => row.role,
    sortable: true,
  },
  {
    name: 'adresse',
    required: true,
    label: 'adresse',
    align: 'center',
    field: (row) => row.adresse,
    sortable: true,
  },
  {
    name: 'email',
    required: true,
    label: 'email',
    align: 'center',
    field: (row) => row.email,
    sortable: true,
  },
  {
    name: 'telephone',
    required: true,
    label: 'Téléphone',
    align: 'center',
    field: (row) => row.telephone,
    sortable: true,
  },
  {
    name: 'actif',
    required: true,
    label: 'Actif',
    align: 'center',
    field: (row) => row.actif,
    sortable: true,
  },
];

const users = computed<UserListing[]>(() => {
  return userStore.users as UserListing[];
});

function closeModal() {
  showUtilisateurModal.value = false;
}

async function updateUtilisateur(user: UserListing) {
  loadingPopup.show();
  const docRef = doc(db, 'user', user.id);
  await updateDoc(docRef, {
    id: user.id,
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    role: user.role,
    telephone: user.telephone,
    actif: user.actif,
  });

  const idx = userStore.users.findIndex((el) => el.id === user.id);
  userStore.users[idx] = { ...user };

  loadingPopup.hide();
  useToast('Succès', 'Utilisateur modifié avec succès', ToastType.SUCCESS);
}

/**
 * @desc handling on form submit event
 */
function onFormSubmit() {
  console.log('onFormSubmit', utilisateurModel.value);
  updateUtilisateur(utilisateurModel.value);

  // userStore.users;  update list here
  closeModal();
}
</script>
