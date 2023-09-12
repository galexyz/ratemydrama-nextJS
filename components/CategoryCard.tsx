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
            className="cursor-pointer w-1/5 h-80">
            <div className="rounded-lg bg-blue-200 shadow-xl cursor-pointer">
                <div className="flex flex-row justify-center pt-5">
                    <Image
                        className="w-80 h-60"
                        loading="lazy"
                        placeholder="blur"
                        src={imgSrc}
                        alt={alt}
                    />
                </div>
                <div>
                    <div className="text-center text-lg font-bold pt-2">
                        {title}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
