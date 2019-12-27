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
