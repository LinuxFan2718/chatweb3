function QuestionAndAnswer(params) {
  const { prompt, completion } = params;
  return (
    <div>
      <div className="textcontainer">
        <div className="prompt textbubble">{prompt}</div>
      </div>
      <div className="textcontainer">
        <div className="completion textbubble">{completion}</div>
      </div>
    </div>
)
}

export default QuestionAndAnswer;