<template>
	<div>
		<Loading :visible="loadingSubmit" />

		<h2 v-if="publicacion" class="font-bold">Evaluando {{ publicacion?.nombre }}</h2>
		<Skeleton v-else height="2rem"></Skeleton>


		<div class="bg-surface-900 p-5 rounded-md border border-surface-800">
			<div class="flex items-center gap-4 mb-4">
				<Button label="Enviar formulario" class="p-button-success" :disabled="respondidas < Object.values(respuestas).length || respondidasCustom < Object.values(respuestasCustom).length" @click="onClickEnviar" />
				<div>
					<p class="font-bold">Preguntas respondidas: {{ respondidas }}/{{ Object.values(respuestas).length }}</p>
					<p class="font-bold">Preguntas custom respondidas: {{ respondidasCustom }}/{{ Object.values(respuestasCustom).length }}</p>
				</div>
			</div>
			<Tabs value="0">
				<TabList>
					<Tab v-for="(categoria, index) in categorias" :value="index" :key="categoria.id">{{ categoria.nombre }}</Tab>
				</TabList>
				<TabPanels>
					<TabPanel v-for="(categoria, index) in categorias" :value="index" :key="categoria.id">
						<div>
							<div v-for="subcategoria in preguntas[categoria.id]" :key="subcategoria.id">
								<h3 class="font-bold mb-4">{{ subcategoria.nombre }}</h3>
								<div v-for="pregunta in subcategoria.preguntas" :key="pregunta.id" class="mb-4 p-2 rounded-md">
									<p class="mb-2 font-bold">{{ pregunta.descripcion }}</p>

									<div class="flex gap-1">
										<Rating v-model="respuestas[pregunta.id]" :unstyled="true" class="flex text-yellow-500 flex-col" />
										<section>
											<p>Muy desacuerdo</p>
											<p>desacuerdo</p>
											<p>Neutral</p>
											<p>De acuerdo</p>
											<p>Muy de acuerdo</p>
										</section>
									</div>
									
								</div>
							</div>
						</div>
						
						<Divider v-if="obtenerPreguntaCustom(categoria.id)" align="center" type="solid">
    						<b>Pregunta custom</b>
						</Divider>

						<div v-if="obtenerPreguntaCustom(categoria.id)" class="mb-4 p-2 rounded-md">
							<p class="mb-2 font-bold">{{ obtenerPreguntaCustom(categoria.id)?.descripcion }}</p>

							<div class="flex gap-1">
								<Rating v-model="respuestasCustom[ obtenerPreguntaCustom(categoria.id)!.id ]" :unstyled="true" class="flex text-yellow-500 flex-col" />
								<section>
									<p>Muy desacuerdo</p>
									<p>desacuerdo</p>
									<p>Neutral</p>
									<p>De acuerdo</p>
									<p>Muy de acuerdo</p>
								</section>
							</div>
							
						</div>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	</div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
import Skeleton from 'primevue/skeleton';
import Loading from '../../components/shared/Loading.vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Rating from 'primevue/rating';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { computed, onMounted, ref } from 'vue';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { useRoute, useRouter } from 'vue-router';
import { Software } from '../../models/software';
import { Categoria } from '../../models/categoria';
import { EvaluacionesService } from '../../services/evaluaciones/evaluaciones';
import { Subcategoria } from '../../models/subcategoria';
import { PreguntaCustom } from '../../models/pregunta_custom';
import { useToastStore } from '../../stores/shared/toast-store';

const publicacionesService = new PublicacionesService();

const evaluacionesService = new EvaluacionesService();

const toast = useToastStore();

const loadingSubmit = ref(false);

const route = useRoute();

const router = useRouter();

const publicacion = ref<Software | null>(null);

const categorias = ref<Categoria[]>([]);

const preguntas = ref<Record<string, Subcategoria[]>>({});

const preguntasCustom = ref<PreguntaCustom[]>([]);

const respuestas = ref<Record<any, number>>({});

const respuestasCustom = ref<Record<any, number>>({});

const respondidas = computed(() => {
	return Object.values(respuestas.value).filter(respuesta => respuesta > 0).length;
});

const respondidasCustom = computed(() => {
	return Object.values(respuestasCustom.value).filter(respuesta => respuesta > 0).length;
});

function obtenerPreguntaCustom(categoriaId: string): PreguntaCustom | undefined {
	return preguntasCustom.value.find(pregunta => pregunta.softwareCategoria.categoria.id === categoriaId);
}

async function cargarPublicacion() {
	if(!route.params.id) {
		return;
	}

	const { id } = route.params;

	publicacion.value = await publicacionesService.obtenerPublicacionById(Number(id));

	if (publicacion.value) {
		categorias.value = publicacion.value.categorias?.map(categoria => categoria.categoria) as Categoria[]; 
	}
}

async function cargarPreguntas() {
	if (categorias.value.length === 0) {
		return;
	}

	for (const categoria of categorias.value) {
		const subcategorias = await evaluacionesService.obtenerSubcategorias(categoria.id);

		if (!subcategorias) {
			continue;
		}

		const data = await Promise.all(
			subcategorias.map(async (subcategoria) => {
				const preguntas = await evaluacionesService.obtenerPreguntas(subcategoria.id);

				if (!preguntas) {
					return;
				}

				preguntas.forEach(pregunta => {
					respuestas.value[pregunta.id] = 0;
				});

				return {
					...subcategoria,
					preguntas: preguntas
				};
			})
		);

		preguntas.value[categoria.id] = data as Subcategoria[];
	}
}

async function cargarPreguntasCustom() {
	if (!publicacion.value) {
		return;
	}

	if (!publicacion.value.id) {
		return;
	}

	preguntasCustom.value = await evaluacionesService.obtenerPreguntasCustom(publicacion.value.id) || [];

	preguntasCustom.value.forEach(pregunta => {
		respuestasCustom.value[pregunta.id] = 0;
	});
}

async function onClickEnviar() {
	loadingSubmit.value = true;	

	console.log('Respuestas:', respuestas.value);
	console.log('Respuestas custom:', respuestasCustom.value);
	

	const data: any = {
		respuestas: respuestas.value,
		respuestasCustom: respuestasCustom.value
	};

	console.log(data);
	

	const respuesta = await evaluacionesService.evaluar(data, publicacion.value?.id);

	loadingSubmit.value = false;

	if (respuesta) {
		toast.showToast('success', 'Éxito', 'Evaluación enviada correctamente.');
		router.push('/perfil/evaluaciones');
		return;
	}

	toast.showToast('error', 'Error', 'Error al enviar la evaluación.');
}

onMounted(async () => {
	await cargarPublicacion();

	await cargarPreguntas();

	await cargarPreguntasCustom();
});
</script>
