import CategoryCard from "../components/CategoryCard";
import chinese from "../public/chinese1.webp";
import korean from "../public/korean.webp";
import japanese from "../public/japanese.webp";
import western from "../public/western.jpeg";
import home from "../public/home1.jpg";
import action from "../public/action.jpg";
import adventure from "../public/adventure.jpeg";
import fantasy from "../public/fantasy.jpeg";
import comedy from "../public/comedy.jpg";
import romance from "../public/romance.jpeg";
import sciFi from "../public/sci-fi.webp";
import review from "../public/reviews.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

const Index = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const router = useRouter();

    const getDramaSuggestions = (term: string) => {
        console.log(term);
        if (term) {
            let endPoint = `http://localhost:3000/dramas/search?q=${term}`;
            fetch(endPoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async (r) => {
                let res = await r.json();
                let dramaArr = [];
                res.dramas.map((drama: any) => {
                    return dramaArr.push(drama);
                });
                setSearchResults(dramaArr);
            });
        } else {
            setSearchResults([]);
        }
    };

    function replaceWordSeparatorsWithHyphen(inputString: string) {
        // Use a regular expression to match word separators (e.g., spaces, underscores, dashes, and commas)
        const regex = /[\s_,\-]+/g;
        // Replace all matches with a hyphen "-"
        return inputString.replace(regex, "-");
    }

    return (
        <>
            <Navbar />
            <div>
                <div className="bg-three w-full h-[600px]">
                    <div className="pt-[200px]">
                        <div className="text-white text-center text-xl font-bold">
                            Search your favourite Drama Series
                        </div>
                        <div className="flex flex-col items-center pt-5">
                            <input
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    getDramaSuggestions(e.target.value);
                                }}
                                className="w-72 lg:w-96 xl:w-120 h-12 rounded-2xl px-5 shadow-2xl rounded-b-2xl"
                                placeholder="Search Drama"
                            />
                            {searchResults.length > 0 && (
                                <div className="w-72 lg:w-96 xl:w-120 max-h-60 overflow-y-scroll bg-white shadow-2xl rounded-b-2xl text-sm">
                                    {searchResults.map((drama, i) => {
                                        return (
                                            <div
                                                onClick={() => {
                                                    console.log(drama);
                                                    router.push(
                                                        `http://localhost:3001/category/${drama.language.toLowerCase()}/${replaceWordSeparatorsWithHyphen(
                                                            drama.name
                                                        )}?dramaId=${drama.id}`
                                                    );
                                                }}
                                                key={i}
                                                className="text-black px-5 py-2.5 hover:bg-four hover:text-white border-b border-three cursor-pointer">
                                                {`${drama.name} (${drama.year})`}
                                            </div>
                                        );
                                    })}
                                    <div
                                        onClick={() =>
                                            router.push(
                                                "http://localhost:3001/add-drama"
                                            )
                                        }
                                        className="text-white underline px-5 py-2.5 bg-four rounded-b-2xl font-bold border-b border-three cursor-pointer">
                                        Add a Drama
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col lg:flex-row justify-center h-80 items-center gap-x-40 lg:px-0 px-10">
                        <Image
                            src={home}
                            alt="Drama rating"
                            className="w-60 md:w-72 lg:w-96 order-2 lg:order-1"
                        />
                        <div className="text-xl font-bold order-1 lg:order-2 items-center">
                            <div className="self-center">
                                Find Your Favourite Drama
                            </div>
                            <div className="font-light">
                                Looking for a new series to watch? check out
                                what Other people think
                            </div>
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col justify-center h-80 items-center gap-x-40 lg:px-0 px-10">
                        <div className="text-xl font-bold">
                            Write an anonymous review
                            <div className="font-light">
                                Contribute to an evergrowing list of reviews
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <Image
                                src={review}
                                alt="Drama review"
                                className="w-60 md:w-72 lg:w-96"
                            />
                        </div>
                    </div>
                </div>
                <h2 className="text-center text-2xl text-primary">
                    Dramas by genre
                </h2>
                <div className="grid-cols-1 grid-rows-4 grid md:grid-rows-2 md:grid-cols-2 3xl:flex 2xl:flex-row justify-center gap-x-8 gap-y-8 py-10 px-5">
                    <CategoryCard
                        imgSrc={action}
                        alt="action drama"
                        title="Action"
                    />
                    <CategoryCard
                        imgSrc={romance}
                        alt="romance drama"
                        title="Romance"
                    />
                    <CategoryCard
                        imgSrc={comedy}
                        alt="comedy drama"
                        title="Comedy"
                    />
                    <CategoryCard
                        imgSrc={sciFi}
                        alt="sci-fi drama"
                        title="Sci-Fi"
                    />
                    <CategoryCard
                        imgSrc={adventure}
                        alt="adventure drama"
                        title="Adventure"
                    />
                    <CategoryCard
                        imgSrc={fantasy}
                        alt="fantasy drama"
                        title="Fantasy"
                    />
                </div>
                <h2 className="text-center text-2xl text-primary">
                    Dramas by language
                </h2>
                <div className="grid-cols-1 grid-rows-4 grid md:grid-rows-2 md:grid-cols-2 3xl:flex 2xl:flex-row justify-center gap-x-8 gap-y-8 py-10 px-5">
                    <CategoryCard
                        imgSrc={chinese}
                        alt="chinese drama"
                        title="Chinese"
                    />
                    <CategoryCard imgSrc={korean} alt="kdrama" title="Korean" />
                    <CategoryCard
                        imgSrc={japanese}
                        alt="japanese drama"
                        title="Japanese"
                    />
                    <CategoryCard
                        imgSrc={western}
                        alt="English drama"
                        title="English"
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Index;
