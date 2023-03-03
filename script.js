const nav = document.querySelector('.nav')
// const addTaskBtn = document.querySelector('.add-content__btn')
const displayDate = document.querySelector('.date')
const main = document.querySelector('main')
const addTaskCta = document.querySelector('.add-task-cta')
const taskPage = document.querySelector('.create-content')
const overlay = document.querySelector('.overlay')
const sideBar = document.querySelector('.side-bar')
// const menuOpenBtn = document.querySelector('.hamurger-container')
const displayUsername = document.querySelector('.username-display');
const activeTaskContainer = document.querySelector('.active-task__container')
const tasksContainer = document.querySelector('.tasks')
const completedTaskContainer = document.querySelector('.completed-task__container')
const activeTask = document.querySelector('.active-task')
const completedTask = document.querySelector('.completed-task')
const addTaskTitle = document.querySelector('.task-title');
const addTaskDescription = document.querySelector('.task-description');
const input = document.querySelector('.checkers')
const footer = document.querySelector('footer')
const footerLink = document.querySelectorAll('.footer-link')
const demarcation = document.querySelector('.line');
// const checkbox = document.querySelector('.input-check__box')
// const darkMode = document.querySelector('.dark-mode')
const darkModeSun = document.querySelector('.dark-mode__sun')
const darkModeMoon = document.querySelector('.dark-mode__moon')


const user = {
    active: {
        title: ['dfshjdh', 'fxoinl'],
        description: ['dc', 'fdihnfd']
    },
    
    
    completed: {
        title: [],
        description: []
    }
};




// let time = Date.now()
// setInterval(function () {
//     time++  
//     console.log(currentDate.getMilliseconds())
//     const presentDate = new Date(time)
//     console.log(presentDate.getMilliseconds())
// },1000)
    // document.querySelector('.welcome-message').style.color = 'white'

//EVENT LISTENERS

class App {
    constructor(user) {
        nav.addEventListener('click', this._navEvents.bind(this))
        footer.addEventListener('click', this._footerEvents.bind(this))
        addTaskCta.addEventListener('click', this._addTaskCta.bind(this))
        tasksContainer.addEventListener('click', this._taskContainerEvents.bind(this))
        overlay.addEventListener('click', this._toggleOverlay);
        this._displayActiveTasks(user)
        this._displayCompletedTasks(user)
        this._setDescription()
    }
     
    _navEvents(e) {
        e.preventDefault()
        const closest = e.target.closest('.dark-mode')
        if (closest) {
            this.darkMode()
        }
        if (e.target.classList.contains('add-content__btn')) {
        console.log(e.target)
            this.addTaskBtn()
        }
    }
    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentDate = new Date()
        const day = `${currentDate.getDate()}`.padStart(2, 0)
        const month = currentDate.getMonth()
        const year = currentDate.getFullYear()
        const hours = currentDate.getHours()
        const minutes = currentDate.getMinutes()
        displayDate.textContent = `${day} of ${months[month]}, ${year}`
        console.log()
    }
    darkMode() {
        darkModeSun.classList.toggle('hidden')
        darkModeMoon.classList.toggle('hidden')
        if (darkModeSun.classList.contains('hidden')) {
            document.querySelector('body').style.backgroundColor = 'white'
            document.querySelector('.welcome-message').style.color = 'black'
        } else {
            document.querySelector('body').style.backgroundColor = 'black'
            document.querySelector('.welcome-message').style.color = 'white'
        }
    }
    addTaskBtn() {
        taskPage.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
    }
    _addTaskCta(e) {
    e.preventDefault()
    user.active.title.push(addTaskTitle.value)
    user.active.description.push(addTaskDescription.value)
    taskPage.classList.toggle('hidden');
    overlay.classList.toggle('hidden');

    // UPDATEUI
    this.updateUI()
        addTaskTitle.value = '';
        addTaskDescription.value = ''; 
    }
    _toggleOverlay(e) {
         e.preventDefault()
    sideBar.classList.add('hidden');
    taskPage.classList.add('hidden');
    overlay.classList.toggle('hidden');
    }

    
    _displayActiveTasks(user) {
        activeTaskContainer.style.marginTop = '10px'
        activeTaskContainer.innerHTML = ''
        document.querySelector('.active-length').textContent = `${user.active.description.length}`
        document.querySelector('.completed-length').textContent = `${user.completed.title.length}`

        user.active.title.forEach((title, i) => {
            const description = user.active.description[i]
            
        const html = `<div class="flex justify-between items-center">
                <div>
                    <div class=" flex  gap-3 items-start   ">
                        <input type="checkbox"  class="checkers self-center bg-red-500 align-middle" />
                        <p class="active-title align-middle" data-id = ${i}>${title}</p>
                    </div>
                    <p class="ml-7 text-sm text-teal-700 " data-id = ${i}>${description}</p>
                </div>
                <div class=" active-delete__btn text-2xl cursor-pointer text-white " data-delete=${i}>
                    &times;
                </div>
                </div>`
        activeTaskContainer.insertAdjacentHTML('afterbegin', html)
        // console.log(user.active.title.length)
        // console.log(user.completed.title.length)
            // console.log(user.active.title.length);
    });
    }
    updateUI() {
        this._displayActiveTasks(user)
        this._displayCompletedTasks(user)
    }
    _displayCompletedTasks(user) {
        completedTaskContainer.innerHTML = '';
    user.completed.title.forEach((title, i) => {
        const description = user.completed.description[i];
        const html = 
            `<div class="flex justify-between items-center">
                <div>
                    <div class=" flex  gap-3 items-start   ">
                        <input type="checkbox" name="checkbox" class="checkers self-center bg-red-500 align-middle" />
                        <p class="completed-title align-middle" >${title}</p>
                    </div>
                    <p class="ml-7 text-sm text-teal-700" >${description}
                    </p>
                </div>
                <div class=" completed-delete__btn text-2xl cursor-pointer text-white" data-delete=${i}>
                    &times;
                </div>
            </div>`
        completedTaskContainer.insertAdjacentHTML('afterbegin', html)
    })
    }
    _taskContainerEvents(e) {
        e.preventDefault();
        if (e.target.classList.contains('active-delete__btn')) {
           this._deleteActiveTask(e, user)
        }
        if (e.target.classList.contains('completed-delete__btn')) {
           this._deleteCompletedTask(e, user)
        }
        if (e.target.classList.contains('active-title')) { 
            this._moveTaskToCompleted(e, user);
        }
    }
    _deleteActiveTask(e, user) {
        user.active.title.splice([e.target.dataset.delete], 1);
        user.active.description.splice([e.target.dataset.delete], 1);
        this.updateUI()
        console.log(user.active.title.length);
    }
    _deleteCompletedTask(e, user) {
        user.completed.title.splice([e.target.dataset.delete], 1);
        user.completed.description.splice([e.target.dataset.delete], 1);
        this.updateUI()
    }
    _moveTaskToCompleted(e, user) {
        user.completed.title.push(user.active.title[e.target.dataset.id])
        // console.log(user.active.description[e.target.dataset.description])
        user.completed.description.push(user.active.description[e.target.dataset.id])
        user.active.title.splice(e.target.dataset.title, 1);
        user.active.description.splice(e.target.dataset.description, 1);
        this.updateUI()

    }
    
    _footerEvents(e) {
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
        user.active.title.splice(0)
        user.active.description.splice(0)
        this.updateUI(user)
    }
    _clearCompleted() {
        user.completed.title.splice(0)
        user.completed.description.splice(0)
        this.updateUI(user)
    }
    
}
new App(user)



