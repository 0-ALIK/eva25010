import { defineStore } from "pinia";
import { ConfirmationOptions } from "primevue/confirmationoptions";
import { useConfirm } from "primevue/useconfirm";

export const useConfirmStore = defineStore('confirm', () => {
    const confirm = useConfirm();

    function showConfirm(options: ConfirmationOptions): void {
        confirm.require(options);
    }

    return {
        showConfirm
    };
});