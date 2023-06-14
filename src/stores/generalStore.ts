import { defineStore } from "pinia";
import IRessource from "@/interfaces/iRessource";

const useGeneralStore = defineStore("Store Général", {
    state: () => ({ videoPlayer: { isOpen: false, ressource: {} as IRessource }, ressourceForm: { isOpen: false } }),
});

export default useGeneralStore;
