const allTags = [
  "🏠 Дом", // Домашние дела, уборка, ремонт
  "💼 Работа", // Рабочие задачи, проекты, встречи
  "🎓 Учёба", // Обучение, курсы, домашние задания
  "👨‍👩‍👧‍👦 Семья", // Семейные дела, дети, родители
  "👥 Личное", // Личные дела, саморазвитие
  "🛒 Покупки", // Шоппинг, продукты, быт
  "🏥 Здоровье", // Врачи, спорт, лекарства
];

let tasks = [];
// Для тестирования
function initializeTestData() {
  tasks = [
    {
      id: 0,
      text: "Купить молоко",
      completed: false,
      tags: "Дом",
    },
    {
      id: 1,
      text: "Выполнить тестовое задание",
      completed: false,
      tags: "Работа",
    },
  ];
}
let nextId = 2;

// DOM
const inputTask = document.querySelector(".content__input");
const btnAddTask = document.querySelector(".content__btn");
const btnDelTask = document.querySelector(".del-button");
const listTasks = document.querySelector(".list");

// addEventListener
btnAddTask.addEventListener("click", addTask);
inputTask.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    addTask();
  }
});

// Добавление задачи
function addTask() {
  if (inputTask.value.trim() != "") {
    tasks.push({
      id: nextId,
      text: inputTask.value,
      completed: false,
      tags: allTags[0],
    });

    nextId++;
    inputTask.value = "";
    console.log(`Задача ${inputTask.value} добавлена`);
    renderTasks();
  } else {
    console.log(`Ошибка! inputTask.value: ${inputTask.value}`);
    alert("Введите задачу");
  }
}
// Удаление задачи
function delTask(taskId) {
  console.log("Пытаемся удалить задачу с ID:", taskId);

  const taskIndex = tasks.findIndex((task) => task.id == taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    renderTasks();
    console.log(`Задача с индексом ${taskIndex} удалена`);
  } else {
    console.log(`Задача с индексом ${taskIndex} не найдена`);
  }
}

function toggleTaskCompletion(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id == taskId);

  if (taskIndex != -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
    console.log(
      `Задача с индексом ${taskIndex} имеет статус: ${tasks[taskIndex].completed}`
    );
  }
}

function updateTaskTag(taskId, valueTag) {
  const taskIndex = tasks.findIndex((task) => task.id == taskId);
  if (taskIndex != -1) {
    tasks[taskIndex].tags = valueTag;
    console.log(tasks);
  }
}

// Создание HTML элементов для задачи
function createTaskElement(task) {
  // li
  const li = document.createElement("li");
  li.classList.add("task");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("click", function () {
    toggleTaskCompletion(task.id);
  });
  li.appendChild(checkbox);

  // title
  const title = document.createElement("h4");
  title.textContent = task.text;
  li.appendChild(title);
  if (task.completed == true) {
    title.style = "text-decoration: line-through";
  } else {
    title.style = "text-decoration: none";
  }

  // divSettins
  const divSettins = document.createElement("div");
  divSettins.classList.add("tasks-container__settins");
  li.appendChild(divSettins);

  // Button delete
  const del = document.createElement("button");
  del.classList.add("del-button");
  del.addEventListener("click", function () {
    delTask(task.id);
  });
  divSettins.appendChild(del);

  // Select
  const selectTag = document.createElement("select");
  selectTag.classList.add("tag");
  selectTag.addEventListener("change", function () {
    updateTaskTag(task.id, this.value);
  });
  divSettins.appendChild(selectTag);

  allTags.forEach((tagName) => {
    const option = document.createElement("option");
    option.value = tagName;
    option.textContent = tagName;

    if (task.tags == tagName) {
      option.selected = true;
    }

    selectTag.appendChild(option);
  });

  return li;
}

// Добавление в HTML элементов задачи
function renderTasks() {
  listTasks.innerHTML = "";

  for (task of tasks) {
    const taskElement = createTaskElement(task);
    listTasks.appendChild(taskElement);
  }
}

initializeTestData();
renderTasks();
