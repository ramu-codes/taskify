import { useState } from 'react';

export default function Counter2() {
  const [count, setCount] = useState(44);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}