// ALL VARIABLES & DOC SELECTIONS

let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector(".closeForm");

let stack = document.querySelector(".stack");
let upBtn = document.querySelector("#upBtn");
let downBtn = document.querySelector("#downBtn");

const form = document.querySelector("form");

const imgInput = form.querySelector('input[type="url"]'); // Image URL
const nameInput = form.querySelectorAll('input[type="text"]')[0]; // Full Name
const townInput = form.querySelectorAll('input[type="text"]')[1]; // Home Town
const purposeInput = form.querySelectorAll('input[type="text"]')[2]; // Purpose

const categoryRadios = form.querySelectorAll('input[name="category"]');

const submitBtn = form.querySelector(".submit-btn");

// CODE STARTS HERE

//Old localstorage data
function saveToLocalStorage(obj) {
  if (localStorage.getItem("tasks") === null) {
    let oldTasks = [];
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  } else {
    let oldTasks = localStorage.getItem("tasks");
    oldTasks = JSON.parse(oldTasks);
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  }
}

// Show form
addNote.addEventListener("click", function () {
  formContainer.style.display = "initial";
});

// Hide form
closeForm.addEventListener("click", function () {
  formContainer.style.display = "none";
});

// Validation on submit
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Trimmed values store
  let imgValue = imgInput.value.trim();
  let nameValue = nameInput.value.trim();
  let townValue = townInput.value.trim();
  let purposeValue = purposeInput.value.trim();

  let selected = false;
  categoryRadios.forEach(function (cat) {
    if (cat.checked) {
      selected = cat.value;
    }
  });

  // Validation logic
  if (imgValue === "") {
    alert("Please enter an Image URL.");
    return;
  }
  if (nameValue === "") {
    alert("Full Name is required.");
    return;
  }
  if (townValue === "") {
    alert("Home Town is required.");
    return;
  }
  if (purposeValue === "") {
    alert("Purpose cannot be empty.");
    return;
  }
  if (!selected) {
    alert("Please select a category.");
    return;
  }

  saveToLocalStorage({
    imgValue,
    nameValue,
    townValue,
    purposeValue,
    selected,
  });

  form.reset();
  formContainer.style.display = "none";
});

function showCards() {
  let allTasks = JSON.parse(localStorage.getItem("tasks"));

  allTasks.forEach(function (task) {
    // Create the card container
    const card = document.createElement("div");
    card.classList.add("card");

    // ---- Image ----
    const img = document.createElement("img");
    img.src = task.imgValue;
    img.classList.add("avatar");
    img.alt = "User";
    card.appendChild(img);

    // ---- Card Info ----
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    // h3 Name
    const name = document.createElement("h3");
    name.textContent = task.nameValue;
    cardInfo.appendChild(name);

    // Home town row
    const townRow = document.createElement("div");
    townRow.classList.add("info-row");

    const townLabel = document.createElement("span");
    townLabel.classList.add("label");
    townLabel.textContent = "Home town";

    const townValue = document.createElement("span");
    townValue.classList.add("value");
    townValue.textContent = task.townValue;

    townRow.appendChild(townLabel);
    townRow.appendChild(townValue);
    cardInfo.appendChild(townRow);

    // Bookings row
    const bookingRow = document.createElement("div");
    bookingRow.classList.add("info-row");

    const bookingLabel = document.createElement("span");
    bookingLabel.classList.add("label");
    bookingLabel.textContent = "Purpose";

    const bookingValue = document.createElement("span");
    bookingValue.classList.add("value");
    bookingValue.textContent = task.purposeValue;

    bookingRow.appendChild(bookingLabel);
    bookingRow.appendChild(bookingValue);
    cardInfo.appendChild(bookingRow);

    card.appendChild(cardInfo);

    // ---- Card Actions ----
    const cardActions = document.createElement("div");
    cardActions.classList.add("card-actions");

    // Call button
    const callBtn = document.createElement("button");
    callBtn.classList.add("call-btn");
    const callIcon = document.createElement("i");
    callIcon.classList.add("ri-phone-fill");
    callBtn.appendChild(callIcon);
    callBtn.appendChild(document.createTextNode(" Call"));

    // Msg button
    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg-btn");
    msgBtn.textContent = "Message";

    cardActions.appendChild(callBtn);
    cardActions.appendChild(msgBtn);

    card.appendChild(cardActions);

    // ---- Append to body (or any container) ----
    document.querySelector(".stack").appendChild(card);
  });
}
showCards();

// Update stack
function updateStack() {
  let cards = document.querySelectorAll(".stack .card");
  for (let index = 0; index < 3; index++) {
    card.style.zIndex = 3 - index;
    card.style.transform = `translateY(${index * 10}px) scale(${
      1 - index * 0.1
    })`;
    card.style.opacity = `${1 - index * 0.1}`;
  }
}

upBtn.addEventListener("click", function () {
  let lastChild = stack.lastElementChild;
  if (lastChild) {
    stack.insertBefore(lastChild, stack.firstElementChild);
    //update
    updateStack();
  }
});

downBtn.addEventListener("click", function () {
  let firstChild = stack.firstElementChild;
  if (firstChild) {
    stack.appendChild(firstChild);
    //update
    updateStack();
  }
});
