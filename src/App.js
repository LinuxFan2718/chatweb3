import './App.css';
import { useState } from 'react';
import uri from './uri';
import QuestionAndAnswer from './QuestionAndAnswer';

function App() {
  const [speaking, setSpeaking] = useState(false);
  const [questionAndAnswers, setQuestionAndAnswers] = useState([
    {
      prompt: "What are you?",
      completion: "I am the famous OpenAI ChatGPT bot, but with the latest crypto news added!"
    }
  ]);

  const handleSubmit = event => {
    event.preventDefault();
    let userPrompt = event.currentTarget.prompt.value;
    if (userPrompt) {
      getCompletion(userPrompt);
    };
    event.target.reset();
  }

  const getCompletion = async (prompt) => {
    let completion;
    const oldQuestionsAndAnswers = questionAndAnswers;
    setQuestionAndAnswers([...questionAndAnswers, {prompt: prompt, completion: "..."}]);
    if (prompt.indexOf("FTX") > -1) {
      completion = 'FTX filed for Chapter 11 bankruptcy protection on Nov. 11, 2022, and CEO Sam Bankman-Fried resigned. According to its bankruptcy filing, FTX, which was once valued at $32 billion and has $8 billion of liabilities it can\'t pay to as many as 1 million creditors. The exchange\'s collapse was the result of "a complete failure of corporate control," according to John J. Ray III, the new, court-appointed chief executive of FTX.';
    } else if (prompt.indexOf("Terra") > -1) {
      completion = 'On May 7, 2022, the price of the Terra blockchain\'s then-$18-billion stablecoin terraUSD (UST), which is supposed to maintain a $1 peg, started to wobble and fell to 35 cents on May 9. Its companion token, LUNA, which was meant to stabilize UST\'s price, fell from $80 to a few cents by May 12.'
    } else {
      const headers = {
        'Content-Type': 'application/json'
      };
      const data = {
        prompt: prompt
      }
      const response = await fetch(uri(), {
        method: 'post',
        headers: headers,
        body: JSON.stringify(data)
      })
      const results = await response.json();
      completion = results.choices[0].text;
    };
    const thisQuestionAndAnswer = {prompt: prompt, completion: completion};
    const newQuestionAndAnswers = [...oldQuestionsAndAnswers, thisQuestionAndAnswer]
    setQuestionAndAnswers(newQuestionAndAnswers);

    if ('speechSynthesis' in window) {
      var msg = new SpeechSynthesisUtterance();
      msg.text = completion;

      msg.volume = 1; // Set the volume (0 to 1)
      msg.rate = 1; // Set the speaking rate (0.1 to 10)
      msg.pitch = 1; // Set the pitch (0 to 2)
      msg.addEventListener('start', (event) => {
        setSpeaking(true);
      });
      msg.addEventListener('end', (event) => {
        setSpeaking(false);
      });

      window.speechSynthesis.speak(msg);
    } else {
      console.log('// Web Speech API is not supported')
    }

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;
      recognition.addEventListener('result', function(event) {
        var transcript = event.results[0][0].transcript;
        console.log(transcript);
        getCompletion(transcript);
      });
      recognition.start();
    } else {
      console.log('Speech Recognition API is not supported')
    }
  }

  return (
    <div className="App">
      <p>
        A 🌴 <a href="https://www.miamihackweek.com/">Miami Hack Week 2023</a> project by 👨 <a href="https://cahillanelabs.com/profile-dennis">Dennis</a> at 🏠 <a href="https://www.daohouse.org/">DAO House</a>.
      </p>
      <div className="wrapper">
        <h1>ChatWeb3</h1>
        <img className={speaking ? 'speaking avatar' : 'silent avatar'} src="avatar.png" alt="robot avatar" />
        <p>{speaking ? 'Speaking...' : 'Not speaking'}</p>
        <div>
        { questionAndAnswers.map((questionAndAnswer) => {
          return <QuestionAndAnswer key={questionAndAnswer.prompt} prompt={questionAndAnswer.prompt} completion={questionAndAnswer.completion} />
        }) }
        </div>
        <br />
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input name="prompt" />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
