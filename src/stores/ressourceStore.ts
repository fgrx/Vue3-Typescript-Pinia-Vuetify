import IRessource from "@/interfaces/iRessource";
import { defineStore } from "pinia";
import ressourceService from "@/services/ressourceService";

const useRessourceStore = defineStore("ressourceStore", {
  state: () => ({ ressources: [] as IRessource[] }),
  getters: {
    validRessources: (state) =>
      state.ressources.filter((ressource) => ressource.isValid),
    invalidRessources: (state) =>
      state.ressources.filter((ressource) => !ressource.isValid),
  },
  actions: {
    async loadRessources() {
      // const ressourcesLoaded = await ressourceService.getRessources();
      // this.ressources = ressourcesLoaded;

      ressourceService
        .getRessources()
        .then((results) => (this.ressources = results));
    },

    async addRessource(ressource: IRessource): Promise<IRessource | false> {
      const newRessource = await ressourceService.addRessource(ressource);
      if (newRessource) {
        this.ressources.unshift(newRessource);
      }
      return newRessource;
    },
    async deleteRessource(ressourceToDelete: IRessource) {
      const res = await ressourceService.deleteRessource(ressourceToDelete);

      if (res) {
        this.ressources = this.ressources.filter(
          (ressource) => ressource.id !== ressourceToDelete.id
        );
      }
    },
    async updateRessource(ressource: IRessource) {
      const res = await ressourceService.updateRessource(ressource);

      if (res) {
        const index = this.ressources.indexOf(ressource);
        this.ressources[index] = ressource;
      }
    },
  },
});

export default useRessourceStore;
