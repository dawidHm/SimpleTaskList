{
   let tasksList = [];

   let hideDoneTasks = false;

   const addNewTask = (newTaskContent) => {
      tasksList = [
         ...tasksList,
         { content: newTaskContent, done: false },
      ];

      render();
   };

   const removeTask = (taskIndex) => {
      tasksList = [
         ...tasksList.slice(0, taskIndex),
         ...tasksList.slice(taskIndex + 1),
      ];

      render();
   };

   const toggleTaskDone = (taskIndex) => {
      tasksList = [
         ...tasksList.slice(0, taskIndex),
         { ...tasksList[taskIndex], done: !tasksList[taskIndex].done },
         ...tasksList.slice(taskIndex + 1),
      ];

      render();
   };

   const allTasksDone = () => {
      tasksList = tasksList.map((task) => ({
         ...task,
         done: true,
      }));

      render();
   };

   const toggleHideDoneTasks = () => {
      hideDoneTasks = !hideDoneTasks;

      render();
   };

   const bindEvents = () => {
      const removeButtons = document.querySelectorAll(".js-remove");

      removeButtons.forEach((removeButton, index) => {
         removeButton.addEventListener("click", () => {
            removeTask(index);
         });
      });

      const toggleDoneButtons = document.querySelectorAll(".js-done");

      toggleDoneButtons.forEach((toggleDoneButton, index) => {
         toggleDoneButton.addEventListener("click", () => {
            toggleTaskDone(index);
         });
      });

      const doneAllButton = document.querySelectorAll(".js-doneAllButton")

      doneAllButton.forEach((doneAll, index) => {
         doneAll.addEventListener("click", () => {
            allTasksDone(index);
         });
      });

      const toggleHideAllDone = document.querySelectorAll(".js-hideAllDoneButton");

      toggleHideAllDone.forEach((hideAllDoneButton, index) => {
         hideAllDoneButton.addEventListener("click", () => {
            toggleHideDoneTasks(index);
         });
      });

   };

   const renderTasks = () => {
      let taskListHTMLContent = "";

      for (const singleTask of tasksList) {
         taskListHTMLContent += `
         <li class="tasksList__item${(singleTask.done && hideDoneTasks) ? "--hidden" : ""}">
            <button class="tasksList__button tasksList__button--toggleDone js-done">
               ${singleTask.done ? " ✔" : ""}
            </button>
            <div class="tasksList__itemContent tasksList__itemContent${singleTask.done ? "--done" : ""}">${singleTask.content}</div>
            <button class="tasksList__button tasksList__button--remove js-remove">🗑</button>
         </li>`;
      }

      document.querySelector(".js-tasksList").innerHTML = taskListHTMLContent;
   };

   const renderButtons = () => {
      // tasksListIsEmpty ?
      const hideFilterButtons = () => {
         if (!tasksList || !tasksList.length) {
            return true;
         }
      };

      let filterButtonsHTMLContent = "";

      if (hideFilterButtons()) {
         filterButtonsHTMLContent += ``;
         document.querySelector(".js-filterButtons").innerHTML = filterButtonsHTMLContent;
         return;
      }

      filterButtonsHTMLContent += `
             <button class="section__filterButton js-hideAllDoneButton">${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}</button>
             <button class="section__filterButton js-doneAllButton" ${tasksList.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>`;

      document.querySelector(".js-filterButtons").innerHTML = filterButtonsHTMLContent;
   };

   const render = () => {
      renderTasks();
      renderButtons();

      bindEvents();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const addNewTaskElement = document.querySelector(".js-addNewTask");
      const newTaskContent = addNewTaskElement.value.trim();

      if (newTaskContent === "") {
         addNewTaskElement.focus();
      } else {
         addNewTask(newTaskContent);
         addNewTaskElement.value = "";
      }

      addNewTaskElement.focus();
   };

   const init = () => {
      render();

      const form = document.querySelector(".js-form");

      form.addEventListener("submit", onFormSubmit);
   };

   init();
}