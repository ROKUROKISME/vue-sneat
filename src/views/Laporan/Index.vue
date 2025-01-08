<template>
    <div class="card">
        <h5 class="card-header">Halaman Barangs</h5>
        <div class="card-body">
            <div class="mb-3 demo-inline-spacing">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <router-link :to="{ name: 'barang.create' }" class="btn btn-outline-primary me-2"><i
                                class="bx bx-file me-1"></i>
                            Cetak</router-link>
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
                            <th>TRX-ID</th>
                            <th>Nama Petugas</th>
                            <th>Total Transaksi</th>
                            <th>Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in laporans" :key="data.id">
                            <td>{{ index + 1 }}</td>
                            <td>TRX-{{ data.id }}</td>
                            <td>{{ data.petugas.nama }}</td>
                            <td>Rp{{ rupiah(data.total) }}</td>
                            <td>{{ tanggaldua(data.createdAt) }}</td>
                            <td>
                                <router-link target="_blank" to="/barang" class="btn btn-primary btn-block btn-sm">
                                    <i class="bx bx-file"></i>
                                    Nota
                                </router-link>
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
import useLaporans from "@/composables/laporan-transaksi";
import { rupiah } from "@/_helpers/currency";
import { tanggal, tanggaldua } from "@/_helpers/tanggal";

const router = useRouter();
const { key, laporans, getLaporans } = useLaporans();

onBeforeMount(() => getLaporans());

console.log(laporans)

</script>