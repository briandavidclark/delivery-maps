import {computed, reactive} from 'vue';

export const data = reactive({
	/** @var {Array} json */
	json: [],

	/** @var {boolean} isMenuView */
	isMenuView: true,

	/** @var {boolean} isApartments */
	isApartments: true,

	/** @var {boolean} isNameToggle */
	isNameToggle: false,

	/** @var {string} currentComponent */
	currentComponent: 'Menu',

	/** @var {string} currentMap */
	currentMap: ''
});

//computed props

export const aptData = computed(() => {
	const d = data.json.filter(x => x.isApartment === true);

	if(data.isNameToggle){
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
});

export const otherData = computed(() => {
	return data.json.filter(x => x.isApartment === false)
		.sort();
});

export const menuData = computed(() => data.isApartments ? aptData.value : otherData.value);