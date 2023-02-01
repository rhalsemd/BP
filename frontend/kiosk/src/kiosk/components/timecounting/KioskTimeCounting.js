import { useEffect, useState } from "react";

const KioskTimeCounting = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);
    if (count === 0) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [count]);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  )
}

export default KioskTimeCounting;