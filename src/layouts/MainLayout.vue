<template>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->
            <Sidebar />
            <!-- / Menu -->

            <!-- Layout container -->
            <div class="layout-page">
                <!-- Navbar -->
                <Navbar />
                <!-- / Navbar -->

                <!-- Content wrapper -->
                <div class="content-wrapper">
                    <!-- Content -->
                    <div class="container-xxl flex-grow-1 container-p-y">
                        <Transition name="fade" :duration="{ enter: 500, leave: 800 }">
                            <Alert v-if="authStore.isInvalid" :message="authStore.isMessage" />
                        </Transition>
                        <Transition name="fade" :duration="{ enter: 500, leave: 800 }">
                            <AlertAction v-if="alertStore.isInvalid" :message="alertStore.isMessage" />
                        </Transition>

                        <RouterView />

                    </div>
                    <!-- / Content -->
                    <!-- Footer -->

                    <Footer />
                    <!-- / Footer -->

                    <div class="content-backdrop fade"></div>
                </div>
            </div>
        </div>
        <div class="layout-overlay layout-menu-toggle"></div>
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

<script setup>
import { RouterView } from "vue-router";
import Sidebar from "@/layouts/part/Sidebar.vue"
import Navbar from "@/layouts/part/Navbar.vue"
import Footer from "@/layouts/part/Footer.vue"
import Alert from "@/layouts/part/Alert.vue"
import AlertAction from "@/layouts/part/AlertAction.vue"
import { useAuthStore } from "@/stores/auth";
import { useAlertStore } from "@/stores/alert";

const authStore = useAuthStore();
const alertStore = useAlertStore();

</script>