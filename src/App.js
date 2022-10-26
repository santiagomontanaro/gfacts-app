import { useEffect, useState } from 'react';
import './App.css';
import translate from "translate";

function App() {

  translate.engine = 'google';
  translate.key = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;


  const [fact, setFact] = useState('')
  const [factComp, setfactComp] = useState('')
  const [gif, setGif] = useState('')

  const fetchingFact = async () => {
    const url = 'https://catfact.ninja/fact'
    const response = await fetch(url)
    const data = await response.json()
    translate(data.fact, { from: 'en', to: 'es' }).then(res => {
      setfactComp(res)
    })
    setFact(data.fact.split(' ', 4).join(' '))
  }

  async function fetchingGif(param) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=AaxWvWC73WGuQetWmy5EY9lWpOdzoYSA&q=${param}&limit=100&offset=0&rating=g&lang=en`
    const response = await fetch(url)
    const data = await response.json()
    setGif(data.data[0].images.original.url)
  }

  useEffect(() => {
    fetchingFact()
  }, [])

  useEffect(() => {
    fetchingGif(fact)
  }, [fact])

  //button that changes the fact randomly
  const handleClick = () => {
    fetchingFact()
  }

  //translate the fact to spanish

  if (fact && gif) {
    return (
      <div className="App">
        <h1>{factComp}</h1>
        <span>
          {
            gif && <img src={gif} alt="gif" /> ? <img src={gif} alt="gif" /> : <p>loading...</p>
          }
        </span>
        <button type='button' onClick={handleClick}>Random</button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    )
  }

}

export default App;