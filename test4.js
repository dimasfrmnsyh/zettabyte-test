/**
 * Direction:
 * Find missing number from the list
 *
 * Expected Result:
 * 8
 */
const numbers = [9, 6, 4, 2, 3, 5, 7, 0, 1];

function result(numbers) {
  let numbersLength = numbers.length
  let total = Math.floor((numbersLength + 1) * (numbersLength) / 2);
  for (let i = 0; i < numbersLength; i++)
      total -= numbers[i];
  return total;
}

console.log(result(numbers));
