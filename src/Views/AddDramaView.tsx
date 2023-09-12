import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { useCallback, useState } from "react";

const AddDramaView = () => {
    const { category } = useParams();
    const [hasName, setHasName] = useState(false);
    const [drama, setDrama] = useState("");
    const [summary, setSummary] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [genres, setGenres] = useState([]);
    const [language, setLanguage] = useState("");
    const [year, setYear] = useState("");
    const [addedDrama, setAddedDrama] = useState(false);

    const attemptQueryDetais = useCallback(async () => {
        fetch(`https://api.tvmaze.com/singlesearch/shows?q=${drama}`)
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
            })
            .catch((e) => console.log(e));
    }, [drama]);

    const createDrama = useCallback(async () => {
        fetch("http://localhost:3000/dramas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: drama,
                imgUrl: imgUrl,
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
    }, [drama, summary, year, language, genres, imgUrl]);

    const removeHTMLTags = (input: string) => {
        return input.replace(/<[^>]+>/g, "");
    };

    if (addedDrama) {
        return (
            <div className="h-screen w-full bg-white flex flex-row justify-center lg:p-10">
                <div className="mt-20 w-1/2 h-2/3 border-blue-200 rounded-2xl shadow-2xl p-5 flex flex-col justify-between">
                    <div className="text-lg font-bold text-center">
                        Successfully added: {drama}
                    </div>
                    <div className="flex flex-row justify-between bottom-10">
                        <PrimaryButton text="Add a rating" />
                        <PrimaryButton
                            text="close"
                            callBack={() => {
                                setDrama("");
                                setAddedDrama(false);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-white flex flex-row justify-center lg:p-10">
            {hasName ? (
                <div className="w-3/4 h-auto border-blue-200 border mt-10 shadow-xl rounded-2xl">
                    <div className="text-lg font-bold text-center">
                        Rating for {drama}
                    </div>
                    <div>
                        <div className="px-5 lg:px-20">{summary}</div>
                        {imgUrl && (
                            <div className="flex flex-row justify-around pt-20">
                                <img width={"20%"} src={imgUrl} alt="drama" />
                                <div className="text-lg">
                                    <div>Year: {year}</div>
                                    <div>Language: {language}</div>
                                    <div>Genres: {genres.join()}</div>
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
                        <div className="text-lg font-semibold text-center">
                            Add a Drama to the {category} category
                        </div>
                        <div className="text-center pt-5">Drama Name</div>
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
    );
};

export default AddDramaView;
