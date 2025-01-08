import { ref } from "vue";
import axios, * as others from 'axios';
import VueCookies from "vue-cookies";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert";

axios.defaults.baseURL = "http://127.0.0.1:3001/";
axios.defaults.headers.common["Authorization"] = "Bearer " + $cookies.get("jwt");

export default function useKategoris() {

    const router = useRouter();
    const kategori = ref([]);
    const kategoris = ref([]);
    const errors = ref({});
    const key = ref([]);

    const getKategoris = async () => {
        const response = await axios.get("kategori");
        kategoris.value = await response.data.data;
        // setTimeout(async () => kategoris.value = await response.data.data, 3000);
    };

    const getKategori = async (id) => {
        const response = await axios.get("kategori/" + id);
        kategori.value = await response.data.data;
    };

    const storeKategori = async (data) => {
        const alertStore = useAlertStore();
        try {
            await axios.post("kategori", data);
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil tambah data';
            await router.push({ name: "kategoris.index" });
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };

    const updateKategori = async (id) => {
        const alertStore = useAlertStore();
        try {
            await axios.patch("kategori/" + id, kategori.value);
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil ubah data';
            await router.push({ name: "kategoris.index" });
        } catch (error) {
            if (error.response.status === 500) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };
    const destroyKategori = async (id) => {
        const alertStore = useAlertStore();
        try {
            await axios.delete("kategori/" + id);
            // await getKategoris();
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil hapus data';
            await router.push({ name: "kategoris.index" });
        } catch (error) {
            if (error.response.status === 500) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };

    const getKategoriByName = async () => {
        const response = await axios.get("kategori/byname/" + key.value);
        kategoris.value = await response.data.data;
    };

    return {
        kategori,
        kategoris,
        getKategori,
        getKategoris,
        storeKategori,
        updateKategori,
        destroyKategori,
        getKategoriByName,
        errors,
        router,
        key,
    };
}
