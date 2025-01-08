import { ref } from "vue";
import axios, * as others from 'axios';
import VueCookies from "vue-cookies";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert";

axios.defaults.baseURL = "http://127.0.0.1:3001/";
axios.defaults.headers.common["Authorization"] = "Bearer " + $cookies.get("jwt");

export default function useTransaksiDetail() {

    const router = useRouter();
    const transaksi = ref([]);
    const transaksidetail = ref([]);
    const errors = ref({});
    const key = ref([]);

    // const getTransaksiDetail = async () => {
    //     const response = await axios.get("transaksi-detail");
    //     transaksidetail.value = await response.data.data;
    // };

    const getTransaksiById = async (id) => {
        const response = await axios.get("transaksi-detail/" + id);
        transaksidetail.value = await response.data.data;
    };

    const storeTransaksi = async (data) => {
        const alertStore = useAlertStore();
        try {
            await axios.post("transaksi-detail", data);
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil tambah data';
            await router.push({ name: "transaksidetail.index" });
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };

    const updateTransaksi = async (id) => {
        const alertStore = useAlertStore();
        try {
            await axios.patch("transaksi-detail/" + id, transaksi.value);
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil ubah data';
            await router.push({ name: "transaksidetail.index" });
        } catch (error) {
            if (error.response.status === 500) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };
    const destroyTransaksi = async (id) => {
        // const alertStore = useAlertStore();
        try {
            await axios.delete("transaksi-detail/" + id);
            // await getTransaksis();
            // alertStore.isInvalid = true;
            // alertStore.isMessage = 'Berhasil hapus data';
            // await router.push({ name: "transaksidetail.index" });
        } catch (error) {
            if (error.response.status === 500) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };

    const getTransaksiByName = async () => {
        const response = await axios.get("transaksi/byname/" + key.value);
        transaksidetail.value = await response.data.data;
    };

    return {
        transaksi,
        transaksidetail,
        getTransaksiById,
        storeTransaksi,
        updateTransaksi,
        destroyTransaksi,
        getTransaksiByName,
        errors,
        router,
        key,
    };
}
