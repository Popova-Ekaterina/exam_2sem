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

closeButtons.addEventListener("click", (e) => {

    e.preventDefault(); 
    
    
    modalElem.classList.remove('active'); 
    overlay.classList.remove('active'); 
    body.classList.remove('active');
    
    
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

    let json = {
        "message": input.value
    }

    fetch("/form", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
    .then(r => r.json())
    .then(data => {
        console.log(data)
            
        let messages = data.messages;

        modalElem.classList.remove('active'); 
        overlay.classList.remove('active'); 
        body.classList.remove('active');
    

      let tbody = document.querySelector("tbody")

      for(let i = 0; i < messages.length; i++){
        let tr = document.createElement("tr");
        tr.setAttribute("id", messages[i]["id"])

        let td1 = document.createElement("td");
        let td2 = document.createElement("td");

        td1.innerText = messages[i]["id"];
        td2.innerText = messages[i]["message"];

        let div = document.createElement("div");

        div.appendChild(td1);

        let deleteBtn = document.createElement("button");

        deleteBtn.innerText = "Удалить";

        div.appendChild(td2);
        div.appendChild(deleteBtn);

        tr.appendChild(td1);
        tr.appendChild(div);

        tbody.appendChild(tr);


        deleteBtn.addEventListener("click", e => {
            fetch("/delete/" + messages[i]["id"], {
                method: "DELETE",
            })
            .then(r => r.json())
            .then(json => {
                let data = json["data"][0];

                console.log(json)
                console.log(data)
            })
        })
      }

    })
    .catch(e => console.error(e))
})


fetch('get-data')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let messages = data.messages;

      let tbody = document.querySelector("tbody")

      // очищаем все содержимое таблицы
      tbody.innerHTML = '';

      for(let i = 0; i < messages.length; i++){
        let tr = document.createElement("tr");
        tr.setAttribute("id", "element" + messages[i]["id"])

        let td1 = document.createElement("td");
        let td2 = document.createElement("td");

        td1.innerText = messages[i]["id"];
        td2.innerText = messages[i]["message"];

        let div = document.createElement("div");

        div.appendChild(td1);

        let deleteBtn = document.createElement("button");

        deleteBtn.innerText = "Удалить";

        div.appendChild(td2);
        div.appendChild(deleteBtn);

        tr.appendChild(td1);
        tr.appendChild(div);

        tbody.appendChild(tr);


        deleteBtn.addEventListener("click", e => {
            fetch("/delete/" + messages[i]["id"], {
                method: "DELETE",
            })
            .then(r => r.json())
            .then(json => {
                let data = json["data"][0];

                console.log(json)
                console.log(data)

                let tr = document.querySelector("#element"+data["id"]);

                tr.remove();
            })
        })
      }
    })
    .catch((err) => console.error(err));

