import { useState } from "react"

const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  const calculateAll = () => {
    return good + neutral + bad
  }

  const averageScore = () => {
    const sumOfScores = good * 1 + neutral * 0 + bad * -1
    return sumOfScores / calculateAll()
  }

  const positivePercent = () => {
    return (good / calculateAll()) * 100 + "%"
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={addGood} />
      <Button name="neutral" handleClick={addNeutral} />
      <Button name="bad" handleClick={addBad} />

      <h1>statistics</h1>
      {calculateAll() ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={calculateAll()}
          average={averageScore()}
          positive={positivePercent()}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

export default App
