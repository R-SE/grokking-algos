class Node {
  constructor(value, next=null){
    this.value = value;
    this.next = next;
  }

  get_list() {
    let result = "";
    let temp = this;
    while (temp !== null) {
      result += temp.value + " ";
      temp = temp.next;
    }
    return result;
  }
};

const reverse = function(head) {
  let first = null;
  let second = head;
  while (second) {
    let temp = second.next;
    second.next = first;
    first = second;
    second = temp;
  }
  return first;
};

head = new Node(2);
head.next = new Node(4);
head.next.next = new Node(6);
head.next.next.next = new Node(8);
head.next.next.next.next = new Node(10);

// console.log(`Nodes of original LinkedList are: ${head.get_list()}`)
// console.log(`Nodes of reversed LinkedList are: ${reverse(head).get_list()}`)

// head1 = new Node(null);
// head1.get_list(); //?

const reverse_sub_list = function(head, p, q) {
  let curr = head;
  let currIdx = 1;
  while (currIdx < p - 1) {
    curr = curr.next;
    currIdx++;
  }
  let last = curr.next;
  let first = last.next;
  while (currIdx < q - 1) {
    let temp = first.next;
    first.next = last;
    last = first;
    first = temp;
    currIdx++;
  }
  curr.next.next = first;
  curr.next = last;
  return head;
};

head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(5)

// console.log(`Nodes of original LinkedList are: ${head.get_list()}`)
// console.log(`Nodes of reversed LinkedList are: ${reverse_sub_list(head, 2, 4).get_list()}`)


const reverse_every_k_elements = function(head, k) {
  let newHeadOverall; // pointer to first head segment, in order to return at the end
  let curr = head;
  let prev = null;
  let prevTail;       // ref to previous tail element (1, 4, 7) in order to point their next to the new heads
  let currTail = head;
  let idx = 1;

  while (curr) {
    if (idx % k === 0 || !curr.next) {
      if (!newHeadOverall) {  // set newHeadOverall to first head
        newHeadOverall = curr;
      } else {
        prevTail.next = curr; // otherwise set the last tail to point to this new head
      }
      prevTail = currTail;
      currTail = curr.next;
    }
    let temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
    idx++;
  }
  prevTail.next = currTail;
  return newHeadOverall;
}

head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(5)
head.next.next.next.next.next = new Node(6)
head.next.next.next.next.next.next = new Node(7)
head.next.next.next.next.next.next.next = new Node(8)
console.log(`Nodes of original LinkedList are: ${head.get_list()}`)
reverse_every_k_elements(head, 3).get_list(); //?