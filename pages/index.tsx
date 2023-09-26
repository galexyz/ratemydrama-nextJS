import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/solid";
import CategoryCard from "../components/CategoryCard";
import chinese from "../public/chinese1.webp";
import korean from "../public/korean.webp";
import japanese from "../public/japanese.webp";
import western from "../public/western.jpeg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Index = () => {
    return (
        <>
            <Navbar />
            <div>
                <div className="bg-blue-300 w-full h-[600px]">
                    <div className="pt-[200px]">
                        <div className="text-white text-center text-xl font-bold">
                            Search your favourite Drama Series
                        </div>
                        <div className="flex flex-row justify-center pt-5">
                            <input
                                className="w-96 h-12 rounded-2xl px-5"
                                placeholder="Search Drama"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row justify-around h-80 items-center">
                        <MagnifyingGlassIcon className="h-40 w-40 text-blue-300" />
                        <div className="text-lg font-bold">
                            Find Your Favourite Drama
                            <div className="text-xl font-light">
                                Looking for a new series to watch? check out
                                what Other people think
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-around h-80 items-center">
                        <div className="text-xl font-bold">
                            Write an anonymous review
                            <div className="font-light">
                                Contribute to an evergrowing list of reviews
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <StarIcon className="w-8 h-6 text-yellow-400" />
                            <StarIcon className="w-8 h-6 text-yellow-400" />
                            <StarIcon className="w-8 h-6 text-yellow-400" />
                            <StarIcon className="w-8 h-6 text-yellow-400" />
                            <StarIcon className="w-8 h-6 text-yellow-400" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center gap-x-8 py-10 px-5">
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
