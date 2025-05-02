const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButtton = document.querySelector('[data-delete-list-button]') 

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
