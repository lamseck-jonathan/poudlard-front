import { defineStore } from 'pinia';
import { SideBarMenu } from 'src/model/SideBarMenu.interface';

export const useMainLayoutStore = defineStore('mainLayout', {
  state: () => ({
    navbarPageInfo: <SideBarMenu>{
      icon: 'dashboard',
      title: 'dashboard',
      path: 'dashboard',
    },
    // Custom Datagrid
    pagination: {
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 5,
    },
  }),

  actions: {
    setNavBarpageInfo(info: SideBarMenu) {
      this.navbarPageInfo = info;
    },

    setRowsPerPage(nbRows: number) {
      this.pagination.rowsPerPage = nbRows;
    },
  },
});
