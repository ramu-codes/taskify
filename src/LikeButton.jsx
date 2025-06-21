import { useState } from "react";

export default function LikeButton() {
    let [isLiked, setIsLiked] = useState(false)
    let [click, setclick] = useState(0)

    let toggleLike = () => {
        setIsLiked(!isLiked);
        setclick(click+1)
    }
    
let likeStyle= {color: "red"}

    return (
        <div>
            Like = {click}
            <h1 onClick={toggleLike}>
                {
                    isLiked ? (

                        <i className="fa-solid fa-heart" style={likeStyle}></i>
                    ) : (
                        <i className="fa-regular fa-heart"></i>
                    )
                }
            </h1>
        </div>
    );
}