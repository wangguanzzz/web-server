

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
message1.textContent = ''
message2.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message2.textContent = 'loading'
    fetch('http://localhost:3000/weather?address='+search.value).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message2.textContent = data.error
                message1.textContent = ''
                return
            }
            message1.textContent = JSON.stringify(data)
            message2.textContent = ''
        })
    })
})
