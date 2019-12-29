// Get the total possible profit given a list of profits, a corresponding list of weights, and a total capacity of the knapsack

class KnapsackSolver {
  constructor(profits, weights, capacity) {
    this.capacity = capacity;
    this.items = profits.map((profit, idx) => ({profit, weight: weights[idx]}));
  }

  getMaxProfit() {
    let prevRow = new Array(this.capacity + 1).fill(0);
    let currRow = [];
    for (let item of this.items) {
      for (let currWeight = 0; currWeight <= this.capacity; currWeight++) {
        const includedProfit = item.weight > currWeight ? prevRow[currWeight] : item.profit + prevRow[currWeight - item.weight];
        const excludedProfit = prevRow[currWeight];
          currRow[currWeight] = Math.max(includedProfit, excludedProfit);
      }
      prevRow = currRow.slice();
    }

    return currRow[this.capacity];
  }
}

const kp = new KnapsackSolver([ 4, 5, 3, 7 ], [ 2, 3, 1, 4 ], 5);
kp.getMaxProfit(); // 10

const kp2 = new KnapsackSolver([16, 1, 6, 10], [5, 1, 2, 3], 7);
kp2.getMaxProfit(); // 22

// ======================

function isEvenlyPartitionable(arr) {
  const midway = arr.reduce((a, b) => a + b, 0) / 2;
  if (Math.floor(midway) !== midway) {
    return false;
  }

  let prev = new Array(midway).fill(false);
  prev.unshift(true);
  let curr = [];

  for (let num of arr) {
    for (let sum = 0; sum <= midway; sum++) {
      const included = num <= sum && prev[sum - num];
      const excluded = prev[sum];
      curr[sum] = included || excluded;
    }
    prev = curr.slice();
  }

  return curr.pop();
}

isEvenlyPartitionable([1, 2, 3, 4]); // true
isEvenlyPartitionable([1, 1, 3, 4, 7]); // true
isEvenlyPartitionable([2, 3, 4, 6]); // false

// Given a set of positive numbers, determine if a subset exists whose sum is equal to a given number ‘S’.
function hasSubsetSum(nums, total) {
  let prev = new Array(total).fill(false);
  prev.unshift(true);
  let curr = [];

  for (let num of nums) {
    for (let sum = 0; sum <= total; sum++) {
      const included = num <= sum && prev[sum - num];
      const excluded = prev[sum];
      curr[sum] = included || excluded;
    }
    if (curr[curr.length - 1]) {
      return true;
    }
    prev = curr.slice();
  }

  return curr.pop();
}

hasSubsetSum([1, 2, 3, 7], 6); // true
hasSubsetSum([1, 2, 7, 1, 5], 10); // true
hasSubsetSum([1, 3, 4, 8], 6); // false

// runtime: O(nums) * O(total)

// Given a set of positive numbers, partition the set into two subsets with minimum difference between their subset sums. Return the difference.
function minimumDifferenceSubsets(nums) {
  const total = nums.reduce((a, b) => a + b);
  const midway = Math.floor(total / 2);
  let closestSum = 0;

  let prev = new Array(midway).fill(false);
  prev.unshift(true);
  let curr = [];

  for (let num of nums) {
    for (let sum = 0; sum <= midway; sum++) {
      const include = num <= sum && prev[sum - num];
      const exclude = prev[sum];
      if (include || exclude) {
        curr[sum] = true;
        closestSum = Math.max(closestSum, sum);
      }
    }
    prev = curr.slice();
  }
  return total - 2 * closestSum;
}

minimumDifferenceSubsets([1, 2, 3, 9]); // 3
minimumDifferenceSubsets([1, 2, 7, 1, 5]); // 0
minimumDifferenceSubsets([1, 3, 100, 4]); // 92

function countSubsets(nums, total) {
  const curr = [1];

  for (let numIdx = 0; numIdx < nums.length; numIdx++) {
    for (let sum = total; sum >= 0; sum--) {
      const included = curr[sum - nums[numIdx]] || 0;
      const excluded = curr[sum] || 0;
      curr[sum] = excluded + included;
    }
  }
  return curr.pop();
}

countSubsets([1, 1, 2, 3], 4);
// 3 sets
countSubsets([1, 2, 7, 1, 5], 9);
// 3 sets

function generateSubsets(nums, total) {
  const matrix = [];
  const zeroithRow = new Array(total).fill({possible: false});
  zeroithRow.unshift({possible: true, included: true});
  matrix.push(zeroithRow);
  nums.unshift(0);
  let allSubsets = [];

  function computeSubsets(row) {
    const stack = [{rowIdx: row, remaining: total, subset: []}];

    while (stack.length) {
      const {rowIdx, remaining, subset} = stack.pop();
      if (!remaining) {
        allSubsets.push(subset);
      } else {
        const node = matrix[rowIdx][remaining];
        if (node.included) {
          const includedNum = nums[rowIdx];
          stack.push({rowIdx: rowIdx - 1, remaining: remaining - includedNum, subset: [...subset, includedNum]});
        }
        if (node.excluded) {
          stack.push({rowIdx: rowIdx - 1, remaining, subset});
        }
      }
    }
  }

  for (let row = 1; row < nums.length; row++) {
    const num = nums[row];
    const currRow = [];
    for (let sum = 0; sum <= total; sum++) {
      const included = num <= sum && matrix[row - 1][sum - num].possible;
      const excluded = matrix[row - 1][sum].possible;
      currRow.push({
        possible: included || excluded,
        included,
        excluded
      });
    }
    matrix.push(currRow);
  }
  computeSubsets(matrix.length - 1);
  
  return allSubsets;
}

generateSubsets([1, 1, 2, 3], 4);
// 3 sets {1, 1, 2}, {1, 3}, {1, 3}
generateSubsets([1, 2, 7, 1, 5], 9);
// 3 sets {2, 7}, {1, 7, 1}, {1, 2, 1, 5}

function findTargetSubsets(nums, S) {
  const total = nums.reduce((a, b) => a + b);
  const target = (S + total) / 2;
  const ways = [1];
  for (let num of nums) {
    for (let sum = target; sum >= 0; sum--) {
      const included = ways[sum - num] || 0;
      const excluded = ways[sum] || 0;
      ways[sum] = included + excluded;
    }
  }
  return ways.pop();
};
findTargetSubsets([1, 1, 2, 3], 1); //3
// Explanation: The given set has '3' ways to make a sum of '1': {+1-1-2+3} & {-1+1-2+3} & {+1+1+2-3}
findTargetSubsets([1, 2, 7, 1], 9); //2
// Explanation: The given set has '2' ways to make a sum of '9': {+1+2+7-1} & {-1+2+7+1}
