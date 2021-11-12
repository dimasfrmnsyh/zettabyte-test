/**
 * Direction:
 * Remove duplicated data from array
 * 
 * Expected Result:
 * [1, 2, 3, 4, 5]
 */
const data = [1, 4, 2, 3, 5, 3, 2, 4];

function result(data) {
  // cara 1
  let unique = []
  for(let i = 0; i<data.length; i++){
    let current = data[i]
    if(unique.indexOf(current)<0) unique.push(current)
  }
  return unique
  //end of cara 1
  //cara 2
  // return [...new Set(data)]
  //end of cara 2
}

console.log(result(data));
