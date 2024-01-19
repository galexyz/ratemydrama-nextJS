import chinese from "../../public/chinese1.webp";
import korean from "../../public/korean.webp";
import japanese from "../../public/japanese.webp";
import western from "../../public/western.jpeg";
import SortDropDown from "../../components/SortDropdown";
import { useEffect, useState } from "react";
import DramaCard from "../../components/DramaCard";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import AddDramaCard from "../../components/AddDramaCard";

interface MyObject {
    [key: string]: any;
}

interface Drama {
    dramaId: number;
    year: string;
    name: string;
    imgUrl: string;
    description: string;
}

const imgObj = {
    chinese: <Image src={chinese} alt="chinese" className="h-80 w-full" />,
    korean: <Image src={korean} alt="korean" className="h-80 w-full" />,
    japanese: <Image src={japanese} alt="japanese" className="h-80 w-full" />,
    english: <Image src={western} alt="western" className="h-80 w-full" />,
};
const Category = (props: any) => {
    const router = useRouter();
    const { category } = router.query;
    const [categoryData, setCategoryData] = useState<Array<Drama>>([]);
    const [sortBy, setSortBy] = useState("");

    console.log(sortBy);

    useEffect(() => {
        if (!category) return;
        let endPointObj;
        let endPoint;
        if (sortBy) {
            endPointObj = {
                Newest: `http://localhost:3000/dramas/${category}/newest`,
                Oldest: `http://localhost:3000/dramas/${category}/oldest`,
                "Most Reviews": `http://localhost:3000/dramas/${category}/mostReviewed`,
                "Highest Rating": `http://localhost:3000/dramas/${category}/highestRating`,
            };
            endPoint = endPointObj[sortBy as keyof typeof endPointObj];
        } else {
            endPointObj = {
                chinese: "http://localhost:3000/dramas/chinese",
                korean: "http://localhost:3000/dramas/korean",
                english: "http://localhost:3000/dramas/english",
                japanese: "http://localhost:3000/dramas/japanese",
            };
            endPoint = endPointObj[category as keyof typeof endPointObj];
        }
        fetch(endPoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((r) => {
                console.log("Res", r);
                r.json().then((data) => {
                    console.log(data);
                    let dramaArr: Array<Drama> = [];
                    console.log(data.dramas);
                    data.dramas.map((drama: any) => {
                        return dramaArr.push({
                            year: drama.year,
                            description: drama.description,
                            dramaId: drama.id,
                            name: drama.name,
                            imgUrl: drama.imgUrl,
                        });
                    });
                    setCategoryData(dramaArr);
                });
            })
            .catch((e) => console.log("Error ", e));
    }, [category, sortBy]);

    const getValueByKey = (obj: MyObject, key: string) => {
        return obj[key];
    };

    return (
        <>
            <Navbar />
            <div className="w-full">
                {category && getValueByKey(imgObj, category)}
                <div className="text-3xl text-white font-bold z-20 absolute top-80 left-10">
                    {category}
                </div>
                <div className="flex flex-row justify-center items-center space-x-20 pt-10">
                    <div className="lg:text-2xl text-lg font-bold text-txt">
                        {`Listing ${
                            categoryData ? categoryData.length : 0
                        } Dramas`}
                    </div>
                    <input
                        className="w-96 h-10 px-4 shadow-xl border-primary rounded-xl border-2"
                        placeholder="Search for your drama"
                    />
                    <div className="flex flex-row items-center gap-x-2">
                        <div className="text-lg text-txt font-light">
                            Sort By:
                        </div>
                        <SortDropDown setSortBy={setSortBy} />
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center p-10">
                    <div className="flex flex-col">
                        {categoryData.map((drama, key) => {
                            if (drama) {
                                return <DramaCard key={key} drama={drama} />;
                            }
                            return null;
                        })}
                    </div>
                    <div className="p-5 m-10 border-2 w-1/4">
                        <AddDramaCard category={category} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Category;
