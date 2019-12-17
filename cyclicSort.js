import Heap from "collections/heap";

const cyclic_sort = function(nums) {
  let i = 0;
  while (i < nums.length) { 
    if (nums[i] !== i + 1) {
      let num = nums[i];
      let idx = nums[i] - 1;
      let swapNum = nums[idx];
      nums[idx] = num;
      nums[i] = swapNum;
    } else {
      i++;
    }
  }
  return nums;
}

// console.log(`${cyclic_sort([3, 1, 5, 4, 2])}`);
// console.log(`${cyclic_sort([2, 6, 4, 3, 1, 5])}`)
// console.log(`${cyclic_sort([1, 5, 6, 4, 3, 2])}`)

const find_missing_number = function(nums) {
  let missingIdx = nums.length;
  let idx = 0;
  while (idx < nums.length) {
    if (nums[idx] !== idx) {
      if (typeof(nums[idx]) !== "number") {
        missingIdx = idx;
        idx++;
      } else {
        [nums[nums[idx]], nums[idx]] = [nums[idx], nums[nums[idx]]];
      }
    } else {
      idx++;
    }
  }
  return missingIdx;
};

// find_missing_number([8, 3, 5, 2, 4, 6, 0, 1]); //?

const find_missing_numbers = function(nums) {
  missingNumbers = new Set();
  let idx = 0;
  while (idx < nums.length) {
    if (nums[idx] !== idx + 1) {
      missingNumbers.delete(nums[idx]);
      let oldNum = nums[idx];
      let newNum = nums[nums[idx] - 1];
      if (oldNum === newNum) {
        missingNumbers.add(idx + 1);
        idx++;
      } else {
        [nums[nums[idx] - 1], nums[idx]] = [nums[idx], nums[nums[idx] - 1]];
      }
    } else {
      idx++;
    }
  }
  return Array.from(missingNumbers);
};
// find_missing_numbers([2, 3, 1, 8, 2, 3, 5, 1]); //?
// Output: 4, 6, 7

const find_duplicate = function(nums) {
  let idx = 0;
  while (idx < nums.length) {
    if (nums[idx] !== idx + 1) {
      if (nums[idx] === nums[nums[idx] - 1]) {
        return nums[idx];
      }
      [nums[nums[idx] - 1], nums[idx]] = [nums[idx], nums[nums[idx] - 1]];
    } else {
      idx++;
    }
  }
};

// find_duplicate([1, 4, 4, 3, 2]); //?
// find_duplicate([2, 1, 3, 3, 5, 4]); //?


const find_duplicate_non_mutate = function(nums) {

}

find_duplicate_non_mutate([1, 4, 4, 3, 2]); //?


const find_all_duplicates = function(nums) {
  const duplicateNumbers = new Set();
  let idx = 0;
  while (idx < nums.length) {
    if (nums[idx] === idx + 1) {
      idx++;
    } else {
      if (nums[idx] === nums[nums[idx] - 1]) {
        duplicateNumbers.add(nums[idx]);
        idx++;
      }
      [nums[nums[idx] - 1], nums[idx]] = [nums[idx], nums[nums[idx] - 1]];
    }
  }

  return Array.from(duplicateNumbers);
};

// find_all_duplicates([3, 4, 4, 5, 5]); //?
// Output: [4, 5]
// find_all_duplicates([5, 4, 7, 2, 3, 5, 3]);
// Output: [3, 5]

const find_corrupt_numbers = function(nums) {
  let missingIdx;
  let idx = 0;
  while (idx < nums.length) {
    if (nums[idx] === idx + 1) {
      idx++;
    } else {
      if (nums[idx] === nums[nums[idx] - 1]) {
        missingIdx = idx;
        idx++;
      } else {
        [nums[nums[idx] - 1], nums[idx]] = [nums[idx], nums[nums[idx] - 1]];
      }
    }
  }
  return [nums[missingIdx], missingIdx + 1];
};

// find_corrupt_numbers([3, 1, 2, 5, 2]); //? 
// Output: [2, 4]
// find_corrupt_numbers([3, 1, 2, 3, 6, 4]); //?
// Output: [3, 5]

const find_first_missing_positive = function(nums) {
  const missing = new Set();
  let idx = 0;
  while (idx < nums.length) {
    if (nums[idx] <= 0 || nums[idx] > nums.length) {
      missing.add(idx + 1);
      idx++;
    } else if (nums[idx] !== idx + 1) {
      if (nums[idx] === nums[nums[idx] - 1]) {
        missing.add(idx);
        idx++;
      } else {
        missing.delete(nums[idx]);
        [nums[nums[idx] - 1], nums[idx]] = [nums[idx], nums[nums[idx] - 1]];
      }
    } else {
      missing.delete(idx + 1);
      idx++;
    }
  }

  return Math.min(...Array.from(missing));
};

find_first_missing_positive([3,2,5,1]) //?
// find_first_missing_positive([-3, 1, 5, 4, 2]); //?
// Output: 3
// find_first_missing_positive([3, -2, 0, 1, 2]);
// Output: 4
// find_first_missing_positive([3, 2, 5, 1]);
// Output: 4