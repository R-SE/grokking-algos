const find_subsets = function(nums) {
  const subsets = [[]];
  for (let num of nums) {
    const oldSubsets = subsets.slice();
    for (let subset of oldSubsets) {
      subsets.push([...subset, num]);
    }
  }
  return subsets;
};


// find_subsets([1, 3]); //?
// Output: [], [1], [3], [1,3]
// find_subsets([1, 5, 3]); //?
// Output: [], [1], [5], [3], [1,5], [1,3], [5,3], [1,5,3]

const find_subsets_unique = function(nums) {
  nums = nums.sort((a, b) => a - b);
  let subsets = [[]];
  let prev;
  for (let i = 0; i < nums.length; i++) {
    const oldSubsets = nums[i] === nums[i - 1] ? prev : subsets.slice();
    let newAdditions = [];
    for (let subset of oldSubsets) {
      newAdditions.push([...subset, nums[i]]);
    }
    prev = newAdditions;
    subsets = subsets.concat(newAdditions);
  }
  return subsets;
};


// find_subsets_unique([1, 3, 3]) //?
// [], [1], [3], [1,3], [3,3], [1,3,3]
// find_subsets_unique([1, 5, 3, 3]); //?
// [], [1], [5], [3], [1,5], [1,3], [5,3], [1,5,3], [3,3], [1,3,3], [3,3,5], [1,5,3,3] 

// const find_permutations = function(nums) {
//   const permutations = [];

//   function generate(curr, nums) {
//     if (!nums) {

//     }
//     for (let i = 0; i < nums.length; i++) {

//     }
//   }

//   return permutations;
// };


// find_permutations([1, 3, 5]);


// Notes:
// Each letter can be upper or lower, but numbers are not transformed
/*
test: ad52 -> a/A + d/D + 5 + 2
[aD52], [AD52]
[aD], [AD], [ad], [aD]
each permutation must be full length
*/
const find_letter_case_string_permutations = function(str) {
  let permutations = [""];
  for (let char of str) {
    if (isNaN(+char)) {
      let newLayer1 = permutations.slice();
      let newLayer2 = permutations.slice();
      // push in both lower + upper variations
      const lower = char.toLowerCase();
      const upper = char.toUpperCase();
      permutations = newLayer1.map(permutation => permutation + lower)
      .concat(newLayer2.map(permutation => permutation + upper));
    } else {
      permutations = permutations.map(permutation => permutation + char);
    }
  }
  return permutations;
};

// find_letter_case_string_permutations("ad52"); //?
// find_letter_case_string_permutations("ab7c"); //?

const generate_valid_parentheses = function(num) {
  const result = [];
  const queue = [{str: "", opening: 0, closing: 0}];
  while (queue.length) {
    const {str, opening, closing} = queue.shift();
    if (str.length === num * 2) {
      result.push(str);
    } else {
      if (opening >= num) {
        queue.push({str: str + ")", opening, closing: closing + 1});
      } else if (opening === closing) {
        queue.push({str: str + "(", opening: opening + 1, closing});
      } else {
        queue.push({str: str + "(", opening: opening + 1, closing});
        queue.push({str: str + ")", opening, closing: closing + 1});
      }
    }
  }
  return result;
};

/*
1: ()
2: ()(), (())
3: ()()(), (()()), ()(()), (())(), ((()))

Parens are only valid when:
The # of closing parens at any point in the string does not exceed the # of opening parens
*/
generate_valid_parentheses(2);  //?
generate_valid_parentheses(3);  //?
