"use client";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Image from "next/image";
import { ModeToggle } from "@/component/button";
import callBackEnd from "@/lib/callBackEnd";
import Spinner from "@/component/spinner";
import CountdownTimer from "@/component/timer"
import TextType from "@/component/typewriter";
import { motion } from "motion/react";
import { postCardAnimation, postCardstyle } from "@/motions/motion1.motions";
import LogoLoop from "@/component/logoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { manualSkills, automationSkills } from "@/lib/skillsStorage";
import awakeBackEnd from "@/lib/awakenBend";

import BubbleMenu from '@/components/BubbleMenu';

awakeBackEnd();

const items = [
  {
    label: "Who am i",
    href: "#",
    ariaLabel: "who am i",
    rotation: -8,
    hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
  },
  {
    label: "tools and tech",
    href: "#tools",
    ariaLabel: "tools",
    rotation: 8,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
  },

  {
    label: "Technical Skills",
    href: "#skills",
    ariaLabel: "skills",
    rotation: 8,
    hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
  },
  {
    label: "projects",
    href: "#projects",
    ariaLabel: "Projects",
    rotation: 8,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
  },
  {
    label: " Download My CV (PDF)",
    href: "#cv",
    ariaLabel: "cv",
    rotation: 8,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
  },

  {
    label: "contact",
    href: "#contact",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
  },
];



const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const socket = io.connect(backEndUrl); // all client connects to this backend

//localStorage.setItem("socketId", `${socket.id}`);
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    {
      node: <SiTypescript />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <SiTailwindcss />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
  ];
  

export default function Qa() {

  function ScrollToSectionWithRef() {
    const mySectionRef = useRef(null);

    const scrollToSection = () => {
      if (mySectionRef.current) {
        mySectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };
  }
  // Alternative with image sources
  const imageLogos = [
    {
      src: "/postman.svg",
      alt: "Company 1",
      // href: "https://company1.com",
    },
    {
      src: "/git.svg",
      alt: "Company 2",
      // href: "https://company2.com",
    },
    {
      src: "/playwright.svg",
      alt: "Company 3",
      href: "https://company3.com",
    },
    {
      src: "/trello.svg",
      alt: "Company 3",
      //href: "https://company3.com",
    },
    {
      src: "/github.png",
      alt: "Company 3",
      //href: "https://company3.com",
    },
  ];

  const [videoUrl, setVideoUrl] = useState({
    status: "failed",
    timestamp: new Date().toISOString(),
    errorMessage: "error",
    videoUrl:"https://res.cloudinary.com/dfn41fqnx/video/upload/v1764353011/playwright-results/latest-video.webm",
    screenshotUrl: null,
  });
  
    const [newVideoUrl, setNewVideoUrl] = useState({
      status: "",
      timestamp: new Date().toISOString(),
      errorMessage: "error",
      videoUrl:null,
      screenshotUrl: null,
    });
  
  const [isClicked, setIsClicked] = useState(false);
  const [outgoing, setOutgoing] = useState("");

  const [message, setMessage] = useState({
    status: "",
    message: "",
  });




  //simulation of a chat app
  // const sendMessage = () => {
  //   try {
  //     socket.emit("handleClick", { outgoing });
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
  const handleClick = async() => {
    try {
      //socket.emit("handleClick", { message: "click is handled gracefully" });
      setIsClicked(true);
      setNewVideoUrl(prev=>({...prev, videoUrl:null}))
      const data = await callBackEnd(socket.id);
      setMessage(data)
    } catch (error) {
      console.log(error.message, "something went wrong")
    }
  }
  const [screenWitdth, setScreenWidth] = useState(null)
  // const setSocketId = () => {
  //   localStorage.setItem("socketId", `${socket.id}`);
  //   console.log(localStorage);
  // };
  // const viewSocketId = () => {
  //   console.log(localStorage.getItem("socketId"));
  //   console.log(localStorage)
  // }

  useEffect(() => {
    socket.on("privateMessage", (response) => {
      console.log(response, "from useffect frontend");
      setNewVideoUrl(response);
      setIsClicked(false);
      setMessage({ status: "complete", message: "Test Passed" })
    });
    setScreenWidth(window.innerWidth);
    console.log(window.innerWidth, "is the width");
  }, [socket, screenWitdth]);
  return (
    <>
      <main className="dark:bg-[url(/bgdarkmain.jpg)] bg-[url(/bgbg.svg)] p-2 bg-no-repeat bg-cover">
        <header className=" ">
          <div className=" flex justify-end mr-5 mt-1 fixed right-0">
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
        <div className=""></div>

        <div className="flex items-center    justify-items-end">
          <div className=" hover:border-[#1A53A0] mb-20   hover:shadow-[#021733] hover:shadow-sm dark:bg-transparent  dark:border-none  dark:border-[#021733] dark:shadow-[#021733]  dark:shadow-sm  bg-[#1A53A0] md:p-4 lg:rounded-none shadow-[#021733] shadow-sm text-white my-0.5 max-w-[70%] lg:max-w-[50%] rounded-sm">
            <TextType
              text={["ILO IFEANYI VICTOR"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={false}
              loop={false}
              cursorClassName="hidden"
              className="text-center p-1   font-pop1 text-2xl md:text-5xl ml-4"
            />
            <br />
            <TextType
              text={[
                "I AM A QUALITY ASSURANCE ENGINEER",
                "i make sure you ship quality product",
                "when i am not testing products, am playing piano",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              initialDelay={2000}
              className="text-center font-pop2 text-xs lg:text-sm ml-4"
            />
          </div>
          <div className="">
            <BubbleMenu
              logo={""}
              onMenuClick={(open) => false}
              items={items}
              menuAriaLabel="Toggle navigation"
              menuBg="#ffffff"
              menuContentColor="#111111"
              useFixedPosition={true}
              animationEase="back.out(1.5)"
              animationDuration={0.5}
              staggerDelay={0.12}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <section className="mx-2 lg:flex lg:flex-col lg:max-w-[80%] justify-center">
            <ul className="hidden  lg:flex dark:text-[#E8E8E8] gap-5 ml-8 mt-2 font-pop2">
              <li className="border-[#1A53A0]  dark:opacity-85  border text-center flex items-center text-xs shadow-[#021733] shadow-sm px-1 rounded-sm">
                Quality Assurance
              </li>
              <li className="border-[#1A53A0] dark:opacity-85  border text-center flex items-center text-xs shadow-[#021733] shadow-sm px-1 rounded-sm">
                Automation
              </li>
              <li className="border-[#1A53A0]  dark:opacity-85  border text-center flex items-center text-xs shadow-[#021733] shadow-sm px-1 rounded-sm">
                Manual
              </li>
            </ul>

            <section className="max-w-full   flex justify-center my-3">
              <div className=" flex md:gap-5 flex-col md:flex-row-reverse justify-center items-center">
                <div className="border-2 md:flex-1 dark:bg-transparent dark:border-none bg-[#1A53A0]  border-[#1A53A0] mb-3 md:rounded-full md:bg-[#1A53A0] md:shadow-2xl rounded-full md:flex md:justify-center w-[50%] overflow-hidden">
                  <Image
                    src="/me.jpeg"
                    width={200}
                    height={40}
                    alt="gears"
                    className=" shadow-sm"
                  />
                </div>
                <div
                  className="md:flex-1 mt-5 dark:bg-transparent dark:border-none p-2
dark:shadow-sm dark:shadow-[#021733]  dark:border-2  dark:border-[#021733]  shadow md:shadow-lg md:p-4 md:rounded-sm bg-white opacity-85"
                >
                  <motion.p
                    variants={postCardAnimation}
                    
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-xs lg:leading-relaxed sm:text-left dark:text-[#E8E8E8] md:text-sm font-pop2 md:text-justify"
                  >
                    {" "}
                    I am a passionate and highly motivated QA Specialist with
                    hands-on experience driving software quality within
                    Agile/Scrum environments. My expertise covers the{" "}
                    <span className="text-[#1A53A0] font-pop1">
                      full SDLC (Software Development Lifecycle)
                    </span>
                    , specializing practically in the design and execution of
                    Manual and Automation Testing. I am proficient in{" "}
                    <span className="text-[#1A53A0] font-pop1">
                      {" "}
                      Test Case Design, Test Documentation, systematic Defect
                      Management (Jira/Trello), validating RESTful APIs
                      (Postman/playwright), implementing regression, functional,
                      end-to-end test etc
                    </span>
                    <br></br>I ensure product integrity through rigorous testing
                    and robust Bug Reporting, focused on delivering reliable,
                    user-centric software solutions.
                  </motion.p>
                  {/*  <p className="text-xs dark:text-[#E8E8E8] md:text-sm font-pop2  text-justify">
                    I am a QA Specialist with hands-on experience in{" "}
                    <span className="text-[#1A53A0] dark:text-white font-pop1">
                      manual testing, automation, test documentation, bug
                      reporting, and ensuring product quality
                    </span>{" "}
                    through structured and efficient testing processes.
                  </p>*/}
                </div>
              </div>
            </section>
            <section id="tools" className=" mt-20 mb-10 lg:mt-20">
              <div className="flex dark:bg-transparent lg:mb-10 dark:border-dashed gap-2 mt-6 md:border lg:border-dashed md:max-w-[50%] justify-center items-center">
                <div className="flex-1 lg:mb-5 md:flex-2 w-1 md:max-w-[20%] ">
                  <Image
                    src="/pencil.png"
                    width={24}
                    height={24}
                    className="md:w-[70%] ml-4 lg:w-[30%]"
                    alt="gears"
                  />
                </div>
                <div
                  className="bg-[#1A53A0] mt-10 dark:bg-transparent  dark:border-2  dark:border-[#021733] dark:border-none
                    dark:shadow-sm dark:shadow-[#021733]  md:p-3  flex-3 p-0.2"
                >
                  <h1 className="font-pop1 p-1 sm:text-left text-2xl lg:text-4xl text-white md:text-right">
                    TOOLS AND TECHNOLOGIES
                  </h1>
                </div>
              </div>

              <div className="my-2 flex rounded-2xl gap-3 justify-center md:flex-row sm:flex-col flex-wrap">
                <motion.div
                  variants={postCardAnimation}
                  whileHover="whileHover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="border p-2 lg:max-w-[30%] md:max-w-[45%] mt-10   border-[#021733] border-dashed shadow-sm shadow-[#021733]"
                >
                  <div className="flex">
                    <Image
                      src="/playwright.svg"
                      width={24}
                      height={24}
                      alt="playwright icon"
                    />
                    <button className="border-[#1A53A0] dark:text-[#E8E8E8] dark:opacity-85 border shadow-[#021733] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                      PlayWright
                    </button>
                  </div>

                  <br />
                  <small className="italic text-[#1A53A0]">
                    My primary tool for building scalable and reliable
                    automation.
                  </small>
                  <div className="opacity-85">
                    <p className="font-pop2 opacity-85 leading-relaxed lg:text-sm text-xs text-justify ">
                      <span className="font-pop1 ">E2E Automation:</span>
                      Developed and maintained robust, cross-browser E2E test
                      suites using Playwright (JS/TS) for critical user paths.
                      <br /> <br />
                      <span className="font-pop1 ">Stability:</span> Wrote
                      resilient tests using native selectors and auto-waiting to
                      minimize test flake and ensure high reliability.
                      <br /> <br />
                      <span className="font-pop1 ">Debugging:</span> Configured
                      automated screenshots and video capture on failure,
                      accelerating defect reproduction.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={postCardAnimation}
                  whileHover="whileHover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="border p-2 lg:max-w-[30%] md:max-w-[45%] mt-10    border-[#021733] border-dashed  shadow-sm shadow-[#021733]"
                >
                  <div className="flex">
                    <Image
                      src="/actions.png"
                      width={24}
                      height={24}
                      alt="playwright icon"
                    />
                    <button className="border-[#1A53A0] dark:text-[#E8E8E8] dark:opacity-85 border shadow-[#021733] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                      GitHub Actions
                    </button>
                  </div>
                  <br />
                  <small className="italic text-[#1A53A0]">
                    My experience in integrating QA into the Continuous
                    Integration pipeline.
                  </small>
                  <div className="opacity-85">
                    <p className="leading-relaxed opacity-85  font-pop2 lg:text-sm text-xs text-justify ">
                      <span className="font-pop1 ">CI/CD Integration:</span>
                      Integrated Playwright tests into GitHub Actions for
                      automated execution upon PRs.
                      <br />
                      <br />
                      <span className="font-pop1 ">DevOps Workflow:</span>
                      Created YAML workflows to enforce regression testing
                      before deployment to staging.
                      <br />
                      <br />
                      <span className="font-pop1 ">Reporting:</span> Ensured
                      immediate test status visibility within the GitHub
                      environment.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={postCardAnimation}
                  whileHover="whileHover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="border p-2 border-[#021733] mt-10  border-dashed   md:max-w-[45%]  lg:max-w-[30%] shadow-sm shadow-[#021733]"
                >
                  <div className="flex">
                    <Image
                      src="/postman.svg"
                      width={24}
                      height={24}
                      alt="playwright icon"
                    />
                    <button className="border-[#1A53A0] dark:text-[#E8E8E8] dark:opacity-85 border shadow-[#021733] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                      Postman
                    </button>
                  </div>
                  <br />
                  <small className="italic text-[#1A53A0]">
                    My capability for validating backend business logic and data
                    integrity.
                  </small>
                  <div className="">
                    <p className="font-pop2 opacity-85 leading-relaxed  lg:text-sm text-xs text-justify ">
                      <span className="font-pop1 ">API Validation:</span>
                      <br />
                      <br />
                      Executed RESTful API functional testing using Postman.
                      Validated JSON schemas, status codes, and data integrity.
                      <br />
                      <br />
                      <span className="font-pop1 ">Scripting:</span> Used
                      pre-request scripts for dynamic data handling and
                      authentication (tokens) in multi-step API chains.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={postCardAnimation}
                  whileHover="whileHover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="border p-2 border-[#021733] mt-10 border-dashed    md:max-w-[45%]  lg:max-w-[30%] shadow-sm shadow-[#021733]"
                >
                  <div className="flex">
                    <Image
                      src="/git.svg"
                      width={24}
                      height={24}
                      alt="playwright icon"
                    />
                    <button className="border-[#1A53A0] dark:text-[#E8E8E8] dark:opacity-85 border shadow-[#021733] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                      Git and Github
                    </button>
                  </div>
                  <br />
                  <small className="italic text-[#1A53A0]">
                    My proficiency in using developer standards for
                    collaborative code management.
                  </small>
                  <div className="">
                    <p className="font-pop2 opacity-85 leading-relaxed  lg:text-sm text-xs   ">
                      <span className="font-pop1 ">Version Control:</span>
                      Practiced standard Git workflows (branching, merging) for
                      managing test code and collaborated via Pull Requests
                      (PRs) on GitHub.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={postCardAnimation}
                  whileHover="whileHover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="border p-2 border-[#021733] mt-10  border-dashed   md:max-w-[45%]  lg:max-w-[30%] shadow-sm shadow-[#021733]"
                >
                  <div className="flex">
                    <Image
                      src="/trello.svg"
                      width={24}
                      height={24}
                      alt="playwright icon"
                    />
                    <button className="border-[#1A53A0] dark:text-[#E8E8E8] dark:opacity-85 border shadow-[#021733] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                      Trello
                    </button>
                  </div>
                  <br />
                  <small className="italic text-[#1A53A0]">
                    My experience in applying Agile principles to the QA
                    workflow.
                  </small>
                  <div className="">
                    <p className="font-pop2 opacity-85 lg:text-sm leading-relaxed  text-xs   ">
                      <span className="font-pop1 ">Defect Management:</span>
                      Managed the Defect Lifecycle (tracking, prioritizing,
                      verification) within Agile/Scrum sprints using Trello
                      boards.
                      <br />
                      <br />
                      <span className="font-pop1 ">Workflow:</span> Visualized
                      and tracked testing tasks and bug statuses for
                      transparency and timely delivery.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={postCardAnimation}
                  whileHover="whileHover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="border p-2 border-[#021733] mt-10  border-dashed   md:max-w-[45%]  lg:max-w-[30%] shadow-sm shadow-[#021733]"
                >
                  <div className="flex">
                    <Image
                      src="/vscode.png"
                      width={24}
                      height={24}
                      alt="playwright icon"
                    />
                    <button className="border-[#1A53A0] dark:text-[#E8E8E8] dark:opacity-85 border shadow-[#021733] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                      VsCode
                    </button>
                  </div>
                  <br />
                  <small className="italic text-[#1A53A0]">
                    My skill set for debugging, analyzing, and writing efficient
                    test code.
                  </small>
                  <div className="">
                    <p className="font-pop2 opacity-85 leading-relaxed  lg:text-sm text-xs  ">
                      <span className="font-pop1 ">VS Code Proficiency:</span>
                      Highly proficient with VS Code for writing and debugging
                      test scripts. Leveraged extensions and integrated
                      debugging features for efficient test development and
                      maintenance.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={postCardAnimation}
                  whileHover="whileHover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="border p-2 border-[#021733] mt-10 border-dashed    md:max-w-[45%]  lg:max-w-[30%] shadow-sm shadow-[#021733] "
                >
                  <div className="flex">
                    <Image
                      src="/devTool.png"
                      width={24}
                      height={24}
                      alt="playwright icon"
                    />
                    <button className="border-[#1A53A0] dark:text-[#E8E8E8] dark:opacity-85 border shadow-[#021733] shadow-sm px-0.5 rounded-lg text-xs font-pop2 mx-2">
                      Chrome DevTools
                    </button>
                  </div>
                  <br />
                  <small className="italic text-[#1A53A0]">
                    My primary tool for monitoring requests and responses during
                    tests
                  </small>
                  <div className="">
                    <p className="font-pop2 opacity-85 leading-relaxed  lg:text-sm text-xs  ">
                      <span className="font-pop1 ">Chrome DevTools:</span> Used
                      the Network panel to monitor API requests and responses
                      and the Console to diagnose front-end JavaScript errors
                      during manual and exploratory testing. Created robust
                      CSS/XPath selectors using the Elements panel for reliable
                      automation locators.
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Vertical loop with deceleration on hover 
                <LogoLoop
                  logos={techLogos}
                  speed={80}
                  direction="up"
                  logoHeight={48}
                  gap={40}
                  hoverSpeed={20}
                  fadeOut
                />*/}

            <motion.section
              variants={postCardAnimation}
              whileHover="whileHover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-20 mb-8"
            >
              <div
                className=" bg-[#1A53A0]  lg:mt-20 mt-20  dark:bg-transparent lg:p-3 dark:border-2  dark:border-[#021733] dark:border-none
                dark:shadow-sm dark:shadow-[#021733] text-white md:mt-8  max-w-[70%] "
              >
                <h1
                  id="skills"
                  className="font-pop1 mt-5 text-2xl lg:text-4xl lg:pt-10 p-1 md:p-3 "
                >
                  SKILLS OVERVIEW
                </h1>
              </div>
              <small className="italic text-[#1A53A0]">
                Agile/Scrum oriented
              </small>
              <div className="flex shadow-sm mt-5 mb-5 md:gap-10 p-3 justify-center gap-4">
                <div className="max-w-[50%] border-r pr-2 md:pr-8">
                  <h2 className="font-pop1 text-sm md:text-lg  border-[#021733]  border-b-2">
                    MANUAL TESTING
                  </h2>
                  <ul className="font-pop2 text-xs md:text-sm border-[#021733]  border border-dashed shadow-sm p-2 ">
                    {manualSkills.map((skill, index) => (
                      <li
                        key={index}
                        className=" border-[#05162c] opacity-80 border m-2 shadow-sm p-2 dark:opacity-85"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className=" max-w-[50%]">
                  <h2 className="font-pop1 md:text-lg  text-sm border-[#1A53A0] border-b-2">
                    AUTOMATED TESTING
                  </h2>
                  <ul className="font-pop2 text-xs md:text-sm border-[#1A53A0] border-dashed border shadow-sm p-2 ">
                    {automationSkills.map((skill, index) => (
                      <li
                        key={index}
                        className=" border-[#163a02] opacity-80 border m-2 shadow-sm p-2 dark:opacity-85"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {screenWitdth <= 425 && (
                <center>
                  <div className="w-full">
                    {/* Basic horizontal loop */}
                    <LogoLoop
                      logos={imageLogos}
                      speed={50}
                      width={300}
                      direction="left"
                      logoHeight={20}
                      gap={40}
                      hoverSpeed={0}
                      scaleOnHover
                      fadeOut
                      fadeOutColor="#ffffff"
                      ariaLabel="Technology partners"
                    />
                  </div>
                </center>
              )}

              {screenWitdth === 768 && (
                <center>
                  <div className="w-full">
                    {/* Basic horizontal loop */}
                    <LogoLoop
                      logos={imageLogos}
                      speed={50}
                      width={600}
                      direction="left"
                      logoHeight={20}
                      gap={40}
                      hoverSpeed={0}
                      scaleOnHover
                      fadeOut
                      fadeOutColor="#ffffff"
                      ariaLabel="Technology partners"
                    />
                  </div>
                </center>
              )}

              {screenWitdth > 768 && (
                <center>
                  <div className="w-full">
                    {/* Basic horizontal loop */}
                    <LogoLoop
                      logos={imageLogos}
                      speed={50}
                      direction="left"
                      logoHeight={40}
                      gap={40}
                      hoverSpeed={0}
                      scaleOnHover
                      fadeOut
                      fadeOutColor="#ffffff"
                      ariaLabel="Technology partners"
                      className="max-w-full"
                    />
                  </div>
                </center>
              )}
            </motion.section>

            <motion.section
              variants={postCardAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              id="projects"
              className="mt-20 mb-8 font-pop2 md:bg-amber-100 "
              style={{
                backgroundImage: "url(/notepad.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div
                className="bg-[#1A53A0] dark:border-none
                dark:shadow-sm dark:shadow-[#021733] dark:bg-transparent  dark:border-2  dark:border-[#021733] mb-5"
              >
                <h1 className="font-pop1 text-2xl md:p-3 lg:text-4xl text-white text-center p-1">
                  PROJECTS
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
                        <span className="font-pop1">TEST CASES:</span>{" "}
                        <a
                          className="text-[#1A53A0] underline"
                          href="https://drive.google.com/file/d/12ox0zVzSOvY4Qr9BejLsSffjGgTG-MPO/view?usp=sharing"
                        >
                          Link to test cases pdf
                        </a>
                      </p>
                      <p className="m-2">
                        <span className="font-pop1">WHAT I TESTED:</span> E2E
                        tests to be sure website is functional
                      </p>
                      <p className="m-2">
                        <span className="font-pop1">WEBSITE URL: </span>
                        <a
                          target="_blank"
                          className="text-[#1A53A0] underline"
                          href="https://www.saucedemo.com/"
                        >
                          https://www.saucedemo.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="shadow-sm mt-5">
                    <div className="text-sm dark:text-black">
                      <div className="lg:mt-3 ">
                        <div className="max-w-full border flex justify-center">
                          <video controls width="600" height="auto">
                            <source src={videoUrl.videoUrl} type="video/webm" />
                          </video>
                        </div>
                      </div>
                    </div>
                    <div className="mt-15">
                      <center>
                        <hr className="max-w-2/3 border-[#1A53A0] shadow-[#021733] md:mt-8 shadow-7xl mt-5"></hr>
                        <div className="flex flex-col items-center justify-center">
                          <Image
                            src="/demo.png"
                            width={44}
                            height={44}
                            className="md:w-[10%] m-3 lg:w-[7%]"
                            alt="demo"
                          />
                          <h1 className="mt-4 dark:text-black">
                            Its demo time!!!
                          </h1>
                          <h1 className="dark:text-black">
                            YOU CAN RUN A LIVE DEMO
                          </h1>
                        </div>

                        <hr className="max-w-2/3 border-[#1A53A0] shadow-[#021733] shadow-7xl mt-5"></hr>
                        <p className="mt-5 md:m-3 dark:text-black mb-5 md:text-sm text-xs">
                          click run the test button to trigger the test and wait
                          for the test to finish so you can see the result
                        </p>
                      </center>
                    </div>

                    <center>
                      <div
                        onClick={handleClick}
                        className=" max-w-[50%] justify-center items-center gap-2 flex mt-10 mb-10 border-2 dark:text-black text-black border-[#1A53A0]  hover:text-white hover:shadow-2xl active:text-white active:bg-[#1A53A0]  focus:text-white  hover:bg-indigo-700 hover:shadow-[#021733] p-3 rounded-sm "
                      >
                        <h1>RUN TEST</h1>
                        {isClicked && <Spinner />}
                      </div>

                      <br />
                      <small className="text-italic dark:text-black lg:text-sm lg:mb-3 ">
                        After ther test, result will show below
                      </small>
                      <p className="text-italic dark:text-black lg:text-sm lg:mb-3">
                        {message.message} | {message.status}
                      </p>

                      {isClicked && !newVideoUrl.videoUrl && <CountdownTimer />}
                      {newVideoUrl.videoUrl && (
                        <>
                          <div className="text-sm dark:text-black">
                            <div className="lg:mt-3 ">
                              <div className="max-w-full border flex justify-center">
                                <video controls width="600" height="auto">
                                  <source
                                    src={newVideoUrl.videoUrl}
                                    type="video/webm"
                                  />
                                </video>
                              </div>
                            </div>
                          </div>
                          <div className="m-2">
                            <span className="text-[#1A53A0] flex md:items-center md:gap-3  mt-2 mb-2">
                              code ------
                              <a
                                href="https://github.com/Understandingvictor/QA-test-project-using-playwright"
                                target="_blank"
                              >
                                <Image
                                  src="/code.png"
                                  width={24}
                                  height={24}
                                  alt="code"
                                />
                              </a>
                            </span>
                          </div>
                        </>
                      )}
                    </center>
                  </div>
                </div>
              </div>
            </motion.section>
            <section id="cv" className="mt-20 mb-20">
              <center>
                <a
                  href={`https://drive.google.com/uc?export=download&id=1VzkjbZvl8dmEVgKspisLoyCRwnnVgGgO`}
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer" // Security best practice for target="_blank"
                  className="w-full mt-10 mb-10  text-center block px-6 py-3 text-lg font-semibold rounded-lg text-white bg-[#1A53A0] hover:bg-indigo-700 active:bg-[#1A53A0]  transition duration-150 shadow-lg"
                >
                  Download My CV (PDF)
                </a>
              </center>
            </section>
            <section id="contact">
              <div className="mt-10  flex gap-5 items-center  ml-5 ">
                <h3 className="font-pop2">CONTACT ME</h3>
                <div className=" ">
                  <a href="mailto:ifeanyivictortech@gmail.com" role="button">
                    <Image
                      src="/apple.png"
                      width={34}
                      height={24}
                      alt="email"
                    />
                  </a>
                </div>
                <div>
                  <a href="https://wa.me/2438153835912" target="_blank">
                    <Image
                      src="/whatsapp.png"
                      width={34}
                      height={24}
                      alt="whatsapp"
                    />
                  </a>
                </div>
                <div>
                  <a
                    target="_blank"
                    href="https://github.com/Understandingvictor"
                  >
                    <Image
                      src="/github.png"
                      width={34}
                      height={24}
                      alt="github"
                    />
                  </a>
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
