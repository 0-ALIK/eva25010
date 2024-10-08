export function useFecha() {
    const formatoFecha = (fecha: string) => {
        const date = new Date(fecha);
        return date.toLocaleDateString();
    }

    return {
        formatoFecha
    }
}