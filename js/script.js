{
    const tasksList = [
        {
            content: "sample task 1",
            done: false,
        },
    ]; 

    const render = () => {
        let htmlString = "";

        for(const task of tasksList) {
            htmlString += `<li>${task.content}</li>`;
        }

        document.querySelector(".js-tasksList").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };

    init();
}