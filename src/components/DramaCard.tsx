import React from "react";

interface DramaCardProps {
    title: string | undefined;
    imgSrc: string | undefined;
    alt: string | undefined;
    year: string | undefined;
}

const DramaCard: React.FC<DramaCardProps> = ({ title, imgSrc, alt, year }) => {
    console.log(title, alt, imgSrc);
    return (
        <div className="w-60 border-black h-60">
            <div className="flex flex-row justify-center pt-5">
                <img src={imgSrc} alt={alt} width={"90%"} />
            </div>
            <div className="text-center text-black font-bold pt-2">{`${title} (${year})`}</div>
        </div>
    );
};

export default DramaCard;
