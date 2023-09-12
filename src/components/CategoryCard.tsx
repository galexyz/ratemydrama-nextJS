import React from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
    title: string;
    imgSrc: string;
    alt: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imgSrc, alt }) => {
    return (
        <Link
            to={`/category/${title}`}
            className="rounded-lg w-1/5 h-40 bg-blue-200 shadow-xl cursor-pointer">
            <div className="flex flex-row justify-center pt-5">
                <img src={imgSrc} alt={alt} width={"90%"} />
            </div>
            <div>
                <div className="text-center font-bold pt-2">{title}</div>
            </div>
        </Link>
    );
};

export default CategoryCard;
