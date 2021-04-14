let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  //Grab form from DOM and add Listener
  document 
    .querySelector("#add-toy-form")
    .addEventListener("submit", handleToyFormSubmit);

  function handleToyFormSubmit(event){
    event.preventDefault();
   const toyObj = {
    name: event.target.name.value,
    image: event.target.image_url.value,
    likes: 0,
    }
 //TODO: Create Toy on the Server
  const config = {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toyObj)
  }
  fetch(url, config)
    .then(res => res.json())
    .then(newToy => {
      renderOneToy(newToy)
    })
    event.target.reset();


    function renderOneToy(toyObj){
      const card = document.createElement("li");
      card.className = "card";
      card.dataset.id = toyObj.id
      card.innerHTML = `
      <img src="${toyObj.image_url}" alt="${toyObj.name}">
      <div class="content">
        <h4>${toyObj.name}</h4>
        <p>
          $<span class="likes-count">${toyObj.donations}</span> Likes
        </p>
        <p>${toyObj.description}</p>
      </div>
      <div class="buttons">
          <button data-action="Like">Like</button>
      </div>
      `;
      document.querySelector("#toy-collection").append(card);
    };
  
 }