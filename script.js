class TaskManager {
    constructor() {
        if (TaskManager.instance) {
            return TaskManager.instance;
        }
        this.tasks = [];
        TaskManager.instance = this;
    }

    
    addTask(task) {
        this.tasks.push(task);
        this.renderTasks();
    }

   
    removeTask(index) {
        this.tasks.splice(index, 1);
        this.renderTasks();
    }

    
    completeTask(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.renderTasks();
    }

    
    renderTasks() {
        const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
        taskTable.innerHTML = ''; 

        this.tasks.forEach((task, index) => {
            const newRow = taskTable.insertRow();

            const nameCell = newRow.insertCell(0);
            const deadlineCell = newRow.insertCell(1);
            const statusCell = newRow.insertCell(2);
            const actionCell = newRow.insertCell(3);

            nameCell.innerHTML = task.name;
            deadlineCell.innerHTML = task.deadline;
            statusCell.innerHTML = task.completed ? "Completada" : "Pendiente";

            
            const completeBtn = document.createElement('button');
            completeBtn.className = 'action-btn complete';
            completeBtn.innerHTML = task.completed ? 'Desmarcar' : 'Completar';
            completeBtn.onclick = () => this.completeTask(index);

            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'action-btn';
            deleteBtn.innerHTML = 'Eliminar';
            deleteBtn.onclick = () => this.removeTask(index);

            actionCell.appendChild(completeBtn);
            actionCell.appendChild(deleteBtn);

            if (task.completed) {
                nameCell.classList.add('completed');
            }
        });
    }
}


class TaskFactory {
    static createTask(type, name, deadline) {
        switch (type) {
            case 'basic':
                return new Task(name, deadline);
            default:
                throw new Error('Tipo de tarea no reconocido');
        }
    }
}


class Task {
    constructor(name, deadline) {
        this.name = name;
        this.deadline = deadline;
        this.completed = false;
    }
}


const taskManager = new TaskManager();


const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskDeadline = document.getElementById('taskDeadline').value;

    
    const newTask = TaskFactory.createTask('basic', taskName, taskDeadline);

    
    taskManager.addTask(newTask);

    
    taskForm.reset();
});
