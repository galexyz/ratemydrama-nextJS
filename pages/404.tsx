import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";
import { useRouter } from "next/router";
import Logo from "../public/logo.png";
import Image from "next/image";

const AboutPage = () => {
    const router = useRouter();

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center p-5 justify-center h-144">
                <div className="flex flex-col sm:flex-row items-center gap-x-5">
                    <Image
                        src={Logo}
                        alt="rate my drama"
                        className="w-32 h-32"
                    />
                    <div className="md:text-3xl text-xl text-primary pb-10">
                        404 Not Found | Oops, This page does not exist
                    </div>
                </div>

                <PrimaryButton
                    text="RETURN HOME"
                    callBack={() => router.push("/")}
                />
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
