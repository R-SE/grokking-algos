const binary_search = function(arr, key) {
  let p1 = 0;
  let p2 = arr.length - 1;
  const isAscending = arr[p1] < arr[p2];
  while (p1 <= p2) {
    let midpoint = p1 + Math.floor(((p2 - p1) / 2));
    if (arr[midpoint] === key) {
      return midpoint;
    } else if ((arr[midpoint] < key && isAscending) || (arr[midpoint] > key && !isAscending)) {
      p1 = midpoint + 1;
    } else {
      p2 = midpoint - 1;
    }
  }
  return -1;
};

/*
Notes:
Challenge #1: the array isn't sorted in ascending order; it could be either way
Fix: Check first element against last element. If first is smaller, then array is ascending
*/

// console.log(binary_search([4, 6, 10], 10))
// console.log(binary_search([1, 2, 3, 4, 5, 6, 7], 5))
// console.log(binary_search([10, 6, 4], 10))
// console.log(binary_search([10, 6, 4], 4))

const search_ceiling_of_a_number = function(arr, key) {
  let p1 = 0;
  let p2 = arr.length - 1;
  if (key > arr[p2]) {
    return -1;
  } else if (key < arr[p1]) {
    return p1;
  }

  while (p1 <= p2) {
    let midpoint = p1 + Math.floor((p2 - p1) / 2);
    if (arr[midpoint] < key) {
      p1 = midpoint + 1;
    } else {
      if (midpoint - 1 < p1 || arr[midpoint - 1] < key) {
        return midpoint;
      } else {
        p2 = midpoint - 1;
      }
    }
  }
};

/*
Challenge #1: we aren't looking for a specific #, but rather a # that meets a certain condition -- it is >= the #, but smallest one so
Solution: We know the # to its left must not also satisfy the condition, so we can do that check
If our current # is smaller than the # we're looking for, then we need to look to the right
Otherwise, if the # to the left also satisfies the condition, we neef to look to the left

Challenge #2: what if there are duplicates of the target #?
e.g. [3, 5, 5, 5, 7], seeking 4? Does it matter if we return the index of the second 5?
Solution: We should return the first element that would fit to the right of the key, not just any #
To do this, we should look for a # that is smaller than the key, but whose right neighbor is greater
*/

// console.log(search_ceiling_of_a_number([4, 6, 10], 6))
// console.log(search_ceiling_of_a_number([1, 3, 8, 10, 15], 12))
// console.log(search_ceiling_of_a_number([4, 6, 10], 17))
// console.log(search_ceiling_of_a_number([4, 6, 10], -1))

const search_next_letter = function(letters, key) {
  if (key.charCodeAt() >= letters[letters.length - 1].charCodeAt()) {
    return letters[0];
  }
  
  let p1 = 0;
  let p2 = letters.length - 1;
  while (p1 <= p2) {
    let midpoint = p1 + Math.floor((p2 - p1) / 2);
    if (letters[midpoint].charCodeAt() <= key.charCodeAt()) {
      p1 = midpoint + 1;
    } else {
      if (midpoint - 1 < p1 || letters[midpoint - 1].charCodeAt() < key.charCodeAt()) {
        return letters[midpoint];
      } else {
        p2 = midpoint - 1;
      }
    }
  }
};

console.log(search_next_letter(['a', 'c', 'f', 'h'], 'f'))
console.log(search_next_letter(['a', 'c', 'f', 'h'], 'b'))
console.log(search_next_letter(['a', 'c', 'f', 'h'], 'm'))
console.log(search_next_letter(['a', 'c', 'f', 'h'], 'h'))

const find_range = function(arr, key) {
  let p1 = 0;
  let p2 = arr.length - 1;
  // let p3 = 
  if (key < arr[p1] || key > arr[p2]) {
    return [-1, -1];
  }
  const result = [];

  
  return [-1, -1];
};

/*
Notes:
|   |     |  |
v   v     v  v
[4, 6, 6, 6, 9]

*/

console.log(find_range([4, 6, 6, 6, 9], 6))
console.log(find_range([1, 3, 8, 10, 15], 10))
console.log(find_range([1, 3, 8, 10, 15], 12))
