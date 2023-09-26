import Image from "next/image";
import logo from "../public/logo.png";

const Footer = () => {
    return (
        <div className="bg-gray-400 w-full mt-20 flex flex-row justify-center p-5">
            <Image src={logo} alt="Rate My Drama" width={100} />
            <div className="self-center">
                <div className="flex flex-row justify-center items-center">
                    <div className="lg:text-2xl text-lg font-bold text-blue-500 text-center">
                        RateMyDrama
                    </div>
                </div>
                <div className="flex flex-row justify-center gap-x-5">
                    <div>Terms and Conditions</div>
                    <div>Privacy policy</div>
                    <div>© RateMyDrama 2023</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
