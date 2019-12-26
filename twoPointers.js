// Given an array of unsorted numbers and a target number, find all unique quadruplets in it, whose sum is equal to the target number.

// Example 1:
// Input: 
// Output: 
// Explanation: Both the quadruplets add up to the target.

// Example 2:
// Input: [
// Output: 
// Explanation: Both the quadruplets add up to the target.

const search_quadruplets = (arr, target) => {
  const quadruplets = [];
  arr = arr.sort((a, b) => a - b); //?
  let p1 = 0;
  let p4 = arr.length - 1;
  while (p1 + 1 < p4 - 1) {
    // while (arr[p1] === arr[p1 + 1]) {
    //   p1++;
    // }
    // while (arr[p4] === arr[p4 - 1]) {
    //   p4--;
    // }
    let p2 = p1 + 1;
    let p3 = p4 - 1;
    while (p2 < p3) {
      const sum = arr[p1] + arr[p2] + arr[p3] + arr[p4];
      if (sum === target) {
        quadruplets.push([arr[p1], arr[p2], arr[p3], arr[p4]]);
        p2++;
        p3--;
      } else if (sum > target) {
        p3--;
      } else {
        p2++;
      }
    }
    // p1++;
    // p4--;
    if (arr[p1] + arr[p1 + 1] + arr[p4] + arr[p4 - 1] > target) {
    while (arr[p4] === arr[p4 - 1]) {
      p4--;
    }
    } else {
    while (arr[p1] === arr[p1 + 1]) {
      p1++;
    }
    }
  }
  return quadruplets;
};

// search_quadruplets([4, 1, 2, -1, 1, -3], 1); //?
// [-3, -1, 1, 4], [-3, 1, 1, 2]
search_quadruplets([2, 0, -1, 1, -2, 2], 2); //?
//[-2, 0, 2, 2], [-1, 0, 1, 2]
// search_quadruplets([0, 2, 2, 2, 7, 9, 9], 18) //?