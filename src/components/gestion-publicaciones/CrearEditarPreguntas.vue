<template>
    <div>
        <Loading :visible="loading" />
        <div class="flex gap-4">
            <div class="w-full">
                <BlockUI :blocked="formMeta.blocked" class="p">
                    <Panel :header="formMeta.header">
                        <div>
                            <FloatLabel>
                                <InputText id="pregunta" v-model="formMeta.pregunta" class="w-full" />
                                <label for="pregunta">Pregunta</label>
                            </FloatLabel>
                            <div class="flex gap-2 mt-2">
                                <Button :label="formMeta.edicion ? 'Editar' : 'Guardar'" @click="onClickGuardar" />
                                <Button label="Cancelar" text @click="onClickCancelar" />
                            </div>
                        </div>
                    </Panel>
                </BlockUI>
            </div>
    
    
            <div class="w-full">
                <Accordion :value="accordeonValue">
                    <AccordionPanel v-for="(categoria, index) in categorias" :value="index" :key="categoria.id">
                        <AccordionHeader>{{ categoria.nombre }}</AccordionHeader>
                        <AccordionContent>
                            <div v-if="categoria.pregunta" class="flex gap-2 items-center justify-between">
                                <div class="p-2 rounded-md w-fit bg-surface-800">
                                    <span>{{ categoria.pregunta }}</span>
                                </div>
                                <Button icon="pi pi-pencil" @click="onClickEditar(categoria)" />
                            </div>
                            <div v-else class="flex gap-2 items-center">
                                <Message severity="info" class="w-full">No tiene preguntas</Message>
                                <Button icon="pi pi-plus" @click="onClickAgregar(categoria)" />
                            </div>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>
        </div>


        <div class="flex justify-center gap-4 mt-10">
            <Button label="Atrás" severity="secondary" icon="pi pi-arrow-left" @click="onClickAtras" />
            <Button label="Crear software" @click="onClickCrear" :loading="loading" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePublicacionStore } from '../../stores/gestion-publicaciones/publicacion-store';
import Loading from '../shared/Loading.vue';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import BlockUI from 'primevue/blockui';
import Panel from 'primevue/panel';
import Message from 'primevue/message';
import Button from 'primevue/button';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { ref } from 'vue';
import { Categoria } from '../../models/categoria';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { useConfirmStore } from '../../stores/shared/confirm-store';
import { useRouter } from 'vue-router';
import { useToastStore } from '../../stores/shared/toast-store';

const publicacionService = new PublicacionesService();

const loading = ref(false);

const router = useRouter();

const toast = useToastStore();

const confirm = useConfirmStore();

const emits = defineEmits<{
    (e: 'atras'): void;
}>();

const publicacionStore = usePublicacionStore();

const accordeonValue = ref(0);

const formMeta = ref({
    blocked: true,
    header: 'Agregar o editar pregunta',
    currentCategoria: '',
    buttonLabel: 'Agregar pregunta',
    accordeonValue: 0,
    pregunta: '',
    edicion: false
});

const categorias = ref<any>(publicacionStore.getCategoriasElegidas());

function onClickAgregar(categoria: Categoria) {
    formMeta.value.currentCategoria = categoria.id;
    formMeta.value.header = `Agregar pregunta a ${categoria.nombre}`;
    formMeta.value.blocked = false;
    formMeta.value.pregunta = '';
    formMeta.value.accordeonValue = accordeonValue.value;
}

function onClickCancelar() {
    formMeta.value.blocked = true;
    formMeta.value.pregunta = '';
    formMeta.value.header = 'Agregar o editar pregunta';
    accordeonValue.value = formMeta.value.accordeonValue;
}

function onClickGuardar() {
    
    categorias.value = categorias.value.map((categoria: any) => {
        if (categoria.id === formMeta.value.currentCategoria) {
            categoria.pregunta = formMeta.value.pregunta;
        }
        return categoria;
    });
    onClickCancelar();
}

function onClickEditar(categoria: any) {
    formMeta.value.header = `Editar pregunta de ${categoria.nombre}`;
    formMeta.value.blocked = false;
    formMeta.value.pregunta = categoria.pregunta;
    formMeta.value.currentCategoria = categoria.id;
    formMeta.value.edicion = true;
    formMeta.value.accordeonValue = accordeonValue.value;
}

function onClickAtras() {
    emits('atras');
}

function generarConfirmDialog(error: boolean) {
    confirm.showConfirm({
        message: error ? 'Ha ocurrido un error al crear el software' : 'Software creado correctamente',
        header: error ? 'Error' : 'Software creado',
        icon: 'pi' + (error ? ' pi-exclamation-triangle' : ' pi-check'),
        acceptProps: {
            label: 'Continuar',
            severity: 'success'
        },
        rejectClass: 'hidden', 
        accept: () => {
            if (!error) {
                router.push('/perfil/software');
            } 
            toast.showToast(
                error ? 'error' : 'success',
                error ? 'Error' : 'Software creado',
                error ? 'Ha ocurrido un error al crear el software' : 'Un nuevo software ha sido creado'
            );
        }
    });
}

async function onClickCrear() {
    loading.value = true;

    const publicacion = publicacionStore.getPublicacion();
    const formData = new FormData();

    formData.append('nombre', publicacion.nombre);
    formData.append('descripcion', publicacion.descripcion);
    formData.append('version', publicacion.version);
    formData.append('licencia', publicacion.licencia);
    formData.append('subtipoSoftware', publicacion.subtipoSoftware);
    formData.append('tecnologias', JSON.stringify(publicacion.tecnologias));

    publicacion.categorias = categorias.value.map((categoria: any) => {
        // si la pregunta no esta, no enviarla
        if (!categoria.pregunta) {
            return {
                categoria: categoria.id
            };
        }

        return {
            categoria: categoria.id,
            pregunta: categoria.pregunta
        };
    });

    formData.append('categorias', JSON.stringify(publicacion.categorias));

    formData.append('portada', publicacion.portada);

    publicacion.imagenesPreview.forEach((imagen: any) => {
        formData.append('imagenesPreview', imagen);
    });

    const response = await publicacionService.createPublicacion(formData);

    loading.value = false;

    if (response) {
        loading.value = false;
        publicacionStore.setPublicacion(null);
        publicacionStore.setCategoriasElegidas([]);
        generarConfirmDialog(false);
        return;
    }

    generarConfirmDialog(true);

}
</script>   