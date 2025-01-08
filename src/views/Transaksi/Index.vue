<script setup>
import { onBeforeMount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import useBarang from "@/composables/barang";
import useTransaksi from "@/composables/transaksi";
import useTransaksiDetail from "@/composables/transaksi-detail";
import { rupiah } from "@/_helpers/currency";

const router = useRouter();
const { key, barangs, getBarangs } = useBarang();
const { transaksidetail, getTransaksiDetail, getTransaksiById, storeTransaksi, updateTransaksi, destroyTransaksi } = useTransaksiDetail();
const { transaksi, getTransaksiByPetugas } = useTransaksi();

onBeforeMount(async () => await getTransaksiByPetugas($cookies.get("user")));
onBeforeMount(async () => await getBarangs());
// onMounted(() => getTransaksiById(5));

watch(transaksi, (newValue) => {
    // console.log(transaksi.value.id); // Ini akan mencetak nilai baru
    getTransaksiById(transaksi.value.id);
});

console.log(transaksidetail);


const modalBayar = () => {
    $('#modalPembayaran').modal('show');
};

const modalBatal = () => {
    $('#modalPembatalan').modal('show');
};

const add = (data) => {

    // console.log(data)
    const result = storeTransaksi(data)
    if (result) {
        transaksidetail.value.push({
            id: data.id,
            transaksiId: transaksi.value.id,
            barangId: data.id,
            barang: {
                barcode: data.barcode,
                nama: data.nama,
            },
            harga: data.hargaJual,
            qty: 1,
            totalHarga: data.hargaJual,
        });
    }

};

const remove = (data) => {
    const result = destroyTransaksi(data.id)
    if (result) {
        const i = transaksidetail.value.indexOf(data)
        if (i > -1) {
            transaksidetail.value.splice(i, 1)
        }
    }

};

const tambahQty = (data) => {

    const i = transaksidetail.value.indexOf(data)
    if (i > -1) {
        transaksidetail.value[i].qty = data.qty + 1;
    }
}

const kurangQty = (data) => {
    if (data.qty != 1) {
        const i = transaksidetail.value.indexOf(data)
        if (i > -1) {
            transaksidetail.value[i].qty = data.qty - 1;
        }
    }
}

</script>


<template>
    <div class="card mb-4">
        <h5 class="card-header">Halaman Transaksi {{ typeof (transaksi.total) }}</h5>
        <div class="card-body">
            <div class="row gy-3">
                <!-- Default Modal -->
                <div class="col-lg-12 col-md-12">
                    <div class="mb-3 demo-inline-spacing">
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#modalSearch"><i class="bx bx-list-plus me-1"></i>
                            Tambah</button>
                        <button onclick="refresh()" type="button" class="btn btn-outline-warning"><i
                                class="bx bx-refresh me-1"></i>
                            Refresh</button>
                    </div>
                    <div class="table-responsive text-nowrap">
                        <table id="" class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Barode</th>
                                    <th>Produk</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Total Harga</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, index) in transaksidetail" :key="data.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ data.barang.barcode }}</td>
                                    <td>{{ data.barang.nama }}</td>
                                    <td>Rp{{ rupiah(data.harga) }}</td>
                                    <td>
                                        <div class="input-group">
                                            <button class="btn btn-primary btn-sm" @click="kurangQty(data)"
                                                type="button">-</button>
                                            <input id="qty" type="text" class="form-control text-center"
                                                :value="data.qty" style="min-width: 40px;max-width: 50px;" />
                                            <button class="btn btn-primary btn-sm" @click="tambahQty(data)"
                                                type="button">+</button>
                                        </div>
                                    </td>
                                    <td>Rp{{ rupiah(data.totalHarga) }}</td>
                                    <td class="text-center">
                                        <button @click="remove(data)" type="button" class="btn btn-sm btn-danger"
                                            name="Delete"><i class="bx bx-x-circle"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row gy-3">
                <div class="col-12">
                    <div class="card">
                        <hr class="m-0" />
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <span class="fw-semibold d-block mb-1 text-lg">
                                                <h3>Total : </h3>
                                            </span>
                                            <h2 class="card-title mb-2">Rp {{ rupiah(Number(transaksi.total)) }}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-xl-0 mb-3">
                                    <small class="text-light fw-semibold">Aksi</small>
                                    <div class="btn-toolbar demo-inline-spacing" role="toolbar"
                                        aria-label="Toolbar with button groups">
                                        <div class="btn-group" role="group" aria-label="First group">
                                            <button @click="modalBayar()" type="button" class="btn btn-outline-primary">
                                                <i class="tf-icons bx bx-money"></i> Bayar
                                            </button>

                                            <button @click="modalBatal()" type="button" class="btn btn-outline-warning">
                                                <i class="tf-icons bx bx-check-shield"></i> Batalkan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr class="m-0" />

        <!-- {{ --MODAL CARI PRODUK-- }} -->
        <div class="modal fade" id="modalSearch" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalCenterTitle">Cari Produk</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col mb-3">
                                <div class="input-group input-group-merge">
                                    <span class="input-group-text" id="basic-addon-search31"><i
                                            class="bx bx-search"></i></span>
                                    <input type="search" onchange="cariProduk(this.value)" class="form-control"
                                        placeholder="Cari produk" aria-label="Cari produk"
                                        aria-describedby="basic-addon-search31" />
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-12">
                                <div class="table-responsive text-nowrap">
                                    <table id="tabelProduk" class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Barode / Kode</th>
                                                <th>Nama Produk</th>
                                                <th>Harga Jual</th>
                                                <th>Stok</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(brg, index) in barangs" :key="brg">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ brg.barcode }}</td>
                                                <td>{{ brg.nama }}</td>
                                                <td>Rp{{ rupiah(brg.hargaJual) }}</td>
                                                <td>{{ brg.stok }}</td>
                                                <td>
                                                    <div class="input-group">
                                                        <button class="btn btn-primary btn-sm" type="button">-</button>
                                                        <input id="qty" type="text" class="form-control text-center"
                                                            :value="1" style="min-width: 40px;max-width: 50px;" />
                                                        <button class="btn btn-primary btn-sm" type="button">+</button>
                                                    </div>
                                                </td>
                                                <td class="text-center">
                                                    <button @click="add(brg)" type="button"
                                                        class="btn btn-sm btn-primary"><i
                                                            class="bx bx-plus-circle"></i></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL BAYAR -->
        <div class="modal fade" id="modalPembayaran" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalCenterTitle">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col mb-3">
                                <label for="nameWithTitle" class="form-label">Name</label>
                                <input type="text" id="nameWithTitle" class="form-control" placeholder="Enter Name" />
                            </div>
                        </div>
                        <div class="row g-2">
                            <div class="col mb-0">
                                <label for="emailWithTitle" class="form-label">Email</label>
                                <input type="text" id="emailWithTitle" class="form-control" placeholder="xxxx@xxx.xx" />
                            </div>
                            <div class="col mb-0">
                                <label for="dobWithTitle" class="form-label">DOB</label>
                                <input type="text" id="dobWithTitle" class="form-control" placeholder="DD / MM / YY" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>


        <!-- <div class="modal fade" id="modalBayar" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalBayar">Pembayaran</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="{{ route($bayar, ['id' => $detail->id]) }}" method="post">
                        @csrf
                        <div class="modal-body">
                            <div class="row">
                                <div class="col mb-3">
                                    <span class="form-label">Total</span>
                                    <span id="test" class="form-label"></span>
                                    <h2>Rp {{ $total_harga }}</h2>
                                </div>
                            </div>
                            <div hidden class="row">
                                <div class="col mb-3">
                                    <input readonly type="text" name="total" id="total" class="form-control p-3"
                                        value="{{ $total_harga }}" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col mb-3">
                                    <label for="nameWithTitle" class="form-label">Bayar</label>
                                    <input type="text" id="txtBayar" oninput="toRupiah(this.value)"
                                        class="form-control text-bold p-3" placeholder="Rp 100.000,00-" />
                                    <input hidden readonly type="text" name="realBayar" id="realBayar"
                                        class="form-control p-3" placeholder="Rp 100.000,00-" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col mb-3">
                                    <label for="nameWithTitle" class="form-label">Kembalian</label>
                                    <h2 id="showKembalian">Rp 0</h2>
                                    <input hidden readonly type="text" id="kembalian" class="form-control p-3"
                                        placeholder="Rp 100.000,00-" />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="submit" id="btnBayar" class="btn btn-primary">Konfirmasi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div> -->

        <div class="modal fade" id="modalPembatalan" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog  modal-sm modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Konfirmasi Pembatalan</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col mb-3">
                                <span>Apakah kamu yakin akan membatalkan Transaksi?</span>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="d-grid gap-2 col-lg-6 mx-auto">

                                <button type="submit" class="btn btn-warning btn-lg btn-block">
                                    BATALKAN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<!-- <script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import Loader from '@/views/LoaderView.vue'
import useUsers from "@/composables/petugas";
import Swal from "sweetalert2";
import { rupiah } from "@/_helpers/currency";
import { tanggal, tanggaldua } from "@/_helpers/tanggal";
import { ref, reactive } from 'vue';

const router = useRouter();
const { key, users, getUsers, getUserByName, destroyUser } = useUsers();

onBeforeMount(() => getUsers());

const filter = async () => {
    if (key.value) {
        console.log('INI ADA ISI')
        await getUserByName();
    } else {
        console.log('INI KOSONG')
        await getUsers();
    }
    console.log(users);
}

function EditUser(id) {
    router.push({ name: "petugas" });
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
            if (destroyUser(id)) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        }
    });
}

</script> -->