const form = document.querySelector('[data-js="form"]')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const { name, birth } = form
    console.log({ name: name.value, birth: birth.value })
})