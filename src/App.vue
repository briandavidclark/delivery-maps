<template>
	<q-layout view="hHh lpR fFf" dark>

		<q-header elevated class="bg-primary text-white" v-if="data.isMenuView">
			<q-toolbar>
				<q-btn-group>
					<q-btn
						@click="data.isApartments = true"
						:color="data.isApartments ? 'green' : ''"
						label="APARTMENTS"/>
					<q-btn
						@click="data.isApartments = false"
						:color="data.isApartments ? '' : 'green'"
						label="OTHER"/>
				</q-btn-group>
				<q-toggle
					v-model="data.isNameToggle"
					:label="data.isNameToggle ? 'address' : 'name'"
					color="white"
				/>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<template v-if="data.isMenuView">
				<Menu v-for="d in menuData" :menu-data="d"/>
			</template>
			<Map v-if="!data.isMenuView"/>
		</q-page-container>

	</q-layout>
</template>

<script setup>

	import {data, menuData} from './js/global-data.js';
	import Menu from './components/Menu.vue';
	import {useQuasar} from 'quasar';
	import Map from './components/Map.vue';

	const jsonUrl = new URL('./assets/data.json', import.meta.url).href;

	fetch(jsonUrl)
		.then(res => res.json())
		.then(x => data.json = x)

	const $q = useQuasar();
	$q.dark.set(true);

</script>