import { ref } from "vue";
import axios, * as others from 'axios';
import VueCookies from "vue-cookies";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert";

axios.defaults.baseURL = "http://127.0.0.1:3001/";
axios.defaults.headers.common["Authorization"] = "Bearer " + $cookies.get("jwt");

export default function useBarangs() {

    const router = useRouter();
    const barang = ref([]);
    const barangs = ref([]);
    const errors = ref({});
    const key = ref([]);

    const getBarangs = async () => {
        const response = await axios.get("barang");
        barangs.value = await response.data.data;
        // setTimeout(async () => barangs.value = await response.data.data, 3000);
    };

    const getBarang = async (id) => {
        const response = await axios.get("barang/" + id);
        barang.value = await response.data.data;
    };

    const storeBarang = async (data) => {
        const alertStore = useAlertStore();
        try {
            await axios.post("barang", data);
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil tambah data';
            await router.push({ name: "barang.index" });
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };

    const updateBarang = async (id) => {
        const alertStore = useAlertStore();
        try {
            await axios.patch("barang/" + id, barang.value);
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil ubah data';
            await router.push({ name: "barang.index" });
        } catch (error) {
            if (error.response.status === 500) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };
    const destroyBarang = async (id) => {
        const alertStore = useAlertStore();
        try {
            await axios.delete("barang/" + id);
            // await getBarangs();
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil hapus data';
            await router.push({ name: "barang.index" });
        } catch (error) {
            if (error.response.status === 500) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };

    const getBarangByName = async () => {
        const response = await axios.get("barang/byname/" + key.value);
        barangs.value = await response.data.data;
    };

    return {
        barang,
        barangs,
        getBarang,
        getBarangs,
        storeBarang,
        updateBarang,
        destroyBarang,
        getBarangByName,
        errors,
        router,
        key,
    };
}
