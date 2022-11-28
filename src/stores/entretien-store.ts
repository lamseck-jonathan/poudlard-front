import { defineStore } from 'pinia';
import { fakeEntretiensList } from 'src/data/fakeEntretiens.fake';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { Entretien } from 'src/model/Entretien.interface';

export const useEntretienStore = defineStore('entretien', {
  state: () => ({
    entretiens: <Entretien[]>[],
    crudAction: <CrudAction>'',
    FormEntretien: <Entretien>{},
  }),

  getters: {
    isInReadMode: (state) => state.crudAction === CrudAction.READ,
    isInAddMode: (state) => state.crudAction === CrudAction.CREATE,
  },

  actions: {
    getAllEntretien() {
      this.entretiens = [...fakeEntretiensList];
    },
  },
});
