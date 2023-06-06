import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const BackButton = () => {
    return (
        <div className="flex flex-row cursor-pointer">
            <ArrowLeftIcon className="h-6 w-6 mr-1" />
            <div>Back</div>
        </div>
    );
};

export default BackButton;
