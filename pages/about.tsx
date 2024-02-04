import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import thankYouGif from "../public/thankYou.gif";
import Head from "next/head";
import dotenv from "dotenv";
dotenv.config();

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center p-5 h-[1200px]">
                <div className="xl:w-1/2 lg:w-2/3 w-full">
                    <div className="text-xl text-txt pb-5">About</div>
                    <div className="text-2xl text-primary pb-10">
                        RateMyDrama
                    </div>
                    <div>
                        <div className="text-primary inline">RateMyDrama</div>{" "}
                        aims to be a drama review platform designed for those
                        who are looking for a new tv series to watch.
                        <br />
                        <br />
                        RateMyDrama is your resource for real, honest drama / tv
                        show reviews from people around the world just like you.
                        We encourage you to share your thoughts so that others
                        can benefit from your insights.
                        <br />
                        <br />
                        If you like to support us, simply do so by contributing
                        a review to help us grow. Thank You!
                    </div>
                    <div className="flex flex-row justify-center pt-10">
                        <Image
                            src={thankYouGif}
                            alt="Thank you for contributing!"
                            width={400}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
