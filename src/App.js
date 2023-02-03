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
  }

  const getCompletion = async (prompt) => {
    const oldQuestionsAndAnswers = questionAndAnswers;
    setQuestionAndAnswers([...questionAndAnswers, {prompt: prompt, completion: "..."}]);
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
    const completion = results.choices[0].text;
    const thisQuestionAndAnswer = {prompt: prompt, completion: completion};
    const newQuestionAndAnswers = [...oldQuestionsAndAnswers, thisQuestionAndAnswer]
    setQuestionAndAnswers(newQuestionAndAnswers);
  }

  return (
    <div className="App">
      <p>
        A <a href="https://www.miamihackweek.com/">Miami Hack Week 2023</a> project by <a href="https://cahillanelabs.com/profile-dennis">Dennis</a> at <a href="https://www.daohouse.org/">DAO House</a>.
      </p>
      <div className="wrapper">
        <h1>ChatWeb3</h1>
        { questionAndAnswers.map((questionAndAnswer) => {
          return <QuestionAndAnswer key={questionAndAnswer.prompt} prompt={questionAndAnswer.prompt} completion={questionAndAnswer.completion} />
        }) }
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <p>Input Prompt</p>
              <input name="prompt" />
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
