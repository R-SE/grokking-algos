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
// print_orders(6, [[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]]);


function preprocessRelations(edges) {
  const relations = {};
  const inDegrees = {};
  for (let edge of edges) {   // O(E) time - we need to iterate over every edge for preprocessing our map
    const [parent, child] = edge;
    relations[parent] = relations[parent] || new Set();
    relations[child] = relations[child] || new Set();
    relations[parent].add(child);
    inDegrees[parent] = inDegrees[parent] || 0;
    inDegrees[child] = (inDegrees[child] || 0) + 1;
  }
  return {
    relations,
    inDegrees
  }
}

function combine(allRelations, allIndegrees) {
  const inDegrees = {};
  const relations = {};
  for (let inDegreesMap of allIndegrees) {
    for (let inDegree in inDegreesMap) {
      inDegrees[inDegree] = (inDegrees[inDegree] || 0) + inDegreesMap[inDegree];
    }
  }

  for (let relationMap of allRelations) {
    for (let relation in relationMap) {
      relations[relation] = new Set(...relations[relation], ...relationMap[relation]);
    }
  }

  return {inDegrees, relations};
}

// Basic topological sort again
function topologicalSort(vertices, edges) {
  const midpoint = Math.floor(edges.length / 2);
  const {relations: relations1, inDegrees: inDegrees1} = edges.slice(0, midpoint);
  const {relations: relations2, inDegrees: inDegrees2} = edges.slice(midpoint);
  const { relations, inDegrees } = combine([relations1, relations2], [inDegrees1, inDegrees2]);

  const ordering = [];
  const sources = []; // potentially O(V) space

  for (let node in inDegrees) { // O(V)
    if (!inDegrees[node]) {
      sources.push(node);
    }
  }

  while (sources.length) {  // O(V) time - we are exploring every vertex as a source
    const source = sources.shift();
    ordering.push(+source);
    for (let child of relations[source]) {
      inDegrees[child]--;
      if (!inDegrees[child]) {
        sources.push(child);
      }
    }
  }

  return vertices === ordering.length ? ordering : [];
}
// topologicalSort(4, [3, 2], [3, 0], [2, 0], [2, 1]);


// Input: Tasks=3, Prerequisites=[0, 1], [1, 2]
// Output: [0, 1, 2]

// Input: Tasks=4, Prerequisites=[3, 2], [3, 0], [2, 0], [2, 1]
// Output: 
// 1) [3, 2, 0, 1]
// 2) [3, 2, 1, 0]

// Input: Tasks=6, Prerequisites=[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]
// Output: 
// 1) [0, 1, 4, 3, 2, 5]
// 2) [0, 1, 3, 4, 2, 5]
// 3) [0, 1, 3, 2, 4, 5]
// 4) [0, 1, 3, 2, 5, 4]
// 5) [1, 0, 3, 4, 2, 5]
// 6) [1, 0, 3, 2, 4, 5]
// 7) [1, 0, 3, 2, 5, 4]
// 8) [1, 0, 4, 3, 2, 5]
// 9) [1, 3, 0, 2, 4, 5]
// 10) [1, 3, 0, 2, 5, 4]
// 11) [1, 3, 0, 4, 2, 5]
// 12) [1, 3, 2, 0, 5, 4]
// 13) [1, 3, 2, 0, 4, 5]

class TopologicalSort {
  constructor(taskNum, prereqs) {
    this.taskNum = taskNum;
    this.prereqs = prereqs;
  }

  preprocessRelations = () => {
    const relations = {};
    const inDegrees = {};
    for (let prereq of this.prereqs) {
      const [parent, child] = prereq;
      relations[parent] = relations[parent] || new Set();
      relations[child] = relations[child] || new Set();
      relations[parent].add(child);
      inDegrees[parent] = inDegrees[parent] || 0;
      inDegrees[child] = (inDegrees[child] || 0) + 1;
    }
    return {relations, inDegrees}
  }

  getSources = inDegrees => {
    const sources = new Set();
    for (let vertex in inDegrees) {
      if (!inDegrees[vertex]) {
        sources.add(+vertex);
      }
    }
    return sources;
  }

  getAllOrderings = () => {
    const { relations, inDegrees } = this.preprocessRelations();
    const allOrderings = [];

    const sortFromSource = (sources, currentChain, inDegrees) => {
      for (let source of sources) {
        const newChain = [...currentChain, source];
        if (newChain.length === this.taskNum) {
          return allOrderings.push(newChain);
        }
        const newSources = new Set(sources);
        newSources.delete(source);

        const newIndegrees = {...inDegrees};
        for (let child of relations[source]) {
          newIndegrees[child]--;
          if (!newIndegrees[child]) {
            newSources.add(child);
          }
        }
        sortFromSource(newSources, newChain, newIndegrees);
      }
    }

    const initialSources = this.getSources(inDegrees);
    sortFromSource(initialSources, [], inDegrees);

    return allOrderings;
  }
}

const top1 = new TopologicalSort(3, [[0, 1], [1, 2]]);
// top1.getAllOrderings(); //? [0, 1, 2]
const top2 = new TopologicalSort(4, [[3, 2], [3, 0], [2, 0], [2, 1]]);
// top2.getAllOrderings(); //?
const top3 = new TopologicalSort(6, [[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]]);
// console.table(top3.getAllOrderings());


class AlienDictionary {
  constructor(words) {
    this.words = words;
  }

  static getSources(inDegrees) {
    const sources = [];
    for (let vertex in inDegrees) {
      if (!inDegrees[vertex]) {
        sources.push(vertex);
      }
    }
    return sources;
  }

  generateDependencyMap() {
    const dependencies = {};
    const inDegrees = {};
    for (let i = 0; i < this.words.length - 1; i++) {
      const first = this.words[i];
      const second = this.words[i + 1];
      let pointer = 0;
      while (pointer < first.length && pointer < second.length && first[pointer] === second[pointer]) {
        pointer++;
      }
      dependencies[first[pointer]] = dependencies[first[pointer]] || new Set();
      if (!dependencies[first[pointer]].has(second[pointer])) {
        dependencies[first[pointer]].add(second[pointer]);
        inDegrees[second[pointer]] = (inDegrees[second[pointer]] || 0) + 1;
      }
      inDegrees[first[pointer]] = inDegrees[first[pointer]] || 0;
    }
    return {dependencies, inDegrees};
  }

  findOrder() {
    let order = "";
    const {dependencies, inDegrees} = this.generateDependencyMap();
    const sources = AlienDictionary.getSources(inDegrees);

    while (sources.length) {
      const vertex = sources.shift();
      order += vertex;
      if (!dependencies[vertex]) {
        continue;
      }
      for (let child of dependencies[vertex]) {
        inDegrees[child]--;
        if (!inDegrees[child]) {
          sources.push(child);
        }
      }
    }

    return order;
  }
}

const lang1 = new AlienDictionary(["ba", "bc", "ac", "cab"]);
lang1.findOrder(); //?
const lang2 = new AlienDictionary(["cab", "aaa", "aab"]);
lang2.findOrder(); //?
const lang3 = new AlienDictionary(["ywx", "wz", "xww", "xz", "zyy", "zwz"]);
lang3.findOrder(); //?
