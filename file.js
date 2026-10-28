// Дані платформи
const data = {
  classes: [
    {
      id: "5",
      name: "5 клас",
      subjects: [
        {
          id: "math",
          name: "Математика",
          topics: [
            {
              id: "numbers",
              name: "Числа та дії з ними",
              tasks: [
                {
                  id: "t1",
                  question: "Обчисліть: 12 + 8 = ?",
                  type: "input",
                  answer: ["20"],
                  hint: "Складіть числа звичайним способом: 12 більше на 8.",
                },
                {
                  id: "t2",
                  question: "Яке число більше: 15 чи 9?",
                  type: "choice",
                  options: ["9", "15", "12"],
                  answer: ["15"],
                  hint: "15 — це більше число.",
                },
                {
                  id: "t3",
                  question: "Обчисліть: 7 × 3 = ?",
                  type: "input",
                  answer: ["21"],
                  hint: "Помножте 7 на 3.",
                },
              ],
            },
            {
              id: "geometry_basics",
              name: "Основи геометрії",
              tasks: [
                {
                  id: "t1",
                  question: "Скільки кутів має трикутник?",
                  type: "choice",
                  options: ["2", "3", "4", "5"],
                  answer: ["3"],
                  hint: "Трикутник має три кути.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "7",
      name: "7 клас",
      subjects: [
        {
          id: "algebra",
          name: "Алгебра",
          topics: [
            {
              id: "linear_eq",
              name: "Лінійні рівняння",
              tasks: [
                {
                  id: "t1",
                  question: "Розв'яжіть: 2x + 3 = 7",
                  type: "input",
                  answer: ["2"],
                  hint: "Відніміть 3 і поділіть на 2.",
                },
                {
                  id: "t2",
                  question: "Розв'яжіть: x - 5 = 10",
                  type: "input",
                  answer: ["15"],
                  hint: "Додайте 5 до обох частин.",
                },
                {
                  id: "t3",
                  question: "Чи правильне рівняння 3x = 9 при x=3?",
                  type: "choice",
                  options: ["Так", "Ні"],
                  answer: ["Так"],
                  hint: "Підставте 3 замість x.",
                },
              ],
            },
            {
              id: "powers",
              name: "Степінь з натуральним показником",
              tasks: [
                {
                  id: "t1",
                  question: "Обчисліть: 3²",
                  type: "input",
                  answer: ["9"],
                  hint: "3 в квадраті = 3 × 3.",
                },
              ],
            },
            {
              id: "polynomials",
              name: "Многочлени",
              tasks: [
                {
                  id: "t1",
                  question: "Що таке многочлен?",
                  type: "choice",
                  options: [
                    "Число",
                    "Вираз із багатьох доданків",
                    "Рівняння",
                  ],
                  answer: ["Вираз із багатьох доданків"],
                  hint: "Многочлен - це сума кількох членів.",
                },
              ],
            },
            {
              id: "formulas",
              name: "Формули скороченого множення",
              tasks: [
                {
                  id: "t1",
                  question: "Розкрийте дужки: (a + b)² = ?",
                  type: "choice",
                  options: [
                    "a² + 2ab + b²",
                    "a² - 2ab + b²",
                    "a² + b²",
                  ],
                  answer: ["a² + 2ab + b²"],
                  hint: "Це формула квадрата суми.",
                },
              ],
            },
          ],
        },
        {
          id: "geometry",
          name: "Геометрія",
          topics: [
            {
              id: "triangles",
              name: "Трикутники",
              tasks: [
                {
                  id: "t1",
                  question: "Сума кутів трикутника дорівнює ...?",
                  type: "choice",
                  options: ["90°", "180°", "360°"],
                  answer: ["180°"],
                  hint: "Істина для будь-якого трикутника.",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const pageIds = ["home","subject","topic","task"];

  let selectedClass = null;
  let selectedSubject = null;
  let selectedTopic = null;
  let taskIndex = 0;
  let score = {correct:0, total:0};
  let taskResult = null;

  const homeEl = document.getElementById("home");
  const subjectEl = document.getElementById("subject");
  const topicEl = document.getElementById("topic");
  const taskEl = document.getElementById("task");

  const classButtonsEl = document.getElementById("classButtons");
  const subjectButtonsEl = document.getElementById("subjectButtons");
  const topicButtonsEl = document.getElementById("topicButtons");
  const taskCardEl = document.getElementById("taskCard");
  const scoreEl = document.getElementById("score");

  const subjectTitleEl = document.getElementById("subjectTitle");
  const topicTitleEl = document.getElementById("topicTitle");
  const taskTopicNameEl = document.getElementById("taskTopicName");

  document.getElementById("backToClass").onclick = () => {
    selectedClass = null;
    selectedSubject = null;
    selectedTopic = null;
    taskIndex = 0;
    score = {correct:0, total:0};
    taskResult = null;
    showPage("home");
  };
  document.getElementById("backToSubject").onclick = () => {
    selectedSubject = null;
    selectedTopic = null;
    taskIndex = 0;
    score = {correct:0, total:0};
    taskResult = null;
    showPage("subject");
  };
  document.getElementById("backToTopic").onclick = () => {
    selectedTopic = null;
    taskIndex = 0;
    score = {correct:0, total:0};
    taskResult = null;
    showPage("topic");
  };

  function showPage(id) {
    pageIds.forEach(pid => {
      const el = document.getElementById(pid);
      if(pid === id) {
        el.classList.remove("hidden");
        setTimeout(() => el.classList.add("active"), 10);
      } else {
        el.classList.add("hidden");
        el.classList.remove("active");
      }
    });
  }

  function renderClassButtons() {
    classButtonsEl.innerHTML = "";
    data.classes.forEach(cls => {
      const btn = document.createElement("button");
      btn.textContent = cls.name;
      btn.className = "bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-4 text-xl shadow-md transition";
      btn.onclick = () => {
        selectedClass = cls;
        renderSubjectPage();
        showPage("subject");
      };
      classButtonsEl.appendChild(btn);
    });
  }

  function renderSubjectPage() {
    subjectTitleEl.textContent = selectedClass.name;
    subjectButtonsEl.innerHTML = "";
    selectedClass.subjects.forEach(subj => {
      const btn = document.createElement("button");
      btn.textContent = subj.name;
      btn.className = "rounded-2xl bg-indigo-500 text-white text-lg py-4 shadow hover:bg-indigo-600 transition w-full";
      btn.onclick = () => {
        selectedSubject = subj;
        renderTopicPage();
        showPage("topic");
      };
      subjectButtonsEl.appendChild(btn);
    });
  }

  function renderTopicPage() {
    topicTitleEl.textContent = `${selectedClass.name} — ${selectedSubject.name}`;
    topicButtonsEl.innerHTML = "";
    selectedSubject.topics.forEach(topic => {
      const btn = document.createElement("button");
      btn.className = "flex items-center gap-3 rounded-lg border border-indigo-300 p-5 hover:shadow-md transition shadow-sm bg-white w-full";
      btn.onclick = () => {
        selectedTopic = topic;
        taskIndex = 0;
        score = {correct:0, total:0};
        taskResult = null;
        renderTaskPage();
        showPage("task");
      };
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-book-open text-indigo-600" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h20v18H2z"/></svg>
        <span class="text-lg">${topic.name}</span>
      `;
      topicButtonsEl.appendChild(btn);
    });
  }

  function renderTaskPage() {
    if (!selectedTopic || !selectedTopic.tasks || taskIndex >= selectedTopic.tasks.length) {
      taskCardEl.innerHTML = `<p class="text-gray-700 text-center text-lg py-6">Завдання закінчились 🎉</p>
      <button id="backToTopicsAfterFinish" class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-3 font-semibold transition w-full max-w-xs mx-auto block">
        Назад до тем
      </button>`;
      document.getElementById("backToTopicsAfterFinish").onclick = () => {
        showPage("topic");
      };
      scoreEl.textContent = `Вирішено правильно: ${score.correct} з ${score.total}`;
      taskTopicNameEl.textContent = selectedTopic.name;
      return;
    }

    const task = selectedTopic.tasks[taskIndex];
    taskResult = null;
    taskTopicNameEl.textContent = selectedTopic.name;
    scoreEl.textContent = `Вирішено правильно: ${score.correct} з ${score.total}`;

    let html = `<p class="text-lg mb-4 font-medium">${task.question}</p>`;

    if (task.type === "input") {
      html += `<input type="text" id="answerInput" 
        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4" 
        placeholder="Введіть відповідь"
        aria-label="Введіть відповідь"
      />`;
    } else if (task.type === "choice") {
      html += '<div id="choiceOptions" class="flex flex-col gap-3 mb-4">';
      task.options.forEach(option => {
        html += `
          <label class="cursor-pointer flex items-center gap-3 p-3 border rounded-lg transition-colors select-none hover:bg-indigo-50">
            <input type="radio" name="answer" value="${option}" class="sr-only" />
            <span>${option}</span>
          </label>`;
      });
      html += '</div>';
    }
    html += `<button id="checkBtn" class="rounded-lg px-6 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition w-full max-w-xs">
      Перевірити
    </button>`;

    html += `<div id="feedback" class="mt-4"></div>`;

    taskCardEl.innerHTML = html;

    bindTaskEvents();
  }

  function bindTaskEvents() {
    const checkBtn = document.getElementById("checkBtn");
    const feedbackEl = document.getElementById("feedback");

    checkBtn.onclick = () => {
      let userAnswer = "";
      const task = selectedTopic.tasks[taskIndex];
      if (task.type === "input") {
        const input = document.getElementById("answerInput");
        userAnswer = input.value.trim().toLowerCase();
        if (!userAnswer) {
          alert("Будь ласка, введіть відповідь.");
          return;
        }
      } else if (task.type === "choice") {
        const optionEls = document.querySelectorAll('input[name="answer"]');
        const checked = Array.from(optionEls).find(o => o.checked);
        if (!checked) {
          alert("Будь ласка, оберіть варіант відповіді.");
          return;
        }
        userAnswer = checked.value.trim().toLowerCase();
      }

      const correctAnswers = task.answer.map(a => a.toLowerCase());

      if (correctAnswers.includes(userAnswer)) {
        taskResult = true;
        score.correct++;
        score.total++;
        feedbackEl.innerHTML = `
          <div class="p-4 rounded-lg bg-green-100 text-green-700 flex items-center gap-2 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-check-circle-2" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
            Чудово! Правильно 🎉
          </div>
          <button id="nextTaskBtn" class="mt-3 bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2 text-white font-semibold transition w-full max-w-xs">
            Наступне завдання
          </button>
        `;
        disableInputs(true);
        document.getElementById("nextTaskBtn").onclick = () => {
          taskIndex++;
          taskResult = null;
          renderTaskPage();
        };
      } else {
        taskResult = false;
        score.total++;
        feedbackEl.innerHTML = `
          <div class="p-4 rounded-lg bg-red-100 text-red-700 font-semibold">
            <div class="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-repeat" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/></svg>
              Спробуй ще раз
              <button id="toggleHintBtn" class="ml-auto inline-flex items-center gap-1 text-indigo-600 hover:underline focus:outline-none" aria-expanded="false">
                Показати підказку
                <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-info" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
              </button>
            </div>
            <p id="hintText" class="text-sm mt-2 bg-indigo-50 p-3 rounded hidden">
              ${task.hint}
            </p>
          </div>
        `;
        disableInputs(false);
        document.getElementById("toggleHintBtn").onclick = () => {
          const hintText = document.getElementById("hintText");
          const expanded = document.getElementById("toggleHintBtn").getAttribute("aria-expanded") === "true";
          if (expanded) {
            hintText.classList.add("hidden");
            document.getElementById("toggleHintBtn").setAttribute("aria-expanded", "false");
          } else {
            hintText.classList.remove("hidden");
            document.getElementById("toggleHintBtn").setAttribute("aria-expanded", "true");
          }
        };
      }
      updateScoreUI();
    };
  }

  function disableInputs(state) {
    const task = selectedTopic.tasks[taskIndex];
    if(task.type === "input") {
      document.getElementById("answerInput").disabled = state;
    } else if(task.type === "choice") {
      const radios = document.querySelectorAll('input[name="answer"]');
      radios.forEach(r => r.disabled = state);
    }
    document.getElementById("checkBtn").disabled = state;
  }

  function updateScoreUI() {
    scoreEl.textContent = `Вирішено правильно: ${score.correct} з ${score.total}`;
  }

  renderClassButtons();
  showPage("home");
