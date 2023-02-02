function QuestionAndAnswer(params) {
  const { prompt, completion } = params;
  return (
    <div>
      <h3>Prompt</h3>
      <div>{prompt}</div>
      <h3>Completion</h3>
      <div>{completion}</div>
    </div>
)
}

export default QuestionAndAnswer;