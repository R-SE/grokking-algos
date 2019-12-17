import Heap from "collections/heap";

// Educative.io Insert Interval problem
/**
 * @param {Array(Array)} intervals
 * @param {Array} new_interval
 * @returns Array
 */
function insert(intervals, new_interval) {
  if (intervals.length < 2) {
    return intervals;
  }
  let idx = 0;
  while (intervals[idx][1] < new_interval[0]) {
    idx++;
  }
  if (idx > intervals.length - 1) {
    intervals.push(new_interval);
    return intervals;
  }
  let curr = new_interval;
  while (idx < intervals.length && curr[1] > intervals[idx][0]) {
    curr = [Math.min(curr[0], intervals[idx][0]), Math.max(curr[1], intervals[idx][1])];
    intervals.splice(idx, 1);
  }
  intervals.splice(idx, 0, curr);

  return intervals;
};
  
// intervals = insert([[1, 3], [5, 7], [8, 12]], [4, 6]); //?
// intervals = insert([[1, 3], [5, 7], [8, 12]], [4, 10]);
// intervals = insert([[2, 3], [5, 7]], [1, 4]); //?

const merge = function(intervals1, intervals2) {
  const union = [];
  let p1 = 0;
  let p2 = 0;
  while (p1 < intervals1.length && p2 < intervals2.length) {
    const interval1 = intervals1[p1];
    const interval2 = intervals2[p2];
    const [first, second] = interval1[0] <= interval2[0] ? [interval1, interval2] : [interval2, interval1];
    if (first[1] >= second[0]) {
      union.push([Math.max(first[0], second[0]), Math.min(first[1], second[1])]);
    }
    if (interval1[1] < interval2[1]) {
      p1++;
    } else {
      p2++;
    }
  }
  return union;
};

// merged_intervals = merge([[1, 3], [5, 6], [7, 9]], [[2, 3], [5, 7]]); // ?
// merged_intervals = merge([[1, 3], [5, 7], [9, 12]], [[5, 10]]); //?
// merged_intervals = merge([[1, 3], [5, 10]], [[5, 7], [9, 12]]); //?

/*
[1, 2] - [2, 3] 
[5, 6] - [5, 7]
[7, 9]

[1, 2] - [2, 3] compare both; if there's no overlap, increment pointer of interval that ends earlier
[5, 6] - [2, 3] - repeat, increment pointer
[5, 6] - [5, 7] - mark the overlap, increment
[7,9] - [5, 7] - increment
*/

const can_attend_all_appointments = function(intervals) {
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }
  return true;
};

// console.log(`Can attend all appointments: ${can_attend_all_appointments([[1, 4], [2, 5], [7, 9]])}`)
// console.log(`Can attend all appointments: ${can_attend_all_appointments([[6, 7], [2, 4], [8, 12]])}`)
// console.log(`Can attend all appointments: ${can_attend_all_appointments([[4, 5], [2, 3], [3, 6]])}`)

function returnConflicts(appts) {
  const conflicts = [];
  appts = appts.sort((a, b) => a[1] - b[1]);
  for (let i = 1; i < appts.length; i++) {
    if (appts[i][0] < appts[i - 1][1]) {
      conflicts.push([appts[i - 1], appts[i]]);
    }
  }
  return conflicts;
}

// returnConflicts([[4,5], [2,3], [3,6], [5,7], [7,8]]);

class Meeting {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
};

const min_meeting_rooms = function(meetings) { 
  let [startTimes, endTimes] = meetings.reduce((splits, arr) => {
    splits[0].push(arr.start);
    splits[1].push(arr.end);
    return splits;
  }, [[],[]]);
  startTimes.sort((a, b) => a - b);
  endTimes.sort((a, b) => a - b);
  let p1 = 0;
  let p2 = 0;
  let max = 0;
  let curr = 0;
  while (p1 < startTimes.length) { 
    if (startTimes[p1] < endTimes[p2]) {
      curr++;
      max = Math.max(curr, max);
    } else {
      curr--;
      p2++;
    }
    p1++;
  }
  return max;
};

// console.log(`Minimum meeting rooms required: ${min_meeting_rooms(
//     [new Meeting(4, 5), new Meeting(2, 3), new Meeting(2, 4), new Meeting(3, 5)])}`)
// console.log(`Minimum meeting rooms required: ${min_meeting_rooms(
//     [new Meeting(1, 4), new Meeting(2, 5), new Meeting(7, 9)])}`)
// console.log(`Minimum meeting rooms required: ${min_meeting_rooms(
//     [new Meeting(6, 7), new Meeting(2, 4), new Meeting(8, 12)])}`)
// console.log(`Minimum meeting rooms required: ${min_meeting_rooms(
//     [new Meeting(1, 4), new Meeting(2, 3), new Meeting(3, 6)])}`)

class Job {
  constructor(start, end, cpu_load) {
    this.start = start;
    this.end = end;
    this.cpu_load = cpu_load;
  }
};

const find_max_cpu_load = function(jobs) {
  let [start, stop] = jobs.reduce((loads, next) => {
    loads[0].push({start: next.start, load: next.cpu_load});
    loads[1].push({stop: next.end, load: next.cpu_load});
    return loads;
  }, [[],[]]);
  start = start.sort((a, b) => a.start - b.start);
  stop = stop.sort((a, b) => a.stop - b.stop);
  let currLoad = 0;
  let maxLoad = 0;
  let p2 = 0;
  for (let job of start) {
    while (job.start > stop[p2].stop) {
      currLoad -= stop[p2].load;
      p2++;
    }
    currLoad += job.load;
    maxLoad = Math.max(currLoad, maxLoad);
  }

  return maxLoad;
};


// console.log(`Maximum CPU load at any time: ${find_max_cpu_load(
//       [new Job(1, 4, 3), new Job(2, 5, 4), new Job(7, 9, 6)])}`)
// console.log(`Maximum CPU load at any time: ${find_max_cpu_load(
//       [new Job(6, 7, 10), new Job(2, 4, 11), new Job(8, 12, 15)])}`)
// console.log(`"Maximum CPU load at any time: ${find_max_cpu_load(
//       [new Job(1, 4, 2), new Job(2, 4, 1), new Job(3, 6, 5)])}`)

class Interval {
  constructor(start, end) {
      this.start = start;
      this.end = end;
  }

  get_interval() {
      return "[" + this.start + ", " + this.end + "]";
  }
};

const find_employee_free_time = function(schedule) {
  const result = [];
  let end = null;
  const minHeap = new Heap(schedule, null, (a, b) => b[0].start - a[0].start);
  while (minHeap.length) {
    let employeeSchedule = minHeap.pop();
    const shift = employeeSchedule.shift();
    if (typeof(end) === "number" && shift.start > end) {
      result.push(new Interval(end, shift.start));
    }
    end = Math.max(end, shift.end);
    if (employeeSchedule.length) {
      minHeap.push(employeeSchedule);
    }
  }
  // console.log(result);
  return result;
};

/*
Every time we add a job, we can update the potential earliest free time to the latest out of all existing intervals
If there's a time when we're adding a job and there's no other jobs, we can push the potential free time start and the start of this new time to the communal free time
end: 3
1, 2, 5
3-5; 
*/

// [1, 3], [5, 6] + [2, 3], [6, 8]
// let input = [[new Interval(1, 3), new Interval(5, 6)], [
//   new Interval(2, 3), new Interval(6, 8)]];
// let intervals = find_employee_free_time(input)
// let result = "Free intervals: ";
// for(let i=0; i < intervals.length; i++)
// result += intervals[i].get_interval();
// console.log(result);


// let input = [[new Interval(1, 3), new Interval(9, 12)], [
//   new Interval(2, 4)], [new Interval(6, 8)]];
// let intervals = find_employee_free_time(input)
// let result = "Free intervals: ";
// for(let i=0; i < intervals.length; i++)
// result += intervals[i].get_interval();
// console.log(result);

let input = [[new Interval(1, 3)], [
  new Interval(2, 4)], [new Interval(3, 5), new Interval(7, 9)]];
let intervals = find_employee_free_time(input);
let result = "Free intervals: ";
for(let i=0; i < intervals.length; i++)
result += intervals[i].get_interval();
console.log(result);
