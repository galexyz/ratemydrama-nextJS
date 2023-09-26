import React from "react";
import BackButton from "../../components/BackButton";
import PrimaryButton from "../../components/PrimaryButton";
import { useCallback, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";

const AddDrama = () => {
    const [hasName, setHasName] = useState(false);
    const [drama, setDrama] = useState("");
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
                console.log(data);
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

                cast.map((cast) => {
                    return urlCastList.push(cast.person.url);
                });
                setCastList(urlCastList);
            })
            .catch((e) => console.log(e));
    }, [drama]);

    const createDrama = useCallback(() => {
        if (castList.length < 1) {
            return;
        }
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
                setAddedDrama(true);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [drama, summary, year, language, genres, imgUrl, castList]);

    const removeHTMLTags = (input: string) => {
        return input.replace(/<[^>]+>/g, "");
    };

    if (addedDrama) {
        return (
            <>
                <Navbar />
                <div className="h-screen w-full bg-white flex flex-row justify-center lg:p-10">
                    <div className="mt-20 w-1/2 h-2/3 border-blue-200 rounded-2xl shadow-2xl p-5 flex flex-col justify-between">
                        <div className="text-lg font-bold text-center">
                            Successfully added: {drama}
                        </div>
                        <div className="flex flex-row justify-between bottom-10">
                            <PrimaryButton
                                callBack={() => null}
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
            <div className="h-screen w-full bg-white flex flex-row justify-center lg:p-10">
                {hasName ? (
                    <div className="lg:w-1/2 border-blue-200 border mt-10 shadow-xl rounded-2xl">
                        <div className="lg:text-2xl text-blue-500 text-lg pb-5 font-bold text-center">
                            Rating for {drama}
                        </div>
                        <div>
                            <div className="mx-5 lg:mx-10 border-2 p-5 border-blue-300 border-dotted text-blue-700 rounded-xl shadow-lg">
                                {summary}
                            </div>
                            {imgUrl && (
                                <div className="flex flex-row justify-around pt-20">
                                    <img
                                        className="shadow-lg border-2 rounded-xl border-blue-500"
                                        width={"25%"}
                                        src={imgUrl}
                                        alt="drama"
                                    />
                                    <div className="text-lg text-blue-500">
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
                    <div className="mt-20 w-1/2 h-2/3 border-blue-200 rounded-2xl shadow-2xl p-5">
                        <div>
                            <BackButton />
                            <div className="text-lg font-semibold text-center text-blue-500">
                                Add a Drama
                            </div>
                            <div className="text-center py-5 text-blue-500">
                                Drama Name
                            </div>
                            <div className="flex flex-row justify-center">
                                <input
                                    value={drama}
                                    onChange={(e) => setDrama(e.target.value)}
                                    placeholder="Drama name"
                                    className="h-10 px-3 rounded-2xl shadow-xl border-[1px] border-black"
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
