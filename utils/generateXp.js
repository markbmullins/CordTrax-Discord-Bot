//Generate a random amount of XP
const generateXp = () => {
  let min = 20;
  let max = 30;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = generateXp;
