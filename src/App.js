import React, {useEffect, useCallback, useState} from 'react';
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import shuffle from 'lodash.shuffle'
import './App.css';

export default function App() {

  const [category, setCategory] = useState('any')
  const [data, setData] = useState({
    correct_ans: null,
    correct_ans_title: null,
    data: null
  })
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [questionTitle, setQuestionTitle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isWin, setIsWin] = useState(null)

  const onChangeCategory = (val) => {
    setCategory(val)
  }

  const computateResult = (id) => {
    if (id === data.correct_ans) {
      setIsWin(true)
      setWins((wins) => wins + 1)
    }
    else {
      setIsWin(false)
      setLosses((losses) => losses + 1)
    }
  }

  const fetchData = useCallback(() => {
    setIsWin(null)
    setLoading(true)
    let url = 'https://opentdb.com/api.php?amount=1'
    
    if ( (category) && (category !== 'any') ) {
      url += `&category=${category}`
    }

    console.log('url', url)
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        const incorrect_ans = data.results[0].incorrect_answers
        const correct_ans = data.results[0].correct_answer
        const tempArr = [...incorrect_ans, correct_ans]
        const shuffledArr = shuffle(tempArr)
        let correct_id;
        for (let i = 0; i < shuffledArr.length; i++) {
          if (shuffledArr[i] === correct_ans) {
            correct_id = i
            break
          }
        }
        setData({correct_ans: correct_id, correct_ans_title: correct_ans, data: shuffledArr})
        setQuestionTitle(data.results[0].question)
        setLoading(false)
      })
    console.log('Fetching data has been successful!')
  }, [category])

  useEffect(() => {
    fetchData()
  }, [fetchData, category])

  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      { isWin !== null && <ResultModal isWin={isWin} fetchData={fetchData} correct={data.correct_ans_title}/>}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector onChangeCategory={onChangeCategory}/>
        <Scoreboard wins={wins} losses={losses}/>
      </div>

      {/* the question itself ----------------------- */}
      <div className="question-main">
        { data.data && <Question data={data.data} title={questionTitle} loading={loading} computateResult={computateResult}/> }
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
        <button onClick={() => fetchData()}>Go to next question 👉</button>
      </div>
    </div>
  );
}
