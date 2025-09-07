const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayLessons(json.data));
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
    levelDiv.innerHTML = `<button class="btn btn-outline btn-primary">
 <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>`;

    levelContainer.appendChild(levelDiv);
  }
};

loadLessons();
