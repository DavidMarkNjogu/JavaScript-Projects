const listsContainer = document.querySelector('.task-list')

let lists = [
    {
        id: 1,
        name: 'todo1'
    },
    {
        id: 2,
        name: 'todo2'
    }
]

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

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}
console.log(lists)
render()
