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
                        <p class="mb-4">Silahkan Login </p>

                        <Alert />

                        <form action="/login" method="post">
                            <div class="mb-3">
                                <label for="name" class="form-label">Username</label>
                                <input type="text" class="form-control" id="name" name="name" placeholder="Username"
                                    autofocus />
                            </div>
                            <div class="mb-3 form-password-toggle">
                                <div class="d-flex justify-content-between">
                                    <label class="form-label" for="password">Password</label>
                                </div>
                                <div class="input-group input-group-merge">
                                    <input type="password" id="password" class="form-control" name="password"
                                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" />
                                    <span class="cursor-pointer input-group-text"><i class="bx bx-hide"></i></span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-primary d-grid w-100 mb-2" type="submit">Create account</button>
                                <RouterLink to="login" class="btn btn-info d-grid w-100">To Login</RouterLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import Alert from '@/layouts/part/Alert.vue'

</script>