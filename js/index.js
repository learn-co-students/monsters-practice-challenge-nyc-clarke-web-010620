let count = 1

document.addEventListener("DOMContentLoaded", displayMonsters(count))
document.addEventListener("DOMContentLoaded", changePage())
document.addEventListener("DOMContentLoaded", addForm())

function displayMonsters(count) {
    let container = document.getElementById("monster-container")
    container.innerHTML = ""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${count}`)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(monster => showMonster(monster))
        console.log(`monsters: ${json.length}`)
    })
}

function showMonster(monster) {
    let container = document.getElementById("monster-container")
    let div = document.createElement('div')
    div.innerHTML = `
    <h2>${monster.name}</h2>
    <p>${monster.age}</p>
    <p>${monster.description}</p>
    `
    container.append(div)
}

function changePage() {
    const forwardButton = document.getElementById("forward")
    const backButton = document.getElementById("back")
    document.addEventListener("click", function(event){
        if (event.target === forwardButton){
            count += 1
            console.log(count)
            let totalMonsters = countTotalMonsters()
            if  (count > Math.ceil(totalMonsters/50)) {
                alert("Aint no monsters here")
                count = Math.ceil(totalMonsters/50)
            }
            displayMonsters(count)
        }
        if (event.target === backButton){
            count -= 1
            console.log(count)
                if (count === 0) {
                    alert("Aint no monsters here")
                    count = 1
                }
            displayMonsters(count)
        }
    })
}

function countTotalMonsters() {
    return fetch(`http://localhost:3000/monsters`)
    .then(resp => resp.json())
    .then(json => {
        return json.length
    })
}

function addForm() {
    const formDiv = document.getElementById("create-monster")
    const newMonsterForm = document.createElement('form')
    newMonsterForm.innerHTML = `
    <input type="text" name="name" placeholder="name">
    <input type="text" name="age" placeholder="age">
    <input type="text" name="description" placeholder="description">
    <input type="submit" value="Create New Monster">
    `
    formDiv.append(newMonsterForm)
    formEventListener(newMonsterForm)
}

function formEventListener(form){
    form.addEventListener("submit", function(event){
        event.preventDefault()
        const formResponses = event.target.elements
        console.log(event)
        fetch(`http://localhost:3000/monsters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: formResponses[0].value,
                age: formResponses[1].value,
                description: formResponses[2].value
            })
        })
    })
}