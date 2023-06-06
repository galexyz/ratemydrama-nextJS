import { useParams } from "react-router-dom";
import chinese from "../assets/chinese1.webp";
import korean from "../assets/korean.jpg";
import japanese from "../assets/japanese.webp";
import western from "../assets/western.webp";
import CategoryFilter from "../components/CategoryFilter";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

interface MyObject {
    [key: string]: any;
}

const imgObj = {
    Chinese: <img src={chinese} alt="chinese" className="h-80 w-full" />,
    Korean: <img src={korean} alt="korean" className="h-80 w-full" />,
    Japanese: <img src={japanese} alt="japanese" className="h-80 w-full" />,
    Western: <img src={western} alt="western" className="h-80 w-full" />,
};
const CategoryView = (props: any) => {
    const { category } = useParams();
    const navigate = useNavigate();

    const getValueByKey = (obj: MyObject, key: string) => {
        return obj[key];
    };

    return (
        <div className="w-full">
            {category && getValueByKey(imgObj, category)}
            <div className="text-3xl text-white font-bold z-20 absolute top-80 left-10">
                {category}
            </div>
            <div>
                <div className="flex flex-row justify-center py-10">
                    <input
                        className="w-96 h-10 px-4 shadow-xl border-gray-400 rounded-xl border-2"
                        placeholder="Search for your drama"
                    />
                </div>
                <div className="flex flex-row justify-around h-60">
                    <div className="text-xl font-bold text-blue-300">
                        Listing x {category} Dramas
                    </div>
                    <div>
                        <div className="text-sm font-light">Sort By:</div>
                        <CategoryFilter />
                    </div>
                </div>
                <div className="px-10 pb-20">
                    <div className="w-96 h-48 border-2 rounded-xl px-4">
                        <div className="text-center text-lg font-bold">
                            Can't find your Drama?
                        </div>
                        <div className="text-center pb-10">
                            Add a review here
                        </div>
                        <div className="flex flex-row justify-center">
                            <PrimaryButton
                                callBack={() =>
                                    navigate(`/add-drama/${category}
                                    `)
                                }
                                text="Add Review"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryView;
