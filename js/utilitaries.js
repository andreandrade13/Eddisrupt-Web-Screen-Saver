const getRandomNumberInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const isNumberInRange = (value, min, max) => value >= min && value <= max; 

export { getRandomNumberInRange, isNumberInRange };