import React from "react";
import BackButton from "../components/BackButton";
import PrimaryButton from "../components/PrimaryButton";
import { useCallback, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

const AddDrama = () => {
    const [hasName, setHasName] = useState(false);
    const [drama, setDrama] = useState("");
    const [dramaId, setDramaId] = useState("");
    const [summary, setSummary] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [genres, setGenres] = useState([]);
    const [castList, setCastList] = useState<Array<string>>([]);
    const [language, setLanguage] = useState("");
    const [year, setYear] = useState("");
    const [addedDrama, setAddedDrama] = useState(false);
    const router = useRouter();
    const { category } = router.query;

    const attemptQueryDetais = useCallback(async () => {
        fetch(`https://api.tvmaze.com/singlesearch/shows?q=${drama}&embed=cast`)
            .then((r) => r.json())
            .catch((e) => {
                console.log(e);
            })
            .then((data) => {
                if (data == null) {
                    setHasName(false);
                }
                setSummary(removeHTMLTags(data.summary));
                setImgUrl(data.image.medium);
                setDrama(data.name);
                setGenres(data.genres);
                setLanguage(data.language);
                setYear(data.premiered.split("-")[0]);
                // const castArr = getCastList(data.id);
                // setCastList(castArr);
                let cast = data._embedded.cast;
                let urlCastList: string[] = [];
                console.log(cast);
                cast.map((cast) => {
                    return urlCastList.push(cast.person.url);
                });
                setCastList(urlCastList);
            })
            .catch((e) => console.log(e));
    }, [drama]);

    const createDrama = useCallback(() => {
        fetch("http://localhost:3000/dramas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: drama,
                imgUrl: imgUrl,
                castMembers: castList,
                description: summary,
                genres: genres,
                year: year,
                language: language,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setDramaId(data.drama.id);
                setAddedDrama(true);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [drama, summary, year, language, genres, imgUrl, castList]);

    const removeHTMLTags = (input: string) => {
        return input.replace(/<[^>]+>/g, "");
    };

    function replaceWordSeparatorsWithHyphen(inputString: string) {
        // Use a regular expression to match word separators (e.g., spaces, underscores, dashes, and commas)
        const regex = /[\s_,\-]+/g;
        // Replace all matches with a hyphen "-"
        return inputString.replace(regex, "-");
    }

    // http://localhost:3001/add-drama/category/korean/Doctor-Stranger?dramaId=7367
    if (addedDrama) {
        return (
            <>
                <Navbar />
                <div className=" w-full bg-white flex flex-row justify-center lg:p-10">
                    <div className="mt-20 w-11/12 lg:w-1/2 border-primary gap-y-10 rounded-2xl shadow-2xl p-5 flex flex-col justify-between">
                        <div className="text-lg text-txt text-center">
                            Successfully added:
                            <div className="text-primary font-bold pt-5 underline">
                                {drama}
                            </div>
                        </div>
                        <div className="flex flex-row justify-center">
                            <img src={imgUrl} alt={drama} className="w-60" />
                        </div>
                        <div className="flex flex-row justify-between bottom-10 gap-x-2">
                            <PrimaryButton
                                callBack={() => {
                                    router.push(
                                        `/category/${category}/${replaceWordSeparatorsWithHyphen(
                                            drama
                                        )}?dramaId=${dramaId}`
                                    );
                                }}
                                text="Add a rating"
                            />
                            <PrimaryButton
                                text="close"
                                callBack={() => {
                                    setDrama("");
                                    setAddedDrama(false);
                                    router.push(`/category/${category}`);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen w-full flex flex-row justify-center lg:p-10">
                {hasName ? (
                    <div className="w-11/12 md:w-4/5 xl:w-1/2 border-primary border mt-10 shadow-xl rounded-2xl p-5">
                        <div className="lg:text-2xl text-txt text-lg pb-5 font-bold text-center">
                            Rating for {drama}
                        </div>
                        <div className="p-5">
                            <div className="lg:mx-10 p-5 border-2 border-primary border-dotted text-primary rounded-xl shadow-lg">
                                {summary}
                            </div>
                            {imgUrl && (
                                <div className="flex lg:flex-row flex-col items-center lg:items-start justify-around pt-20">
                                    <img
                                        className="shadow-lg border-2 rounded-xl border-primary lg:w-1/4 w-2/3 lg:mb-0 mb-5"
                                        src={imgUrl}
                                        alt="drama"
                                    />
                                    <div className="text-lg text-txt">
                                        <div className="flex flex-row gap-x-5">
                                            <div className="text-xl font-bold">
                                                Year:{" "}
                                            </div>{" "}
                                            {year}
                                        </div>
                                        <div className="flex flex-row gap-x-5">
                                            <div className="text-xl font-bold">
                                                Language:{" "}
                                            </div>{" "}
                                            {language}
                                        </div>
                                        <div className="flex flex-row gap-x-5 pb-10">
                                            <div className="text-xl font-bold">
                                                Genres:{" "}
                                            </div>{" "}
                                            {genres.join()}
                                        </div>
                                        <PrimaryButton
                                            text="Add Drama"
                                            callBack={createDrama}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mt-20 lg:w-1/2 w-11/12 sm:w-2/3 h-2/3 border-primary rounded-2xl shadow-2xl p-5">
                        <div className="flex flex-col justify-center gap-y-5">
                            <BackButton />
                            <div className="text-lg font-semibold text-center text-txt">
                                Add a Drama
                            </div>
                            <div className="text-center py-5 text-txt">
                                Drama Name
                            </div>
                            <div className="flex flex-row justify-center">
                                <input
                                    value={drama}
                                    onChange={(e) => setDrama(e.target.value)}
                                    placeholder="Drama name"
                                    className="h-10 px-3 w-4/5 lg:w-1/2 rounded-2xl shadow-xl border-[1px] border-primary"
                                />
                            </div>
                            <div className="flex flex-row justify-center pt-5">
                                <PrimaryButton
                                    text="Next"
                                    callBack={() => {
                                        setHasName(true);
                                        attemptQueryDetais();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AddDrama;
