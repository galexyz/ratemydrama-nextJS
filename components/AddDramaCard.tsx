import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/router";

interface AddDramaCardProps {
    category: string | string[] | undefined;
}

const AddDramaCard: React.FC<AddDramaCardProps> = ({ category }) => {
    const router = useRouter();

    return (
        <div className="">
            <div className="text-center text-txt text-sm sm:text-base lg:text-lg font-bold">
                Can't find your Drama?
            </div>
            <div className="text-center pb-10 text-txt">Add a drama here</div>
            <div className="flex flex-row justify-center">
                <PrimaryButton
                    callBack={() =>
                        router.push(`/add-drama/
                                    `)
                    }
                    text="Add Drama"
                />
            </div>
        </div>
    );
};

export default AddDramaCard;
