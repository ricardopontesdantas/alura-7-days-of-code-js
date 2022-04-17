const form = document.querySelector('[data-js="form"]')
const name = document.querySelector('[data-js="name"]')
const birth = document.querySelector('[data-js="birth"]')
const peopleListInfo = document.querySelector('[data-js="people-list-info"]')
const peopleTable = document.querySelector('[data-js="people-table"]')
const peopleBodyTable = peopleTable.querySelector('tbody')

const people = JSON.parse(localStorage.getItem('#7daysOfCode:person')) || []

const renderPeople = people => {
    const hasPeople = people.length > 0
    let peopleHTML = ''

    if (hasPeople) {
        people.forEach(person => {
            peopleHTML += `<tr><td>${person.name}</td><td>${person.birth}</td></tr>`
        })

        peopleBodyTable.innerHTML = peopleHTML
    } else {
        peopleListInfo.innerText = "Nenhum cadastro"
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const { name, birth } = form
    const person = { name: name.value, birth: birth.value }
    people.push(person)

    const peopleString = JSON.stringify(people)
    
    localStorage.setItem('#7daysOfCode:person', peopleString)

    if (people.length > 1) {
        renderPeople(people)
    }
})

name.oninvalid = function () {
    this.setCustomValidity('')

    if (!this.validity.valid) {
        this.setCustomValidity('O nome deve conter apenas letras (no mínimo 3 e no máximo 150)')
    }
}

birth.oninvalid = function () {
    this.setCustomValidity('')

    if (!this.validity.valid) {
        this.setCustomValidity('O formato da data deve ser DD/MM/AAAA e os meses devem estar entre 01 e 12')
    }
}

renderPeople(people)