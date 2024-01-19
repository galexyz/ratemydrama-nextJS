import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import thankYouGif from "../public/thankYou.gif";
import Head from "next/head";
import dotenv from "dotenv";
dotenv.config();

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;

const AboutPage = () => {
    function initializePayPal() {
        // Your PayPal SDK code here
        paypal
            .Buttons({
                // Your button configuration
            })
            .render("#paypal-button-container");
    }
    return (
        <>
            <Head>
                <script
                    src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons`}
                    onload="initializePayPal()"></script>
            </Head>
            <Navbar />
            <div className="flex flex-col items-center p-5">
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
                        <br />
                        To contact us, send us an email at{" "}
                        <a
                            href="alexhuo13@gmail.com"
                            className="text-txt underline">
                            alexhuo13@gmail.com
                        </a>
                    </div>
                    <div className="flex flex-row justify-center">
                        <Image
                            src={thankYouGif}
                            alt="Thank you for contributing!"
                            width={400}
                        />
                    </div>
                    <div id="paypal-button-container" className="w-6"></div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
