import type IRessource from "@/interfaces/iRessource";
import axios from "axios";
import useAuthStore from "@/stores/AuthStore";

export default {
  async getRessources(): Promise<IRessource[]> {
    let results = [];

    try {
      const response = await axios(
        `${import.meta.env.VITE_API_SERVER}/ressources?_sort=date&_order=desc`
      );
      results = response.data;
    } catch (error) {
      alert("Une erreur s'est produite, veuillez réessayer plus tard...");
      console.error(error);
    }

    return results;
  },

  async getRessourceById(id: string): Promise<IRessource> {
    let results;

    try {
      const response = await axios(
        `${import.meta.env.VITE_API_SERVER}/ressources/${id}`
      );
      results = response.data;
    } catch (error) {
      alert("Une erreur s'est produite, veuillez réessayer plus tard...");
      console.error(error);
    }

    return results;
  },
  async addRessource(ressource: IRessource): Promise<IRessource | false> {
    try {
      const results = await axios.post(
        `${import.meta.env.VITE_API_SERVER}/ressources`,
        ressource
      );
      return results.data;
    } catch (error) {
      console.error("Une erreur s'est produite", error);
      return false;
    }
  },
  async deleteRessource(ressource: IRessource): Promise<boolean> {
    const authStore = useAuthStore();
    const headers = authStore.headers;

    try {
      const results = await axios.delete(
        `${import.meta.env.VITE_API_SERVER_PROTECTED}/ressources/${
          ressource.id
        }`,
        headers
      );
      return true;
    } catch (error) {
      console.error("Une erreur s'est produite", error);
      return false;
    }
  },
  async updateRessource(ressource: IRessource): Promise<IRessource | false> {
    const authStore = useAuthStore();
    const headers = authStore.headers;
    try {
      const results = await axios.put(
        `${import.meta.env.VITE_API_SERVER_PROTECTED}/ressources/${
          ressource.id
        }`,
        ressource,
        headers
      );
      return results.data;
    } catch (error) {
      console.error("Une erreur s'est produite", error);
      return false;
    }
  },
};
