const nav = document.querySelector('.nav')
// const addTaskBtn = document.querySelector('.add-content__btn')
const displayDate = document.querySelector('.date')
const main = document.querySelector('main')
const addTaskCta = document.querySelector('.add-task-cta')
const taskPage = document.querySelector('.create-content')
const overlay = document.querySelector('.overlay')
const sideBar = document.querySelector('.side-bar')
// const menuOpenBtn = document.querySelector('.hamurger-container')
const logInCta = document.querySelector('.log-in__cta')
const username = document.querySelector('.username')
const password = document.querySelector('.password')
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
// const user = {
//     active: {
//         title: [],
//         description: []
//     },
    
    
//     completed: {
//         title: [],
//         description: []
//     }
// };


// class User1 {
//     atitle = title;
//         ctitle = [];
//         cdesc = [];
//     adesc = [];
//     getTitle() {
        
//     }
    
// }
// class Activeuser extends User1{
//     constructor(title, desc) {
//         super (title, desc)
//     }
// }
// const user2 = new Activeuser('title111', 'lorem lrem')
// user2.getTitle('lorem lorem lorem')
// console.log(user2)
let usersName;
const currentDate = new Date()
const day = currentDate.getDate()
const month = `${currentDate.getMonth() + 1}`.padStart(2 , '0' )
const year = currentDate.getFullYear()
const hours = currentDate.getHours()
const minutes = currentDate.getMinutes()

// let time = Date.now()
// setInterval(function () {
//     time++  
//     console.log(currentDate.getMilliseconds())
//     const presentDate = new Date(time)
//     console.log(presentDate.getMilliseconds())
// },1000)
    document.querySelector('.welcome-message').style.color = 'white'

//EVENT LISTENERS

class User{
    constructor(title,description) {
        this.title = title;
        this.description = description
    }
}
// const completed = new User()

class App {
     userArr =[]
    constructor() {
        nav.addEventListener('click', this._navEvents.bind(this))
        footer.addEventListener('click', this._footerEvents.bind(this))
        addTaskCta.addEventListener('click', this._addTaskCta.bind(this) )
        // this._displayActiveTasks()
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
        let activeUser;
        const title = addTaskTitle.value
        const description = addTaskDescription.value
        activeUser = new User(title,description)
    // active.title.push(addTaskTitle.value)
    // active.description.push(addTaskDescription.value)
    taskPage.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        
        this.userArr.push(activeUser)
        console.log(this.userArr)
    this._displayActiveTasks(activeUser)
    // UPDATEUI
    // updateUI(user)
    addTaskTitle.value = '';
        addTaskDescription.value = ''; 
    }
    
    _displayActiveTasks(activeUser) {
        // e.preventDefault()
        console.log('tititii')
        // console.log(addTaskTitle.value)
        console.log(activeUser)

    activeTaskContainer.style.marginTop = '10px'
        // activeTaskContainer.innerHTML = ''
        const html = `<div class="flex justify-between items-center">
                <div>
                    <div class=" flex  gap-3 items-start   ">
                        <input type="checkbox"  class="checkers self-center bg-red-500 align-middle" />
                        <p class="align-middle">${activeUser.title}</p>
                    </div>
                    <p class="ml-7 text-sm text-teal-700 ">${activeUser.description}</p>
                </div>
                <div class=" delete-btn text-2xl cursor-pointer text-white data-delete= " >
                    &times;
                </div>
                </div>`
        activeTaskContainer.insertAdjacentHTML('beforeend', html)
    
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
        activeTask.classList.remove('hidden')
        demarcation.classList.remove('hidden')
    }
    displayOnlyActiveTask() {
        activeTask.classList.remove('hidden')
        completedTask.classList.add('hidden')
        demarcation.classList.add('hidden')
    }
    _displayOnlyCompletedTask() {
        completedTask.classList.remove('hidden')
        activeTask.classList.add('hidden')
        demarcation.classList.add('hidden');
    }
    _clearActive() {
        user.active.title.splice(0)
        user.active.description.splice(0)
        updateUI(user)
    }
    _clearCompleted() {
        user.completed.title.splice(0)
        user.completed.description.splice(0)
        updateUI(user)
    }
    
}
new App()
// addTaskBtn.addEventListener('click', function (e) {
//     e.preventDefault()
//     taskPage.classList.toggle('hidden');
//     overlay.classList.toggle('hidden');
// });
// menuOpenBtn.addEventListener('click', function (e) {
//     e.preventDefault()
//     sideBar.classList.toggle('hidden');
//     overlay.classList.toggle('hidden');
// })
overlay.addEventListener('click', function (e) {
    e.preventDefault()
    sideBar.classList.add('hidden');
    taskPage.classList.add('hidden');
    overlay.classList.toggle('hidden');
});




// const isplayActiveTasks = function (user) {
//     activeTaskContainer.style.marginTop = '10px'
//     activeTaskContainer.innerHTML = ''
//     user.active.title.forEach((title, i) => {
//         const description = user.active.description[i]
//         const html = `<div class="flex justify-between items-center">
//                 <div>
//                     <div class=" flex  gap-3 items-start   ">
//                         <input type="checkbox"  class="checkers self-center bg-red-500 align-middle" />
//                         <p class="align-middle">${title}</p>
//                     </div>
//                     <p class="ml-7 text-sm text-teal-700 " data-index=${i + 1}>${description}</p>
//                 </div>
//                 <div class=" delete-btn text-2xl cursor-pointer text-white " data-delete=${i}>
//                     &times;
//                 </div>
//                 </div>`
//         activeTaskContainer.insertAdjacentHTML('afterbegin', html)
//         // console.log(user.active.title.length)
//         // console.log(user.completed.title.length)
//         document.querySelector('.active-length').textContent = `${user.active.title.length}`
//         document.querySelector('.completed-length').textContent = `${user.completed.title.length}`
//     });
// }
// displayActiveTasks(user)
// const updateUI = function (user) {
//     // displayActiveTasks(user)
//     displayCompletedTask(user)
// }

    
// const displayCompletedTask = function (user) {
//     completedTaskContainer.innerHTML = '';
//     user.completed.title.forEach((title, i) => {
//         const description = user.completed.description[i];
//         const html = `<div class="flex justify-between items-center">
//         <div>
//         <div class=" flex  gap-3 items-start   ">
//                         <input type="checkbox" name="checkbox" class="checkers self-center bg-red-500 align-middle" />
//                         <p class="completed-title align-middle" data-title = ${i}>${title}</p>
//                     </div>
//                     <p class="ml-7 text-sm text-teal-700" data-description = ${i}>${description}
//                     </p>
//                     </div>
//                     <div class=" delete-btn text-2xl cursor-pointer text-white" data-delete=${i}>
//                     &times;
//                 </div>
//                 </div>
//                     `
//         completedTaskContainer.insertAdjacentHTML('afterbegin', html)
//     })
// }
// displayCompletedTask(user)




 /////////////////////////////////////////////////////////
//  DELETING TASK
activeTaskContainer.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('delete-btn')) {
        user.active.title.splice([e.target.dataset.delete], 1);
        user.active.description.splice([e.target.dataset.delete], 1);
    }
    if (e.target.classList.contains('active-title')) {
        user.active.title.push(user.completed.title[e.target.dataset.title])
        user.active.description.push(user.completed.description[e.target.dataset.desc])
        user.completed.title.splice([e.target.dataset.title], 1);
        user.completed.description.splice([e.target.dataset.description], 1);

    }

    //UPDATE UI
    updateUI(user)
})
completedTaskContainer.addEventListener('click', function (e) {
    e.preventDefault();
    //deleting
    if (e.target.classList.contains('delete-btn')) {
        user.completed.title.splice([e.target.dataset.delete], 1);
        user.completed.description.splice([e.target.dataset.delete], 1);
    }
    //UPDATEUI
    updateUI(user)
})
