console.log('Client side javascript file is loaded!');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                // console.log(data.error);
                messageOne.textContent=data.error;
            }
            else{
                console.log(data);
                messageOne.textContent= `Location: ${data.address}` ;
                messageTwo.textContent= `Weather: ${data.forecast.weather}` ;
                messageThree.textContent= `Temp: ${data.forecast.temp}^F` ;
            }
        })
    })

})