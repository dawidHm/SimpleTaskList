{
   const tasksList = [

   ];

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
   }

   const toggleTaskDone = (taskIndex) => {
      tasksList[taskIndex].done = !tasksList[taskIndex].done;
      render();
   }

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

   }

   const render = () => {
      let taskListHTMLContent = "";

      for (const singleTask of tasksList) {
         taskListHTMLContent += `
         <li class="tasksList__item">
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

      bindEvents();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskElement = document.querySelector(".js-newTask");
      const newTaskContent = newTaskElement.value.trim();
 
      if (newTaskContent === "") {
         return;
      } else {
         addNewTask(newTaskContent);
         newTaskElement.value = "";
      }

      newTaskElement.focus();
   };

   const init = () => {
      render();

      const form = document.querySelector(".js-form");

      form.addEventListener("submit", onFormSubmit);
   };

   init();
}