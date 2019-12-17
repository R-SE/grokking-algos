class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.next = null;
  }

  // level order traversal using 'next' pointer
  print_level_order() {
    console.log("Level order traversal using 'next' pointer: ");
    let nextLevelRoot = this;
    while (nextLevelRoot !== null) {
      let current = nextLevelRoot;
      nextLevelRoot = null;
      while (current != null) {
        process.stdout.write(`${current.value} `);
        if (nextLevelRoot === null) {
          if (current.left !== null) {
            nextLevelRoot = current.left;
          } else if (current.right !== null) {
            nextLevelRoot = current.right;
          }
        }
        current = current.next;
      }
      console.log();
    }
  }
};


const traverse = function(root) {
  const result = [];
  const queue = [{node: root, level: 0}];
  while (queue.length) {
    const {node, level} = queue.shift();
    result[level] = result[level] || [];
    result[level] = [...result[level], node.value];
    if (node.left) {
      queue.push({node: node.left, level: level + 1});
    }
    if (node.right) {
      queue.push({node: node.right, level: level + 1});
    }
  }
  return result;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
// console.log(`Level order traversal: ${traverse(root)}`);

const traverse_reverse = function(root) {
  const result = [];
  let currLevel = 0;
  let nodes = [];
  const queue = [{node: root, level: 0}];
  while (queue.length) {
    const {node, level} = queue.shift();
    if (level !== currLevel) {
      result.unshift(nodes);
      nodes = [];
      currLevel = level;
    }
    nodes.push(node.value);
    if (node.left) {
      queue.push({node: node.left, level: level + 1});
    }
    if (node.right) {
      queue.push({node: node.right, level: level + 1});
    }
  }
  result.unshift(nodes);
  return result;
}

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
// console.log(traverse_reverse(root));

const traverse_zigzag = function(root) {
  const result = [];
  let isLTR = true;
  let currLevel = 0;
  let nodes = [];
  const queue = [{node: root, level: 0}];
  while (queue.length) {
    const {node, level} = queue.shift();
    if (level !== currLevel) {
      result.push(nodes);
      isLTR = !isLTR;
      currLevel = level;
      nodes = [];
    }
    if (isLTR) {
      nodes.push(node.value);
    } else {
      nodes.unshift(node.value);
    }
    if (node.left) {
      queue.push({node: node.left, level: level + 1});
    }
    if (node.right) {
      queue.push({node: node.right, level: level + 1});
    }
  }
  result.push(nodes);

  return result;
};


var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
root.right.left.left = new TreeNode(20)
root.right.left.right = new TreeNode(17)
// console.log(`Zigzag traversal: ${traverse(root)}`)

function calculateAverage(nums) {
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  return sum / nums.length;
}

const find_level_averages = function(root) {
  const averages = [];
  let nums = [];
  const queue = [{node: root, level: 0}];
  while (queue.length) {
    const {node, level} = queue.shift();
    if (level !== averages.length) {
      averages.push(calculateAverage(nums));
      nums = [];
    }
    nums.push(node.value);
    if (node.left) {
      queue.push({node: node.left, level: level + 1});
    }
    if (node.right) {
      queue.push({node: node.right, level: level + 1});
    }
  }
  averages.push(calculateAverage(nums));
  return averages;
};

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.left.right = new TreeNode(2)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)

// console.log(`Level averages are: ${find_level_averages(root)}`)

const find_minimum_depth = function(root) {
  const queue = [{node: root, depth: 1}];
  while (queue.length) {
    const {node, depth} = queue.shift();
    if (!node.left && !node.right) {
      return depth;
    }
    if (node.left) {
      queue.push({node: node.left, depth: depth + 1});
    }
    if (node.right) {
      queue.push({node: node.right, depth: depth + 1});
    }
  };
};

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
// console.log(`Tree Minimum Depth: ${find_minimum_depth(root)}`)
root.left.left = new TreeNode(9)
root.right.left.left = new TreeNode(11)
// console.log(`Tree Minimum Depth: ${find_minimum_depth(root)}`)

const find_successor = function(root, key) {
  let keyLocated = false;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (keyLocated) {
      return node;
    }
    if (node.value === key) {
      keyLocated = true;
    }
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  return null;
};

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
result = find_successor(root, 12)
result.value //?
result = find_successor(root, 9)
if (result != null)
  console.log(result.value)



const connect_level_order_siblings = function(root) {
  let prev;
  let currLevel = 1;
  const queue = [{node: root, level: 1}];
  while (queue.length) {
    let {node, level} = queue.shift();
    // conditions:
    // 1) no previous or previous level is different -> set prev to current
    // 2. same level -> set prev's next to current, then set prev to current
    if (prev && currLevel === level) {
      prev.next = node;
    }
    prev = node;
    currLevel = level;
    if (node.left) {
      queue.push({node: node.left, level: level + 1});
    }
    if (node.right) {
      queue.push({node: node.right, level: level + 1});
    }
  }
  return root;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
connect_level_order_siblings(root);
root.print_level_order()

class TreeNode2 {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null; 
  }
  
  // tree traversal using 'next' pointer
  print_tree() {
    let result = "Traversal using 'next' pointer: ";
    let current = this;
    while (current != null) {
      result += current.value + " ";
      current = current.next;
    }
    console.log(result);
  }
};

const connect_all_siblings = function(root) {
  const queue = [root];
  let prev;
  while (queue.length) {
    const node = queue.shift();
    if (prev) {
      prev.next = node;
    }
    prev = node;
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
};


var root = new TreeNode2(12)
root.left = new TreeNode2(7)
root.right = new TreeNode2(1)
root.left.left = new TreeNode2(9)
root.right.left = new TreeNode2(10)
root.right.right = new TreeNode2(5)
connect_all_siblings(root)
root.print_tree()

const tree_right_view = function(root) {
  const result = [];
  const queue = [{node: root, level: 1}];
  let prev;
  while (queue.length) {
    const node = queue.shift();
    if (prev && prev.level !== node.level) {
      result.push(prev.node.value);
    }
    prev = node;
    if (node.node.left) {
      queue.push({node: node.node.left, level: node.level + 1});
    }
    if (node.node.right) {
      queue.push({node: node.node.right, level: node.level + 1});
    }
  }
  result.push(prev.node.value);

  return result;
};


var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
root.left.left.left = new TreeNode(3);
console.log("Tree right view: " + tree_right_view(root))

const find_tree_boundary = function(root) {
  let prev;
  let currDepth = 0;
  let isMarked = false;
  const queue = [{node: root, depth: 1}];
  while (queue.length) {
    isMarked = false;
    let {node, depth} = queue.shift();
    // push prev if it's the last node of depth
    if (prev && depth !== prev.depth && !prev.isMarked) {
      // result.push(prev.node.value);
      prev.node.isEdge = true;
    }

    if (depth !== currDepth) { // push if first node of depth
      // result.push(node.value);
      node.isEdge = true;
      isMarked = true;
    }
    currDepth = depth;
    
    // push curr if it's a leaf node, but only if not already pushed
    if (!node.left && !node.right && !isMarked) {
      // result.push(node.value);
      node.isEdge = true;
      isMarked = true;
    }

    prev = {node, depth, isMarked};

    if (node.left) {
      queue.push({node: node.left, depth: depth + 1});
    }
    if (node.right) {
      queue.push({node: node.right, depth: depth + 1});
    }
  }

  function traversePreorder(node) {
    let values = [];
    if (node.isEdge) {
      values.push(node.value);
    }
    if (node.left) {
      values = values.concat(traversePreorder(node.left));
    }
    if (node.right) {
      values = values.concat(traversePreorder(node.right));
    }
    return values;
  }

  function traversePostorder(node) {
    let values = [];
    if (node.left) {
      values = values.concat(traversePostorder(node.left));
    }
    if (node.right) {
      values = values.concat(traversePostorder(node.right));
    }
    if (node.isEdge) {
      values.push(node.value);
    }
    return values;
  }

  let result = [root.value];
  let isPreorder = true;
  if (root.left) {
    isPreorder = false;
    result = result.concat(traversePreorder(root.left));
  }
  if (root.right) {
    if (isPreorder) {
      result = result.concat(traversePreorder(root.right));
    } else {
      result = result.concat(traversePostorder(root.right));
    }
  }

  return result;
};

var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(4);
root.left.left.left = new TreeNode(9);
root.left.right = new TreeNode(3);
root.left.right.left = new TreeNode(15);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
root.right.right.left = new TreeNode(6);
find_tree_boundary(root); //?
// process.stdout.write('Tree boundary: ');
// for (i = 0; i < result.length; i++) {
//   process.stdout.write(`${result[i].value} `);
// }
