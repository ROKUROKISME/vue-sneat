<template>
    <Suspense>
        <template #default>
            <keep-alive>
                <div class="card">
                    <h5 class="card-header">Halaman Users</h5>
                    <div class="card-body">
                        <div class="mb-3 demo-inline-spacing">
                            <div class="row justify-content-center">
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <router-link :to="{ name: 'user.create' }" class="btn btn-outline-primary me-2"><i
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
                                        <!-- <div class="col-5">
                                            <div class="input-group">
                                                <span class="input-group-text">Dari</span>
                                                <input name="nama" type="text" class="form-control" v-model="key" />
                                            </div>
                                        </div> -->
                                        <!-- <div class="col-5">
                                            <div class="input-group">
                                                <span class="input-group-text">Sampai</span>
                                                <input name="b" type="date" class="form-control" value="" />
                                            </div>
                                        </div> -->
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
                                        <th>Username</th>
                                        <th>Nama</th>
                                        <th>Email</th>
                                        <th>Tanggal</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(user, index) in users" :key="user.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ user.username }}</td>
                                        <td>{{ user.nama }}</td>
                                        <td>{{ user.email }}</td>
                                        <td>{{ tanggaldua(user.createdAt) }}</td>
                                        <td>
                                            <button type="button" class="p-0 btn dropdown-toggle hide-arrow"
                                                data-bs-toggle="dropdown">
                                                <i class="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div class="dropdown-menu">
                                                <router-link :to="{
                                                    name: 'user.edit',
                                                    params: {
                                                        id: user.id
                                                    }
                                                }" class="dropdown-item"><i class="bx bx-edit-alt me-1"></i>
                                                    Edit</router-link>

                                                <form action="" method="post">
                                                    <button class="dropdown-item"
                                                        onclick="return confirm('Are you sure?')" type="submit"
                                                        name="Delete"><i class="bx bx-trash me-1"></i>Delete</button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </keep-alive>
        </template>
        <template #fallback>
            <Loader />
        </template>
    </Suspense>
    <!-- <template #default> -->

</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import Loader from '@/views/LoaderView.vue'
import useUsers from "@/composables/pengguna";
import Swal from "sweetalert2";
import { rupiah } from "@/_helpers/currency";
import { tanggal, tanggaldua } from "@/_helpers/tanggal";
import { ref, reactive } from 'vue';

const router = useRouter();
const { key, users, getUsers, getUserByName, destroyUser } = useUsers();
// let today = new Date().toISOString().slice(0, 10)
// const data = reactive({
//     tanggal: new Date().toISOString().slice(0, 10),
// })

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
    router.push({ name: "pengguna" });
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

</script>