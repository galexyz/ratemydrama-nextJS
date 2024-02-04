import ReactPaginate from "react-paginate";
import bannerImage from "../../public/categoryImage.webp";
import SortDropDown from "../../components/SortDropdown";
import { useCallback, useEffect, useState } from "react";
import DramaCard from "../../components/DramaCard";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import AddDramaCard from "../../components/AddDramaCard";
import SearchFilter from "../../components/SearchFilter";

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

// const imgObj = {
//     chinese: <Image src={chinese} alt="chinese" className="h-80 w-full" />,
//     korean: <Image src={korean} alt="korean" className="h-80 w-full" />,
//     japanese: <Image src={japanese} alt="japanese" className="h-80 w-full" />,
//     english: <Image src={western} alt="western" className="h-80 w-full" />,
// };
const Category = (props: any) => {
    const router = useRouter();
    const { category } = router.query;
    const [categoryData, setCategoryData] = useState<Array<Drama>>([]);
    const [sortBy, setSortBy] = useState("");
    const [currentItems, setCurrentItems] = useState<Array<Drama>>([]);
    const [itemOffset, setItemOffset] = useState(0);

    const pageCount = Math.ceil(categoryData.length / 10);

    // Invoke when user click to request another page.
    const handlePageClick = useCallback(
        (event: any) => {
            const newOffset = (event.selected * 10) % categoryData.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        },
        [categoryData]
    );

    useEffect(() => {
        if (categoryData) {
            let endOffset = itemOffset + 10;
            let offsetItems = categoryData.slice(itemOffset, endOffset);
            setCurrentItems(offsetItems);
        }
    }, [categoryData, itemOffset]);

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
                action: "http://localhost:3000/dramas/action",
                adventure: "http://localhost:3000/dramas/adventure",
                fantasy: "http://localhost:3000/dramas/fantasy",
                romance: "http://localhost:3000/dramas/romance",
                "sci-fi": "http://localhost:3000/dramas/sci-fi",
                comedy: "http://localhost:3000/dramas/comedy",
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
                r.json().then((data) => {
                    let dramaArr: Array<Drama> = [];
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

    return (
        <>
            <Navbar />
            <div className="w-full">
                <div className="flex flex-row justify-center">
                    <Image
                        src={bannerImage}
                        alt="drama series"
                        className="sm:h-80 h-48 w-5/6 sm:w-2/3"
                    />
                    <div className="text-3xl text-white font-bold z-20 absolute top-52 sm:top-80">
                        {category}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between w-full sm:w-2/3 xl:w-1/2 pl-3 sm:pl-10 items-center gap-y-2 space-x-2 sm:space-x-5 lg:space-x-20 pt-10">
                    <div className="flex items-center gap-x-1 lg:gap-x-5 sm:order-1 order-2">
                        <div className="sm:text-base text-xs md:text-lg text-txt font-light inline">
                            Sort By:
                        </div>
                        <SortDropDown setSortBy={setSortBy} />
                    </div>
                    <div className="lg:text-2xl text-sm sm:text-lg font-bold text-txt sm-order-2 order-1">
                        {`Listing ${
                            categoryData ? categoryData.length : 0
                        } Dramas`}
                    </div>
                </div>
                <div className="flex flex-col xl:flex-row p-5 sm:p-10 gap-y-10">
                    <div className="flex flex-col order-3 xl:order-1 w-full xl:w-3/5">
                        {currentItems.map((drama, key) => {
                            if (drama) {
                                return <DramaCard key={key} drama={drama} />;
                            }
                            return null;
                        })}
                    </div>

                    <div className="order-2">
                        <SearchFilter options={categoryData} />
                    </div>
                    <div className="flex flex-row justify-center p-5 ml-5 border-2 w-5/6 sm:-1/4 xl:w-1/6    h-40 border-primary rounded-xl order-1 xl:order-3">
                        <AddDramaCard category={category} />
                    </div>
                </div>
            </div>
            {categoryData.length > 10 && (
                <ReactPaginate
                    className="flex flex-row gap-x-5 justify-center text-primary"
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            )}
            <Footer />
        </>
    );
};

export default Category;
