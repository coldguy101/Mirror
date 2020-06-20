/**
* Author: Sean Lavoie
* Date: Fri, Jun 19, 2020
*/

const diff = require('diff');
const fs = require('fs');

/**
 * Copy srcFile to dstFile, creating or overwriting dstFile
 * @param {string} srcFilePath 
 * @param {string} dstFilePath 
 */
function copyFile(srcFilePath, dstFilePath) {
  // destination will be created or overwritten by default
  fs.copyFile(srcFilePath, dstFilePath, (err) => {
    if (err) throw err;
    console.log("'%s' was copied to '%s'".cyan, srcFilePath, dstFilePath);
  });
}

/**
 * Calculate the diff between two files using diff js
 * @param {string} firstFilePath 
 * @param {string} secondFilePath 
 * @param {string} diffMethod
 * @returns {Array<ChangeObject>} differences
 */
function getDiff(firstFilePath, secondFilePath, diffMethod) {
  var firstFileData = fs.readFileSync(firstFilePath).toString();
  var secondFileData = fs.readFileSync(secondFilePath).toString();

  switch(diffMethod) {
    case 'chars':
      return diff.diffChars(firstFileData, secondFileData);
    case 'words':
      return diff.diffWordsWithSpace(firstFileData, secondFileData);
    case 'lines':
      return diff.diffLines(firstFileData, secondFileData);
    default:
      console.error("Diff method unspecified".red);
      return null;
  }
}

/**
 * Print the differences to console
 * @param {Array<ChangeObject>} differences 
 */
function printDiff(differences) {
  differences.forEach(function(part){
    // green for additions in the first file, which are "removed" from the second
    // red for removed parts in the first file, which are "added" in the second file
    // grey for common parts
    var color = part.added ? 'red' :
      part.removed ? 'green' : 'grey';
    process.stdout.write(part.value[color]);
  });
}

module.exports = { copyFile, getDiff, printDiff };
