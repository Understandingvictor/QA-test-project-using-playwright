"use client";
import { useState } from "react";
import Image from "next/image";
import { ModeToggle } from "@/component/button";
export default function Qa() {
  const [videoUrl, setVideoUrl] = useState(null);
  return (
    <>
      <main className="dark:bg-[url(/bgdarkmain.jpg)]  bg-[url(/bgbg.svg)] bg-no-repeat bg-cover">
        <header className="">
          <div className=" flex justify-end mr-5 mt-3">
            <ModeToggle />
          </div>
          <Image
            src="/logo.png"
            width={40}
            height={10}
            alt="my-logo"
            className="my-5 mx-3"
          />
        </header>
        <div className=" hover:border-[#1A53A0]  hover:shadow-[#1A53A0] hover:shadow-2xl dark:bg-transparent  dark:border-none  dark:border-[#1A53A0] dark:shadow-[#1A53A0]  dark:shadow-sm  bg-[#1A53A0] md:p-4 lg:rounded-none shadow-[#1A53A0] shadow-sm text-white my-0.5 max-w-[70%] lg:max-w-[50%] rounded-sm">
          <h1 className="text-center font-pop1 text-3xl ">
            ILO IFEANYI VICTOR
          </h1>
        </div>
        <div className="flex justify-center">
          <section className="mx-2 lg:flex lg:flex-col lg:max-w-[80%] justify-center">
            <ul className="hidden  lg:flex dark:text-[#E8E8E8] gap-5 ml-8 mt-2 font-pop2">
              <li className="border-[#1A53A0]  dark:opacity-85  border text-center flex items-center text-xs shadow-[#1A53A0] shadow-sm px-1 rounded-sm">
                Quality Assurance
              </li>
              <li className="border-[#1A53A0] dark:opacity-85  border text-center flex items-center text-xs shadow-[#1A53A0] shadow-sm px-1 rounded-sm">
                Automation
              </li>
              <li className="border-[#1A53A0]  dark:opacity-85  border text-center flex items-center text-xs shadow-[#1A53A0] shadow-sm px-1 rounded-sm">
                Manual
              </li>
            </ul>
            <section className="max-w-full   flex justify-center my-3">
              <div className=" flex md:gap-5 flex-col md:flex-row-reverse justify-center items-center">
                <div className="border-2 md:flex-1 dark:bg-transparent dark:border-none  border-[#1A53A0] mb-3 md:rounded-full md:bg-[#1A53A0] md:shadow-2xl rounded-full md:flex md:justify-center w-[50%] overflow-hidden">
                  <Image
                    src="/me.jpeg"
                    width={200}
                    height={40}
                    alt="gears"
                    className=""
                  />
                </div>
                <div
                  className="md:flex-1 dark:bg-transparent dark:border-none p-2
dark:shadow-sm dark:shadow-[#1A53A0]  dark:border-2  dark:border-[#1A53A0]  shadow md:shadow-lg md:p-4 md:rounded-sm bg-white opacity-85"
                >
                  <p className="text-xs dark:text-[#E8E8E8] md:text-sm font-pop2  text-justify">
                    I am a QA Specialist with hands-on experience in{" "}
                    <span className="text-[#1A53A0] dark:text-white font-pop1">
                      manual testing, automation, test documentation, bug
                      reporting, and ensuring product quality
                    </span>{" "}
                    through structured and efficient testing processes.
                  </p>
                </div>
              </div>
            </section>
            <section>
              <div className="flex dark:bg-transparent dark:border-dashed gap-2 mt-6 md:border lg:border-dashed md:max-w-[50%] justify-center items-center">
                <div className="flex-1 md:flex-2 w-1 md:max-w-[20%] ">
                  <Image
                    src="/pencil.png"
                    width={24}
                    height={24}
                    className="md:w-[70%] ml-4 lg:w-[30%]"
                    alt="gears"
                  />
                </div>
                <div
                  className="bg-[#1A53A0] dark:bg-transparent  dark:border-2  dark:border-[#1A53A0] dark:border-none
dark:shadow-sm dark:shadow-[#1A53A0]  md:p-3  flex-3 p-0.2"
                >
                  <h1 className="font-pop1 p-1 text-white text-right">
                    TOOLS AND TECHNOLOGIES
                  </h1>
                </div>
              </div>
              <div className="my-2">
                <button className="border-[#1A53A0] dark:text-[#E8E8E8] dark:opacity-85 border shadow-[#1A53A0] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                  PlayWright
                </button>
                <button className="border-[#1A53A0] border dark:opacity-85   shadow-[#1A53A0] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                  Github Actions
                </button>
                <button className="border-[#1A53A0] border dark:opacity-85   shadow-[#1A53A0] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                  Postman
                </button>
                <button className="border-[#1A53A0] border dark:opacity-85   shadow-[#1A53A0] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                  Git and Github
                </button>
                <button className="border-[#1A53A0] border dark:opacity-85   shadow-[#1A53A0] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                  Trello
                </button>
                <button className="border-[#1A53A0] border dark:opacity-85   shadow-[#1A53A0] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                  VsCode
                </button>
                <button className="border-[#1A53A0] border dark:opacity-85   shadow-[#1A53A0] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                  Chrome DevTools
                </button>
              </div>
            </section>
            <section>
              <div
                className=" bg-[#1A53A0] dark:bg-transparent  dark:border-2  dark:border-[#1A53A0] dark:border-none
dark:shadow-sm dark:shadow-[#1A53A0] text-white md:mt-8  max-w-[70%] mt-8 "
              >
                <h1 className="font-pop1 p-1 md:p-3 ">SKILLS OVERVIEW</h1>
              </div>
              <div className="flex shadow-sm mt-5 mb-5 md:gap-10 justify-center gap-4 p-1">
                <div className="max-w-[50%] border-r pr-2 md:pr-8">
                  <h2 className="font-pop1 text-sm md:text-lg  border-[#1A53A0] border-b-2">
                    MANUAL TESTING
                  </h2>
                  <ul className="font-pop2 text-xs md:text-sm">
                    <li className="dark:opacity-85">Test case design</li>
                    <li className="dark:opacity-85">Regression testing</li>
                    <li className="dark:opacity-85">Exploratory testing</li>
                    <li className="dark:opacity-85">Functional testing</li>
                    <li className="dark:opacity-85">Cross-browser testing</li>
                    <li className="dark:opacity-85">API testing</li>
                  </ul>
                </div>
                <div className=" max-w-[50%]">
                  <h2 className="font-pop1 md:text-lg  text-sm border-[#1A53A0] border-b-2">
                    AUTOMATED TESTING
                  </h2>
                  <ul className="font-pop2 text-xs md:text-sm">
                    <li className="dark:opacity-85">Playwright</li>
                    <li className="dark:opacity-85">
                      CI/CD basics - GitHub actions
                    </li>
                    <li className="dark:opacity-85">
                      javascript Automated scripts
                    </li>
                    <li className="dark:opacity-85">
                      Python Automated scripts
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section
              className="mt-8 font-pop2 md:bg-amber-100 "
              style={{
                backgroundImage: "url(/notepad.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div
                className="bg-[#1A53A0] dark:border-none
dark:shadow-sm dark:shadow-[#1A53A0] dark:bg-transparent  dark:border-2  dark:border-[#1A53A0] mb-5"
              >
                <h1 className="font-pop1 md:p-3 text-white text-center p-1">
                  TESTING PROJECTS
                </h1>
              </div>
              <div className="flex justify-center">
                <div className="border bg-[#E8E8E9] md:rounded-none opacity-90 lg:m-3 md:bg-white md:border-none md:shadow-xl border-[#1A53A0] md:max-w-[70%] rounded-2xl p-1">
                  <div className="bg-black md:rounded-none text-white text-center rounded-2xl w-[30%] px-1 text-sm mb-5 mt-2.5">
                    <h1>PROJECT 1</h1>
                  </div>
                  <div className="text-xs md:text-sm ">
                    <div className="mb-8 dark:text-black">
                      <p className="m-2 dark:text-black">
                        <span className="font-pop1">PROJECT TITLE:</span>{" "}
                        ECOMMERCE END TO END TESTING
                      </p>
                      <p className="m-2">
                        <span className="font-pop1">TOOLS USED:</span>{" "}
                        playwright, Github Actions, VsCode, Websockets
                      </p>
                      <p className="m-2">
                        <span className="font-pop1">TEST CASES:</span> Link to
                        test cases pdf
                      </p>
                      <p className="m-2">
                        <span className="font-pop1">WHAT I TESTED:</span> E2E
                        tests to be sure website is functional
                      </p>
                      <p className="m-2">
                        <span className="font-pop1">WEBSITE URL:</span>
                        https://www.saucedemo.com
                      </p>
                    </div>
                    <div className="m-2">
                      <span className="text-[#1A53A0] flex md:items-center md:gap-3  mt-2 mb-2">
                        code ------
                        <Image
                          src="/code.png"
                          width={24}
                          height={24}
                          className="md:w-[10%] lg:w-[3%]"
                          alt="code"
                        />
                      </span>
                    </div>
                  </div>
                  <center>
                    <hr className="max-w-2/3 border-[#1A53A0] shadow-[#1A53A0] md:mt-8 shadow-7xl mt-5"></hr>
                    <h1 className="mt-4 dark:text-black">Its demo time!!!</h1>
                    <hr className="max-w-2/3 border-[#1A53A0] shadow-[#1A53A0] shadow-7xl mt-5"></hr>
                  </center>
                  <div className="shadow-sm mt-5">
                    <Image
                      src="/demo.png"
                      width={44}
                      height={44}
                      className="md:w-[10%] m-3 lg:w-[7%]"
                      alt="demo"
                    />
                    <div className="text-sm dark:text-black">
                      <p className="mt-5 md:m-3 mb-5 md:text-sm text-xs">
                        click run the test button to trigger the test and wait
                        for the test to finish so you can see the result
                      </p>
                      <center>
                        <button className=" mt-10 mb-10 border-2 border-[#1A53A0] p-3 rounded-sm ">
                          RUN TEST
                        </button>{" "}
                        <br />
                        <small className="text-italic lg:text-sm lg:mb-3 ">
                          After ther test, result will show below
                        </small>
                      </center>
                      <div className="lg:mt-3 ">
                        <div className="max-w-full borderflex justify-center">
                          <video controls width="600" height="auto">
                            <source
                              src="https://res.cloudinary.com/dfn41fqnx/video/upload/v1764353011/playwright-results/latest-video.webm"
                              type="video/webm"
                            />
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <center>
                <button className=" mt-10 mb-10 border-2 border-[#1A53A0] p-3 rounded-sm">
                  DOWNLOAD MY CV
                </button>
              </center>
            </section>
            <section>
              <div className="mt-10 flex gap-5  ml-5 ">
                <div className=" ">
                  <Image src="/apple.png" width={34} height={24} alt="email" />
                </div>
                <div>
                  <Image
                    src="/whatsapp.png"
                    width={34}
                    height={24}
                    alt="whatsapp"
                  />
                </div>
                <div>
                  <Image
                    src="/github.png"
                    width={34}
                    height={24}
                    alt="github"
                  />
                </div>
              </div>
            </section>
          </section>
        </div>
      </main>
      <footer className="font-pop2 text-xs m-10 text-center">
        designed by Ilo Ifeanyi Victor{" "}
      </footer>
    </>
  );
}
