import * as fs from 'fs';
import * as path from 'path';

interface ComponentCount {
	[name: string]: number;
}

interface AnalysisResult {
	projectDirectory: string;
	componentPrefix: string;
	totalComponents: number;
	components: ComponentCount;
	analysisDate: string;
}

let components: ComponentCount = {};

// Function to recursively read files in a directory
function readFiles(dir: string, filesList: string[] = []): string[] {
	try {
		const files = fs.readdirSync(dir);
		files.forEach((file) => {
			const filePath = path.join(dir, file);
			if (fs.statSync(filePath).isDirectory()) {
				readFiles(filePath, filesList);
			} else {
				if (filePath.endsWith('.html')) {
					filesList.push(filePath);
				}
			}
		});
	} catch (error) {
		console.error(`Error reading directory ${dir}:`, error);
	}
	return filesList;
}

// Function to count custom components in an HTML file
function countCustomComponents(filePath: string, prefix: string): number {
	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		// Create regex pattern based on the provided prefix
		const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const re = new RegExp(`<\\/${escapedPrefix}[a-zA-Z-]*>`, 'g');
		const comps = (content || '').match(re) || [];

		comps.forEach((component: string) => {
			let name = component.replace('</', '');
			name = name.replace('>', '');

			components[name] = components[name] ? components[name] + 1 : 1;
		});

		return comps.length;
	} catch (error) {
		console.error(`Error reading file ${filePath}:`, error);
		return 0;
	}
}

// Main function to count custom components in all HTML files
function countAllCustomComponents(directory: string, prefix: string): number {
	const files = readFiles(directory);
	let totalCustomComponents = 0;
	
	console.log(`Analyzing ${files.length} HTML files in ${directory}...`);
	
	files.forEach((file) => {
		totalCustomComponents += countCustomComponents(file, prefix);
	});
	
	return totalCustomComponents;
}

// Function to generate analysis result
function generateAnalysisResult(projectDirectory: string, componentPrefix: string, totalComponents: number): AnalysisResult {
	return {
		projectDirectory,
		componentPrefix,
		totalComponents,
		components,
		analysisDate: new Date().toISOString()
	};
}

// Function to save results to JSON file
function saveResultsToFile(result: AnalysisResult): void {
	const outputPath = path.join(process.cwd(), 'analysis-result.json');
	fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
	console.log(`Results saved to: ${outputPath}`);
}

// Main execution
function main() {
	const args = process.argv.slice(2);
	
	if (args.length < 2) {
		console.error('Usage: npm run analyze <project-directory> <component-prefix>');
		console.error('Example: npm run analyze /path/to/angular/project app');
		process.exit(1);
	}
	
	const projectDirectory = args[0];
	const componentPrefix = args[1];
	
	// Validate directory exists
	if (!fs.existsSync(projectDirectory)) {
		console.error(`Error: Directory '${projectDirectory}' does not exist.`);
		process.exit(1);
	}
	
	console.log(`Analyzing Angular project: ${projectDirectory}`);
	console.log(`Looking for components with prefix: ${componentPrefix}`);
	
	// Count custom components
	const numCustomComponents = countAllCustomComponents(projectDirectory, componentPrefix);
	
	// Generate and display results
	const result = generateAnalysisResult(projectDirectory, componentPrefix, numCustomComponents);
	
	console.log(`\n=== ANALYSIS RESULTS ===`);
	console.log(`Total number of custom components: ${numCustomComponents}`);
	console.log(`Components found:`);
	
	Object.entries(components).forEach(([name, count]) => {
		console.log(`  ${name}: ${count} occurrences`);
	});
	
	// Save results to file
	saveResultsToFile(result);
	
	console.log(`\nAnalysis completed successfully!`);
}

// Run the main function
main();
