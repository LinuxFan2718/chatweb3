import './App.css';
import { useState } from 'react';
import uri from './uri';
import QuestionAndAnswer from './QuestionAndAnswer';

function App() {
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
  }

  return (
    <div className="App">
      <p>
        A 🌴 <a href="https://www.miamihackweek.com/">Miami Hack Week 2023</a> project by 👨 <a href="https://cahillanelabs.com/profile-dennis">Dennis</a> at 🏠 <a href="https://www.daohouse.org/">DAO House</a>.
      </p>
      <div className="wrapper">
        <h1>ChatWeb3</h1>
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
