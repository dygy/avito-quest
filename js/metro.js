function changeMetros(){
 // console.log(elem('searchCity').value);
    const city = elem('searchCity').value;
    switch (city) {
        case 'Moscow':
            METROS=[];
            Metros=[];
            METROS.push('Наманная', 'Ненаманнная', "Такая себе", "Четкая", "Гендерфлюидная");
            Metros.push('Наманная', 'Ненаманнная', "Такая себе", "Четкая", "Гендерфлюидная");
            METROS.sort();
            elem('searchMetro').placeholder = 'Метро';
            break;
        case 'Peter':
            METROS=[];
            Metros=[];
            METROS.push('Наркологическая', 'Улица имени 63 Гендера');
            Metros=METROS;
            METROS.sort();

            elem('searchMetro').placeholder = 'Метро';
            break;

        case 'Chota':
            METROS = [];
            Metros = [];
            elem('searchMetro').placeholder = 'Тут метра не будет';
            break
    }
}


// get our DOM nodes
const autocomplete = document.getElementById("autocomplete");
const searchInput = document.getElementById("searchMetro");
const suggestions = document.getElementById("suggestions");

// example data
let Metros = ['Наманная','Ненаманнная',"Такая себе","Четкая","Гендерфлюидная"];
// state to keep track of
let METROS = Metros; // fruit is initially not filtered
let CURRENT_INDEX = -1; // index of highlighted item—starts at -1 since 0 is the first item

function openSuggestions() {
    suggestions.hidden = false; // show popup
    autocomplete.setAttribute("aria-expanded", true); // tell assistive tech popup is shown
    window.addEventListener("click", closeSuggestions); // clicking the body should close the popup
}

function closeSuggestions() {
    CURRENT_INDEX = -1; // reset back to initial value
    suggestions.hidden = true; // hide popup
    autocomplete.setAttribute("aria-expanded", false); // tell assistive tech popup is hidden
    window.removeEventListener("click", closeSuggestions); // don't need this anymore once it's closed
    searchInput.focus(); // focus should stay on the input
}

function selectItem() {
    searchInput.value = METROS[CURRENT_INDEX]; // update input value to show selection
    closeSuggestions();
}

function updateIndex(newIndex) {
    const prevIndex = CURRENT_INDEX;
    CURRENT_INDEX = newIndex;
    autocomplete.setAttribute("aria-activedescendant", CURRENT_INDEX); // tells assistive-tech which li is highlighted
    const prevLi = document.getElementById(`option-${prevIndex}`);
    const currentLi = document.getElementById(`option-${CURRENT_INDEX}`);
    if (prevLi) prevLi.classList.remove("current"); // remove prev li background
    if (currentLi) currentLi.classList.add("current"); // add bg to new li
}

// is called every time the user types into the input
function handleInput(event) {
    const userInput = event.target.value;
    METROS = Metros.filter(f => f.includes(userInput)); // filter our fruit based on what was typed
    suggestions.innerHTML = ""; // clear out old suggestions
    METROS.forEach(createOption);
    if (userInput.length > 0) {
        openSuggestions(); // show the suggestions if the user typed something
    } else {
        closeSuggestions(); // close them if user backspaces to empty the input
    }
}

function createOption(name, index) {
    const li = document.createElement("li");
    li.id = `option-${index}`; // we'll need this ID to track which one is highlighted
    li.role = "option"; // necessary for any children of a role="listbox"
    li.textContent = name;
    li.addEventListener("mouseover", () => updateIndex(index));
    li.addEventListener("click", selectItem);
    suggestions.appendChild(li);
}

searchInput.addEventListener("input", handleInput);

function highlightNext() {
    const newIndex = (CURRENT_INDEX + 1) % METROS.length; // loops back to the first item after the last
    updateIndex(newIndex);
}

function highlightPrev() {
    const newIndex = (CURRENT_INDEX - 1 + METROS.length) % METROS.length; // loops back to the last item before first
    updateIndex(newIndex);
}

// runs on every keypress within the autocomplete
function handleKeyDown(event) {
    switch (event.key) {
        case "Escape":
            closeSuggestions();
            break;
        case "ArrowDown":
            highlightNext();
            break;
        case "ArrowUp":
            highlightPrev();
            break;
        case "Enter":
            selectItem();
    }
}

autocomplete.addEventListener("keydown", handleKeyDown);
