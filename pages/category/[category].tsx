import chinese from "../../public/chinese1.webp";
import korean from "../../public/korean.webp";
import japanese from "../../public/japanese.webp";
import western from "../../public/western.jpeg";
import CategoryFilter from "../../components/CategoryFilter";
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
    console.log(category);
    const [categoryData, setCategoryData] = useState<Array<Drama>>([]);

    useEffect(() => {
        if (!category) return;
        let endPointObj = {
            chinese: "http://localhost:3000/dramas/chinese",
            korean: "http://localhost:3000/dramas/korean",
            english: "http://localhost:3000/dramas/english",
            japanese: "http://localhost:3000/dramas/japanese",
        };
        let endPoint = endPointObj[category as keyof typeof endPointObj];
        fetch(endPoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((r) =>
                r.json().then((data) => {
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
                })
            )
            .catch((e) => console.log(e));
    }, [category]);

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
                    <div className="lg:text-2xl text-lg font-bold text-blue-300">
                        {`Listing ${
                            categoryData ? categoryData.length : 0
                        } Dramas`}
                    </div>
                    <input
                        className="w-96 h-10 px-4 shadow-xl border-gray-400 rounded-xl border-2"
                        placeholder="Search for your drama"
                    />
                    <div>
                        <div className="text-sm font-light">Sort By:</div>
                        <CategoryFilter />
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
