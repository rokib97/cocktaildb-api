const main = document.getElementById("card-section");
const loadData = () => {
  const inputField = document.getElementById("input-field");
  document.getElementById("error-msg").innerHTML = "";
  document.getElementById("details").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  const inputValue = inputField.value;
  const errorMsg = document.getElementById("error-msg");
  if (!isNaN(inputValue) || inputValue == "") {
    errorMsg.innerHTML = `
    <marquee width="50%" direction="left" height="200px">
    Please input valid something....
    </marquee>
    `;
    inputField.value = "";
    document.getElementById("card-container").innerHTML = "";
  } else {
    errorMsg.innerHTML = "";
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.drinks == null) {
          errorMsg.innerHTML = `
          <marquee width="50%" direction="left" height="200px">
          Please input valid something....
          </marquee>
          `;
          document.getElementById("card-container").innerHTML = "";
        } else {
          displayData(data.drinks);
          document.getElementById("spinner").style.display = "none";
        }
      });
    inputField.value = "";
  }
};

const displayData = (drinks) => {
  // console.log(drinks);
  const cardContainerDiv = document.getElementById("card-container");
  document.getElementById("card-container").innerHTML = "";
  drinks.forEach((drink) => {
    // console.log(drink);
    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `
        <div class="col">
          <div class="card h-100 shadow-lg p-3">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${drink.strDrink}</h5>
              <button onclick ="loadDetails('${drink.idDrink}')" class="btn btn-warning">Details</button>
            </div>
          </div>
        </div>
    `;
    cardContainerDiv.appendChild(div);
  });
};

const loadDetails = (id) => {
  document.getElementById("spinner").style.display = "block";
  // console.log(id);
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.drinks[0]));
  document.getElementById("spinner").style.display = "none";
};

const displayDetails = (drink) => {
  console.log(drink);
  const detailsMainDiv = document.getElementById("details");
  const div = document.createElement("div");
  div.classList.add("card", "shadow-lg", "p-4");
  document.getElementById("details").innerHTML = "";
  div.innerHTML = `
      <img src="${drink.strDrinkThumb}" class="card-img-top img-fluid " alt="..." />
      <div class="card-body">
          <h5 class="card-title">${drink.strDrink}</h5>
          <p class="card-text">${drink.strAlcoholic} </p>
          <p class="card-text"> ${drink.strInstructions}</p>
      </div>
  `;
  detailsMainDiv.appendChild(div);
};
