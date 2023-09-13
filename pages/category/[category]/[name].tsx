import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import BackButton from "../../../components/BackButton";

export const getServerSideProps = async (context) => {
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
};

interface DramaProps {
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

const DramaName: React.FC<DramaProps> = ({ data }) => {
    const drama = data.drama;

    return (
        <>
            <Navbar />
            <div className="p-10">
                <BackButton />
            </div>
            <div className="flex flex-col items-center gap-y-5">
                <div className="text-center text-blue-300 text-2xl">{`${drama.name} (${drama.year})`}</div>

                <div className="w-2/3 flex flex-row gap-x-5">
                    <Image
                        priority={true}
                        src={drama.imgUrl}
                        alt={drama.name}
                        className="w-60 h-80 border-2 border-blue-200 rounded-md"
                        width={100}
                        height={100}
                    />
                    <div className="p-5 border border-blue-500 text-blue-700 rounded-lg space-y-5">
                        <div className="text-blue-300 text-xl">
                            Genres:{" "}
                            <div className="inline gap-x-5 text-lg text-blue-500">
                                {drama.genres.join(", ")}
                            </div>
                        </div>
                        <div className="text-blue-300 text-xl">
                            Language:{" "}
                            <div className="inline gap-x-5 text-lg text-blue-500">
                                {drama.language}
                            </div>
                        </div>
                        <div>{drama.description}</div>
                    </div>
                </div>
                <div>
                    <div>Current Rating: </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DramaName;
