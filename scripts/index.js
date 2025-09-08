const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const remove = document.querySelectorAll(".lesson-btn");
  remove.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      //   console.log(clickBtn);
      clickBtn.classList.add("active");
      loadWords(data.data);
    });
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
    levelDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn p-3">
 <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>`;

    levelContainer.appendChild(levelDiv);
  }
};

const loadWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    wordContainer.innerHTML = `<div class="text-center col-span-full space-y-3">
            <img src="./assets/alert-error.png" class="mx-auto">
          <p class="hind text-gray-500">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h2 class="hind  font-medium">নেক্সট Lesson এ যান</h2>
        </div>`;
  }
  words.forEach((word) => {
    const wordsCard = document.createElement("div");
    wordsCard.innerHTML = `<div class="bg-white rounded-xl shadow-md text-center space-y-3 py-10">
          <h1 class="text-xl font-bold">${
            word.word ? word.word : "শব্দটি পাওয়া যায়নি"
          }</h1>
          <p class="text-lg font-semibold">Meaning /Pronounciation</p>
          <p class="text-gray-700 text-lg font-semibold">"${
            word.meaning ? word.meaning : "অর্থটি পাওয়া যায়নি"
          } / ${
      word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"
    }"</p>
          <div class="flex justify-between mx-6 items-center">
            <button onclick="my_modal_5.showModal()" class="btn bg-blue-100">
              <i class="fa-solid fa-circle-info "></i>
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
