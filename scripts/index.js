const createElement = (arr) => {
  const htmlElemets = arr.map(
    (el) => `<span class="btn bg-blue-100">${el}</span>`
  );
  return htmlElemets.join(" ");
};

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
  spinner(true);
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
    levelDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn ">
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
          <p class="hind text-gray-500 sm:text-base md:text-xl">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h2 class="hind font-medium text-xl md:text-4xl">নেক্সট Lesson এ যান</h2>
        </div>`;
    spinner(false);
    return;
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
            <button onclick="loadWordDetail(${
              word.id
            })" class="btn bg-blue-100">
              <i class="fa-solid fa-circle-info "></i>
            </button>
            <button class="btn bg-blue-100">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>`;
    wordContainer.appendChild(wordsCard);
  });

  spinner(false);
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const response = await fetch(url);
  const details = await response.json();
  displayWordDetail(details.data);
};

const displayWordDetail = (word) => {
  console.log(word);
  const detailModal = document.getElementById("details-container");
  detailModal.innerHTML = `<div
              class="bg-white shadow-lg border-1 border-gray-200 p-4 rounded-xl space-y-3"
            >
              <h2 class="text-2xl font-semibold">
                ${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${
    word.pronunciation
  })
              </h2>
              <h2 class="text-xl font-semibold">Meaning</h2>
              <p class="font-semibold">${word.meaning}</p>
              <h2 class="text-lg font-semibold">Example</h2>
              <p class="text-gray-700">
                ${word.sentence}
              </p>
              <div class="">
              <p class="font-semibold">সমার্থক শব্দ গুলো</p>
                <div class="">${createElement(word.synonyms)}</div>
              </div>
              <button class="btn btn-primary poppins text-sm mt-5">
                Complete Learning
              </button>
            </div>`;
  document.getElementById("word_modal").showModal();
};

const spinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const searchBar = document
  .getElementById("search-btn")
  .addEventListener("click", () => {
    removeActive();
    const searchInput = document.getElementById("search-input");
    const searchValue = searchInput.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
      .then((response) => response.json())
      .then((data) => {
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter((word) =>
          word.word.toLowerCase().includes(searchValue)
        );
        loadWords(filterWords);
      });
  });

loadLessons();
