const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')

let lists = [{
        id: 1,
        name: 'todo1'
},  {
        id: 2,
        name: 'todo2'
}]



newListForm.addEventListener('submit', e => {
    e.preventDefault() //prevents the form from submitting when you press Enter, since it refreshes the page
    const listName = newListInput.value
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    render()
})

function createList(name){
    return {id: Date.now().toString(), name: name, tasks: []}
    
}

// Creates a new list entry based on the data from the lists array above
function render() {
    clearElement(listsContainer)
    lists.forEach(list =>{
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add("list-name")
        listElement.innerText = list.name
        listsContainer.appendChild(listElement) 
    })
}

// Clears any existing inputs
function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}
console.log(lists)
render()
