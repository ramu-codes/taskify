import { useState } from "react";

export default function Counter() {
    let [count, setcount] = useState(0); //intialisation kahte h is line ko 
    console.log("Componenet is render ");  // is line se yah check ho ja rah  h ki jab bhi re render hota h to pura export default funtion counter se ua fir intilisation se re-render hota h....
    let incCount = () => {
        setcount(count + 1);
        console.log(count)

    }


    return (
        <div>
            <h3>
                count = {count}
                <br />
                <hr />
                <button onClick={incCount}>IncreasingCount</button>
            </h3>
        </div>
    )
}