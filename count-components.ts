// Install dependencies
// npm install fs path @angular/compiler

import * as fs from 'fs';
import * as path from 'path';

let components: any = {};

// Function to recursively read files in a directory
function readFiles(dir: string, filesList: string[] = []): string[] {
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
  return filesList;
}

// Function to count custom components in an HTML file
function countCustomComponents(filePath: string): number {
  const content = fs.readFileSync(filePath, 'utf-8');
  // const c = count(content);
  const re = /<\/app-[a-zA-Z-]*>/g;
  const comps = (content || '').match(re) || [];

  comps.forEach((e: any) => {
    let name = e.replace('</', '');
    name = name.replace('>', '');

    components[name] = components[name] ? components[name] + 1 : 1;
  });

  return comps.length;
}

// Main function to count custom components in all HTML files
function countAllCustomComponents(directory: string): number {
  const files = readFiles(directory);
  let totalCustomComponents = 0;
  files.forEach((file) => {
    // console.log(file);

    totalCustomComponents += countCustomComponents(file);
  });
  return totalCustomComponents;
}

// Provide the directory containing your Angular project's HTML files
const projectDirectory = '../almond-komodo-ui/src/app'; // Change this to match your project structure

// Count custom components and log the result
const numCustomComponents = countAllCustomComponents(projectDirectory);
console.log(
  `Total number of custom components in the project: ${numCustomComponents}`
);

var resultArray = Object.keys(components).map(function (cNamedIndex) {
  let item = [cNamedIndex, components[cNamedIndex]];
  // do something with person
  return item;
});

console.log(resultArray);
