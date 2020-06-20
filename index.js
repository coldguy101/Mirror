#!/usr/bin/env node

/**
* Author: Sean Lavoie
* Date: Fri, Jun 19, 2020
*/

const path = require('path');

require('colors');
const commander = require('commander');
const inquirer = require('inquirer');
const mirror = require('./mirror');

commander
  .version('1.0.0')
  .description('Easily mirror files from one location to another without worry of clobbering work');

commander
  .arguments('<srcFile> <dstFile>')
  .option('-d, --diff', 'Only show a diff; do not attempt to replace dstFile')
  .option('-f, --force', 'Force overwrite; do not prompt for confirmation')
  .option('-m, --method [diffMethod]', 'Diffing method to use, options: chars, words, lines', 'chars')
  .description('Mirror srcFile with dstFile, showing differences and prompting for user input before overwriting')
  .action((srcFile, dstFile) => {
    var differences = mirror.getDiff(srcFile, dstFile, commander.method);
    if (commander.diff) {
      mirror.printDiff(differences);
    } else {
      if (differences.length == 1) {
        // If the differences array is of size 1, the files are identical
        console.log("Files '%s' and '%s' are identical".cyan, srcFile, dstFile);
      } else {
        if (commander.force) {
          mirror.copyFile(srcFile, dstFile);
        } else {
          mirror.printDiff(differences);
          inquirer
            .prompt([{
              type: 'confirm',
              name: 'overwrite',
              message: 'Are you sure you want to overwrite this file?',
              default: false
            }])
            .then((answer) => {
              if (answer.overwrite) {
                mirror.copyFile(srcFile, dstFile);
              } else {
                console.log("Files not mirrored".cyan);
              }
            })
        }
      }
    }
  });

commander.parse(process.argv);
