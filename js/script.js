{
   const tasksList = [

   ];

   let hideDoneTasks = false;

   const addNewTask = (newTaskContent) => {
      tasksList.push(
         {
            content: newTaskContent,
            done: false,
         }
      );

      render();
   };

   const removeTask = (taskIndex) => {
      tasksList.splice(taskIndex, 1);
      render();
   };

   const toggleTaskDone = (taskIndex) => {
      tasksList[taskIndex].done = !tasksList[taskIndex].done;
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

   };

   const renderTasks = () => {
      let taskListHTMLContent = "";

      for (const singleTask of tasksList) {
         taskListHTMLContent += `
         <li class="tasksList__item${hideDoneTasks ? " tasksList__item--hidden" : ""} js-tasks-item">
			   <button class="tasksList__button tasksList__button--toggleDone js-done">
               ${singleTask.done ? " ✔" : ""}
            </button>
            <div class="tasksList__itemContent tasksList__itemContent${singleTask.done ? "--done" : ""}">${singleTask.content}</div>
            <button class="tasksList__button tasksList__button--remove js-remove">
               <img src="images/deleteBin16.png" class="tasksList__removeIcon">
            </button>
         </li>`;
      }

      document.querySelector(".js-tasksList").innerHTML = taskListHTMLContent;

   };

   // tasksListIsEmpty ?
   const hideFilterButtons = () => {
      if (!tasksList || !tasksList.length) {
         return true;
      }
      return false;
   };


   const renderButtons = () => {
      let filterButtonsHTMLContent = "";

      if (hideFilterButtons()) {
         document.querySelector(".js-filterButtons").innerHTML = filterButtonsHTMLContent;
         return true;
      }
      filterButtonsHTMLContent += `
         <button class="section__filterButton js-hideDoneButton">Ukryj ukończone</button>
         <button class="section__filterButton js-doneAllButton">Ukończ wszystkie</button>`;

      document.querySelector(".js-filterButtons").innerHTML = filterButtonsHTMLContent;

   };



   const bindButtonsEvents = () => {
      const hideDoneButton = document.querySelector(".js-hideDoneButton");
      const singleTaskElement = document.querySelector(".js-tasksItem");


      if (!hideFilterButtons()) {
         hideDoneButton.addEventListener("click", () => {
            if (hideDoneTasks === false) {
               hideDoneTasks = true;
               console.log(`hideDoneTasks = ${hideDoneTasks}`)
            } else {
               hideDoneTasks = false;
               console.log(`hideDoneTasks = ${hideDoneTasks}`)
            }
         })

      }



   };

   const render = () => {
      renderTasks();
      renderButtons();

      bindButtonsEvents();
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