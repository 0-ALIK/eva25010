import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";

export const useToastStore = defineStore('toast', () => {
    const toast = useToast();

    function showToast(severity: any, summary: string, detail: string, life: number = 3000): void {
        toast.add({severity, summary, detail, life});
    }

    return {
        showToast
    };
});