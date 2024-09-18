<script setup>
import { reactive, ref } from "vue";
import { RouterLink } from 'vue-router';
import Alert from '@/layouts/part/Alert.vue'
import useAuth from "@/composables/auth";
import { required, minLength } from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const { response, errors, getUser } = useAuth();

const rules = {
    username: { required },
    password: { required, minLength: minLength(5) },
};
const form = reactive({
    username: "haikal",
    password: "12345678",
});
const v$ = useVuelidate(rules, form);

const submitForm = async () => {
    const result = await v$.value.$validate()
    if (result) {
        await getUser(form);
    }
};

</script>

<template>
    <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner">
                <!-- Register -->
                <div class="card">
                    <div class="card-body">
                        <!-- Logo -->
                        <div class="app-brand justify-content-center">
                            <RouterLink to="home" class="gap-2 app-brand-link">
                                <span class="app-brand-logo demo">
                                    <img src="@/assets/logo.svg" width="80" alt="">
                                </span>
                                <span class="mt-3 demo text-body fw-bolder">
                                    <h3>VUE SNEAT</h3>
                                </span>
                            </RouterLink>
                        </div>
                        <!-- /Logo -->
                        <h4 class="mb-2">Selamat datang👋</h4>
                        <p class="mb-4">Silahkan Login {{ authStore.isInvalid }}</p>

                        <Transition name="fade" :duration="{ enter: 500, leave: 800 }">
                            <Alert v-if="authStore.isInvalid" :message="authStore.isMessage" />
                            <!-- <Alert v-else message="Username or Password Invalid" /> -->
                        </Transition>

                        <form @submit.prevent="submitForm" method="post">
                            <div class="mb-3">
                                <label for="name" class="form-label">Username</label>
                                <input type="text" class="form-control" id="name" name="name" placeholder="Username"
                                    autofocus v-model="form.username" />
                                <div v-if="v$.username.$error" class="text-danger text-sm">
                                    Username boleh kosong
                                </div>
                            </div>
                            <div class="mb-3 form-password-toggle">
                                <div class="d-flex justify-content-between">
                                    <label class="form-label" for="password">Password</label>
                                </div>
                                <div class="input-group input-group-merge">
                                    <input type="password" id="password" class="form-control" name="password"
                                        v-model="form.password"
                                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" />
                                    <span class="cursor-pointer input-group-text"><i class="bx bx-hide"></i></span>
                                </div>
                                <div v-if="v$.password.$error" class="text-danger text-sm">
                                    Password boleh kosong
                                </div>
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary d-grid w-100 mb-2">Login</button>
                                <RouterLink to="register" class="btn btn-info d-grid w-100">To Register</RouterLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
