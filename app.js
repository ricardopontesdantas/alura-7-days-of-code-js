const form = document.querySelector('[data-js="form"]')
const nameInput = document.querySelector('[data-js="name"]')
const birthInput = document.querySelector('[data-js="birth"]')
const indexInput = document.querySelector('[data-js="index"]')
const peopleListInfo = document.querySelector('[data-js="people-list-info"]')
const peopleTable = document.querySelector('[data-js="people-table"]')
const peopleBodyTable = peopleTable.querySelector('tbody')

const people = JSON.parse(localStorage.getItem('#7daysOfCode:people')) || []

const editPerson = index => {
    nameInput.value = people[index].name
    birthInput.value = people[index].birth
    indexInput.value = index
}

const removePerson = (element, index) => {
    people.pop(index)
    const peopleString = JSON.stringify(people)
    localStorage.setItem('#7daysOfCode:people', peopleString)

    element.parentNode.parentNode.remove()
}

const renderPeople = people => {
    const hasPeople = people.length > 0
    let peopleHTML = ''

    if (hasPeople) {
        people.forEach((person, index) => {
            peopleHTML += `
            <tr>
                <td>${person.name}</td>
                <td>${person.birth}</td>
                <td colspan="2" class="text-center">
                    <button class="btn btn-outline-warning btn-sm" onclick="editPerson(${index})">Editar</button>
                    <button class="btn btn-outline-danger btn-sm" onclick="removePerson(this, ${index})">Remover</button>
                </td>
            </tr>`
        })

        peopleBodyTable.innerHTML = peopleHTML
    } else {
        peopleBodyTable.innerHTML = '<tr><td colspan="3">Nenhum cadastro</td></tr>'
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
    localStorage.setItem('#7daysOfCode:people', peopleString)

    if (people.length > 0) {
        renderPeople(people)
    }

    form.reset()
    indexInput.value = ''
    form.name.focus()
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