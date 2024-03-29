// Array of category names and their corresponding words
const categories = [
    {
        name: 'Introductional',
        words: ['Hello', 'How are you?', 'My name is Shannon', 'I can not speak, so I speak through this app', 'Bye']
      },
      {
        name: 'Common',
        words: ['Yes', 'No', 'Thank you', 'Please', 'Maybe', 'Why?', 'Okay', 'I do not know', 'Hahahaha']
      },
      {
        name: 'Feelings',
        words: ['I like it', 'I do not like it', 'I love you']
      },
      {
        name: 'Needs',
        words: ['I am hungry', 'I am thirsty', 'I have to pee']
      },
      {
        name: 'Directional',
        words: ['Come', 'I am coming', 'I am leaving']
      }
    ];

   // Create word buttons for each category
   const categoriesContainer = document.querySelector('.categories');
    categories.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('category');

      const categoryTitle = document.createElement('h1');
      categoryTitle.classList.add('category-title');
      categoryTitle.textContent = category.name;
      categoryDiv.appendChild(categoryTitle);

      const wordButtonsDiv = document.createElement('div');
      wordButtonsDiv.classList.add('word-buttons');

      category.words.forEach(word => {
        const wordButton = document.createElement('button');
        wordButton.classList.add('word-button');
        wordButton.textContent = word;
        wordButton.addEventListener('click', () => {
          if (!wordButton.disabled) {
            wordButton.disabled = true;
            speakText(word);
            displaySpokenText(word);
            setTimeout(() => {
              wordButton.disabled = false;
            }, 1000);
          }
        });
        wordButtonsDiv.appendChild(wordButton);
      });

      categoryDiv.appendChild(wordButtonsDiv);
      categoriesContainer.appendChild(categoryDiv);
    });

    // Handle custom word input and button
    const customWordButton = document.getElementById('custom-word-button');
    const customWordInput = document.getElementById('custom-word-input');

    customWordButton.addEventListener('click', () => {
      if (!customWordButton.disabled) {
        const customWord = customWordInput.value.trim();
        if (customWord !== '') {
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
      const spokenTextDiv = document.getElementById('preview-text');
      spokenTextDiv.textContent = text;
    }

    // Function to flip the text upside down
    function flipText() {
      const spokenTextDiv = document.getElementById('preview-text');
      spokenTextDiv.classList.toggle('flipped');
    }

    // Add event listener to the flip button
    const flipButton = document.getElementById('preview-box');
    flipButton.addEventListener('click', flipText);

    // Function to disable/enable custom-word-button based on input value
    function checkCustomWordInput() {
      const button = document.getElementById('custom-word-button');
      button.disabled = this.value.trim() === '';
    }

    // Attach event listeners to input and change events of custom-word-input
    const input = document.getElementById('custom-word-input');
    input.addEventListener('input', checkCustomWordInput);

    // Trigger the function once on page load
    checkCustomWordInput.call(input);