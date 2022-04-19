const form = document.querySelector('[data-js="form"]')
const nameInput = document.querySelector('[data-js="name"]')
const birthInput = document.querySelector('[data-js="birth"]')
const indexInput = document.querySelector('[data-js="index"]')
const peopleListInfo = document.querySelector('[data-js="people-list-info"]')
const peopleTable = document.querySelector('[data-js="people-table"]')
const peopleBodyTable = peopleTable.querySelector('tbody')

const people = JSON.parse(localStorage.getItem('#7daysOfCode:person')) || []

peopleBodyTable.addEventListener('click', event => {
    if (event.target.nodeName === 'BUTTON') {
        const tr = event.target.parentNode.parentNode
        const indexPerson = tr.rowIndex - 1

        const tds = tr.querySelectorAll('td')

        const namePerson = tds[0]
        const birthPerson = tds[1]

        nameInput.value = namePerson.textContent
        birthInput.value = birthPerson.textContent
        indexInput.value = indexPerson
    }
})

const renderPeople = people => {
    const hasPeople = people.length > 0
    let peopleHTML = ''

    if (hasPeople) {
        people.forEach(person => {
            peopleHTML += `<tr><td>${person.name}</td><td>${person.birth}</td><td><button>Editar</button></td></tr>`
        })

        peopleBodyTable.innerHTML = peopleHTML
    } else {
        peopleListInfo.innerText = "Nenhum cadastro"
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const { name, birth, index } = form
    const person = { name: name.value, birth: birth.value }

    if (index.value) {
        people[index.value] = person
    } else {
        people.push(person)
    }

    const peopleString = JSON.stringify(people)
    localStorage.setItem('#7daysOfCode:person', peopleString)

    if (people.length > 1) {
        renderPeople(people)
    }

    form.reset()
    indexInput.value = ''
})

nameInput.oninvalid = function () {
    this.setCustomValidity('')

    if (!this.validity.valid) {
        this.setCustomValidity('O nome deve conter apenas letras (no mínimo 3 e no máximo 150)')
    }
}

birthInput.oninvalid = function () {
    this.setCustomValidity('')

    if (!this.validity.valid) {
        this.setCustomValidity('O formato da data deve ser DD/MM/AAAA e os meses devem estar entre 01 e 12')
    }
}

renderPeople(people)