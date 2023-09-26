import React, { useState, useCallback } from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { useRouter } from "next/router";
import BackButton from "../../../../components/BackButton";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import PrimaryButton from "../../../../components/PrimaryButton";
import dayjs from "dayjs";

export async function getServerSideProps(context) {
    try {
        const { query } = context;
        const dramaId = query.dramaId;
        console.log(dramaId);

        const data = await fetch(
            `http://localhost:3000/dramas/dramaId=${dramaId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const jsonData = await data.json(); // Await the json() method
        // Return data as props
        return {
            props: {
                data: jsonData,
            },
        };
    } catch (e) {
        console.error("Error getting data: " + e);
        return {
            props: {
                data: null, // Return null or an empty object as data in case of an error
            },
        };
    }
}
interface AddReviewProps {
    data: {
        drama: {
            createdAt: Date;
            description: string;
            genres: String[];
            id: number;
            imgUrl: string;
            language: string;
            name: string;
            updatedAt: Date;
            year: string;
        };
    };
}

const AddReview: React.FC<AddReviewProps> = ({ data }) => {
    const drama = data.drama;
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { category } = router.query;

    const handleSubmitRating = useCallback(async () => {
        const endPoint = `http://localhost:3000/reviews`;
        try {
            const promise = await fetch(endPoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dramaId: drama.id,
                    rating: rating,
                    comment: comment,
                    time: dayjs(),
                }),
            });
            const res = await promise.json();
            console.log(res);
        } catch (e) {
            console.log("Error submitting review: ", e);
        }
    }, [rating, comment]);

    return (
        <>
            <Navbar />
            <div className="p-10">
                <BackButton />
            </div>
            <div className="flex flex-col items-center gap-y-5">
                <div className="text-blue-300 w-1/2 self-center text-2xl">
                    Add a review for:
                </div>
                <div className="text-center text-blue-500 text-2xl">
                    {`${drama.name} (${drama.year})`}{" "}
                </div>

                <Image
                    priority={true}
                    src={drama.imgUrl}
                    alt={drama.name}
                    className="w-72 h-96 border-2 border-blue-200 rounded-md"
                    width={100}
                    height={100}
                />
                <div className="flex flex-row w-1/2 justify-between items-center pt-10">
                    <div>
                        <div className="text-2xl text-blue-500">
                            Rate the Drama
                        </div>
                        <div className="text-lg text-gray-500">
                            Give the drama a rating out of 5 stars (you can use
                            half a star)
                        </div>
                    </div>
                    <Rating
                        transition
                        onClick={(rating: number) => setRating(rating)}
                        allowFraction={true}
                    />
                </div>
                <div className="w-1/2">
                    <div className="text-2xl text-blue-500 self-start">
                        Write a comment
                    </div>
                    <div className="text-lg text-gray-500">
                        Share your thoughts on the Drama, did you enjoy watching
                        it? would you recommend it to others?
                    </div>
                    <div className="pt-10">
                        <textarea
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            placeholder="Write a helpful comment (at least 80 characters)"
                            className="w-5/6 h-40 border-2 border-blue-400 rounded-lg p-5"
                        />
                        {comment.length > 0 && comment.length < 80 && (
                            <div className="text-orange-700 absolute">
                                {`${80 - comment.length} characters needed`}
                            </div>
                        )}
                        <div className="flex flex-row justify-end">
                            <PrimaryButton
                                disabled={comment.length < 80 || rating === 0}
                                callBack={handleSubmitRating}
                                text="Submit Review"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddReview;
