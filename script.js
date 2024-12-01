document.addEventListener('DOMContentLoaded', () => {
    const taskItem = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("itemToDo")) || [];
    
    tasks.forEach((task) => {renderTask(task)});

    addBtn.addEventListener('click', () =>{
        let input = taskItem.value.trim();
        if (input === '') return;

        const newTask = {
            id : Date.now(),
            text : input,
            completed : false
        }

        tasks.push(newTask);
        taskItem.value = '';  //Clears the input block
        storeTasks();
        renderTask(newTask);
        //console.log(tasks);
    })



    function storeTasks(){
        localStorage.setItem("itemToDo" , JSON.stringify(tasks));
    }

    function renderTask(task){
        //console.log(task);
        const li = document.createElement('li');
        li.setAttribute("data-id", task.id);
        li.innerHTML = `
        <span> ${task.text}</span>
        <button> delete </delete>`;
        todoList.appendChild(li);

        li.addEventListener('click', function(e){
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            storeTasks();
        })

        li.querySelector('button').addEventListener('click', function(){
            tasks = tasks.filter(function(t){ return t.id === task.id; });
            li.remove();
            storeTasks;
        })
    }
})