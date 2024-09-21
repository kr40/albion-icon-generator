// JavaScript code

// Data arrays
const iconTypes = [
	{ value: 'item', label: 'Items' },
	{ value: 'spell', label: 'Spells' },
	{ value: 'wardrobe', label: 'Wardrobe' },
	{ value: 'destiny', label: 'Destiny' },
];

const enchantmentLevels = [
	{ value: '', label: 'None', color: 'bg-gray-200' },
	{ value: '@1', label: 'I', color: 'bg-green-200' },
	{ value: '@2', label: 'II', color: 'bg-blue-200' },
	{ value: '@3', label: 'III', color: 'bg-purple-200' },
	{ value: '@4', label: 'IV', color: 'bg-orange-200' },
];

const qualityLevels = [
	{ value: '1', label: 'Normal', color: 'bg-gray-200' },
	{ value: '2', label: 'Good', color: 'bg-green-200' },
	{ value: '3', label: 'Outstanding', color: 'bg-blue-200' },
	{ value: '4', label: 'Excellent', color: 'bg-purple-200' },
	{ value: '5', label: 'Masterpiece', color: 'bg-yellow-200' },
];

const tiers = [
	{ value: 'T1', label: "Beginner's", color: 'bg-gray-400' },
	{ value: 'T2', label: "Novice's", color: 'bg-green-400' },
	{ value: 'T3', label: "Journeyman's", color: 'bg-blue-400' },
	{ value: 'T4', label: "Adept's", color: 'bg-purple-400' },
	{ value: 'T5', label: "Expert's", color: 'bg-orange-400' },
	{ value: 'T6', label: "Master's", color: 'bg-red-400' },
	{ value: 'T7', label: "Grandmaster's", color: 'bg-yellow-400' },
	{ value: 'T8', label: "Elder's", color: 'bg-gray-800 text-white' },
];

const API_BASE_URL = 'https://render.albiononline.com/v1';

// State variables
let iconType = 'item';
let tier = '';
let itemName = '';
let identifier = '';
let quality = '';
let enchantment = '';
let imageUrl = '';

// Function to create buttons
function createButtons(containerId, dataArray, buttonClass, onClickHandler) {
	const container = document.getElementById(containerId);
	container.innerHTML = ''; // Clear existing buttons
	dataArray.forEach((item) => {
		const button = document.createElement('button');
		button.className = buttonClass;
		if (item.color) {
			button.className += ' ' + item.color;
		}
		button.textContent = item.label;
		button.dataset.value = item.value;
		button.addEventListener('click', () => onClickHandler(item.value));
		container.appendChild(button);
	});
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
	// Create icon type buttons
	createButtons('iconTypeButtons', iconTypes, 'icon-type-button', onIconTypeClick);

	// Create tier buttons
	createButtons('tierButtons', tiers, 'tier-button', onTierClick);

	// Create enchantment buttons
	createButtons('enchantmentButtons', enchantmentLevels, 'enchantment-button', onEnchantmentClick);

	// Create quality buttons
	createButtons('qualityButtons', qualityLevels, 'quality-button', onQualityClick);

	// Update UI
	updateUI();

	// Attach event listeners to input fields
	document.getElementById('itemName').addEventListener('input', function (event) {
		itemName = event.target.value;
	});

	document.getElementById('identifier').addEventListener('input', function (event) {
		itemName = event.target.value;
	});

	// Attach event listener to render button
	document.getElementById('renderButton').addEventListener('click', renderIcon);
});

function onIconTypeClick(value) {
	iconType = value;
	updateIconTypeButtons();
	updateUI();
}

function onTierClick(value) {
	tier = value;
	updateTierButtons();
}

function onEnchantmentClick(value) {
	enchantment = value;
	updateEnchantmentButtons();
}

function onQualityClick(value) {
	quality = value;
	updateQualityButtons();
}

function updateIconTypeButtons() {
	const buttons = document.querySelectorAll('#iconTypeButtons .icon-type-button');
	buttons.forEach((button) => {
		if (button.dataset.value === iconType) {
			button.classList.add('selected');
		} else {
			button.classList.remove('selected');
		}
	});
}

function updateTierButtons() {
	const buttons = document.querySelectorAll('#tierButtons .tier-button');
	buttons.forEach((button) => {
		if (button.dataset.value === tier) {
			button.classList.add('selected');
		} else {
			button.classList.remove('selected');
		}
	});
}

function updateEnchantmentButtons() {
	const buttons = document.querySelectorAll('#enchantmentButtons .enchantment-button');
	buttons.forEach((button) => {
		if (button.dataset.value === enchantment) {
			button.classList.add('selected');
		} else {
			button.classList.remove('selected');
		}
	});
}

function updateQualityButtons() {
	const buttons = document.querySelectorAll('#qualityButtons .quality-button');
	buttons.forEach((button) => {
		if (button.dataset.value === quality) {
			button.classList.add('selected');
		} else {
			button.classList.remove('selected');
		}
	});
}

function updateUI() {
	const itemOptions = document.getElementById('itemOptions');
	const identifierSection = document.getElementById('identifierSection');

	if (iconType === 'item') {
		itemOptions.style.display = 'block';
		identifierSection.style.display = 'none';
	} else {
		itemOptions.style.display = 'none';
		identifierSection.style.display = 'block';
	}

	updateIconTypeButtons();
	updateTierButtons();
	updateEnchantmentButtons();
	updateQualityButtons();
}

function renderIcon() {
	if (iconType === 'item' && tier && itemName) {
		const selectedTier = tiers.find((t) => t.value === tier);
		const tierName = selectedTier ? selectedTier.label : '';
		identifier = `${tierName} ${itemName}`;
	} else {
		identifier = itemName;
	}

	let baseIdentifier = encodeURIComponent(identifier);
	if (iconType === 'item' && enchantment) {
		baseIdentifier += enchantment;
	}

	let baseUrl = `${API_BASE_URL}/${iconType}/${baseIdentifier}.png`;

	const queryParams = new URLSearchParams();
	if (iconType === 'item' && quality) queryParams.append('quality', quality);
	queryParams.append('size', '217');
	queryParams.append('locale', 'en');

	if (queryParams.toString()) {
		baseUrl += `?${queryParams.toString()}`;
	}

	imageUrl = baseUrl;
	updateRenderedIcon();
}

function updateRenderedIcon() {
	const renderedIconSection = document.getElementById('renderedIconSection');
	const renderedIcon = document.getElementById('renderedIcon');
	const imageUrlText = document.getElementById('imageUrlText');

	if (imageUrl) {
		renderedIcon.src = imageUrl;
		imageUrlText.textContent = imageUrl;
		renderedIconSection.style.display = 'block';
	} else {
		renderedIconSection.style.display = 'none';
	}
}
