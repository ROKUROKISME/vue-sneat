import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import useUsers from "@/composables/pengguna";

const { getUser } = useUsers();

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser: ref(null),
        isInvalid: false,
        isMessage: ref(null),
    }),
    actions: {
        async getToken() {
            await axios.get("/sanctrum/csrf-cookie");
        },
        async getUser() {
            this.getToken();
            const data = await getUser();
            this.authUser = data.data;
        },
    },
    getters: {
        user: (state) => state.authUser,
    },
});
