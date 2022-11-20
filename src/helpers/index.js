export const GENERATE_RANDOM_INTEGER = (min = 0, max = 1000000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const GENERATE_RANDOM_STRING = (length = 10) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const GENERATE_RANDOM_DECIMAL = (
  min = 0,
  max = 1000000,
  decimalPlaces = 2
) => {
  const rand =
    Math.random() < 0.5
      ? (1 - Math.random()) * (max - min) + min
      : Math.random() * (max - min) + min;
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
};

export const GENERATE_RANDOM_DATE = (start = new Date(), end = new Date()) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toLocaleDateString();
};

export const GENERATE_RANDOM_ARRAY = (length = 10) => {
  return JSON.stringify(
    Array(length)
      .fill(null)
      .map(() => GENERATE_RANDOM_STRING())
  );
};
