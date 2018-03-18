//Define UI vars
const form = document.querySelector('#task-form');//上面from
const taskInput = document.querySelector('#task');//new task input
const taskList = document.querySelector('.collection');//ul
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');//下面的filter input



loadEventListeners();

//load all events listeners
function loadEventListeners(){
    //add task event
    form.addEventListener('submit', addTask);

    //add remove event (若click在ul內的element上的event會bubble up)
    taskList.addEventListener('click',removeTask);

    //add click event
    clearBtn.addEventListener('click',clearTasks);

    //filter tasks
    filter.addEventListener('keyup',filterTasks);
}

//add task
function addTask(e){
    if(taskInput.value === ''){
        alert('add a task');
    }

    //ul要用collection
    //li用collection-item在materialize會自動套樣式
    const li = document.createElement('li');
    li.className = 'collection-item';

    //create textNode and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //create delete link
    const link = document.createElement('a');
    // 如果要在li裡面有東西靠右要用.secondary-content
    link.className='delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);
 
    //append li to ul
    taskList.appendChild(li);

    //結構 ul>li>textNode+link

    // clear input
    taskInput.value = '';

    e.preventDefault();//避免form送出
}

//remove task   
function removeTask(e){
    if(e.target.classList.contains('fa-remove')){
        if(confirm('Are you sure')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

//clear tasks
function clearTasks(){
    //將ul下的innerHTML清空
    // taskList.innerHTML='';

    //cehck ul下是否還有child,有就持續remove
    while(taskList.firstChild){
        console.log(taskList.firstChild);
        taskList.removeChild(taskList.firstChild);
    }

}


//filter tasks
function filterTasks(e){
    console.log(e.target.value);
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        console.log(task.textContent);
        //check task中是否有包含text,要轉小寫去比較
        const task_text = task.textContent;
        if(task_text.toLocaleLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });

}