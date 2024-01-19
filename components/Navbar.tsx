import Image from "next/image";
import logo from "../public/logo.png";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();

    return (
        <div className="h-20 w-full bg-white flex flex-row justify-between items-center px-5 shadow-lg">
            <div
                onClick={() => router.push("/")}
                className="text-xl lg:text-2xl xl:text-3xl text-three flex flex-row font-extrabold cursor-pointer">
                <Image src={logo} alt="Rate my drama" width={60} />
                <div className="flex flex-row items-center">
                    RateMy
                    <div className="text-primary">Drama</div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
