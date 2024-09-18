import { ref } from "vue";
import axios, * as others from 'axios';
import VueCookies from "vue-cookies";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert";

axios.defaults.baseURL = "http://127.0.0.1:3001/";
axios.defaults.headers.common["Authorization"] = "Bearer " + $cookies.get("jwt");

export default function useUsers() {

    const router = useRouter();
    const user = ref([]);
    const users = ref([]);
    const errors = ref({});
    const key = ref([]);

    const getUsers = async () => {
        const response = await axios.get("pengguna");
        users.value = await response.data.data;
        // setTimeout(async () => users.value = await response.data.data, 3000);
    };

    const getUser = async (id) => {
        const response = await axios.get("pengguna/" + id);
        user.value = await response.data.data;
    };

    const storeUser = async (data) => {
        const alertStore = useAlertStore();
        try {
            await axios.post("pengguna", data);
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil tambah data';
            await router.push({ name: "users.index" });
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };

    const updateUser = async (id) => {
        const alertStore = useAlertStore();
        try {
            await axios.patch("pengguna/" + id, user.value);
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil ubah data';
            await router.push({ name: "users.index" });
        } catch (error) {
            if (error.response.status === 500) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };
    const destroyUser = async (id) => {
        const alertStore = useAlertStore();
        try {
            await axios.delete("pengguna/" + id);
            // await getUsers();
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil hapus data';
            await router.push({ name: "users.index" });
        } catch (error) {
            if (error.response.status === 500) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };

    const getUserByName = async () => {
        const response = await axios.get("pengguna/byname/" + key.value);
        users.value = await response.data.data;
    };

    return {
        user,
        users,
        getUser,
        getUsers,
        storeUser,
        updateUser,
        destroyUser,
        getUserByName,
        errors,
        router,
        key,
    };
}
