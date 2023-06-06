import { Link } from "react-router-dom";

const CategoryCard = (props: any) => {
    return (
        <Link
            to={`/category/${props.title}`}
            className="rounded-lg w-1/5 h-40 bg-blue-200 shadow-xl cursor-pointer">
            <div className="flex flex-row justify-center pt-5">
                <img src={props.imgSrc} alt={props.alt} width={"90%"} />
            </div>
            <div>
                <div className="text-center font-bold pt-2">{props.title}</div>
            </div>
        </Link>
    );
};

export default CategoryCard;
