const gaussianRandom = (mean = 0, stdev = 1) => {
  let u = 1 - Math.random();
  let v = Math.random();
  let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdev + mean;
};

export const data = Array.from({ length: 1000 }, () => gaussianRandom(60, 10));

export const data2 = Array.from({ length: 1000 }, () => gaussianRandom(40, 10));
