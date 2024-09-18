<script setup>
import { defineProps } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const props = defineProps({
    message: String,
});

function close() {
    authStore.isInvalid = false;
}
</script>
<template>
    <div class="alert alert-success alert-dismissible" role="alert">
        {{ message }}
        <button type="button" @click="close()" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <!-- <div class="alert alert-danger alert-dismissible" role="alert">
        Danger
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div> -->
</template>