function QuestionAndAnswer(params) {
  const { prompt, completion } = params;
  return (
    <div>
      <div className="prompt">{prompt}</div>
      <div className="completion">{completion}</div>
    </div>
)
}

export default QuestionAndAnswer;