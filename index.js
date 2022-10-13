import characters from "./data/characters.json" assert { type: "json" };

/* ELEMENTS */
const characterContainer = document.getElementById("character-container");
const genderFilter = document.getElementById("gender");
const speciesFilter = document.getElementById("species");
const statusFilter = document.getElementById("status");
const search = document.getElementById("search");

const filterMap = {
  gender: genderFilter,
  status: statusFilter,
  species: speciesFilter,
};

/* CONSTANTS */

const SELECT_ALL_TEXT = "Select all";

/* Variables */
let chosenIds = [];

/* ADD/REMOVE CARDS */

const printCards = (characters) => {
  // console.log("inside printCards function");
  characters.forEach((character) => {
    const { id, name, image, status, species, gender, points } = character;
    const card = document.createElement("div");
    card.classList.add("card");

    const textContainer = document.createElement("div");
    textContainer.classList.add("card-container");

    const titleElement = document.createElement("h2");
    const titleText = document.createTextNode(name);
    titleElement.appendChild(titleText);

    const img = document.createElement("img");
    img.setAttribute("src", image);

    const statusElement = document.createElement("p");
    const statusText = document.createTextNode(`Status: ${status}`);
    statusElement.appendChild(statusText);

    const speciesElement = document.createElement("p");
    const speciesText = document.createTextNode(`Species: ${species}`);
    speciesElement.appendChild(speciesText);

    const genderElement = document.createElement("p");
    const genderText = document.createTextNode(`Sex: ${gender}`);
    genderElement.appendChild(genderText);

    const pointsElement = document.createElement("p");
    const pointsText = document.createTextNode(`Points: ${points}`);
    pointsElement.appendChild(pointsText);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    const button = document.createElement("button");
    button.setAttribute("id", `${id}`);
    button.classList.add("choose-button");
    const buttonText = document.createTextNode("Choose");
    button.appendChild(buttonText);
    buttonContainer.appendChild(button);

    card.appendChild(img);
    card.appendChild(textContainer);
    textContainer.appendChild(titleElement);
    textContainer.appendChild(statusElement);
    textContainer.appendChild(speciesElement);
    textContainer.appendChild(genderElement);
    textContainer.appendChild(pointsElement);
    textContainer.appendChild(buttonContainer);

    characterContainer.appendChild(card);
  });
};

const cleanCardContainer = () => {
  characterContainer.innerHTML = "";
};

/* SELECT */

const getOptions = () => {
  const options = {
    gender: [],
    status: [],
    species: [],
  };

  const { gender, status, species } = options;

  characters.forEach((character) => {
    gender.push(character.gender);
    status.push(character.status);
    species.push(character.species);
  });

  return options;
};

const createOptionNodes = (filterOptions, appendToElement) => {
  // select all
  const selectAllOption = document.createElement("option");
  selectAllOption.setAttribute("value", "all");
  const optionText = document.createTextNode(SELECT_ALL_TEXT);
  selectAllOption.appendChild(optionText);
  // console.log("selectAllOption", selectAllOption);
  // console.log("appendToElement", appendToElement);
  appendToElement.appendChild(selectAllOption);

  filterOptions.forEach((option) => {
    const optionNode = document.createElement("option");
    optionNode.setAttribute("value", option);
    const optionText = document.createTextNode(
      option.charAt(0).toUpperCase() + option.slice(1)
    );
    optionNode.appendChild(optionText);
    appendToElement.appendChild(optionNode);
  });
};

const createOptions = () => {
  const options = getOptions();

  let genderOptions = [];
  let statusOptions = [];
  let speciesOptions = [];

  options.gender.forEach((option) => {
    if (!genderOptions.includes(option)) {
      genderOptions.push(option);
    }
  });

  options.status.forEach((option) => {
    if (!statusOptions.includes(option)) {
      statusOptions.push(option);
    }
  });

  options.species.forEach((option) => {
    if (!speciesOptions.includes(option)) {
      speciesOptions.push(option);
    }
  });

  createOptionNodes(genderOptions, filterMap.gender);
  createOptionNodes(statusOptions, filterMap.status);
  createOptionNodes(speciesOptions, filterMap.species);

  // for (const optionType in options) {
  //   console.log("optionType ",optionType);
  //   console.log("options[optionType]",options[optionType]);
  //   console.log("filterMap[optionType]", filterMap[optionType]);
  //   createOptionNodes(options[optionType], filterMap[optionType]);
  // }
};

createOptions();

/* CHOSEN SECTION */
const chosenContainer = document.getElementById("chosen-container");

const cleanChosenContainer = () => {
  chosenContainer.innerHTML = "";
};

const createChosenCards = (chosenIds) => {
  removeCharacter;
  cleanChosenContainer();
  chosenIds.forEach((chosenId) => {
    const chosen = characters.find((character) => chosenId === character.id);

    const card = document.createElement("div");
    card.classList.add("chosen-card");

    const avatar = document.createElement("img");
    avatar.setAttribute("src", chosen.image);

    const textElement = document.createElement("p");
    const text = document.createTextNode(chosen.name);
    textElement.appendChild(text);

    const button = document.createElement("button");
    const textButton = document.createTextNode("Remove");
    card.classList.add("remove-button");
    button.setAttribute("id", chosen.id);
    button.appendChild(textButton);

    card.appendChild(avatar);
    chooseCharacter;
    card.appendChild(textElement);
    card.appendChild(button);

    chosenContainer.appendChild(card);
  });
};

const chooseCharacter = (e) => {
  chosenIds.push(parseInt(e.target.id));
  createChosenCards(chosenIds);
  //  remove the choosen character from the list
  // filtered = filtered.filter((character) => character.id != e.target.id);
  // printCards(filtered);
  createCards(e.target.id);
};

// EVENT LISTENERS
const addEventListenerToChooseButtons = () => {
  const chooseButtons = document.getElementsByClassName("choose-button");
  Array.from(chooseButtons).forEach((button) => {
    button.addEventListener("click", chooseCharacter);
  });
};

const addEventListenerToRemoveButtons = () => {
  const chooseButtons = document.getElementsByClassName("remove-button");
  console.log("chooseButtons", chooseButtons);
  Array.from(chooseButtons).forEach((button) => {
    button.addEventListener("click", removeCharacter);
  });
};

const addEventListenerToSelectsElements = () => {
  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    select.addEventListener("change", () => createCards());
  });
};

// CREATE CARDS
const createCards = (characterToRemove) => {
  cleanCardContainer();
  // console.log("inside createCards function");

  let filtered = [...characters];

  filtered = filtered.filter(
    (character) =>
      (genderFilter.value === "all" ||
        character.gender === genderFilter.value) &&
      (statusFilter.value === "all" ||
        character.status === statusFilter.value) &&
      (speciesFilter.value === "all" ||
        character.species === speciesFilter.value)
  );

  // filtered = filtered.filter((character) => {
  //   if (genderFilter.value === "all") {
  //     return true;
  //   }
  //   return character.gender === genderFilter.value;
  // });

  // filtered = filtered.filter((character) => {
  //   if (statusFilter.value === "all") {
  //     return true;
  //   }
  //   return character.status === statusFilter.value;
  // });

  // filtered = filtered.filter((character) => {
  //   if (speciesFilter.value === "all") {
  //     return true;
  //   }
  //   return character.species === speciesFilter.value;
  // });

  filtered = filtered.filter((character) =>
    character.name.toLowerCase().includes(search.value.toLowerCase())
  );

  console.log("chosenIds", chosenIds);

  if (chosenIds.length > 0) {
    filtered = filtered.filter(
      (character) => !chosenIds.includes(character.id)
    );
  }

  if (characterToRemove) {
    filtered = filtered.filter(
      (character) => character.id != characterToRemove
    );
  }

  if (filtered.length === 0) {
    const textElement = document.createElement("p");
    const text = document.createTextNode("No character matches the filter");
    textElement.appendChild(text);
    characterContainer.appendChild(textElement);
    addEventListenerToChooseButtons();
    addEventListenerToRemoveButtons();
    return;
  }
  // console.log("inside createCards function before calling  printCards");
  printCards(filtered);
  addEventListenerToChooseButtons();
  addEventListenerToRemoveButtons();
};
createCards();
// printCards(characters);

const removeCharacter = (e) => {
  chosenIds = chosenIds.filter(
    (chosenId) => chosenId !== parseInt(e.target.id)
  );
  createChosenCards(chosenIds);
  createCards();
};

search.addEventListener("input", createCards);
for (const filter in filterMap) {
  filterMap[filter].addEventListener("input", createCards);
}

addEventListenerToSelectsElements();
