<script setup>
import { defineProps } from "vue";
import { useAlertStore } from "@/stores/alert";

const alertStore = useAlertStore();

const props = defineProps({
    message: String,
});

function close() {
    alertStore.isInvalid = false;
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