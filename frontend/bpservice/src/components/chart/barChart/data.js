// const gaussianRandom = (mean = 0, stdev = 1) => {
//   let u = 1 - Math.random();
//   let v = Math.random();
//   let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
//   return z * stdev + mean;
// };

// export const data = Array.from({ length: 1000 }, () => gaussianRandom(60, 10));
export const data = [0, 10, 40, 70, 80, 30, 10, 20, 30];

// export const data2 = Array.from({ length: 1000 }, () => gaussianRandom(40, 10));
export const data2 = [100, 30, 290, 40, 10, 20, 30];

export const 임시data = [
  {
    NAME: "구미SSAFY점",
    CASE_ID: 1,
    TOTALMONEY: 130000,
  },
  {
    CASE_ID: 2,
    TOTALMONEY: 23000,
    NAME: "구미역점",
  },
  {
    NAME: "대구역점",
    CASE_ID: 3,
    TOTALMONEY: 45300,
  },
  {
    NAME: "우리집점",
    CASE_ID: 4,
    TOTALMONEY: 1000,
  },
  {
    NAME: "싸피점",
    CASE_ID: 5,
    TOTALMONEY: 8000,
  },
  {
    NAME: "옆집점",
    CASE_ID: 6,
    TOTALMONEY: 23000,
  },
  {
    NAME: "앞집점",
    CASE_ID: 7,
    TOTALMONEY: 11000,
  },
];

// [
//   {
//       "NAME": "구미SSAFY점",
//       "CASE_ID": 1,
//       "TOTALMONEY": 0
//   },
//   {
//       "CASE_ID": 2,
//       "TOTALMONEY": 0,
//       "NAME": "구미역점"
//   },
//   {
//       "NAME": "대구역점",
//       "CASE_ID": 3,
//       "TOTALMONEY": 0
//   }
// ]
