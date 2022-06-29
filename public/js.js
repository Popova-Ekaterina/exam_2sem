let modalButtons = document.querySelector('.js-open-modal');
let overlay = document.querySelector('.overlay-modal');
let closeButtons = document.querySelector('.js-modal-close');
let modalElem = document.querySelector('.modal');
let push = document.querySelector('.push')
let profile = document.getElementById('profile')
let sample = document.getElementById('sample')
let body = document.querySelector('body');
let form = document.querySelector('#form');
let input = document.querySelector('#profile');

modalButtons.addEventListener("click", (e) => {

e.preventDefault(); 


modalElem.classList.add('active'); 
overlay.classList.add('active'); 
body.classList.add('active');


});

profile.addEventListener("input", (e) => {

if (profile.validity.typeMismatch) {
    profile.setCustomValidity("Неправильный тип данных!");
    profile.classList.add('active');
}
else {
    profile.setCustomValidity("");
    profile.classList.remove('active');
}

if (profile.validity.valueMissing) {
    profile.setCustomValidity("Заполните пустые поля!");
    profile.classList.add('active');
}
else {
    profile.setCustomValidity("");
    profile.classList.remove('active');
}


});


form.addEventListener("submit", e => {
    e.preventDefault();

    let json = JSON.stringify(input.value);

    fetch("/form", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
    .then(r => r.json())
    .then(data => {
        console.log(data)
    })
    .catch(e => console.error(e))
})


fetch('get-data')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      for(let i = 0; i < data.length; i++){
        
      }
    })
    .catch((err) => console.error(err));