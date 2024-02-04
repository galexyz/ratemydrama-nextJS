import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import thankYouGif from "../public/thankYou.gif";
import Head from "next/head";
import dotenv from "dotenv";
dotenv.config();

const PrivacyPage = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center p-5">
                <div className="xl:w-1/2 lg:w-2/3 w-full">
                    <div className="text-2xl text-primary pb-10">
                        Privacy Policy
                    </div>
                    <div>
                        <div className="text-primary py-4">Purpose</div> The
                        purpose of this privacy statement is to let users of
                        this website know when we collect personal information
                        and what we may do with it. We don't use, share or
                        disclose personal information collected or received
                        through this website except as set out in this
                        statement. Scope This privacy statement applies to
                        personal information collected through Ratemydrama.com.
                        <div className="text-primary py-4">
                            Collection, storage and use{" "}
                        </div>
                        You can use Ratemydrama.com without disclosing any
                        personal information.
                        <div className="text-primary py-4">
                            Collecting statistical information using cookies via
                            Google Analytics{" "}
                        </div>
                        We may use cookies to gather data about trends in
                        website usage using a tool called Google Analytics. This
                        data will be viewable by the website administrator only.
                        This information is aggregated and it does not identify
                        you personally.{" "}
                        <div className="text-primary py-4">Cookies </div>{" "}
                        Browser or ‘web’ cookies are small text files that are
                        sent by a website and stored on your computer's hard
                        drive to collect information about how you browse the
                        website. Cookies are used to: measure how you use the
                        website so it can be updated and improved based on your
                        needs remember the notifications you’ve seen so that we
                        don’t show them to you again You can read Google’s
                        privacy statement at the Google Safety Center. You can
                        manually disable cookies at any time. Check your
                        browser's 'Help' to find out how (disabling cookies will
                        not affect your ability to use this website).
                        <div className="text-primary py-4">
                            Data collected may include:{" "}
                        </div>
                        <ul className="list-disc list-inside">
                            <li>your IP address</li>
                            <li>the search terms you used on this site</li>{" "}
                            <li>
                                the pages you accessed on this site and the
                                links you clicked on
                            </li>
                            <li>
                                the date and time you visited this site the
                                referring site (if any) from which you clicked
                                to reach this site
                            </li>{" "}
                            <li>the device you used to access this site</li>
                            <li>
                                your operating system (eg, Windows 10, Mac OS X)
                            </li>
                            <li>
                                the type of web browser you used to access this
                                site (eg, Internet Explorer, Google Chrome)
                            </li>
                            <li>
                                other things like your screen resolution and the
                                language setting of your browser.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPage;
