import Heap from "collections/heap";
class MinHeapNode {
  constructor(listId, pointerIdx, value) {
    this.listId = listId;
    this.pointerIdx = pointerIdx;
    this.value = value;
  }
}

function find_Kth_smallest(lists, k) {
  const nums = [];
  const minHeap = new Heap([], null, (a, b) => b.value - a.value);
  for (let listId = 0; listId < lists.length; listId++) {
    minHeap.push(new MinHeapNode(listId, 0, lists[listId][0]));
  }

  while (nums.length < k && minHeap.length) {
    const {listId, pointerIdx, value} = minHeap.pop();
    nums.push(value);
    const nextIdx = pointerIdx + 1;
    if (nextIdx < lists[listId].length) {
      minHeap.push(new MinHeapNode(listId, nextIdx, lists[listId][nextIdx]));
    }
  }
  return nums.pop();
};


find_Kth_smallest([[2, 6, 8], [3, 6, 7], [1, 3, 4]], 5); //4

const findKthSmallest = function(matrix, k) {
  let num;
  const minHeap = new Heap([], null, (a, b) => b.value - a.value);

  for (let i = 0; i < matrix.length; i++) {
    minHeap.push(new MinHeapNode(i, 0, matrix[i][0]));
  }

  while (minHeap.length && k > 0) {
    const {value, listId, pointerIdx} = minHeap.pop();
    num = value;
    const nextIdx = pointerIdx + 1;
    if (nextIdx < matrix[listId].length) {
      minHeap.push(new MinHeapNode(listId, nextIdx, matrix[listId][nextIdx]));
    }
    k--;
  }

  return num;
};

findKthSmallest([[2, 6, 8], [3, 7, 10], [5, 8, 11]], 5); // 7

function connectRopes(ropes) {
  const minHeap = new Heap(ropes, null, (a, b) => b - a);
  let total = 0;
  while (minHeap.length > 1) {
    const combined = minHeap.pop() + minHeap.pop();
    total += combined;
    minHeap.push(combined);
  }
  return total;
}

connectRopes([1, 3, 11, 5]); //33
connectRopes([3, 4, 5, 6]); //36
connectRopes([1, 3, 11, 5, 2]); //42


// Given an unsorted array of numbers, find the top ‘K’ frequently occurring numbers in it.
function getTopFrequent(nums, k) {
  const frequencies = {};
  for (let num of nums) {
    frequencies[num] = (frequencies[num] || 0) + 1;
  }
  const maxHeap = new Heap(Object.entries(frequencies), null, (a, b) => a[1] - b[1]);
  const topK = [];
  while (maxHeap.length && k > 0) {
    topK.push(+maxHeap.pop()[0]);
    k--;
  }
  return topK;
}

getTopFrequent([1, 3, 5, 12, 11, 12, 11], 2); // [12, 11]
getTopFrequent([5, 12, 11, 3, 11], 2); // [11, 5] or [11, 12] or [11, 3]

// Given a string, sort it based on the decreasing frequency of its characters.
function sortByFrequency(str) {
  const frequencies = {};
  for (let char of str) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  const maxHeap = new Heap(Object.entries(frequencies), null, (a, b) => a[1] - b[1]);
  let newStr = "";
  while (maxHeap.length) {
    const [letter, freq] = maxHeap.pop();
    const substring = new Array(freq).fill(letter).join('');
    newStr += substring;
  }
  return newStr;
}

sortByFrequency("Programming"); // "rrggmmPiano"
sortByFrequency("abcbab"); // "bbbaac"

// Design a class to efficiently find the Kth largest element in a stream of numbers.
// The class should have the following two things:
// The constructor of the class should accept an integer array containing initial numbers from the stream and an integer ‘K’.
// The class should expose a function add(int num) which will store the given number and return the Kth largest number.

class KthLargest {
  constructor(seed, K) {
    this.K = K;
    this.kLargest = new Heap([], null, (a, b) => b - a);
    this.overflow = new Heap([], null, (a, b) => a - b);
    for (let num of seed) {
      this.add(num);
    }
  }

  getKthLargest() {
    return this.kLargest.peek();
  }

  add(num) {
    if (this.kLargest.length < this.K) {
      this.kLargest.push(num);
    } else if (this.kLargest.peek() < num) {
      this.overflow.push(this.kLargest.pop());
      this.kLargest.push(num);
    }
    return this.getKthLargest();
  }

  delete(num) {
    if (this.kLargest.peek() <= num) {
      this.kLargest.delete(num);
      if (this.overflow.length) {
        this.kLargest.push(this.overflow.pop());
      }
    } else {
      this.overflow.delete(num);
    }
  }
}
const kth = new KthLargest([3, 1, 5, 12, 2, 11], 4);
kth.add(6); //5
kth.add(13); //6
kth.add(4); //6


// Given a sorted number array and two integers ‘K’ and ‘X’, find ‘K’ closest numbers to ‘X’ in the array. Return the numbers in the sorted order.
function getClosestUsingHeap(arr, K, X) {
  const mappings = arr.map(num => [Math.abs(X - num), num]);
  const distances = new Heap(mappings, null, (a, b) => b[0] - a[0]);
  const closest = [];
  while (distances.length && K > 0) {
    closest.push(distances.pop()[1]);
    K--;
  }
  return closest.sort((a, b) => a - b);
}

function getClosest(arr, K, X) {
  if (K >= arr.length) {
    return arr;
  }
  if (X <= arr[0]) {
    return arr.slice(0, K);
  }
  if (X >= arr[arr.length - 1]) {
    return arr.slice(arr.length - K);
  }
  // Binary search for K or closest elements
  let p1 = 0;
  let p2 = arr.length;
  let leftPointer;
  while (p1 <= p2 && leftPointer === undefined) {
    let midpoint = p1 + Math.floor((p2 - p1) / 2);
    if (arr[midpoint] === X) {
      leftPointer = midpoint;
      break;
    } else if (arr[midpoint] > X) {
      p2 = midpoint - 1;
    } else {
      p1 = midpoint + 1;
    }
  }

  function isCloser(num1, num2, X) {
    return Math.abs(num1 - X) < Math.abs(num2 - X);
  }
  
  if (leftPointer === undefined) {
    leftPointer = p2;
  }

  let rightPointer = leftPointer + 1;
  const nums = [];
  while (K > 0) {
    if (rightPointer >= arr.length || isCloser(arr[leftPointer], arr[rightPointer], X)) {
      nums.unshift(arr[leftPointer--]);
    } else {
      nums.push(arr[rightPointer++]);
    }
    K--;
  }
  return nums;
}

getClosest([5, 6, 7, 8, 9], 3, 7); // [6, 7, 8]
getClosest([2, 4, 5, 6, 9], 3, 6); // [4, 5, 6]
getClosest([2, 4, 5, 6, 9], 3, 10); // [5, 6, 9]
getClosest([2, 4, 5, 6, 8, 10], 3, 7); // [5, 6, 8]

// Given an array of numbers and a number ‘K’, we need to remove ‘K’ numbers from the array such that we are left with maximum distinct numbers.
function removeK(nums, K) {
  const frequencies = {};
  for (let num of nums) {
    frequencies[num] = (frequencies[num] || 0) + 1;
  }
  const frequencyHeap = new Heap(Object.entries(frequencies), null, (a, b) => b[1] - a[1]);
  let unique = 0;
  let removed = 0;
  while (removed < K && frequencyHeap.length) {
    let freq = frequencyHeap.pop()[1];
    while (freq > 1) {
      freq--;
      removed++;
      if (removed >= K) {
        return unique;
      }
    }
    unique++;
  }
  return unique - (K - removed);
}

removeK([7, 3, 5, 8, 5, 3, 3], 2); // 3
removeK([3, 5, 12, 11, 12], 3); // 2
removeK([1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5], 2); // 3

// Given an array, find the sum of all numbers between the K1’th and K2’th smallest elements of that array.
function sumK(nums, K1, K2) {
  const minHeap = new Heap(nums, null, (a, b) => b - a);
  let sum = 0;
  let currIdx = 1;
  while (minHeap.length && currIdx < K2) {
    const num = minHeap.pop();
    sum += currIdx > K1 ? num : 0; 
    currIdx++;
  }
  return sum;
}

sumK([1, 3, 12, 5, 15, 11], 3, 6); // 23
sumK([3, 5, 8, 7], 1, 4); // 12

// Given a string, find if its letters can be rearranged in such a way that no two same characters come next to each other.
function rearrange(str) {
  const frequencies = {};
  for (let char of str) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  const maxHeap = new Heap(Object.entries(frequencies), null, (a, b) => a[1] - b[1]);
  const letters = [];
  let prevNode = {freq: 0};
  while (maxHeap.length) {
    let [char, freq] = maxHeap.pop();
    if (prevNode.freq) {
      maxHeap.push([prevNode.char, prevNode.freq]);
    }
    letters.push(char);
    freq--;
    prevNode = {char, freq};
  }

  return letters.length === str.length ? letters.join('') : "";
}

rearrange("aappp"); // "papap"
rearrange("Programming"); // "rgmrgmPiano" or "gmringmrPoa" or "gmrPagimnor",
rearrange("aapa"); // "" (not possible)
rearrange("aaabcd"); // "adacba"
rearrange("bbbbaaaaa"); // "ababababa"

// Given a string and a number ‘K’, find if the string can be rearranged such that the same characters are at least ‘K’ distance apart from each other.
function rearrangeKDistance(str, K) {
  if (K <= 1) {
    return str;
  }

  const frequencies = {};
  for (let char of str) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  const maxHeap = new Heap(Object.entries(frequencies), null, (a, b) => a[1] - b[1]);
  const letters = [];
  const storage = [];

  while (maxHeap.length) {
    let [char, freq] = maxHeap.pop();

    letters.push(char);
    freq--;
    storage.push({char, freq});
    if (storage.length >= K) {
      const saved = storage.shift();
      if (saved.freq) {
        maxHeap.push([saved.char, saved.freq]);
      }
    }
  }
  return letters.length === str.length ? letters.join('') : "";
}

rearrangeKDistance("mmpp", 2); // "mpmp" or "pmpm"
rearrangeKDistance("Programming", 3); // "rgmPrgmiano" or "gmringmrPoa"
rearrangeKDistance("aab", 2); // "aba"
rearrangeKDistance("aappa", 3); // "" (not possible)

// You are given a list of tasks that need to be run, in any order, on a server. Each task will take one CPU interval to execute but once a task has finished, it has a cooling period during which it can’t be run again. If the cooling period for all tasks is ‘K’ intervals, find the minimum number of CPU intervals that the server needs to finish all tasks.

// If at any time the server can’t execute any task then it must stay idle.

function scheduleTasks(tasks, K) {
  const frequencies = {};
  for (let task of tasks) {
    frequencies[task] = (frequencies[task] || 0) + 1;
  }
  const tasksHeap = new Heap(Object.entries(frequencies), null, (a, b) => a[1] - b[1]);

  let intervals = 0;

  while (tasksHeap.length) {
    const cooldownQueue = [];
    let cycleLength = K + 1;
    while (cycleLength > 0 && tasksHeap.length) {
      let [task, freq] = tasksHeap.pop();
      cycleLength--;
      intervals++;
      freq--;
      if (freq) {
        cooldownQueue.push({task, freq});
      }
    }

    cooldownQueue.forEach(({task, freq}) => tasksHeap.push([task, freq]));
    
    if (tasksHeap.length) {
      intervals += cycleLength;
    }
  }

  return intervals;
}

scheduleTasks(["a", "a", "a", "b", "c", "c"], 2); //?
// 7 (a -> c -> b -> a -> c -> idle -> a)
scheduleTasks(["a", "b", "a"], 3); //?
// 5 (a -> b -> idle -> idle -> a)
