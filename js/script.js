{
    const tasksList = [
        {
            content: "sample task 1",
            done: true,
        },
    ]; 

    const render = () => {
        let htmlString = "";

        for(const singleTask of tasksList) {
            htmlString += `<li${singleTask.done ? " style=\"text-decoration: line-through\"" : ""}>${singleTask.content}</li>`;
        }

        document.querySelector(".js-tasksList").innerHTML = htmlString;
    };

    const addNewTask = (newTaskContent) => {
        tasksList.push(
            {
            content: newTaskContent,
            done: false,
            }
        );

        render();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-addTask").value.trim();
        
        if (newTaskContent === "") {
            return;
        } else {
            addNewTask(newTaskContent);
        }

    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}