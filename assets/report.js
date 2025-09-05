// Global variables
let analysisData = null;
let pieChart = null;
let barChart = null;

// Color palette for charts
const colorPalette = [
	'#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe',
	'#43e97b', '#38f9d7', '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3',
	'#d299c2', '#fef9d7', '#667eea', '#764ba2', '#f093fb', '#f5576c'
];

// Load analysis data from JSON file
async function loadAnalysisData() {
	try {
		const response = await fetch('analysis-result.json');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		analysisData = await response.json();
		return analysisData;
	} catch (error) {
		console.error('Error loading analysis data:', error);
		throw error;
	}
}

// Update statistics cards
function updateStatistics() {
	if (!analysisData) return;

	document.getElementById('totalComponents').textContent = analysisData.totalComponents;
	document.getElementById('uniqueTypes').textContent = Object.keys(analysisData.components).length;
	
	// Extract project name from directory path
	const projectName = analysisData.projectDirectory.split('/').pop() || analysisData.projectDirectory;
	document.getElementById('projectName').textContent = projectName;
	document.getElementById('componentPrefix').textContent = analysisData.componentPrefix;
}

// Create pie chart
function createPieChart() {
	if (!analysisData) return;

	const columns = Object.entries(analysisData.components).map(([name, count]) => [name, count]);
	
	pieChart = bb.generate({
		data: {
			columns: columns,
			type: 'pie',
			colors: {
				...Object.fromEntries(
					Object.keys(analysisData.components).map((name, index) => [
						name, 
						colorPalette[index % colorPalette.length]
					])
				)
			},
			onclick: function (d, i) {
				console.log('Pie chart clicked:', d, i);
			},
			onover: function (d, i) {
				console.log('Pie chart hover:', d, i);
			},
			onout: function (d, i) {
				console.log('Pie chart out:', d, i);
			},
		},
		pie: {
			label: {
				format: function (value, ratio, id) {
					return `${id}: ${value}`;
				}
			}
		},
		tooltip: {
			format: {
				value: function (value, ratio, id) {
					return `${value} (${(ratio * 100).toFixed(1)}%)`;
				}
			}
		},
		bindto: '#pieChart',
	});
}

// Create bar chart
function createBarChart() {
	if (!analysisData) return;

	const columns = Object.entries(analysisData.components)
		.sort(([,a], [,b]) => b - a) // Sort by count descending
		.map(([name, count]) => [name, count]);
	
	barChart = bb.generate({
		data: {
			columns: columns,
			type: 'bar',
			colors: {
				...Object.fromEntries(
					Object.keys(analysisData.components).map((name, index) => [
						name, 
						colorPalette[index % colorPalette.length]
					])
				)
			},
			onclick: function (d, i) {
				console.log('Bar chart clicked:', d, i);
			},
			onover: function (d, i) {
				console.log('Bar chart hover:', d, i);
			},
			onout: function (d, i) {
				console.log('Bar chart out:', d, i);
			},
		},
		axis: {
			x: {
				type: 'category',
				categories: Object.keys(analysisData.components),
				tick: {
					rotate: -45,
					multiline: false
				}
			},
			y: {
				label: 'Frecuencia'
			}
		},
		tooltip: {
			format: {
				value: function (value) {
					return `${value} ocurrencias`;
				}
			}
		},
		bindto: '#barChart',
	});
}

// Create components table
function createComponentsTable() {
	if (!analysisData) return;

	const tableBody = document.getElementById('tableBody');
	tableBody.innerHTML = '';

	const totalComponents = analysisData.totalComponents;
	const sortedComponents = Object.entries(analysisData.components)
		.sort(([,a], [,b]) => b - a); // Sort by count descending

	sortedComponents.forEach(([name, count], index) => {
		const percentage = ((count / totalComponents) * 100).toFixed(1);
		const row = document.createElement('tr');
		
		row.innerHTML = `
			<td>${name}</td>
			<td>${count}</td>
			<td>${percentage}%</td>
		`;
		
		// Add alternating row colors
		if (index % 2 === 0) {
			row.style.backgroundColor = '#f9f9f9';
		}
		
		tableBody.appendChild(row);
	});
}

// Initialize the dashboard
async function initializeDashboard() {
	try {
		// Show loading state
		document.getElementById('loading').style.display = 'block';
		document.getElementById('error').style.display = 'none';
		document.getElementById('content').style.display = 'none';

		// Load data
		await loadAnalysisData();

		// Update UI
		updateStatistics();
		createPieChart();
		createBarChart();
		createComponentsTable();

		// Show content and hide loading
		document.getElementById('loading').style.display = 'none';
		document.getElementById('content').style.display = 'block';

		console.log('Dashboard initialized successfully');
	} catch (error) {
		console.error('Failed to initialize dashboard:', error);
		
		// Show error state
		document.getElementById('loading').style.display = 'none';
		document.getElementById('error').style.display = 'block';
		document.getElementById('content').style.display = 'none';
	}
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDashboard);

// Handle window resize
window.addEventListener('resize', function() {
	if (pieChart) {
		pieChart.resize();
	}
	if (barChart) {
		barChart.resize();
	}
});
