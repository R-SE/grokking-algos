class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null; 
  }
};

const has_path = function(root, sum) {
  const stack = [{node: root, sum: 0}];
  while (stack.length) {
    const node = stack.pop();
    const newSum = node.node.value + node.sum;
    if (newSum === sum && !node.node.left && !node.node.right) {
      return true;
    }
    if (node.node.left) {
      stack.push({node: node.node.left, sum: newSum});
    }
    if (node.node.right) {
      stack.push({node: node.node.right, sum: newSum});
    }
  }
  return false;
};


var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
console.log(`Tree has path: ${has_path(root, 23)}`)
console.log(`Tree has path: ${has_path(root, 16)}`)

// ==================================================================
const find_paths = function(root, sum) {
  const allPaths = [];
  const stack = [{node: root, sum: 0, path: []}];
  while (stack.length) {
    const item = stack.pop();
    const newSum = item.node.value + item.sum;
    const newPath = [...item.path, item.node.value];
    if (newSum === sum && !item.node.left && !item.node.right) {
      allPaths.push(newPath);
    }
    if (item.node.left) {
      stack.push({node: item.node.left, sum: newSum, path: newPath});
    }
    if (item.node.right) {
      stack.push({node: item.node.right, sum: newSum, path: newPath});
    }
  }
  
  return allPaths;
};

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(4)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
find_paths(root, 23);

// ======

const find_sum_of_path_numbers = function(root) {
  let sum = 0;
  const stack = [{node: root, currNum: ""}];
  while (stack.length) {
    const {node, currNum} = stack.pop();
    const newNum = currNum + node.value.toString();
    if (!node.left && !node.right) {
      sum += Number(newNum);
    }
    if (node.left) {
      stack.push({node: node.left, currNum: newNum});
    }
    if (node.right) {
      stack.push({node: node.right, currNum: newNum});
    }
  }
  return sum;
};

var root = new TreeNode(1)
root.left = new TreeNode(0)
root.right = new TreeNode(1)
root.left.left = new TreeNode(1)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(5)
console.log(`Total Sum of Path Numbers: ${find_sum_of_path_numbers(root)}`)

// ==================
const find_path = function(root, sequence) {
  const stack = [{node: root, remaining: sequence}];
  while (stack.length) {
    const {node, remaining} = stack.pop();
    const num = remaining[0];
    if (num !== node.value) {
      continue;
    }
    const newRemaining = remaining.slice(1);
    if (!newRemaining.length) {
      if (!node.left && !node.right) {
        return true;
      }
      continue;
    }
    if (node.left) {
      stack.push({node: node.left, remaining: newRemaining});
    }
    if (node.right) {
      stack.push({node: node.right, remaining: newRemaining});
    }
  }
  return false;
};

var root = new TreeNode(1)
root.left = new TreeNode(0)
root.right = new TreeNode(1)
root.left.left = new TreeNode(1)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(5)

console.log(`Tree has path sequence: ${find_path(root, [1, 0, 7])}`)
console.log(`Tree has path sequence: ${find_path(root, [1, 1, 6])}`)

const count_paths = function(root, S) {
  let numPaths = 0;
  const stack = [{node: root, path: []}];
  while (stack.length) {
    const {node, path} = stack.pop();
    path.push(node.value);
    path.reduceRight((a, b) => {
      if (a + b === S) {
        numPaths++;
      }
      return a + b;
    }, 0);
    if (node.left) {
      stack.push({node: node.left, path: [...path, node.value]});
    }
    if (node.right) {
      stack.push({node: node.right, path: [...path, node.value]});
    }
  }
  return numPaths;
};

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(4)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
console.log(`Tree has paths: ${count_paths(root, 11)}`)

/*
       12
     7    1
   4     10 5
        8    9
*/

class TreeDiameter {
  static find_diameter(node) {
    let treeDiameter = 0;
    function findHeight(node) {
      if (!node) {
        return 0;
      }
      const leftHeight = findHeight(node.left);
      const rightHeight = findHeight(node.right);
      let currDiameter = 1 + leftHeight + rightHeight;
      treeDiameter = Math.max(treeDiameter, currDiameter);
  
      return Math.max(leftHeight, rightHeight) + 1;
    }

    findHeight(node);
    return treeDiameter;
  }
};

// var root = new TreeNode(1)
// root.left = new TreeNode(2)
// root.right = new TreeNode(3)
// root.left.left = new TreeNode(4)
// root.right.left = new TreeNode(5)
// root.right.right = new TreeNode(6)
// TreeDiameter.find_diameter(root); //?
// root.left.left = null
// root.right.left.left = new TreeNode(7)
// root.right.left.right = new TreeNode(8)
// root.right.right.left = new TreeNode(9)
// root.right.left.right.left = new TreeNode(10)
// root.right.right.left.left = new TreeNode(11)
// TreeDiameter.find_diameter(root); //?

const find_maximum_path_sum = function(root) {
  let globalMax = -Infinity;
  
  function traverse(node) {
    if (!node) {
      return 0;
    }
    let maxLeft = traverse(node.left);
    let maxRight = traverse(node.right);
    globalMax = Math.max(globalMax, node.value + maxLeft + maxRight);
    return node.value + Math.max(maxLeft, maxRight);
  }

  traverse(root);
  return globalMax;
};

var root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
console.log(`Maximum Path Sum: ${find_maximum_path_sum(root)}`)

root.left.left = new TreeNode(1)
root.left.right = new TreeNode(3)
root.right.left = new TreeNode(5)
root.right.right = new TreeNode(6)
root.right.left.left = new TreeNode(7)
root.right.left.right = new TreeNode(8)
root.right.right.left = new TreeNode(9)
console.log(`Maximum Path Sum: ${find_maximum_path_sum(root)}`)

root = new TreeNode(-1)
root.left = new TreeNode(-3)
console.log(`Maximum Path Sum: ${find_maximum_path_sum(root)}`)
