import { ref } from "vue";
import axios, * as others from 'axios';
import VueCookies from "vue-cookies";
import { useRouter } from "vue-router";
import { useAlertStore } from "@/stores/alert";

axios.defaults.baseURL = "http://127.0.0.1:3001/";
axios.defaults.headers.common["Authorization"] = "Bearer " + $cookies.get("jwt");

export default function useSuppliers() {

    const router = useRouter();
    const supplier = ref([]);
    const suppliers = ref([]);
    const errors = ref({});
    const key = ref([]);

    const getSuppliers = async () => {
        const response = await axios.get("supplier");
        suppliers.value = await response.data.data;
        // setTimeout(async () => suppliers.value = await response.data.data, 3000);
    };

    const getSupplier = async (id) => {
        const response = await axios.get("supplier/" + id);
        supplier.value = await response.data.data;
    };

    const storeSupplier = async (data) => {
        const alertStore = useAlertStore();
        try {
            await axios.post("supplier", data);
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil tambah data';
            await router.push({ name: "suppliers.index" });
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };

    const updateSupplier = async (id) => {
        const alertStore = useAlertStore();
        try {
            await axios.patch("supplier/" + id, supplier.value);
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil ubah data';
            await router.push({ name: "suppliers.index" });
        } catch (error) {
            if (error.response.status === 500) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };
    const destroySupplier = async (id) => {
        const alertStore = useAlertStore();
        try {
            await axios.delete("supplier/" + id);
            // await getSuppliers();
            alertStore.isInvalid = true;
            alertStore.isMessage = 'Berhasil hapus data';
            await router.push({ name: "suppliers.index" });
        } catch (error) {
            if (error.response.status === 500) {
                errors.value = error.response.data.serverMessage;
            }
        }
    };

    const getSupplierByName = async () => {
        const response = await axios.get("supplier/byname/" + key.value);
        suppliers.value = await response.data.data;
    };

    return {
        supplier,
        suppliers,
        getSupplier,
        getSuppliers,
        storeSupplier,
        updateSupplier,
        destroySupplier,
        getSupplierByName,
        errors,
        router,
        key,
    };
}
