import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

interface DramaCardProps {
    drama: {
        dramaId: number;
        name: string | undefined;
        imgUrl: string | undefined;
        alt?: string | undefined;
        year: string | undefined;
        description: string;
    };
}

const DramaCard: React.FC<DramaCardProps> = ({ drama }) => {
    const router = useRouter();

    const { category } = router.query; // Access the parameter "slug" from the URL
    if (!drama.name) return <div></div>;
    return (
        <Link
            href={{
                pathname: `/category/${category}/${drama.name.replaceAll(
                    " ",
                    "-"
                )}`,
                query: { dramaId: drama.dramaId },
            }}
            className="cursor-pointer">
            <div className="border-primary w-full flex flex-row border-b-2 gap-x-10 lg:gap-x-20">
                <img src={drama.imgUrl} alt={drama.alt} width={100} />
                <div className="">
                    <div className="text-center text-primary font-bold pt-2">{`${drama.name} (${drama.year})`}</div>
                    <div className="text-txt">{`${drama.description.substring(
                        0,
                        250
                    )}...`}</div>
                </div>
            </div>
        </Link>
    );
};

export default DramaCard;
