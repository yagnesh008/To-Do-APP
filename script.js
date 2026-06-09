const nav = document.querySelector('.navbar');
const liv = document.querySelector('.liv');
const filter = document.querySelector('.filter');
const prio = document.querySelector('.prio');
const dash = document.querySelector('.dash');
const add = document.querySelector('.add');
const add1 = document.querySelector('.add1');
const close = document.querySelector('.close');
const newtsk1 = document.querySelector('.n1');
const newtsk2 = document.querySelector('.n2');
const newtsk3 = document.querySelector('.n3');
const newtsk4 = document.querySelector('.n4');
const srch = document.querySelectorAll('.srch');
const count = document.querySelector('.count');
const count1 = document.querySelector('.count1');
const count2 = document.querySelector('.count2');
const count3 = document.querySelector('.count3');
const count4 = document.querySelector('.count4');
const count5 = document.querySelector('.count5');
const count6 = document.querySelector('.count6');
const count7 = document.querySelector('.count7');
const count8 = document.querySelector('.cnt');
const count9 = document.querySelector('.cnt1');
const count10 = document.querySelector('.cnt2');
const logout = document.querySelector('.logout');
const yes = document.querySelector('.yes');
const no = document.querySelector('.no');
const cls = document.querySelector('.cls');
const add2 = document.querySelector('.Create'); 
const apply = document.querySelector('.appley');
const taskCol = document.querySelectorAll('.c1, .c2, .c3, .c4');
const prf = document.querySelector('.profile');



newtask = () => {
    const taskName = document.querySelector('.task-name').value;
    const date = document.querySelector('.due-date').value;
    const priority = document.querySelector('.priority').value;
    const status = document.querySelector('.status').value;
    const description = document.querySelector('.description').value;
    const email = document.querySelector('.email').value;
    

    if (taskName && date && priority && status && description && email) {
        const task = {
            name: taskName,
            dueDate: date,
            priority: priority,
            status: status,
            description: description,
            email: email
        };
        const listItem = document.createElement('li');
        listItem.draggable = true;
        listItem.innerHTML = `
            <div class="dat1">
            <h4>${task.name}</h4>
            <p>${task.description}</p>

            <div class="task-footer">
                <span class="priority-badge ${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>

                <span class="date">
                    📅 ${task.dueDate}
                </span>

                </div>
            </div>
                `;

            if(task.priority === "High"){
                listItem.classList.add("high-priority");
            }
            else if(task.priority === "Medium"){
                listItem.classList.add("medium-priority");
            }
            else{
                listItem.classList.add("low-priority");
            }
        listItem.dataset.priority = task.priority;
        listItem.dataset.status = task.status;
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({
            name: task.name
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        document.querySelector('.fom').reset();
        if(status === "To-do"){
            const list = document.querySelector('.c1 .task ul');
            list.appendChild(listItem);
        }
        else if(status === "In Progress"){
            const list = document.querySelector('.c2 .task ul');
            list.appendChild(listItem);
        }
        else if(status === "Review"){
            const list = document.querySelector('.c3 .task ul');
            list.appendChild(listItem);
        }
        else if(status === "Completed"){
            const list = document.querySelector('.c4 .task ul');
            list.appendChild(listItem);
        }
    } else {
        alert("Please fill in all fields.");
    }
};
add.addEventListener('click', function(){
    document.querySelector('.pop-up').style.display = 'block';
    dependency();
});
add1.addEventListener('click', function(){
    document.querySelector('.pop-up').style.display = 'none';
    newtask();
});
close.addEventListener('click', function(){
    document.querySelector('.pop-up').style.display = 'none';
});
document.querySelector('.sende').addEventListener('click',function(){
    sendEmail();  
})

window.addEventListener('load', () => {
    localStorage.clear();
});

function dependency(){
    const dependencySelect = document.querySelector('.dependency');
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    dependencySelect.innerHTML =
        '<option value="">Select Dependency Task</option>';

    tasks.forEach(task => {
        const option = document.createElement("option");
        option.value = task.name;
        option.textContent = task.name;
        dependencySelect.appendChild(option);
    });

}


function sendEmail() {
    const temp = {
        email: document.querySelector('.email').value,
        description: document.querySelector('.description').value,
        taskname: document.querySelector('.task-name').value,
        duedate: document.querySelector('.due-date').value,
    };

    emailjs.send("service_xmfdfqj", "template_9a35qpi", temp)
        .then(() => {
            alert("Email Sent");
        })
        .catch((err) => {
            console.error(err);
            alert("Email Not Sent");
        });
}

srch.forEach(bar => {
    bar.addEventListener('input', function () {
        const query = this.value.toLowerCase();

        const tasks = document.querySelectorAll('.task ul li');

        tasks.forEach(task => {
            const taskName = task.textContent.toLowerCase();

            if (taskName.includes(query)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    });
});

countTasks = () => {
    const todoCount = document.querySelectorAll('.c1 .task ul li').length;
    const inProgressCount = document.querySelectorAll('.c2 .task ul li').length;
    const reviewCount = document.querySelectorAll('.c3 .task ul li').length;
    const completedCount = document.querySelectorAll('.c4 .task ul li').length;
    const highPriorityCount = document.querySelectorAll('.task ul li[data-priority="High"]').length;

    const totalTasks = todoCount + inProgressCount + reviewCount + completedCount;
    const pendingTasks = todoCount + inProgressCount + reviewCount;

    count.textContent = totalTasks;
    count1.textContent = pendingTasks;
    count2.textContent = completedCount;
    count3.textContent = highPriorityCount;
    count4.textContent = todoCount;
    count5.textContent = reviewCount;
    count6.textContent = inProgressCount;
    count7.textContent = completedCount;
    const percentage = totalTasks === 0 ? 0 : ((pendingTasks / totalTasks) * 100).toFixed(1);
    count8.textContent = percentage + "% of Task";

    const percentage1 = totalTasks === 0 ? 0 : ((completedCount / totalTasks) * 100).toFixed(1);
    count9.textContent = percentage1 + "% of Task";

    const percentage2 = totalTasks === 0 ? 0 : ((highPriorityCount / totalTasks) * 100).toFixed(1);
    count10.textContent = percentage2 + "% of Task";
    
};



setInterval(countTasks, 1000);

filter.addEventListener('change', function() {
    const status = this.value;
    const tasks = document.querySelectorAll('.task ul li');

    tasks.forEach(task => {
        if (status === 'All') {
            task.style.display = '';
        } else {
            task.style.display =
                task.dataset.status === status ? '' : 'none';
        }
    });
});

prio.addEventListener('change', function() {
    const selectedPriority = this.value;
    const tasks = document.querySelectorAll('.task ul li');

    tasks.forEach(task => {
        if (selectedPriority === "priority" || task.dataset.priority === selectedPriority) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}); 


let draggedItem = null;

document.addEventListener('dragstart', (e) => {
    if (e.target.closest('li')){
        draggedItem = e.target.closest('li');
    }
});

document.addEventListener('dragend', () => {
    draggedItem = null;
});


taskCol.forEach(column => {

    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    column.addEventListener('drop', (e) => {
        e.preventDefault();

        const ul = column.querySelector('ul');

        if (draggedItem) {
            ul.appendChild(draggedItem);
        }
        if (column.closest('.c1')) {
            draggedItem.dataset.status = 'To-do';
        }
        else if (column.closest('.c2')) {
            draggedItem.dataset.status = 'In Progress';
        }
        else if (column.closest('.c3')) {
            draggedItem.dataset.status = 'Review';
        }
        else if (column.closest('.c4')) {
            draggedItem.dataset.status = 'Completed';
        }
    });

});

logout.addEventListener('click',function(){
    document.querySelector('.po-up').style.display='block';
});
yes.addEventListener('click',function(){
    window.location.href='index.html';
});
no.addEventListener('click',function(){
    document.querySelector('.po-up').style.display='none';
});

document.querySelector(".User").textContent =localStorage.getItem("user") || "Guest";

prf.addEventListener('click',function(){
    window.location.href='inx.html';
})