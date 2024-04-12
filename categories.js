import * as db from "./db.js";
// Array of category names and their corresponding words
export var categories = [
  {
    name: "Introductional",
    words: [
      "Hello",
      "How are you?",
      "My name is Shannon",
      "I can not speak, so I speak through this app",
      "Bye",
    ],
  },
  {
    name: "Common",
    words: [
      "Yes",
      "No",
      "Thank you",
      "Please",
      "Maybe",
      "Why?",
      "Okay",
      "I do not know",
      "Hahahaha",
    ],
  },
  {
    name: "Feelings",
    words: ["I like it", "I do not like it", "I love you"],
  },
  {
    name: "Needs",
    words: ["I am hungry", "I am thirsty", "I have to pee"],
  },
  {
    name: "Directional",
    words: ["Come", "I am coming", "I am leaving"],
  },
];

// Function to add custom word to category
export function addPhraseToCategory(categoryName, newWord) {
  // Create output object
  var output = {
    result: false,
    text: " ",
  };

  // Check if category exists
  const categoryIndex = categories.findIndex(
    (category) => category.name == categoryName
  );
  if (categoryIndex == -1) {
    console.log("Trying to add a word to an inexistent category.");
    output.result = false;
    output.text = "Category does not exist.";
    return output;
  }

  // Check if the word already exists (in any category)
  const categoriesWithWord = [];
  categories.forEach((category) => {
    if (category.words.includes(newWord)) {
      categoriesWithWord.push(category.name);
    }
  });

  if (categoriesWithWord.length > 0) {
    console.log('This phrase already exists in "' + categoriesWithWord + '"');
    output.result = false;
    output.text = 'This phrase already exists in "' + categoriesWithWord + '"';
    return output;
  }

  // Add the string to the "words" array using push() method
  categories[categoryIndex].words.push(newWord);
  output.result = true;
  output.text = newWord;

  hashString(newWord)
    .then((hash) => {
      const cookieKey = categoryName + "_" + hash;
      console.log("New cookie. Key: " + cookieKey + " value: " + newWord);
      db.setCookie(cookieKey, newWord, 3650);
    })
    .catch((error) => console.error("Error:", error));

  return output;
}

async function hashString(inputString) {
  // Convert the input string to an ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(inputString);

  // Calculate the hash using SHA-256 algorithm
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the hash ArrayBuffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
