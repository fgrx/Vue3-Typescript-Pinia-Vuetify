import { defineStore } from "pinia";
import IAuth from "@/interfaces/iAuth";
import axios from "axios";
import { AxiosError } from "axios";
import eventBus from "@/plugins/eventBus";

interface ICredentials {
  email: string;
  password: string;
}

export default defineStore("AuthStore", {
  persist: true,
  state: () => ({
    auth: {} as IAuth,
  }),
  getters: {
    isConnected: (state) => (state.auth.accessToken ? true : false),
    headers: (state) => {
      return {
        headers: {
          Authorization: `Bearer ${state.auth.accessToken}`,
        },
      };
    },
  },
  actions: {
    async connect(credentials: ICredentials): Promise<Boolean> {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_SERVER}/signin`,
          credentials
        );

        this.auth = {
          email: res.data.user.email,
          accessToken: res.data.accessToken,
        };

        return true;
      } catch (error) {
        const msg = error as AxiosError;
        console.log(msg.response?.data);
        eventBus.emit("show-message", {
          text: "Connexion impossible : Mauvais couple login/mot de passe",
          color: "error",
        });
        return false;
      }
    },
    disconnect() {
      this.auth.accessToken = "";
      this.auth.email = "";
    },
  },
});
