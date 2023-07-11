import { useState } from "react";

const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  const average = (good - bad) / total;

  const positive = `${(good / total) * 100} %`;

  const hasFeedback = total > 0;

  {
    if (!hasFeedback) {
      return <p>No feedback given</p>;
    } else {
      return (
        <div>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='total' value={total} />
          {!isNaN(average) && <Statistic text='average' value={average} />}
          {!isNaN((good / total) * 100) && (
            <Statistic text='positive' value={positive} />
          )}
        </div>
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
