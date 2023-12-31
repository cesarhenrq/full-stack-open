import { useState } from "react";

const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <>
    <td>{text}</td>
    <td>{value}</td>
  </>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  const average = ((good - bad) / total).toFixed(1);

  const positive = `${((good / total) * 100).toFixed(2)} %`;

  const hasFeedback = total > 0;

  {
    if (!hasFeedback) {
      return <p>No feedback given</p>;
    } else {
      return (
        <table>
          <tbody>
            <tr>
              <StatisticLine text='good' value={good} />
            </tr>
            <tr>
              <StatisticLine text='neutral' value={neutral} />
            </tr>
            <tr>
              <StatisticLine text='bad' value={bad} />
            </tr>
            <tr>
              <StatisticLine text='total' value={total} />
            </tr>
            <tr>
              {!isNaN(average) && (
                <StatisticLine text='average' value={average} />
              )}
            </tr>
            <tr>
              {!isNaN((good / total) * 100) && (
                <StatisticLine text='positive' value={positive} />
              )}
            </tr>
          </tbody>
        </table>
      );
    }
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title text='give feedback' />
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />
      <Title text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
