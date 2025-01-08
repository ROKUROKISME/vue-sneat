<script setup>
import { RouterLink } from 'vue-router';
import useVuelidate from "@vuelidate/core";
import { onMounted, reactive } from "vue";
import { required, minLength } from '@vuelidate/validators'
import useBarangs from "@/composables/barang";
import useKategori from "@/composables/kategori";
import useSupplier from "@/composables/supplier";

const { barang, storeBarang, errors } = useBarangs();
const { kategoris, getKategoris } = useKategori();
const { suppliers, getSuppliers } = useSupplier();

onMounted(() => getKategoris());
onMounted(() => getSuppliers());

const form = reactive({
    barcode: "",
    nama: "",
    kategori: "",
    supplier: "",
    harga_jual: "",
    stok: "",
});

const rules = {
    barcode: { required },
    nama: { required },
    kategori: { required },
    supplier: { required },
    harga_jual: { required },
    stok: { required },
};

const v$ = useVuelidate(rules, form);

const submitForm = async () => {
    const result = await v$.value.$validate()
    if (result) {
        await storeBarang(form);
    }
};

</script>

<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card mb-4">
                <h5 class="card-header">Tambah User</h5>
                <form class="card-body" @submit.prevent="submitForm" method="post">
                    <div class="mb-3">
                        <label for="barcode" class="form-label">Barcode</label>
                        <input type="text" class="form-control is-invalid" name="barcode" id="barcode"
                            v-model="form.barcode" placeholder="Barcode" />
                        <div v-if="errors.barcode" class="invalid-feedback">
                            {{ errors.barcode }}
                        </div>
                        <!-- <div class="invalid-feedback">
                            Tidak boleh kosong
                        </div> -->
                    </div>
                    <div class="mb-3">
                        <label for="nama" class="form-label">Nama Barang</label>
                        <input type="text" class="form-control is-invalid" name="nama" id="nama" v-model="form.nama"
                            placeholder="Nama" />
                        <div v-if="errors.nama" class="invalid-feedback">
                            {{ errors.nama }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="kategori" class="form-label">Kategori</label>
                        <select class="form-select is-invalid" name="kategori" id="kategori" v-model="form.kategori">
                            <option value="">Pilih</option>
                            <option v-for="kat in kategoris" :key="kat.id" :value="kat.id">{{ kat.nama }}</option>
                        </select>
                        <div v-if="errors.kategori" class="invalid-feedback">
                            {{ errors.kategori }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="supplier" class="form-label">Supplier</label>
                        <select class="form-select is-invalid" name="supplier" id="supplier" v-model="form.supplier">
                            <option value="">Pilih</option>
                            <option v-for="sup in suppliers" :key="sup.id" :value="sup.id">{{ sup.nama }}</option>
                        </select>
                        <div v-if="errors.kategori" class="invalid-feedback">
                            {{ errors.kategori }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="harga_jual" class="form-label">Harga Jual</label>
                        <input type="number" class="form-control is-invalid" name="harga_jual" id="harga_jual"
                            v-model="form.harga_jual" placeholder="Harga Jual" />
                        <div v-if="errors.hargaJual" class="invalid-feedback">
                            {{ errors.harga_jual }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="stok" class="form-label">Stok</label>
                        <input type="number" class="form-control is-invalid" name="stok" id="stok" v-model="form.stok"
                            placeholder="Stok" />
                        <div v-if="errors.stok" class="invalid-feedback">
                            {{ errors.stok }}
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary me-1"><i class="bx bx-save me-1"></i> Simpan</button>
                    <RouterLink :to="{ name: 'barang.index' }" class="btn btn-secondary"><i
                            class="bx bx-left-arrow-alt me-1"></i> Kembali
                    </RouterLink>
                </form>
            </div>
        </div>
    </div>
</template>
