import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

interface ReviewCardProps {
    review: {
        id: number;
        rating: number;
        dramaId: number;
        comment: string;
        likes: number;
        time: Date;
        createdAt: Date;
        updatedAt: Date;
    };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const [likes, setLikes] = useState(review.likes);
    var relativeTime = require("dayjs/plugin/relativeTime");
    dayjs.extend(relativeTime);
    // Function to set an array as a cookie
    function setArrayCookie(arrayValue: number[], daysToExpire: number) {
        const stringValue = JSON.stringify(arrayValue);
        setCookie(stringValue, daysToExpire);
    }

    function setCookie(value: any, daysToExpire: number) {
        const expirationDate = new Date();
        expirationDate.setTime(
            expirationDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000
        );
        const expires = "expires=" + expirationDate.toUTCString();
        document.cookie =
            "reviewArray=" +
            encodeURIComponent(value) +
            ";" +
            expires +
            ";path=/";
    }
    function getCookie() {
        const cookieName = "reviewArray";
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.split("=")[0] == cookieName) {
                return decodeURIComponent(
                    cookie.substring(cookieName.length, cookie.length)
                );
            }
        }
        return "";
    }

    // Function to get an array from a cookie
    function getArrayCookie() {
        const stringValue = getCookie();
        if (stringValue !== "") {
            return JSON.parse(stringValue.split("=")[1]);
        }
        return [];
    }

    // Function to update an array stored in a cookie
    function incrementArrayCookie(id: number, daysToExpire: number) {
        const existingArray = getArrayCookie();
        existingArray.push(id);
        setArrayCookie(existingArray, daysToExpire);
    }

    function decrementArrayCookie(id: number, daysToExpire: number) {
        const existingArray = getArrayCookie();
        existingArray.push(id);
        const removedIdArray = existingArray.filter(
            (existingId: number) => existingId !== id
        );
        setArrayCookie(removedIdArray, daysToExpire);
    }

    const handleUpdateLike = async (endpoint: string) => {
        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((r) => console.log("Like response: ", r))
            .catch((e) => console.log("Error handling like", e));
    };

    const handleLike = async () => {
        let currentLikes = likes;
        if (getCookie()) {
            let reviewIdArr = getArrayCookie();
            if (reviewIdArr.includes(review.id)) {
                handleUpdateLike(
                    `http://localhost:3000/reviews/decrementLike/reviewId=${review.id}`
                );
                decrementArrayCookie(review.id, 365);
                setLikes((currentLikes -= 1));
            } else {
                handleUpdateLike(
                    `http://localhost:3000/reviews/incrementLike/reviewId=${review.id}`
                );
                incrementArrayCookie(review.id, 365);
                setLikes((currentLikes += 1));
            }
        } else {
            setArrayCookie([], 365);
            handleUpdateLike(
                `http://localhost:3000/reviews/incrementLike/reviewId=${review.id}`
            );
            incrementArrayCookie(review.id, 365);
            setLikes((currentLikes += 1));
        }
    };

    return (
        <div className="border-2 border-primary p-5 rounded-xl border-dotted space-y-5 xl:text-lg text-sm text-txt">
            <div className="flex flex-row items-center justify-between">
                <Rating
                    initialValue={review.rating / 2}
                    transition
                    allowFraction={true}
                />

                <div>{dayjs(review.createdAt).fromNow()}</div>
            </div>
            <div>{`Review: ${review.comment}`}</div>
            <div className="flex flex-row items-center justify-end gap-x-2 font-bold">
                <div>{likes}</div>
                <HandThumbUpIcon
                    onClick={handleLike}
                    className="w-7 h-7 text-txt hover:text-primary cursor-pointer"
                />
            </div>
        </div>
    );
};

export default ReviewCard;
