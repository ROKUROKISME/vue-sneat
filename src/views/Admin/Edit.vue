<script setup>
import useVuelidate from "@vuelidate/core";
import { onMounted, reactive } from "vue";
import { required, minLength, email } from '@vuelidate/validators'
import useUsers from "@/composables/pengguna";

const { user, getUser, updateUser, errors } = useUsers();

onMounted(() => getUser(props.id));

const props = defineProps({
    id: {
        required: true,
        type: String,
    },
});

const rules = {
    username: { required },
    nama: { required },
    email: { required, email },
};

const v$ = useVuelidate(rules, user);

const submitForm = async () => {
    const result = await v$.value.$validate()
    if (result) {
        await updateUser(props.id);
    }
};

</script>


<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card mb-4">
                <h5 class="card-header">Ubah User</h5>
                <!-- <form class="card-body" @submit.prevent="updateUser($route.params.id)" method="post"> -->
                <form class="card-body" @submit.prevent="submitForm" method="post">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control is-invalid" name="username" id="username"
                            placeholder="Username" v-model="user.username" />
                        <div v-if="v$.username.$error" class="invalid-feedback">
                            Username boleh kosong
                        </div>
                        <div v-if="errors.username" class="invalid-feedback">
                            {{ errors.username }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="nama" class="form-label">Nama</label>
                        <input type="text" class="form-control is-invalid" name="nama" id="nama" placeholder="Nama"
                            v-model="user.nama" />
                        <div v-if="v$.nama.$error" class="invalid-feedback">
                            Nama boleh kosong
                        </div>
                        <div v-if="errors.nama" class="invalid-feedback">
                            {{ errors.nama }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="text" class="form-control is-invalid" name="email" id="email" placeholder="Nama"
                            v-model="user.email" />
                        <div v-if="v$.email.$error" class="invalid-feedback">
                            Email boleh kosong
                        </div>
                        <div v-if="errors.email" class="invalid-feedback">
                            {{ errors.email }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="text" class="form-control  is-invalid" name="password" id="password"
                            placeholder="********" value="" />
                        <!-- <div class="invalid-feedback">
                            Tidak boleh kosong
                        </div> -->
                        <!-- <div v-if="errors.username">
                            <span class="text-sm text-red-400">{{ errors.username[0] }}</span>
                        </div> -->
                    </div>

                    <button type="submit" class="btn btn-primary me-1"><i class="bx bx-save me-1"></i>
                        Simpan</button>
                    <RouterLink :to="{ name: 'users.index' }" class="btn btn-secondary"><i
                            class="bx bx-left-arrow-alt me-1"></i> Kembali
                    </RouterLink>
                </form>
            </div>
        </div>
    </div>
</template>