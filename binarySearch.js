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

// console.log(search_next_letter(['a', 'c', 'f', 'h'], 'f'))
// console.log(search_next_letter(['a', 'c', 'f', 'h'], 'b'))
// console.log(search_next_letter(['a', 'c', 'f', 'h'], 'm'))
// console.log(search_next_letter(['a', 'c', 'f', 'h'], 'h'))



function find_range(arr, key) {
  let p1 = 0;
  let p2 = arr.length - 1;
  if (key < arr[p1] || key > arr[p2]) {
    return [-1, -1];
  }

  // 3. Search for the start or end depending on the condition and direction passed in.
  function modifiedBinarySearch(condition, p1, p2, isReverseDirection) {
    while (p1 <= p2) {
      const midpoint = p1 + Math.floor((p2 - p1) / 2);
      if (condition(midpoint)) {
        return midpoint;
      } else if (arr[midpoint] === key) {
        if (isReverseDirection) {
          p1 = midpoint + 1;
        } else {
          p2 = midpoint - 1;
        }
      } else if (arr[midpoint] > key) {
        p2 = midpoint - 1;
      } else {
        p1 = midpoint + 1;
      }
    }
  }
  const isStartEdge = midpoint => arr[midpoint] === key && (midpoint <= 0 || arr[midpoint - 1] < arr[midpoint]);
  const isEndEdge = midpoint => arr[midpoint] === key && (midpoint >= arr.length - 1 || arr[midpoint + 1] > arr[midpoint]);

  let isFound = false;

  // 1. Search for number first to make sure it exists, and to decrease the search radius.
  while (p1 <= p2 && !isFound) {
    const midpoint = p1 + Math.floor((p2 - p1) / 2);
    if (arr[midpoint] === key) {
      isFound = true;
    } else if (arr[midpoint] >= key) {
      p2 = midpoint - 1;
    } else {
      p1 = midpoint + 1;
    }
  }

  // 2. If found, search for the boundaries.
  if (isFound) {
    return [modifiedBinarySearch(isStartEdge, p1, p2), modifiedBinarySearch(isEndEdge, p1, p2, true)];
  }

  return [-1, -1];
};

// console.log(find_range([4, 6, 6, 6, 9], 6));
// console.log(find_range([1, 3, 8, 10, 15], 10));
// console.log(find_range([1, 3, 8, 10, 15], 12));
// console.log(find_range([8, 8, 8, 8, 8], 8));

class ArrayReader {
  constructor(arr) {
    this.arr = arr;
  }

  get(index) {
    if (index >= this.arr.length)
      return Number.MAX_SAFE_INTEGER;
    return this.arr[index]
  }
};

const search_in_infinite_array = function(reader, key) {
  let pointer = 0;
  if (key < reader.get(pointer)) {
    return -1;
  }
  let scanFactor = 1;
  while (scanFactor >= 1) {
    const value = reader.get(pointer);
    if (value === key) {
      return pointer;
    } else if (value < key) {
      pointer += scanFactor;
      scanFactor *= 2;
    } else {
      pointer -= scanFactor / 2;
      scanFactor /= 4;
    }
  }

  return -1;
};

// const reader = new ArrayReader([4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]);
// console.log(search_in_infinite_array(reader, 16));
// console.log(search_in_infinite_array(reader, 11));
// const reader2 = new ArrayReader([1, 3, 8, 10, 12, 15, 17, 30, 55, 89, 232, 888, 999, 1092]);
// console.log(search_in_infinite_array(reader2, 15));
// console.log(search_in_infinite_array(reader2, 200));
// console.log(search_in_infinite_array(reader2, 3));
// console.log(search_in_infinite_array(reader2, 8));
// console.log(search_in_infinite_array(reader2, 1));
// console.log(search_in_infinite_array(reader2, 0));
// console.log(search_in_infinite_array(reader2, 12));
// console.log(search_in_infinite_array(reader2, 999));
// console.log(search_in_infinite_array(reader2, 1092));
// console.log(search_in_infinite_array(reader2, 89));
// console.log(search_in_infinite_array(reader2, 30));
// console.log(search_in_infinite_array(reader2, 55));
// console.log(search_in_infinite_array(reader2, 17));
// console.log(search_in_infinite_array(reader2, 232));

const search_min_diff_element = function(arr, key) {
  let minDiff = Infinity;
  let closest;
  let p1 = 0;
  let p2 = arr.length - 1;
  while (p1 <= p2) {
    const midpoint = p1 + Math.floor((p2 - p1) / 2);
    const value = arr[midpoint];
    const difference = value - key;
    if (!difference) {
      return value;
    } else if (difference > 0) {
      p2 = midpoint - 1;
    } else {
      p1 = midpoint + 1;
    }
    if (Math.abs(difference) < minDiff) {
      minDiff = Math.abs(difference);
      closest = value;
    }
  }

  return closest;
};


// [-3, 1, 3, 4, 5] -> find point at which (value - key) -> negative becomes positive
// console.log(search_min_diff_element([4, 6, 10, 11, 12], 7))
// console.log(search_min_diff_element([4, 6, 10], 4))
// console.log(search_min_diff_element([1, 3, 8, 10, 15], 12))
// console.log(search_min_diff_element([4, 6, 10], 17))

const find_max_in_bitonic_array = function(arr) {
  let p1 = 0;
  let p2 = arr.length - 1;
  while (p1 <= p2) {
    const midpoint = p1 + Math.floor((p2 - p1) / 2);
    if (arr[midpoint] >= arr[midpoint - 1] && arr[midpoint] >= arr[midpoint + 1]) { // condition 1
      return arr[midpoint];
    } else if (arr[midpoint] > arr[midpoint - 1] && arr[midpoint] < arr[midpoint + 1]) { // condition 2
      p1 = midpoint + 1;
    } else {  // condition 3
      p2 = midpoint - 1;
    }
  }
  return arr[0] < arr[arr.length - 1] ? arr[arr.length - 1] : arr[0];
};

// Every array will have a max.
// 1. find number in array where left is smaller and right is smaller
// 2. if curr num's left is smaller and curr num's right is larger, move to right
// 3. if curr num's left is larger and curr num's right is smaller, move to left 
console.log(find_max_in_bitonic_array([1, 3, 8, 12, 4, 2]))
console.log(find_max_in_bitonic_array([3, 8, 3, 1]))
// Edge case: In a monotonically increasing sequence, condition 2 will always be true, and same for on condition 3 for decreasing.
console.log(find_max_in_bitonic_array([1, 3, 8, 12]))
console.log(find_max_in_bitonic_array([1, 3, 8, 12, 15, 17, 19, 20]))
console.log(find_max_in_bitonic_array([10, 9, 8]))
console.log(find_max_in_bitonic_array([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]))
