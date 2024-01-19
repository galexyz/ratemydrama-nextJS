import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import BackButton from "../../../components/BackButton";
import PrimaryButton from "../../../components/PrimaryButton";
import ReviewCard from "../../../components/ReviewCard";
import Link from "next/link";
import { useRouter } from "next/router";

const fetchData = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Fetch error: ${error.message}`);
    }
};

export const getServerSideProps = async (context) => {
    try {
        const { query } = context;
        const dramaId = query.dramaId;

        const [dramaData, dramaReviewData] = await Promise.all([
            fetchData(`http://localhost:3000/dramas/dramaId=${dramaId}`),
            fetchData(
                `http://localhost:3000/reviews/dramas/dramaId=${dramaId}`
            ),
        ]);

        // Return data as props
        return {
            props: {
                dramaData: dramaData,
                reviewData: dramaReviewData,
            },
        };
    } catch (e) {
        console.error("Error getting data: " + e);
        return {
            props: {
                dramaData: null,
                reviewData: null, // Return null or an empty object as data in case of an error
            },
        };
    }
};

interface DramaProps {
    dramaData: {
        drama: {
            createdAt: Date;
            description: string;
            genres: String[];
            id: number;
            imgUrl: string;
            language: string;
            castMembers;
            name: string;
            updatedAt: Date;
            year: string;
        };
    };
    reviewData: any;
}

const DramaName: React.FC<DramaProps> = ({ dramaData, reviewData }) => {
    const drama = dramaData.drama;
    const reviews = reviewData.reviews;
    const router = useRouter();

    const { category } = router.query;

    console.log(drama);
    console.log(reviews);
    return (
        <>
            <Navbar />
            <div className="p-10">
                <BackButton />
            </div>
            <div className="flex flex-col items-center gap-y-5">
                <div className="text-center text-txt text-2xl">{`${drama.name} (${drama.year})`}</div>

                <div className="w-11/12 items-center lg:w-2/3 flex flex-col lg:flex-row gap-x-5">
                    <Image
                        priority={true}
                        src={drama.imgUrl}
                        alt={drama.name}
                        className="w-60 h-80 lg:mb-0 mb-10 border-2 border-primary rounded-md"
                        width={100}
                        height={100}
                    />
                    <div className="p-5 border border-primary text-txt rounded-lg space-y-5">
                        <div className="text-txt text-xl">
                            Genres:{" "}
                            <div className="inline gap-x-5 text-lg text-txt">
                                {drama.genres.join(", ")}
                            </div>
                        </div>
                        <div className="text-txt text-xl">
                            Cast:{" "}
                            {drama.castMembers.map((cast) => {
                                return (
                                    <>
                                        <div
                                            onClick={() =>
                                                window.open(cast, "_blank")
                                            }
                                            className="inline gap-x-5 text-lg text-txt cursor-pointer underline">
                                            {`${
                                                cast
                                                    .split("/")
                                                    .pop()
                                                    .replace("-", " ")
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                cast
                                                    .split("/")
                                                    .pop()
                                                    .replace("-", " ")
                                                    .slice(1)
                                            },  `}
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                        <div className="text-txt text-xl">
                            Language:{" "}
                            <div className="inline gap-x-5 text-lg text-txt">
                                {drama.language}
                            </div>
                        </div>
                        <div>{drama.description}</div>
                    </div>
                </div>
                <div className="px-5">
                    <div className="text-txt text-xl underline">Reviews: </div>
                    {reviews.map((review, i) => {
                        return <ReviewCard review={review} key={i} />;
                    })}
                    <Link
                        href={{
                            pathname: `/category/${category}/${drama.name.replaceAll(
                                " ",
                                "-"
                            )}/add-review`,
                            query: { dramaId: drama.id },
                        }}>
                        <div className="pt-5 flex flex-row justify-center">
                            <PrimaryButton
                                text="Add Review"
                                callBack={() => null}
                                icon="PencilSquareIcon"
                            />
                        </div>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DramaName;
