const apts = [
	{
		name: 'Sendero Ridge',
		address: '2424 Gold Canyon',
		map: 'img/Sendero Ridge.svg',
		codes: ['8769']
	},
	{
		name: 'Hillcreste',
		address: '1570 Thousand Oaks Dr',
		map: 'img/Hillcreste.svg',
		codes: []
	},
	{
		name: 'Thousand Oaks Condominiums',
		address: '2255 Thousand Oaks Dr',
		map: '',
		codes: ['#0422', '#344']
	},
	{
		name: 'The Redland',
		address: '18979 Redland Rd',
		map: '',
		codes: ['1228']
	},
	{
		name: 'Estates of Northwoods',
		address: '17635 Henderson Pass',
		map: 'img/Estates of Northwoods.svg',
		codes: ['#22222']
	},
	{
		name: 'Dwell at Legacy',
		address: '1810 E Sonterra Blvd',
		map: 'img/Dwell at Legacy.svg',
		codes: ['1810']
	},
	{
		name: 'Altamonte',
		address: '12470 Starcrest Dr',
		map: 'img/Altamonte.svg',
		codes: ['403', '#3160']
	},
	{
		name: '5 Fifty Apartments',
		address: '550 Heimer Rd',
		map: 'img/5Fifty.svg',
		codes: ['4545']
	},
	{
		name: 'Ashley Oaks',
		address: '16400 Henderson Pass',
		map: '',
		codes: ['#1212']
	},
	{
		name: 'Summit at Henderson Pass',
		address: '16465 Henderson Pass',
		map: '',
		codes: ['0253']
	},
	{
		name: 'Emerald Village',
		address: '3203 N Loop 1604 E',
		map: '',
		codes: ['6853#']
	},
	{
		name: 'Sedona Ranch',
		address: '17655 Henderson Pass',
		map: 'img/Sedona Ranch.svg',
		codes: []
	},
	{
		name: 'Canyon Oaks',
		address: '16500 Henderson Pass',
		map: 'img/Canyon Oaks.svg',
		codes: []
	}
];

const other = [
	{
		name: 'Hill Country Villas',
		address: 'Trent St',
		map: '',
		codes: ['#8335']
	},
	{
		name: 'San Pedro Mobile Home Park',
		address: 'San Pedro',
		map: 'img/San Pedro Mobile Home Park.svg',
		codes: []
	},
	{
		name: 'Redland Estates',
		address: 'Redland',
		map: '',
		codes: ['#3433', '#9258']
	},
	{
		name: 'Redland Heights',
		address: 'Redland',
		map: '',
		codes: ['#9736', '#4181', '#3031']
	},
	{
		name: 'Redland Ranch',
		address: 'Redland',
		map: '',
		codes: ['#4548', '#4140', '#0597', '#4584', '#6873']
	},
	{
		name: 'St. James Place',
		address: 'Bulverde',
		map: '',
		codes: ['#1225', '#7330']
	},
	{
		name: 'Pallatium Villas',
		address: 'Jones Maltsberger',
		map: '',
		codes: ['#1144']
	},
	{
		name: 'Scattered Oaks',
		address: 'Jones Maltsberger',
		map: '',
		codes: ['2329']
	},
	{
		name: 'Thousand Oaks Forest',
		address: 'Thousand Oaks',
		map: '',
		codes: ['#1113', '#4350']
	},
	{
		name: 'Las Brisas Townhomes',
		address: 'San Pedro',
		map: '',
		codes: ['#3399']
	},
	{
		name: 'The Bluffs of Henderson Pass',
		address: 'Henderson Pass',
		map: '',
		codes: ['#8750']
	}
];

//region "VUE"

Vue.use(Buefy, {});

Vue.component('map-view', {
	template: `
			<div style="position: relative;height: 100vh">
				<b-button class="back-button" @click="onBack()">
					<b>BACK</b>
				</b-button>
				<div style="text-align: center">
					<img width="100%" height="auto" ref="scene" :src="$root.currentMap">
				</div>
			</div>
		`,

	data: () => ({
		instance: null
	}),

	mounted(){
		this.instance = panzoom(this.$refs.scene, {
			bounds: true,
			boundsPadding: 0.5
		});
	},

	beforeDestroy(){
		let i = this.instance;
		this.instance = null;
		i.dispose();
	},

	methods: {
		onBack(){
			this.$root.isMenuView = true;
		}
	}
});

Vue.component('map-menu', {
	template: `
			<div>
				<div style="text-align: center">
					<b-button
							style="margin-top: 0.5em"
							:style="{backgroundColor: $root.isApts === true ? 'lightgreen' : 'white'}"
							@click="$root.isApts = true"
					>
						<b>APARTMENTS</b>
					</b-button>

					<b-button
							style="margin-top: 0.5em"
							:style="{backgroundColor: $root.isApts !== true ? 'lightgreen' : 'white'}"
							@click="$root.isApts = false"
					>
						<b>OTHER</b>
					</b-button>

					<b-field style="display:inline-block;margin-top:1em">
						<b-switch v-model="$root.isAddressMode" size="is-small">
							<span style="color:white">{{$root.isAddressMode ? 'address' : 'name'}}</span>
						</b-switch>
					</b-field>
				</div>

				<b-menu style="margin-top: 1em">
					<b-menu-list>
						<b-menu-item
								style="color:white !important;font-size:1.25em"
								v-for="d in sortedData"
								:key="$root.isAddressMode ? d.address : d.name"
								:label="$root.isAddressMode ? d.address : d.name"
						>
							<section>
								<b-button
										class="is-size-5"
										style="margin-bottom:1em"
										v-if="d.map !== ''"
										@click="setMap(d.map)"
								>
									<b>MAP</b>
								</b-button>

								<div v-for="c in d.codes" style="font-size:1.5em">{{c}}</div>

							</section>
						</b-menu-item>
					</b-menu-list>
				</b-menu>
			</div>
		`,

	computed: {
		sortedData(){
			const d = this.$root.isApts ? this.$root.aptsData : this.$root.otherData;

			if(this.$root.isAddressMode){
				return d.sort((a, b) => {
					const a2 = a.address.replace(/[0-9]/g, '');
					const b2 = b.address.replace(/[0-9]/g, '');
					return a2.localeCompare(b2);
				});
			}
			else{
				return d.sort((a, b) => {
					if(a.name < b.name){
						return -1;
					}
					else if(a.name > b.name){
						return 1;
					}

					return 0;
				});
			}
		}
	},

	methods: {
		setMap(map){
			this.$root.currentMap = map;
			this.$root.isMenuView = false;
		}
	}
});

const app = new Vue({
	el: '#app',
	data: {
		aptsData: apts,
		otherData: other,
		currentMap: null,
		isMenuView: true,
		isApts: true,
		isAddressMode: false
	}
});

//endregion