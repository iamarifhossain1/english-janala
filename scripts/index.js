const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => loadWords(data.data));
};

const displayLessons = (lessons) => {
  // get the container
  // get into every lessons
  // create an element
  // appendChild
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (const lesson of lessons) {
    console.log(lesson);

    const levelDiv = document.createElement("div");
    levelDiv.innerHTML = `<button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
 <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>`;

    levelContainer.appendChild(levelDiv);
  }
};

const loadWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    const wordsCard = document.createElement("div");
    wordsCard.innerHTML = `<div class="bg-white rounded-xl shadow-md text-center space-y-3 py-10">
          <h1 class="text-xl font-bold">${word.word}</h1>
          <p class="text-lg font-semibold">Meaning /Pronounciation</p>
          <p class="text-gray-700 text-lg font-semibold">"${word.meaning} / ${word.pronunciation}"</p>
          <div class="flex justify-between mx-6 items-center">
            <button class="btn bg-blue-100">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn bg-blue-100">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>`;
    wordContainer.appendChild(wordsCard);
  });
};

loadLessons();
