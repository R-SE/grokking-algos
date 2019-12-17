import Heap from "collections/heap";

const find_k_largest_numbers = function(nums, k) {
  if (k >= nums.length) {
    return nums;
  }
  const minHeap = new Heap([], null, (a, b) => b - a);
  for (let num of nums) {
    if (minHeap.length < k) {
      minHeap.push(num);
    } else if (num > minHeap.peek()) {
      minHeap.pop();
      minHeap.push(num);
    }
  }
  return minHeap.content;
};

/*
Questions:
What if k is bigger than the amount of nums? - return all of them
What if nums has duplicates? Should duplicates count twice? - Yes
*/

console.log(`Here are the top K numbers: ${find_k_largest_numbers([3, 1, 5, 12, 2, 11], 3)}`)
console.log(`Here are the top K numbers: ${find_k_largest_numbers([5, 12, 11, -1, 12], 3)}`)

//===============
const find_Kth_smallest_number = function(nums, k) {
  const maxHeap = new Heap([], null, (a, b) => a - b);
  for (let num of nums) {
    if (k > maxHeap.length) {
      maxHeap.push(num);
    } else if (num < maxHeap.peek()) {
      maxHeap.pop();
      maxHeap.push(num);
    }
  }
  return maxHeap.pop();
};


/*
Approach:
Keep a max heap of k elements. The largest element will be at the top, so if a new # comes along that's
smaller than it, then pop off the top and push on the smaller number
*/

console.log(`Kth smallest number is: ${find_Kth_smallest_number([1, 5, 12, 2, 11, 5], 3)}`)
// since there are two 5s in the input array, our 3rd and 4th smallest numbers should be a '5'
console.log(`Kth smallest number is: ${find_Kth_smallest_number([1, 5, 12, 2, 11, 5], 4)}`)
console.log(`Kth smallest number is: ${find_Kth_smallest_number([5, 12, 11, -1, 12], 3)}`)

// ===============
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get_point() {
    return "[" + this.x + ", " + this.y + "] ";
  }

  getDistanceFromOrigin() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
};

const find_closest_points = function(points, k) {
  const maxHeap = new Heap([], null, (a, b) => a.getDistanceFromOrigin() - b.getDistanceFromOrigin());
  for (let point of points) {
    if (k > maxHeap.length) {
      maxHeap.push(k);
    } else if (point.getDistanceFromOrigin() < maxHeap.peek().getDistanceFromOrigin()) {
      maxHeap.pop();
      maxHeap.push(point);
    }
  }
  return maxHeap.content;
};

points = find_closest_points([new Point(1, 3), new Point(3, 4), new Point(2, -1)], 2)
result = "Here are the k points closest the origin: ";
for (i=0; i < points.length; i++)
  result += points[i].get_point();
console.log(result);

// ========================

class ListNode {
  constructor(value, next=null){
    this.value = value;
    this.next = next;
  }
}

const merge_lists = function(lists) {
  let head = null;
  let tail = null;
  const minHeap = new Heap([], null, (a, b) => b.value - a.value);
  for (let list of lists) {
    minHeap.push(new ListNode(list.value, list.next));
  }
  while (minHeap.length) {
    const node = minHeap.pop();
    const newNode = new ListNode(node.value);
    if (!head) {
      head = newNode;
      tail = newNode;
    } else {
      tail.next = newNode;
      tail = tail.next;
    }
    if (node.next) {
      minHeap.push(new ListNode(node.next.value, node.next.next));
    }
  }
  return head;
};

l1 = new ListNode(2)
l1.next = new ListNode(6)
l1.next.next = new ListNode(8)

l2 = new ListNode(3)
l2.next = new ListNode(6)
l2.next.next = new ListNode(7)

l3 = new ListNode(1)
l3.next = new ListNode(3)
l3.next.next = new ListNode(4)

result = merge_lists([l1, l2, l3])
output = "Here are the elements form the merged list: ";
while (result != null) {
  output += result.value + " ";
  result = result.next;
}
console.log(output);
