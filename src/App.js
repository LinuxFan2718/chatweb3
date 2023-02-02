import './App.css';
import { useState } from 'react';
import uri from './uri';
function App() {
  const [submitting, setSubmitting] = useState(false);
  const [completion, setCompletion] = useState("");
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    let userPrompt = event.currentTarget.prompt.value;
    if (userPrompt) {
      getCompletion(userPrompt);
    }
    setSubmitting(false);
  }

  const getCompletion = async (prompt) => {
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
    setCompletion(completion);
  }

  return (
    <div className="App">
      <p>
        ChatGPT is out of date. ChatWeb3 knows about the latest Web3 events!
      </p>
      <p>
        A <a href="https://www.miamihackweek.com/">Miami Hack Week 2023</a> project by <a href="https://cahillanelabs.com/profile-dennis">Dennis</a> at <a href="https://www.daohouse.org/">DAO House</a>.
      </p>
      <div className="wrapper">
        <h1>ChatWeb3</h1>
        {submitting &&
        <div>Submitting Form...</div>
      }
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <p>Prompt</p>
              <input name="prompt" />
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
        <h2>Completion</h2>
        <div>
          <div className='completion'>{completion}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
