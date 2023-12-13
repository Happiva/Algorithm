const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", function () {
  const [pokemons, question] = input.shift().split(' ').map((el) => parseInt(el));

  const map = new Map();
  const pokemonArr = input.slice(0, pokemons);

  for (let i = 0; i < pokemonArr.length; i++) {
    map.set(pokemonArr[i], i + 1);
  }

  const questions = input.slice(pokemons);
  const answer = [];
  
  for (let i = 0; i < question; i++) {
    const q = questions[i];

    if (!Number.isNaN(parseInt(q))) {
      answer.push(pokemonArr[parseInt(q) - 1]);
    } else {
      answer.push(map.get(q));
    }
  }

  console.log(answer.join('\n').trim());

  process.exit();
});
