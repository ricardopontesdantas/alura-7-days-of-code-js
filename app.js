const form = document.querySelector('[data-js="form"]')

const name = document.querySelector('[data-js="name"]')
const birth = document.querySelector('[data-js="birth"]')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const { name, birth } = form
    console.log({ name: name.value, birth: birth.value })
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
