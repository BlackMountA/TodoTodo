const nav = document.querySelector('.nav')
const addTaskBtn = document.querySelector('.add-content__btn')
const displayDate = document.querySelector('.date')
const main = document.querySelector('main')
const addTaskCta = document.querySelector('.add-task-cta')
const taskPage = document.querySelector('.create-content')
const overlay = document.querySelector('.overlay')
const sideBar = document.querySelector('.side-bar')
const menuOpenBtn = document.querySelector('.hamurger-container')
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
// const displayActive = document.querySelector('.active-length')
// const displayCompleted = document.querySelector('.completed-length')
// const displayAllTask = document.querySelector('.all-task')
// const clearActive = document.querySelector('.clear-active')
// const clearCompleted = document.querySelector('.clear-completed')
const demarcation = document.querySelector('.line')
// const checkbox = document.querySelector('.input-check__box')
const darkMode = document.querySelector('.dark-mode')
const darkModeSun = document.querySelector('.dark-mode__sun')
const darkModeMoon = document.querySelector('.dark-mode__moon')
const user = {
    active: {
        title: ['title1', 'title2',],
        description: ['loremncxkjnclknlxkcdsjhvxzhjv', 'cbskcksjncjd h shj klcnlkdnclkn']
    },
    
    
    completed: {
        title: ['CCCtitle1', 'tCCCitle2',],
        description: ['loremncxkjnclknlxkcdsjhvxzhjv', 'cbskcksjncjdldxlsllxlz h shj klcnlkdnclkn']
    }
};

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
logInCta.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector('.log-in__page').classList.toggle('hidden');
    const name = username.value.toLowerCase()
    main.classList.toggle('hidden')
    displayDate.textContent = `${day}/${month}/${year}, ${hours}:${minutes}`
    usersName = name[0].toUpperCase() + name.slice(1)
    displayUsername.textContent = usersName

});
darkMode.addEventListener('click', function () {
    darkModeSun.classList.toggle('hidden')
    darkModeMoon.classList.toggle('hidden')
    if (darkModeSun.classList.contains('hidden')) {
        document.querySelector('body').style.backgroundColor = 'white'
        document.querySelector('.welcome-message').style.color = 'black'
    } else {
        document.querySelector('body').style.backgroundColor = 'black'
        document.querySelector('.welcome-message').style.color = 'white'
    }
})
addTaskBtn.addEventListener('click', function (e) {
    e.preventDefault()
    taskPage.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
});
menuOpenBtn.addEventListener('click', function (e) {
    e.preventDefault()
    sideBar.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
})
overlay.addEventListener('click', function (e) {
    e.preventDefault()
    sideBar.classList.add('hidden');
    taskPage.classList.add('hidden');
    overlay.classList.toggle('hidden');
});

const displayActiveTasks = function (user) {
    activeTaskContainer.style.marginTop = '10px'
    activeTaskContainer.innerHTML = ''
    user.active.title.forEach((title, i) => {
        const description = user.active.description[i]
        const html = `<div class="flex justify-between items-center">
                <div>
                    <div class=" flex  gap-3 items-start   ">
                        <input type="checkbox"  class="checkers self-center bg-red-500 align-middle" />
                        <p class="align-middle">${title}</p>
                    </div>
                    <p class="ml-7 text-sm text-teal-700 " data-index=${i + 1}>${description}</p>
                </div>
                <div class=" delete-btn text-2xl cursor-pointer text-white " data-delete=${i}>
                    &times;
                </div>
                </div>`
        activeTaskContainer.insertAdjacentHTML('afterbegin', html)
        // console.log(user.active.title.length)
        // console.log(user.completed.title.length)
        document.querySelector('.active-length').textContent = `${user.active.title.length}`
        document.querySelector('.completed-length').textContent = `${user.completed.title.length}`
    });
}
displayActiveTasks(user)
const updateUI = function (user) {
    displayActiveTasks(user)
    displayCompletedTask(user)
}
addTaskCta.addEventListener('click', function (e) {
    e.preventDefault()
    const taskTitle = addTaskTitle.value;
    user.active.title.push(taskTitle)
    user.active.description.push(addTaskDescription.value)
    taskPage.classList.toggle('hidden');
    overlay.classList.toggle('hidden');

    // UPDATEUI
    updateUI(user)
    addTaskTitle.value = '';
    addTaskDescription.value = '';
})
    
const displayCompletedTask = function (user) {
    completedTaskContainer.innerHTML = '';
    user.completed.title.forEach((title, i) => {
        const description = user.completed.description[i];
        const html = `<div class="flex justify-between items-center">
        <div>
        <div class=" flex  gap-3 items-start   ">
                        <input type="checkbox" name="checkbox" class="checkers self-center bg-red-500 align-middle" />
                        <p class="align-middle">${title}</p>
                    </div>
                    <p class="ml-7 text-sm text-teal-700">${description}
                    </p>
                    </div>
                    <div class=" delete-btn text-2xl cursor-pointer text-white" data-delete=${i}>
                    &times;
                </div>
                </div>
                    `
        completedTaskContainer.insertAdjacentHTML('afterbegin', html)
    })
}
displayCompletedTask(user)

// displayCompleted.addEventListener('click', function () {
//     completedTask.classList.remove('hidden')
//     activeTask.classList.add('hidden')
//     demarcation.classList.add('hidden');
// })
// displayActive.addEventListener('click', function () {
//     activeTask.classList.remove('hidden')
//     completedTask.classList.add('hidden')
//     demarcation.classList.add('hidden')

// })

// displayAllTask.addEventListener('click', function (e) {
//     e.preventDefault()
//     completedTask.classList.remove('hidden')
//     activeTask.classList.remove('hidden')
//     demarcation.classList.remove('hidden')
// })
    
// clearActive.addEventListener('click', function (e) {
//     e.preventDefault()
//     user.active.title.splice(0)
//     updateUI(user)
// })
// clearCompleted.addEventListener('click', function (e) {
//     e.preventDefault()
//     user.completed.title.splice(0)
//     updateUI(user)
// })

footer.addEventListener('click', function (e) {
    e.preventDefault()
    if (e.target.classList.contains('footer-link')) {
        footerLink.forEach(el => {
        el.classList.remove('active-link')
    })
        e.target.classList.add('active-link')
        if (e.target.classList.contains('all-task')) {
            completedTask.classList.remove('hidden')
            activeTask.classList.remove('hidden')
            demarcation.classList.remove('hidden')
        }
        if (e.target.classList.contains('display-active')) {
            activeTask.classList.remove('hidden')
            completedTask.classList.add('hidden')
            demarcation.classList.add('hidden')
        }
        if (e.target.classList.contains('display-completed')) {
            completedTask.classList.remove('hidden')
            activeTask.classList.add('hidden')
            demarcation.classList.add('hidden');
        }
        if (e.target.classList.contains('clear-active')) {
            user.active.title.splice(0)
            updateUI(user)
        }
        if (e.target.classList.contains('clear-completed')) {
            user.completed.title.splice(0)
            updateUI(user)
        }      
    }
})
 /////////////////////////////////////////////////////////
//  DELETING TASK
activeTaskContainer.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('delete-btn')) {
        user.active.title.splice([e.target.dataset.delete], 1);
    }

    //UPDATE UI
    updateUI(user)
})
completedTaskContainer.addEventListener('click', function (e) {
    e.preventDefault();
    //deleting
    if (e.target.classList.contains('delete-btn')) {
        user.completed.title.splice([e.target.dataset.delete], 1);
    }
    // transferring
    if (e.target.classList.contains('checkers')) {
        if (input.checked) {
        console.log('input');
        }
    console.log(input)

        // if()
    }
    //UPDATEUI
    updateUI(user)
})
/////////////////////////////////////////////////////////
// // TRANSFERRING
// const transferData = function () {
    
// }
// transferData()
// const stickyNav = function () {
//     const navObsCall = function (entries, observer) {
//        const [entry] = entries
//         if (!entry.isIntersecting) {
//             nav.classList.add('sticky')   
//         } else {
//             nav.classList.remove('sticky')   

//         }
//     }
//     const options = {
//         root: null,
//         threshold: 0
//     }
//     const navObs = new IntersectionObserver(
//         navObsCall, options
//     )
//     navObs.observe(nav)
// }
// stickyNav();