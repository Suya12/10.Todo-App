window.addEventListener("load" , function() {
    const backgroundDiv = this.document.querySelector(".background");
    const container = backgroundDiv.querySelector(".container");
    const header = container.querySelector(".header");

    const currentMode = this.localStorage.getItem('colorMode')||'light-mode';
    backgroundDiv.classList.add(currentMode);

    const lightImage = header.querySelector(".light-image");
    
    const todoInput = container.querySelector(".input-div").querySelector(".todo-input");
    const todoList = container.querySelector(".todo-list");
    

    //light - dark mode change function
    header.addEventListener('click', function() {
        if(backgroundDiv.classList.contains('light-mode')) {
            backgroundDiv.classList.remove('light-mode');
            backgroundDiv.classList.add('dark-mode');
            todoInput.classList.remove('light-mode');
            todoInput.classList.add('dark-mode');
            todoList.classList.remove('light-mode')
            todoList.classList.add('dark-mode');

            const todoItem  = todoList.querySelectorAll(".todo-item");
            for(var i = 0; i < todoItem.length; i++) {
                todoItem[i].classList.remove('light-mode')
                todoItem[i].classList.add('dark-mode');
            }

            lightImage.src="images/icon-moon.svg";
            backgroundDiv.style.backgroundImage= "url('images/bg-desktop-dark.jpg')";
            localStorage.setItem('colorMode', 'dark-mode');
        } else {
            backgroundDiv.classList.remove('dark-mode');
            backgroundDiv.classList.add('light-mode');
            todoInput.classList.remove('dark-mode');
            todoInput.classList.add('light-mode');
            todoList.classList.remove('dark-mode');
            todoList.classList.add('light-mode');

            const todoItem  = todoList.querySelectorAll(".todo-item");
            
            for(var i = 0; i < todoItem.length; i++) {
                todoItem[i].classList.remove('dark-mode');
                todoItem[i].classList.add('light-mode');
            }

            lightImage.src="images/icon-sun.svg";
            backgroundDiv.style.backgroundImage= "url('images/bg-desktop-light.jpg')";
            localStorage.setItem('colorMode', 'light-mode');
        }
    });

});

window.addEventListener("load" , function() {
    const backgroundDiv = this.document.querySelector(".background");
    const container = backgroundDiv.querySelector(".container");

    const todoInput = container.querySelector(".input-div").querySelector(".todo-input");

    const todoList = container.querySelector(".todo-list");


    //----------------------All check---------------------------

    const allCheckButton = container.querySelector(".Convenience").querySelector(".select-div").querySelector(".all-check");
    const allActiveButton =container.querySelector(".Convenience").querySelector(".select-div").querySelector(".all-active");
    
    allCheckButton.onclick = function () {
        const todoItems = todoList.querySelectorAll(".todo-item");
        todoItems.forEach( item => {
            const checkbox = item.querySelector("input");
            if(checkbox.checked == false)
                checkbox.checked = true;
        });
    }

    allActiveButton.onclick = function () {
        const todoItems = todoList.querySelectorAll(".todo-item");
        todoItems.forEach( item => {
            const checkbox = item.querySelector("input");
            if(checkbox.checked == true)
                checkbox.checked = false;
        });
    }

    // ----------------------clear ----------------------------
    const clearButton = container.querySelector(".Convenience").querySelector(".clear-checked-div");
    clearButton.onclick = function () {
        const todoItems = todoList.querySelectorAll(".todo-item");
        todoItems.forEach( item => {
            const checkbox = item.querySelector("input");
            if(checkbox.checked) {
                item.remove();
                const count = container.querySelector("#item-count");
                count.innerHTML = todoList.querySelectorAll(".todo-item").length + " ";
            }
        });
    };  


    // ---------------------Insert todoItem!----------------------------- 

    todoInput.addEventListener("keydown", function(event) {
        if(event.key === 'Enter') { //엔터 키 눌렀을 때.
            const todoText = todoInput.value.trim();
            if(todoText !== "") { // 빈 공백이 아니라면.
                const todoItem = document.createElement("div");
                todoItem.className = "todo-item";
                todoItem.draggable = "true";
                if(todoList.className === "todo-list dark-mode") {
                    console.log("dark!");
                    todoItem.className = "todo-item dark-mode";
                }
                
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";

                const span = document.createElement("span");
                span.textContent = todoText;

                todoItem.appendChild(checkbox);
                todoItem.appendChild(span);

                todoList.appendChild(todoItem);

                todoInput.value = ""; //입력 필드 초기화.
                todoList.scrollTop = todoList.scrollHeight; //스크롤 아래로.
                const count = container.querySelector("#item-count");
            
                count.innerHTML = todoList.querySelectorAll(".todo-item").length + " ";


                checkbox.addEventListener("change" , function() {
                    if(checkbox.checked) {
                        span.style.textDecoration = "line-through";
                        span.style.opacity = 0.5;
                    } else {
                        span.style.textDecoration = "none";
                        span.style.opacity = 1;
                    }
                });
            }
        }
    });


    //-------------------drag event--------------------------------

    todoList.addEventListener("dragstart", function(event) {
        if (event.target.classList.contains('todo-item')) {
            event.target.classList.add('dragging');
        }
    });

    todoList.addEventListener("dragend", function(event) {
        if (event.target.classList.contains('todo-item')) {
            event.target.classList.remove('dragging');
        }
    });

    todoList.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    todoList.addEventListener("drop" , (e) => {
        e.preventDefault();
        const todoItem = this.document.querySelector(".dragging");
        if(todoItem) {
            const afterElement = getDargAfterElement(todoList, e.clientY);
            if(afterElement == null) {
                todoList.appendChild(todoItem);
            } else {
                todoList.insertBefore(todoItem, afterElement);
            }
        }
    });

    function getDargAfterElement(container , y) {
        const draggableElements = [...container.querySelectorAll('.todo-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            { offset: Number.NEGATIVE_INFINITY }).element;
    };


});