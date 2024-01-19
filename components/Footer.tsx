import Image from "next/image";
import logo from "../public/logo.png";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="bg-5 w-full mt-20 flex flex-row justify-center p-5 bg-four">
            <Image src={logo} alt="Rate My Drama" className="lg:w-32 w-20" />
            <div className="self-center">
                <div className="flex flex-row justify-center items-center">
                    <div className="lg:text-2xl text-lg font-bold text-primary text-center">
                        RateMyDrama
                    </div>
                </div>
                <div className="text-xs md:text-base flex flex-row justify-center gap-x-3 lg:gap-x-5">
                    <Link href={"/about"} className="cursor-pointer">
                        About
                    </Link>
                    <div>Privacy Policy</div>
                    <div>© RateMyDrama 2023</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
