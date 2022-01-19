{
   const tasksList = [
      {
         content: "sample task 1",
         done: true,
      },
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
      let htmlString = "";

      for (const singleTask of tasksList) {
         htmlString += `<li class="list__item">
			<button class="js-done list__button">${singleTask.done ? " ✔" : ""}</button>
         <div class="list__itemContent${singleTask.done ? "--done" : ""}">${singleTask.content}</div>
         <button class="js-remove list__button--remove">x</button></li>`;
      }

      document.querySelector(".js-tasksList").innerHTML = htmlString;

      bindEvents();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskContent = document.querySelector(".js-addTask").value.trim();

      if (newTaskContent === "") {
         return;
      } else {
         addNewTask(newTaskContent);
      }
   };

   const init = () => {
      render();

      const form = document.querySelector(".js-form");

      form.addEventListener("submit", onFormSubmit);
   };

   init();
}