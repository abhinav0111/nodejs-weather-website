console.log("This is the JS file loaded by the Java Script")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent = 'message from Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageTwo.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?search=' + location).then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                console.log(data.Error)
                messageTwo.textContent = "Error : " + data.Error
            }
            else {
                console.log(data)
                messageTwo.textContent = "Location:" + data.Location + " " + "Currenttemp:" + data.Currenttemp + " " + "Feelslike:" + data.Feelslike + " " + "Addresss:" + data.Addresss
            }
        })
    })

})

console.log(weatherForm)