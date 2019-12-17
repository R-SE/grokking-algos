import Heap from "collections/heap";

class MedianOfAStream {
  constructor() {
    this.smalls = new Heap([], null, (a, b) => a - b); // maxHeap
    this.larges = new Heap([], null, (a, b) => b - a); // minHeap
    this.larges.delete

    // minHeap and maxHeap should never differ by more than 1 element in size
    // if this happens, we need to rebalance
  }
  insert_num(num) {
   if (num < this.smalls.peek()) {
    this.smalls.push(num);
   } else {
     this.larges.push(num);
   }
   while (Math.abs(this.smalls.length - this.larges.length) > 1) {
    if (this.smalls.length > this.larges.length) {
      const topNum = this.smalls.pop();
      this.larges.push(topNum);  
    } else {
      const topNum = this.larges.pop();
      this.smalls.push(topNum);
    }
   }
  }

  find_median(self) {
    if (this.smalls.length === this.larges.length) {
      return (this.smalls.peek() + this.larges.peek()) / 2;
    } else if (this.smalls.length > this.larges.length) {
      return this.smalls.peek();
    } else {
      return this.larges.peek();
    }
  }
};

// var medianOfAStream = new MedianOfAStream();
// medianOfAStream.insert_num(3)
// medianOfAStream.insert_num(1)
// console.log(`The median is: ${medianOfAStream.find_median()}`)
// medianOfAStream.insert_num(5)
// console.log(`The median is: ${medianOfAStream.find_median()}`)
// medianOfAStream.insert_num(4)
// console.log(`The median is: ${medianOfAStream.find_median()}`)

class SlidingWindowMedian {
  constructor() {
    this.larges = new Heap([], null, (a, b) => b - a);
    this.smalls = new Heap([], null, (a, b) => a - b);
  }

  insert(num) {
    if (num < this.smalls.peek()) {
      this.smalls.push(num);
    } else {
      this.larges.push(num);
    }
    this.rebalance();
  }

  rebalance() {
    while (Math.abs(this.smalls.length - this.larges.length) > 1) {
      if (this.smalls.length > this.larges.length) {
        const topNum = this.smalls.pop();
        this.larges.push(topNum);
      } else {
        const topNum = this.larges.pop();
        this.smalls.push(topNum);
      }
    }
  }

  delete(num) {
    if (num <= this.smalls.peek()) {
      this.smalls.delete(num);
    } else {
      this.larges.delete(num);
    }
    this.rebalance();
  }

  findMedian() {
    if (this.smalls.length === this.larges.length) {
      return (this.smalls.peek() + this.larges.peek()) / 2;
    } else if (this.smalls.length > this.larges.length) {
      return this.smalls.peek();
    }
    return this.larges.peek();
  }

  find_sliding_window_median(nums, k) {
    const result = [];
    for (let i = 0; i < nums.length; i++) {
      this.insert(nums[i]);
      if (i < k - 1) {
        continue;
      }
      this.delete(nums[i - k]);
      result.push(this.findMedian());
    }
    return result;
  }
};

new SlidingWindowMedian().find_sliding_window_median([1, 2, -1, 3, 5], 2); //?
new SlidingWindowMedian().find_sliding_window_median([1, 2, -1, 3, 5], 3); //?
