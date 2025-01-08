import { ref } from "vue";
import axios, * as others from 'axios';
import VueCookies from "vue-cookies";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert";

axios.defaults.baseURL = "http://127.0.0.1:3001/";
axios.defaults.headers.common["Authorization"] = "Bearer " + $cookies.get("jwt");

export default function useLaporans() {

    const router = useRouter();
    const laporan = ref([]);
    const laporans = ref([]);
    const errors = ref({});
    const key = ref([]);

    const getLaporans = async () => {
        const response = await axios.get("laporan");
        laporans.value = await response.data.data;
    };

    const getLaporan = async (id) => {
        const response = await axios.get("laporan/" + id);
        laporan.value = await response.data.data;
    };


    return {
        laporan,
        laporans,
        getLaporan,
        getLaporans,
        errors,
        router,
        key,
    };
}
