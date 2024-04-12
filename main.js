import * as db from "./db.js";
import * as cat from "./categories.js";

const categories = cat.categories;
// Build each category section
const categoriesContainer = document.querySelector(".categories");
categories.forEach((category) => {
  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("category");
  categoryDiv.id = category.name;

  const categoryTitle = document.createElement("h1");
  categoryTitle.classList.add("category-title");
  categoryTitle.textContent = category.name;
  categoryDiv.appendChild(categoryTitle);

  categoryDiv.appendChild(loadWordButtons(category));

  categoriesContainer.appendChild(categoryDiv);
});

// Load the word buttons for a specific category
function loadWordButtons(category, categoryDiv) {
  // Check if there is already a div for words of this category
  const idVariable = category.name;
  var wordButtonsDiv = document.querySelector(`#${idVariable} .word-buttons`);

  // If the div exists, then we update so that it reflects the state of the words in that category
  if (wordButtonsDiv) {
    console.log("Category found. Using it.");
    const wordButtons = document.querySelectorAll(
      `#${idVariable} .word-buttons button.word-button`
    );
    const buttonTextArray = Array.from(wordButtons).map(
      (button) => button.textContent
    );
    console.log(buttonTextArray);

    //Check if there exist a button for each word in the category words
    category.words.forEach((word) => {
      if (buttonTextArray.includes(word)) {
      } else {
        console.log("No button for " + word + ". Creating button...");
        // Insert before the "Add phrase" button
        wordButtonsDiv.insertBefore(
          createWordButton(word),
          wordButtonsDiv.lastElementChild
        );
      }
    });
  } else {
    console.log("Category " + category.name + " NOT found. Creating...");
    wordButtonsDiv = document.createElement("div");
    wordButtonsDiv.classList.add("word-buttons");

    //Add any custom words available from cookies to the array
    const storedCustomWords = db.getCustomPhrasesFromCategory(category.name);
    console.log("Stored custom words:" + storedCustomWords);
    storedCustomWords.forEach((word) => {
      category.words.push(word);
    });

    //Create a button per word in the category
    category.words.forEach((word) => {
      wordButtonsDiv.appendChild(createWordButton(word));
    });
    // Add the "Add phrase" at the end
    wordButtonsDiv.appendChild(createAddPhraseButton(category));
  }

  return wordButtonsDiv;
}

// Create a word button
function createWordButton(word) {
  const wordButton = document.createElement("button");
  wordButton.classList.add("word-button");
  wordButton.textContent = word;
  wordButton.addEventListener("click", () => {
    if (!wordButton.disabled) {
      wordButton.disabled = true;
      displayAndSpeak(word);
      setTimeout(() => {
        wordButton.disabled = false;
      }, 1000);
    }
  });
  return wordButton;
}

// Create "Add phrase" button
function createAddPhraseButton(category) {
  const addPhraseButton = document.createElement("button");
  addPhraseButton.classList.add("word-button", "add-phrase-button");
  addPhraseButton.textContent = "Add phrase";
  addPhraseButton.addEventListener("click", () => {
    if (!addPhraseButton.disabled) {
      addPhraseButton.disabled = true;
      displaySpeakAndAddPhrase(category);
      setTimeout(() => {
        addPhraseButton.disabled = false;
      }, 1000);
    }
  });
  return addPhraseButton;
}

// Word action on click
function displayAndSpeak(word) {
  displaySpokenText(word);
  speakText(word);
}

// Actions when user presses "Add Phrase"
function displaySpeakAndAddPhrase(category) {
  const input = document.getElementById("custom-word-input");
  const customWord = customWordInput.value.trim();
  displayAndSpeak(customWord);
  const wasAdded = cat.addPhraseToCategory(category.name, customWord)
  if (wasAdded.result) {
    loadWordButtons(category);
  } else {
    showToast(wasAdded.text);
  }
}

// Handle custom word input and button
const customWordButton = document.getElementById("custom-word-button");
const customWordInput = document.getElementById("custom-word-input");

customWordButton.addEventListener("click", () => {
  if (!customWordButton.disabled) {
    const customWord = customWordInput.value.trim();
    if (customWord !== "") {
      customWordButton.disabled = true;
      speakText(customWord);
      displaySpokenText(customWord);
      setTimeout(() => {
        customWordButton.disabled = false;
      }, 1000);
    }
  }
});

// Function to speak the provided text
function speakText(text) {
  // Use a text-to-speech library or API of your choice to speak the text
  // For example, you can use the SpeechSynthesis API:
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

// Function to display the spoken text
function displaySpokenText(text) {
  const spokenTextDiv = document.getElementById("preview-text");
  spokenTextDiv.textContent = text;
}


// Show custom toast
function showToast(text) {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 3000); // Hide after 3 seconds (adjust as needed)
}

// Function to flip the text upside down
function flipText() {
  const spokenTextDiv = document.getElementById("preview-text");
  spokenTextDiv.classList.toggle("flipped");
}

// Add event listener to the flip button
const flipButton = document.getElementById("preview-box");
flipButton.addEventListener("click", flipText);

// Function to disable/enable custom-word-button based on input value
function checkCustomWordInput() {
  const button = document.getElementById("custom-word-button");
  button.disabled = this.value.trim() === "";
}

// Attach event listeners to input and change events of custom-word-input
const input = document.getElementById("custom-word-input");
input.addEventListener("input", checkCustomWordInput);

// Trigger the function once on page load
checkCustomWordInput.call(input);
