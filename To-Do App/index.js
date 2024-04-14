console.log("Welcome to my todo app")

let todos = [];

let todoDataList = document.getElementById('todo-data-list');
let saveButton = document.getElementById('save-todo');
let todoInputBar = document.getElementById('todo-input-bar');
let getPendingTodosButton = document.getElementById('get-todos');

getPendingTodosButton.addEventListener("click", () => {
    todos  = todos.filter((todo) => todo.status != "Finished");
    reRenderTodos(); 
})


todoInputBar.addEventListener("keyup", function toggleSavebutton() {
    let todotext = todoInputBar.value;
    if(todotext.length == 0) {
        if(saveButton.classList.contains('disabled')) return;
        saveButton.classList.add('disabled');
    }
    else if(saveButton.classList.contains('disabled')) {
        saveButton.classList.remove('disabled');
    }
})

saveButton.addEventListener("click", function getTextAndAddTodo(){
    let todotext = todoInputBar.value;
    if(todotext.length == 0) return;
    let todo = {text: todotext, status: 'In Progress', finishButtonText:"Finished"};
    todos.push(todo);
    addTodo(todo,todos.length);
    todoInputBar.value = '';
});

function reRenderTodos () {
    todoDataList.innerHTML = '';
    todos.forEach((element, idx) => {
        addTodo(element, idx+1);
    })
}


function removeTodo(event) {
    // console.log('clicked',event.target.parentElement.parentElement.parentElement);
    // event.target.parentElement.parentElement.parentElement.remove();
    let deleteButtonPressed = event.target;
    let indexToBeRemoved = Number(deleteButtonPressed.getAttribute("todo-idx"));
    todos.splice(indexToBeRemoved,1);
    reRenderTodos();
}

function finishTodo(event){
    let finishButtonPressed = event.target;
    let indexToBeFinished = Number(finishButtonPressed.getAttribute("todo-idx"));
    
    // toggle 
    if(todos[indexToBeFinished].status == "Finished"){
        todos[indexToBeFinished].status = "In Progress";
        todos[indexToBeFinished].finishButtonText = "Finished";
    }
    else{
        todos[indexToBeFinished].status = "Finished";
        todos[indexToBeFinished].finishButtonText = "Undo"; 
    }

    todos.sort((a,b) => {
        if(a.status == "Finished"){
            return 1;
        }
        return -1;
    })
    
    reRenderTodos();
}

function editTodo(event){
    let editButtonPressed = event.target;
    let indexToEdit = Number(editButtonPressed.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexToEdit}"]`);
    let input = document.querySelector(`input[todo-idx="${indexToEdit}"]`);
    detailDiv.style.display= "none";
    input.type= "text";
    input.value = detailDiv.textContent;
}

function saveEdittedTodo(event) {
    let input = event.target;
    let indexToEdit = Number(input.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexToEdit}"]`);
    
    if(event.keyCode == 13) {
        detailDiv.textContent = input.value;
        detailDiv.style.display="block";
        input.value = '';
        input.type="hidden";
    }
}

function addTodo(todo,todoCount) {
    let rowdiv = document.createElement("div");
    let todoItems = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoActions = document.createElement("div");
    let deleteButton = document.createElement("button");
    let finishedButton = document.createElement("button");
    let editButton = document.createElement("button");
    let hiddenInput = document.createElement("input");
    let hr = document.createElement("hr");

    // adding classes

    rowdiv.classList.add("row");
    todoItems.classList.add("todo-items", "d-flex", "flex-row", "justify-content-between", "align-items-center");    
    todoNumber.classList.add("todo-no");
    todoItem.classList.add("todo-item", "text-muted");
    todoStatus.classList.add("todo-status", "text-muted");
    todoActions.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2");
    deleteButton.classList.add("btn", "btn-danger", "delete-todo");
    finishedButton.classList.add("btn","btn-success", "finished-todo"); 
    editButton.classList.add("btn", "btn-warning", "edit-todo");
    hiddenInput.classList.add("form-control","todo-item");

    //adding attributes
    finishedButton.setAttribute("todo-idx",todoCount-1);
    deleteButton.setAttribute("todo-idx", todoCount-1);
    editButton.setAttribute("todo-idx", todoCount-1);
    todoItem.setAttribute("todo-idx", todoCount -1);
    hiddenInput.setAttribute("todo-idx", todoCount -1);
    hiddenInput.type = "hidden";

    //adding click listeners
    deleteButton.onclick = removeTodo;
    finishedButton.onclick = finishTodo;
    editButton.onclick = editTodo;
    hiddenInput.addEventListener("keypress", saveEdittedTodo);

    todoNumber.textContent = `${todoCount}.`;
    todoItem.textContent = todo.text; // sets the todo text sent from the input element
    todoStatus.textContent = todo.status;
    deleteButton.textContent = "Delete";
    finishedButton.textContent = todo.finishButtonText;
    editButton.textContent = "Edit";

    // creating the div on dom
    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);
    todoActions.appendChild(editButton);

    todoItems.appendChild(todoNumber);
    todoItems.appendChild(todoItem);
    todoItems.appendChild(hiddenInput);
    todoItems.appendChild(todoStatus);
    todoItems.appendChild(todoActions);

    rowdiv.appendChild(todoItems);
    rowdiv.appendChild(hr);

    todoDataList.appendChild(rowdiv);

}





























// let getTodosButton = document.getElementById('get-todos');

// registration of event listener

// getTodosButton.addEventListener("click", () => {
//     console.log("clicked");
// });

// different ways to add events

// getTodosButton.onclick = () => {
//     console.log('clicked');
// }

