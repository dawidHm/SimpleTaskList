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

   const render = () => {
      let htmlString = "";

      for (const singleTask of tasksList) {
         htmlString += `<li${singleTask.done ? " style=\"text-decoration: line-through\"" : ""}>
			<button class="js-remove">x</button> ${singleTask.content}
         <button class="js-done">✔</button></li>`;
         
      }

      //rendering
      document.querySelector(".js-tasksList").innerHTML = htmlString;

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