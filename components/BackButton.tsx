import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const BackButton = () => {
    const router = useRouter();

    return (
        <div
            className="flex flex-row cursor-pointer text-primary"
            onClick={() => router.back()}>
            <ArrowLeftIcon className="h-6 w-6 mr-1" />
            <div>Back</div>
        </div>
    );
};

export default BackButton;
