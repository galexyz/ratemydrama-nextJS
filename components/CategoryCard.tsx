import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
    title: string;
    imgSrc: string;
    alt: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imgSrc, alt }) => {
    return (
        <Link
            href={`/category/${title.toLowerCase()}`}
            className="cursor-pointer h-80 shadow-xl rounded-lg bg-three">
            <div className="flex flex-row justify-center pt-5 px-5">
                <Image
                    className="w-120 rounded-lg h-60"
                    loading="lazy"
                    placeholder="blur"
                    src={imgSrc}
                    alt={alt}
                />
            </div>
            <div>
                <div className="text-center text-lg lg:text-2xl text-white font-bold py-3">
                    {title}
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
