<template>
	<q-btn
		color="white"
		text-color="black"
		label="BACK"
		style="position:absolute;right:1em;bottom:1em;z-index:999;border:3px solid red"
		@click="onBack()"/>

	<div style="position:relative;height: 100vh;background-color: #1a1a1a">
		<div style="text-align: center">
			<img width="100%" height="auto" id="scene" :src="imgUrl">
		</div>
	</div>
</template>

<script setup>
	import {computed, onBeforeUnmount, onMounted, useTemplateRef} from 'vue';
	import {data} from '../js/global-data.js';
	import Panzoom from 'panzoom';

	const imgUrl = computed(() => new URL(`../assets/img/${data.currentMap}`, import.meta.url).href);
	let instance = null;

	const onBack = () => data.isMenuView = true;

	onMounted(() => {
		instance = Panzoom(document.getElementById('scene'), {
			bounds: true,
			boundsPadding: 0.5
		});
	});

	onBeforeUnmount(() => {
		let i = instance;
		instance = null;
		i.dispose();
	});
</script>

<style scoped>

</style>