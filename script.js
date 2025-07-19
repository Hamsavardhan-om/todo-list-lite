document.addEventListener('DOMContentLoaded', () => 
{
  const todoInput = document.querySelector('#todo-input');
  const addTaskButton = document.querySelector('#add-task-btn');
  const todoList = document.querySelector('#todo-list');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

  for(let i=0;i<tasks.length;i++)
    renderTask(tasks[i]);

  addTaskButton.addEventListener('click', () =>
  {
    let taskText = todoInput.value.trim();

    if(taskText === "")
      return;

    let newTask = 
    {
      ID: Date.now(),
      Text: taskText,
      completed: false
    }

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = "";
  })

  function renderTask(task)
  {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.ID);

    if(task.completed)
      li.classList.add('completed');

    const span = document.createElement("span");
    const button = document.createElement("button");
    span.textContent = task.Text;
    button.textContent = 'Delete';
    li.appendChild(span);
    li.appendChild(button);

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); 
      tasks = tasks.filter((t) => t.ID !== task.ID);
      li.remove();
      saveTasks();
    });


    todoList.appendChild(li);
  }

  function saveTasks() 
  {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
})