import { ref } from "vue";

export const rupiah = (val) => {
    return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};