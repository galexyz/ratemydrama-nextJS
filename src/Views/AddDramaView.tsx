import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";

const AddDramaView = () => {
    const { category } = useParams();
    const [hasName, setHasName] = useState(false);
    const [drama, setDrama] = useState("");
    return (
        <div className="h-[500px] w-full bg-white flex flex-row justify-center">
            {hasName ? (
                <div className="w-3/4 h-5/6 border-blue-200 border mt-10 shadow-xl rounded-2xl">
                    <div className="text-lg font-bold text-center">
                        Rating for {drama}
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
                                callBack={() => setHasName(true)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddDramaView;
