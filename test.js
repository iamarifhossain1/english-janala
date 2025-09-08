const createElement = (arr) => {
  const htmlElemets = arr.map((el) => `<span class="btn">${el}</span>`);
  console.log(htmlElemets.join(" "));
};

const synonyms = ["Hi,", "Hello", "Ciao"];

createElement(synonyms);
