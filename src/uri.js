const uri = () => {
  let base;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    base = "http://127.0.0.1:8787/";
  } else {
    base = "https://chatweb3worker.dennislibre.workers.dev/"
  }
  return base
}

export default uri;