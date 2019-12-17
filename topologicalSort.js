const topological_sort = function(vertices, edges) {
  const sortedOrder = [];
  const dependencies = {};  // key is parent, values are children         bounded by O(V)
  const inDegrees = {}; // count of how many inbound edges go to a node   O(V)
  for (let edge of edges) { // O(E)
    dependencies[edge[0]] = dependencies[edge[0]] || new Set();
    dependencies[edge[0]].add(edge[1]);
    inDegrees[edge[0]] = inDegrees[edge[0]] || 0;
    inDegrees[edge[1]] = (inDegrees[edge[1]] || 0) + 1;
  }

  const sources = [];

  for (let nodeNum in inDegrees) {  // O(V)
    if (!inDegrees[nodeNum]) {
      sources.push(+nodeNum);
    }
  }

  while (sources.length) {  // O(V)
    const source = sources.shift();
    sortedOrder.push(source);
    for (let child of dependencies[source] || []) { // O(E)
      inDegrees[child]--;
      if (!inDegrees[child]) {
        sources.push(child);
      }
    }
  }

  return sortedOrder.length === vertices ? sortedOrder : [];
};


// topological_sort(4, [[3, 2], [3, 0], [2, 0], [2, 1]]); //?
// topological_sort(5, [[4, 2], [4, 3], [2, 0], [2, 1], [3, 1]]); //?
// topological_sort(7, [[6, 4], [6, 2], [5, 3], [5, 4], [3, 0], [3, 1], [3, 2], [4, 1]]); //?

const is_scheduling_possible = function(tasks, prerequisites) {
  const sortedOrder = [];
  const dependencies = {};
  const inDegrees = {};
  for (let prerequisite of prerequisites) {
    const [parent, child] = prerequisite;
    dependencies[parent] = dependencies[parent] || new Set();
    dependencies[parent].add(child);
    inDegrees[parent] = inDegrees[parent] || 0;
    inDegrees[child] = (inDegrees[child] || 0) + 1;
  }

  const sources = [];
  for (let degreeNum in inDegrees) {
    if (!inDegrees[degreeNum]) {
      sources.push(degreeNum);
    }
  }

  while (sources.length) {
    const source = sources.shift();
    sortedOrder.push(source);
    for (let child of dependencies[source] || []) {
      inDegrees[child]--;
      if (inDegrees[child] < 1) {
        sources.push(child);
      }
    }
  }

  return sortedOrder.length === Object.keys(inDegrees).length;
};


// is_scheduling_possible(3, [[0, 1], [1, 2]]); //?
// is_scheduling_possible(3, [[0, 1], [1, 2], [2, 0]]); //?
// is_scheduling_possible(6, [[0, 4], [1, 4], [3, 2], [1, 3]]); //?

// [0, 1] [3, 4] => [0, 1, 3, 4], [0, 1, 4, 3]
// const makeInnerPermutation = (items, layer) => {
//   if (!layer) {
//     return items;
//   }

//   let allPermutations = [];

//   for (let i = 0; i < layer.length; i++) {
//     allPermutations = [...allPermutations, ...makeInnerPermutation([...items, layer[i]], [...layer.slice(0, i), ...layer.slice(i + 1)])];
//   }

//   return allPermutations;
// }

function generatePermutations(layers) {
  layers
  const permutations = [];

  function recurse() {
    if (!layers.length) {
      permutations.push()
    }
  }

  return permutations;
} 

const print_orders = function(tasks, prerequisites) {
  const dependencies = {};
  const inDegrees = {};
  for (let [parent, child] of prerequisites) {
    dependencies[parent] = dependencies[parent] || new Set();
    dependencies[parent].add(child);
    inDegrees[parent] = inDegrees[parent] || 0;
    inDegrees[child] = (inDegrees[child] || 0) + 1;
  }
  
  const sortedOrderLayers = [];
  const sources = [];
  
  const layer = [];
  for (let degreeNum in inDegrees) {
    if (!inDegrees[degreeNum]) {
      layer.push(+degreeNum);
    }
  }
  sources.push(layer);

  while (sources.length) {
    const layer = sources.shift();
    sortedOrderLayers.push(layer);
    const newLayer = [];
    for (let source of layer) {
      for (let child of dependencies[source] || []) {
        inDegrees[child]--;
        if (!inDegrees[child]) {
          newLayer.push(child);
        }
      }
    }
    if (newLayer.length) {
      sources.push(newLayer);
    }
  }

  return generatePermutations(sortedOrderLayers);
};


// print_orders(3, [[0, 1], [1, 2]]); //?
// print_orders(4, [[3, 2], [3, 0], [2, 0], [2, 1]]); //?
print_orders(6, [[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]]); //?
