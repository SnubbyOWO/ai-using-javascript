  var nothin = '';

  // Get references to the chat window and form
  const chatWindow = document.getElementById('chat-window');
  const chatForm = document.getElementById('chat-form');
  const textto = document.getElementById('textto');
  
  // Checks if the user said goodbye before
  let SAID = false;

  // The time
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  // Name of AI
  var ainame;

  // TTS
  let speaknow = new SpeechSynthesisUtterance();
  
  var tts;

  // Handle form submission
  chatForm.addEventListener('submit', e => {
    e.preventDefault(); // prevent the form from refreshing the page

    // Get the selected option value
    const message = document.getElementById('chat-input').value;

    let textmessage = document.querySelector(`option[value="${message}"]`).innerText;

    tts = localStorage.getItem("tss");


    // Add the user's message to the chat window
    chatWindow.innerHTML += `
    <div class="message-wrapper user-message">
        <!-- Add a profile picture for the user -->
        <img src="https://i.pinimg.com/236x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg" alt="User profile picture" class="profile-picture">
        <!-- Add the message content -->
        <div class="message-content">
            <p>${textmessage}</p>
        </div>
      </div>
    `;

    // Send the message to the AI and get a response
    const response = getResponseFromAI(message);

    // Get the available voices
    var voices = window.speechSynthesis.getVoices();

    // Find the female voice
    var femaleVoice = voices.find(function(voice) {
      return voice.gender === "female";
    });

    // Create a new speech synthesis utterance
    var utterance = new SpeechSynthesisUtterance(response);

    // Set the voice
    utterance.voice = femaleVoice;

    // Speak the text
    if (tts == 'true'){
      window.speechSynthesis.speak(utterance);
    }

    // Add the AI's response to the chat window
    chatWindow.innerHTML += `
    <div class="message-wrapper ai-message">
        <!-- Add a profile picture for the AI -->
        <img src="https://cdn.discordapp.com/avatars/558453792593412127/8c33b0888df9a1e3126075130896fe96.png?size=1024" alt="AI profile picture" class="profile-picture">
        <!-- Add the message content -->
        <div class="message-content">
        <p>${response}</p>
        </div>
      </div>
    `;
  });

  function getResponseFromAI(message) {
    switch (message) {
      case 'greeting':
        return 'Hello! How can I help you today?';
      case 'question':
        return 'I am just a computer program, so I don\'t have feelings or emotions. But I am here to assist you with any questions you might have.';
      case 'goodbye':
        return goodbyes();
      case 'random quote':
        return generateRandomQuote();
      case 'time':
        return curdate();
      case 'name':
        return whatname();
      default:
        return 'I\'m sorry, I didn\'t understand your message. Could you please choose from one of the available options?';
    }
  }

  function whatname(){
    ainame = localStorage.getItem("ainame");

    if (ainame == null){
      let typed = prompt("Give a name to the AI!");

      localStorage.setItem('ainame', typed);

      return 'Just named! Ask for my name again!'
    } else {
      return 'Seems the name you have given me is ' + ainame + '! So that is my name.'
    }
  }

  function curdate(){
    const replys = [
      'It is ' + today.toLocaleDateString() + ' currently!',
      'Hmm it seems to be ' + today.toLocaleDateString() + ' today.',
      'I\'m pretty sure its ' + today.toLocaleDateString() + '!',
      today.toLocaleDateString() + ' right now!'
    ];

    const randomIndex = Math.floor(Math.random() * replys.length);

    return replys[randomIndex];
  }

  function goodbyes(){
    const byes = [
      'Goodbye! I hope I was able to help you',
      'Cya!',
      'Bye! Hope I helped',
      'Goodbye then! Hoped I helped!'
    ];

    const randomIndex = Math.floor(Math.random() * byes.length);

    if (!SAID)
    {
      SAID = !SAID;
      return byes[randomIndex];
    } 
    else if (SAID)
    {
      SAID = !SAID;
      return 'Goodbye? Again..?';
    }
  }

  function generateRandomQuote() {
    // An array of quotes to choose from
    const quotes = [
      "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it. - Steve Jobs", 
      "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. - Albert Schweitzer", 
      "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart. - Helen Keller", 
      "The only way to do great work is to be passionate about what you do. If you're not, find something else to do. - Steve Jobs", 
      "The best revenge is to be unlike him who performed the injury. - Marcus Aurelius", 
      "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis", 
      "The only way to do great work is to be obsessed with it. - Steve Jobs", 
      "The only way to do great work is to be completely involved with it. - Steve Jobs", 
      "The only way to do great work is to be passionate about what you do. If you're not, find something else to do. - Steve Jobs", 
      "The only way to do great work is to be obsessed with it. - Steve Jobs", 
      "The best revenge is to be unlike him who performed the injury. - Marcus Aurelius", 
      "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis", 
      "The only way to do great work is to be completely involved with it. - Steve Jobs", 
      "The only way to do great work is to be passionate about what you do. If you're not, find something else to do. - Steve Jobs", 
      "The only way to do great work is to be obsessed with it. - Steve Jobs", 
      "The best revenge is to be unlike him who performed the injury. - Marcus Aurelius", 
      "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis", 
      "The only way to do great work is to be completely involved with it. - Steve Jobs", 
      "The only way to do great work is to be passionate about what you do. If you're not, find something else to do. - Steve Jobs", 
      "The universe is not a friendly place. But it's not hostile either. It's simply indifferent. - Michael Reeves"
    ];

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);

    // Return the quote at the random index
    return quotes[randomIndex];
  }

  chatForm.addEventListener('reset', e => {
    e.preventDefault(); // prevent the form from refreshing the page

    localStorage.removeItem('ainame');

    chatWindow.innerHTML = ``;
  });

  textto.addEventListener("click", e => {
    e.preventDefault(); // prevent the form from refreshing the page

      tts = localStorage.getItem("tss");

      if (tts == 'true'){
        //alert("TTS is off!")
        textto.style.color = "red";
        localStorage.setItem('tss', 'false');
      } else{
        //alert("TTS is on!")
        textto.style.color = "green";
        localStorage.setItem('tss', 'true');
      }
  });


  // The color of the button should be already colored so we do lazy code now
  tts = localStorage.getItem("tss");

  if (tts == 'true'){
      textto.style.color = "green";
    } else {
      textto.style.color = "red";
    }