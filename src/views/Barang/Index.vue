<template>
    <div class="card">
        <h5 class="card-header">Halaman Barangs</h5>
        <div class="card-body">
            <div class="mb-3 demo-inline-spacing">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <router-link :to="{ name: 'barang.create' }" class="btn btn-outline-primary me-2"><i
                                class="bx bx-plus me-1"></i>
                            Tambah</router-link>
                        <button @click="refresh" type="button" class="btn btn-outline-warning"><i
                                class="bx bx-refresh me-1"></i>
                            Refresh</button>
                    </div>
                    <form @submit.prevent="filter" class="col-lg-6 col-md-6 col-sm-6">
                        <div class="row justify-content-end">
                            <div class="col-5">
                                <input name="nama" type="search" class="form-control" v-model="key"
                                    v-on:keyup="filter" />
                            </div>
                            <div class="col-2">
                                <div class="mb-3">
                                    <button type="submit" class="btn btn-info">
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="table-responsive text-nowrap">
                <table id="" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kode</th>
                            <th>Nama</th>
                            <th>Harga Jual</th>
                            <th>Stok</th>
                            <th>Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(barang, index) in barangs" :key="barang.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ barang.barcode }}</td>
                            <td>{{ barang.nama }}</td>
                            <td>Rp{{ rupiah(barang.hargaJual) }}</td>
                            <td>{{ barang.stok }}</td>
                            <td>{{ tanggaldua(barang.createdAt) }}</td>
                            <td>
                                <button type="button" class="p-0 btn dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <router-link :to="{
                                        name: 'barang.edit',
                                        params: {
                                            id: barang.id
                                        }
                                    }" class="dropdown-item"><i class="bx bx-edit-alt me-1"></i>
                                        Edit</router-link>

                                    <form action="" method="post">
                                        <button class="dropdown-item" onclick="return confirm('Are you sure?')"
                                            type="submit" name="Delete"><i class="bx bx-trash me-1"></i>Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import useBarangs from "@/composables/barang";
import Swal from "sweetalert2";
import { rupiah } from "@/_helpers/currency";
import { tanggal, tanggaldua } from "@/_helpers/tanggal";
import { ref, reactive } from 'vue';

const router = useRouter();
const { key, barangs, getBarangs, getBarangByName, destroyBarang } = useBarangs();

onBeforeMount(() => getBarangs());

console.log(barangs);

const filter = async () => {
    if (key.value) {
        console.log('INI ADA ISI')
        await getBarangByName();
    } else {
        console.log('INI KOSONG')
        await getBarangs();
    }
    console.log(barangs);
}

function EditBarang(id) {
    router.push({ name: "barang" });
}

function confirmDelete(id) {
    console.log("OKE");
    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete it?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
    }).then((result) => {
        if (result.isConfirmed) {
            if (destroyBarang(id)) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        }
    });
}

</script>