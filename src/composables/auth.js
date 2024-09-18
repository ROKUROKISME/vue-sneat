import { ref } from "vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

axios.defaults.baseURL = "http://127.0.0.1:3001/";

export default function usePosts() {

    const authStore = useAuthStore();
    const user = ref([]);
    const error = ref(false);

    const getUser = async (data) => {

        try {
            const result = await axios.post("login", data);
            if (!result.data.data.token) {
                authStore.isInvalid = true;
                authStore.isMessage = result.data.data.message;
            } else {
                // console.log('INI BENAR')
                // localStorage.setItem("token", result.value.token, "1h");
                authStore.isInvalid = true;
                authStore.isMessage = result.data.data.message;
                VueCookies.set("jwt", result.data.data.token, "1h");
                await router.push({ name: "dashboard" });
            }
            // console.log(result.data.data.message)
            // console.log(result.data.data.token)
        } catch (error) {
            // authStore.isInvalid = true;
            // authStore.isMessage = result.data.data.message
        }
    };
    const logOut = async () => {

        try {
            const result = await axios.post("login", data);
            if (!result.data.data.token) {
                authStore.isInvalid = true;
                authStore.isMessage = result.data.data.message;
            } else {
                authStore.isInvalid = true;
                authStore.isMessage = result.data.data.message;
                VueCookies.set("jwt", result.data.data.token, "1h");
                await router.push({ name: "dashboard" });
            }
        } catch (error) {

        }
    };

    return {
        user,
        error,
        getUser,
        logOut,
    };
}
