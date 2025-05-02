const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButtton = document.querySelector('[data-delete-list-button]') 
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.SelectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

listsContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'li'){
        selectedListId = e.target.dataset.listId
        saveAndRender()
    }
})

deleteListButtton.addEventListener('click', e =>{
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndRender()
} )

//Caters for the functionality of the input field
newListForm.addEventListener('submit', e => {
    e.preventDefault() //prevents the form from submitting when you press Enter, since it refreshes the page
    const listName = newListInput.value
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
})

function createList(name){
    return {id: Date.now().toString(), name: name, tasks: []}
    
}

function saveAndRender(){
    save()
    render()
}
//Saves list to local storage for retrieval after refereshing
function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)

}

// Creates a new list entry based on the data from the lists array above
function render() {
    clearElement(listsContainer)
    renderLists()
   
    const selectedList = lists.find(list => list.id === selectedListId) //finds the id of the selected list
    if (selectedListId === null) {
        listDisplayContainer.style.display = 'none' 
    }
    else{
        listDisplayContainer.style.display = '' 
        listTitleElement.innerText = selectedList.name //sets the title to the name of the selected list
        renderTaskCount(selectedList)
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }   
}

function renderTasks(selectedList){
    selectedList.tasks.forEach( task =>{
        const taskElement = document.importNode(taskTemplate.content , true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(selectedList){
    const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length
    const taskString = incompleteTasksCount === 1 ? "task" : "tasks"
    listCountElement.innerText = `${incompleteTasksCount} ${taskString} left`
}

function renderLists() {
    lists.forEach(list =>{
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add("list-name")
        listElement.innerText = list.name
        if (list.id === selectedListId) {
            listElement.classList.add('active-list')
        }
        listsContainer.appendChild(listElement) 
    }) 
}


// Clears any existing inputs
function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

render()


/*
let tasks = []
function renderTasks(){
    clearElement(tasksContainer)
    tasks.forEach(task =>{
        const taskElement = document.createElement('label')
    })

} */