/**
 * Direction:
 * Find prefix of the word from array of string
 *
 * Expected Result:
 * fl
 */
const words = ['flower', 'flow', 'flight'];

function result(words) {
  for (let j = 0; j < words[0].length; j++) {
    for (let i = 1; i < words.length; i++) {
       if(j >= words[i].length){
         return words[i]
       }
       if(words[0][j] != words[i][j]){
         return words[0].substr(0, j)
       }
    }
  }
  return words[0]
};
console.log(result(words));
