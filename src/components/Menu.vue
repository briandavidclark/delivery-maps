<template>
	<q-list padding bordered class="rounded-borders">
		<q-expansion-item
			dense
			dense-toggle
			:label="data.isNameToggle ? menuData.address : menuData.name"
			group="menu-group"
			class="text-weight-bolder"
		>
			<q-card>
				<q-card-section>
					<q-btn
						v-if="menuData.map !== ''"
						@click="onMapClicked(menuData.map)"
						color="white"
						text-color="black"
						label="MAP" />

					<template v-if="menuData.map !== '' && menuData.codes.length > 0">
						<br>
						<br>
					</template>

					<template v-for="c in menuData.codes">
						<div class="text-h5"><b>{{c}}</b></div>
					</template>
				</q-card-section>
			</q-card>
		</q-expansion-item>
	</q-list>
</template>

<script setup>
	import {data} from '../js/global-data.js';

	const props = defineProps([
		'menu-data'
	]);

	const onMapClicked = (map) => {
		data.currentMap = map;
		data.isMenuView = false;
	};
</script>

<style scoped>

</style>