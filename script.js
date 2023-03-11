const nav = document.querySelector('.nav')
const displayDate = document.querySelector('.date')
const addTaskCta = document.querySelector('.add-task-cta')
const taskPage = document.querySelector('.create-content')
const overlay = document.querySelector('.overlay')
const activeTaskContainer = document.querySelector('.active-task__container')
const tasksContainer = document.querySelector('.tasks')
const completedTaskContainer = document.querySelector('.completed-task__container')
const activeTask = document.querySelector('.active-task')
const completedTask = document.querySelector('.completed-task')
const addTaskTitle = document.querySelector('.task-title');
const addTaskDescription = document.querySelector('.task-description');
const footer = document.querySelector('footer')
const footerSm = document.querySelector('.footer__sm')
const footerLink = document.querySelectorAll('.footer-link')
const demarcation = document.querySelector('.line');
const darkModeSun = document.querySelector('.dark-mode__sun')
const darkModeMoon = document.querySelector('.dark-mode__moon')
const mobileCreateContent = document.querySelector('.add__Task--mobile')

class task {
    id = (Date.now() + '').slice(-10);
    constructor(title, description, type) {
        this.title = title;
        this.description = description
        this.type = type;
    }
}

class App {
    allTasks = []
    completedTasks = []
    constructor() {
        nav.addEventListener('click', this._navEvents.bind(this))
        footer.addEventListener('click', this._footerEvents.bind(this))
        footerSm.addEventListener('click', this._footerSmEvents.bind(this))
        addTaskCta.addEventListener('click', this._addTaskCta.bind(this))
        mobileCreateContent.addEventListener('click', this.mobileAddTaskBtn.bind(this))
        tasksContainer.addEventListener('click', this._taskContainerEvents.bind(this))
        overlay.addEventListener('click', this._hideToggleOverlay);
        this._displayActiveTasks()
        this._displayCompletedTasks()
        this._setDescription()
        this._getLocalStorage()
    }
     
    _navEvents(e) {
        e.preventDefault()
        const closest = e.target.closest('.dark-mode')
        if (closest) {
            this.darkMode()
        }
        if (e.target.classList.contains('add-content__btn')) {
            this.addTaskBtn()
        }
    }
    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let time = Date.now()
        const currentDate = new Date()
        
        setInterval(function () {
            time = time + 1000 
            const presentDate = new Date(time)
            displayDate.textContent = `${`${currentDate.getDate()}`.padStart(2, 0)} ${months[currentDate.getMonth()]}, ${currentDate.getFullYear()} 
            ${`${presentDate.getHours()}`.padStart(2, 0)}:${`${presentDate.getMinutes()}`.padStart(2, 0)}` 
        },1000)
    }
    darkMode() {
        darkModeSun.classList.toggle('hidden')
        darkModeMoon.classList.toggle('hidden')
        if (darkModeSun.classList.contains('hidden')) {
            document.querySelector('body').style.backgroundColor = 'white'
            document.querySelector('.welcome-message').style.color = 'black'
            document.querySelector('.add__Task--mobile').style.color = 'black'
            document.querySelector('.info').style.color = 'black'

        } else {
            document.querySelector('body').style.backgroundColor = 'black'
            document.querySelector('.welcome-message').style.color = 'white'
            document.querySelector('.info').style.color = 'white'
            document.querySelector('.add__Task--mobile').style.color = 'white'
        }
    }
    
    _displayToggleOverlay() {
    overlay.classList.toggle('hidden');
    }
    _hideToggleOverlay() {
        taskPage.classList.add('hidden');
        overlay.classList.toggle('hidden');
    }
    addTaskBtn() {
        taskPage.classList.toggle('hidden');
        addTaskTitle.focus();
        this._displayToggleOverlay();
    }
    mobileAddTaskBtn() {
        taskPage.classList.toggle('hidden');
        this._displayToggleOverlay();
    }
    _addTaskCta(e) {
        let newTask;
        e.preventDefault()
        if (addTaskTitle.value === '' && addTaskDescription.value === '') {
            document.querySelector('.dropdown-open').classList.remove('dropdown');
        } else {
            newTask = new task(addTaskTitle.value, addTaskDescription.value, 'active')
            this.allTasks.push(newTask)
            taskPage.classList.toggle('hidden');
            overlay.classList.toggle('hidden'); 
        }
        setTimeout(() => {
        document.querySelector('.dropdown-open').classList.add('dropdown');
        }, 10000)

        // UPDATEUI
        this.updateUI()

        addTaskTitle.value = '';
        addTaskDescription.value = ''; 
        //Set Local Storage to All Tasks
        this._setLocalStorage()
    }
    
    
    _displayActiveTasks() {
        activeTaskContainer.style.marginTop = '10px'
        activeTaskContainer.innerHTML = ''
        document.querySelector('.active-length').textContent = `${this.allTasks.length}`
        this.allTasks.forEach((task) => {
            const html = `

            <div  class=" flex justify-between items-center">
                <div >
                    <div class=" flex  gap-3 items-start   ">
                        <div class="tick  cursor-pointer" data-id = ${task.id}>&tint;</div>
                        <p class="active-title text-white align-middle">${task.title}</p>
                    </div>
                    <p class="ml-7 text-sm text-teal-700 ">${task.description}</p>
                </div>
                <div class=" active-delete__btn text-2xl cursor-pointer text-white " data-delete=${task.id}>
                    &times;
                </div>
            </div>`
        activeTaskContainer.insertAdjacentHTML('afterbegin', html)
    });
    }
    updateUI() {
        this._displayActiveTasks()
        this._displayCompletedTasks()
    }
    _displayCompletedTasks() {
        completedTaskContainer.innerHTML = '';
        document.querySelector('.completed-length').textContent = `${this.completedTasks.length}`
        this.completedTasks.forEach((task) => {
            const html = 
                `<div class="flex justify-between items-center">
                    <div>
                        <div class=" flex  gap-3 items-start">
                            <p class="completed-title  align-middle" >${task.title}</p>
                        </div>
                        <p class=" text-sm text-teal-700"   >${task.description}</p>
                    </div>
                    <div class=" completed-delete__btn text-2xl cursor-pointer text-white" data-delete=${task.id}>
                        &times;
                    </div>
                </div>`
            completedTaskContainer.insertAdjacentHTML('afterbegin', html)
        })
    }
    _taskContainerEvents(e) {
        e.preventDefault();
        if (e.target.classList.contains('active-delete__btn')) {
           this._deleteActiveTask(e)
        }
        if (e.target.classList.contains('completed-delete__btn')) {
           this._deleteCompletedTask(e)
        }
        if (e.target.classList.contains('tick')) { 
            this._moveTaskToCompleted(e);
        }
    }
    _deleteActiveTask(e) {
        const deletedIndex = this.allTasks.findIndex((task) => {
            return e.target.dataset.delete === task.id
        })
        this.allTasks.splice(deletedIndex, 1);
        this.updateUI()
        this._setLocalStorage()

    }
    _deleteCompletedTask(e, user) {
        const deletedIndex = this.completedTasks.findIndex((task) => {
            return e.target.dataset.delete === task.id
        })
        this.completedTasks.splice(deletedIndex, 1);
        this.updateUI()
        this._setLocalStorage()

    }
    _moveTaskToCompleted(e) {
        const tickedObject = this.allTasks.find((task) => {
            return e.target.dataset.id === task.id
        })
        const tickedIndex = this.allTasks.findIndex((task) => {
            return e.target.dataset.id === task.id
        })
        this.completedTasks.push(tickedObject)
        this.allTasks.splice(tickedIndex, 1);
        this.updateUI()
        this._setLocalStorage()
        
    }
    
    _footerEvents(e) {
        console.log()
        footerLink.forEach(el => {
            el.classList.remove('active-link')
        })
        e.target.classList.add('active-link')

        if (e.target.classList.contains('all-task')) {
           this.displayAllTask() 
        }
        if (e.target.classList.contains('display-active')) {
            this.displayOnlyActiveTask()
        }
        if (e.target.classList.contains('display-completed')) {
            this._displayOnlyCompletedTask()
        }
        if (e.target.classList.contains('clear-active')) {
            this._clearActive()
        }
        if (e.target.classList.contains('clear-completed')) {
            this._clearCompleted()
        }
    }
    _footerSmEvents(e) {
         if (e.target.classList.contains('clear-active__sm')) {
             this._clearActive()
             this._setLocalStorage()
        }
        if (e.target.classList.contains('clear-completed__sm')) {
            this._clearCompleted()
            this._setLocalStorage()
        }
    }
    displayAllTask() {
        completedTask.classList.remove('hidden')
        activeTask.classList.remove('hidden');
        demarcation.classList.remove('hidden');
    }
    displayOnlyActiveTask() {
        activeTask.classList.remove('hidden');
        completedTask.classList.add('hidden');
        demarcation.classList.add('hidden');

    }
    _displayOnlyCompletedTask() {
        completedTask.classList.remove('hidden')
        activeTask.classList.add('hidden')
        demarcation.classList.add('hidden');
    }
    _clearActive() {
        this.allTasks.splice(0)
        this.updateUI()
    }
    _clearCompleted() {
        this.completedTasks.splice(0)
        this.updateUI()
    }
    _setLocalStorage() {
        console.log('yeah')
        localStorage.setItem('alltask', JSON.stringify(this.allTasks))
        localStorage.setItem('completedtask', JSON.stringify(this.completedTasks))
    }
    _getLocalStorage() {
        const allData = JSON.parse(localStorage.getItem('alltask'))
        if (!allData) return;
        const completedData = JSON.parse(localStorage.getItem('completedtask'))
        this.allTasks = allData
        this.completedTasks = completedData

        // UPDATE UI
        this.updateUI()
    }
}
new App()


