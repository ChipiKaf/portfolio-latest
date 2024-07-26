import { useMemo, useRef } from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css'
import { motion, useScroll, useMotionValueEvent, useTransform, useSpring } from 'framer-motion'
import "../styles/pages/About.scss";

const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

export const getCountryFlagEmoji = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
const About = () => {
  const scrollRef = useRef()
  const { scrollY } = useScroll({ 
    container: scrollRef, 
    smooth: 0.5,
   })
  

  const experience = useMemo(() => {
    return [
      {
        bullet: "I",
        company: `EPI-USE Africa (2021 - current) &nbsp; <img class="emoji" src="/south-africa.png" />`,
        text: `At Epi-USE Africa, I had the unique opportunity to 
              work on diverse projects 
              from various parts of the world, 
              allowing me to adapt to different technology stacks and 
              business requirements. 
              This experience not only broadened my technical skillset but 
              also enhanced my ability to collaborate with global teams 
              and understand different cultural and business contexts.`,
        languages: ''
      },
      {
        bullet: "I.I",
        company: `Nevolane (2021 - 2022) &nbsp; <img class="emoji" src="/switzerland.png" />`,
        text: `
          Contributed to <b>'Nevolane'</b>, a video calling service that simulates a virtual office. This project provided a comprehensive experience in full-stack development, cloud services, and real-time communications.
          <br />
          <br />
          <b>Backend Development:</b><br />
          Developed the media server using the <b>Mediasoup library in Node.js</b>, focusing on scalability and real-time communication management.
          Created <b>database migrations</b> and wrote optimized queries for the <b>PostgreSQL</b> database.
          Gained experience with <b>Amazon EC2</b> and <b>ECS/ECR</b> for deploying and managing the media server.
          <br />
          <br />
          <b>Frontend Development:</b><br />
          Built the frontend for both mobile (<b>React Native</b>) and web (<b>React</b>) applications.
          Integrated authentication services like <b>AWS Cognito</b>, managed <b>WebSocket events</b>, and adhered to clean coding principles.
          Implemented state management using <b>Redux Toolkit</b>.
          <br /><br />
          <b>DevOps and CI/CD:</b><br />
          Implemented CI/CD pipelines using <b>AWS CodeBuild</b>.
          Utilized infrastructure as code with <b>AWS CDK</b> to streamline and automate infrastructure management.
          Set up a static website using <b>AWS S3</b>, <b>AWS Route 53</b>, and <b>AWS CloudFront</b>.
          Added SSL certificates using <b>AWS ACM</b> to ensure secure connections.
          <br /><br />
          <b>Security and Authentication:</b><br />
          Handled <b>JWT authentication with JWKs</b> for a feature allowing unregistered users to join as guests, following security best practices.
          Set up secrets management using <b>AWS Secrets Manager</b> to securely store and manage sensitive information.
          <br /><br />
          <b>Testing and Documentation:</b><br />
          Conducted unit tests to ensure robust and error-free code.
          Created and maintained documentation using <b>Confluence</b> and <b>Storybook</b>.
          Managed tasks and tickets using <b>Jira</b>.

        `,
        languages: 'react node'
      },
      {
        bullet: "I.II",
        company: `Metics (2023 - Feb 2024) &nbsp; <img class="emoji" src="/netherlands.png" />`,
        text: `
        Contributed to <b>'Metics'</b>, an online financial modeling tool. This project allowed for significant enhancement of my skills in frontend development and user experience design.
        <br />
        <br />
        <b>Frontend Development:</b><br />
        Built new features and interfaces from Figma designs using <b>Vue</b> and <b>Nuxt3</b>.
        Collaborated closely with design teams to ensure a seamless user experience.
        <br />
        <br />
        <b>Collaboration:</b><br />
        Worked with cross-functional teams to integrate new functionalities and improve existing ones.
        Ensured alignment with design specifications and business requirements.
        <br />
        <br />
        <b>User Experience:</b><br />
        Focused on optimizing the user interface for better engagement and usability.
        Implemented responsive design principles to ensure compatibility across various devices.
        `,
        languages: 'vue php'
      },
      {
        bullet: "I.III",
        company: `EPI-Centre (2024 - present) &nbsp; <img class="emoji" src="/belgium.png" />`,
        text: `
          Contributed to <b>'Epi-centre'</b>, an online document management system. This project provided extensive experience in frontend development, API management, and AWS services.
          <br />
          <br />
          <b>Frontend Development:</b><br />
          Led the frontend development focused on <b>React</b>.
          Integrated <b>GraphQL APIs with AWS AppSync</b>, managing REST APIs via <b>AWS Lambda</b> and <b>API Gateway</b>.
          Implemented state management using <b>RTK Query</b>.
          <br />
          <br />
          <b>Backend Development:</b><br />
          Worked with <b>Node.js</b> for updating the Lambdas.
          Managed roles and permissions with <b>AWS IAM</b>.
          Created resources with <b>AWS CDK</b> for different environments (develop, staging, prod).
          <br />
          <br />
          <b>Database Management:</b><br />
          Created migrations for <b>DynamoDB</b> to move data from an old schema to a new one ensuring compatibility.
          <br />
          <br />
          <b>GraphQL Development:</b><br />
          Worked with <b>AWS AppSync</b>, creating and updating resolvers.
          <br />
          <br />
          <b>Code Quality and Refactoring:</b><br />
          Performed extensive refactoring, enforcing <b>CLEAN code practices</b>.
        `,
        languages: 'react node'
      },
    ];
  }, []);

  const skills = useMemo(() => {
    return [
      {
        label: "Frontend development",
        progress: 99,
      },
      {
        label: "Frontend design",
        progress: 30,
      },
      {
        label: "Backend development",
        progress: 95,
      },
      {
        label: "DevOps & CI/CD",
        progress: 80,
      },
      {
        label: "Database management",
        progress: 60,
      },
      {
        label: "AWS services",
        progress: 80,
      },
    ];
  }, []);

  const languages = useMemo(() => {
    return ["Javascript", "Typescript", "Python", "HTML", "CSS", "SCSS", "C#"];
  }, []);

  const frameworks = useMemo(() => {
    return [
      "Angular",
      "Vue",
      "React (including Redux and React Native)",
      ".Net Core",
    ];
  }, []);

  const toolsAndPlatforms = useMemo(() => {
    return [
      "AWS",
      "Firebase",
      "MongoDB",
      "PostgresSQL",
      "Node.js",
      "Jest",
      "Postman",
    ];
  }, []);

  const collaborationAndDocumentation = useMemo(() => {
    return ["Git", "Jira", "Confluence", "Gitlab", "Trello"];
  }, []);

  const devOpsAndCICD = useMemo(() => {
    return [
      "Lambda",
      "Apigateway",
      "Codebuild",
      "CDK",
      "Bitbucket",
      "Codecommit",
      "Codedeploy",
      "Codepipeline",
      "ECS",
      "Docker",
    ];
  }, []);

  const smoothScrollY = useSpring(useTransform(scrollY, (value) => {
    const dampenedValue = value * 0.05
    return clamp(dampenedValue, 0, 5);
  }), {
    stiffness: 50,
    damping: 10,
    mass: 0.1,
  });
  
  const smoothScrollY2 = useSpring(useTransform(scrollY, (value) => value * 0.1), {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });
  return (
    <>
      <motion.section ref={scrollRef} className="about-section">
        <h1  className="overflow-hidden d-flex justify-content-center align-items-center">
          <span className="page-heading">ABOUT</span>
        </h1>
        <p className="page-text page-text-container">
          My name is Chipili, a dedicated and innovative Full Stack Software
          Engineer and Create developer with a solid foundation in Engineering.
          My journey from engineering to software development has been fueled by
          a passion for solving complex problems and creating impactful digital
          solutions.
        </p>
        {/* <hr /> */}
        <div className="row mt-5 w-100">
          <div className="col-12 d-flex col-md-6 justify-content-center align-items-start">
            <motion.h2 style={{ y: smoothScrollY }} class="section-heading">Experience</motion.h2>
          </div>
          <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center bullet-container">
            {experience.map((value, i) => {
              return (
                <div
                  key={`${i}-experience`}
                  data-images={value.languages}
                  className={`row d-flex justify-content-center justify-content-md-start align-items-start experience`}
                >
                  <div 
                  data-images={value.languages}
                  className="col-2 experience">
                    <motion.div style={{ y: smoothScrollY2 }} className="bullet parallax">
                      {value.bullet}
                    </motion.div>
                  </div>
                  <div className="col-10 experience" data-images={value.languages}>
                    <h2
                      className="page-text d-flex align-items-center"
                      dangerouslySetInnerHTML={{ __html: value.company }}
                    ></h2>
                    <p
                      className="page-text small"
                      dangerouslySetInnerHTML={{ __html: value.text }}
                    ></p>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
        {/* <hr /> */}
        <div className="row mt-5">
          <div className="col-12 d-flex col-md-6 justify-content-center">
            <motion.h2 style={{ y: smoothScrollY }} class="section-heading">Education</motion.h2>
          </div>
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
            <h2 className="page-text small">
              Bachelor of Engineering, Electrical Engineering, 2015 - 2019
            </h2>
            <h2 className="page-text small">
              University of Pretoria, Pretoria, South Africa
            </h2>
            <p className="page-text small mt-5">
              Developed a passion for coding; achieved a distinction in a C++
              module focusing on software engineering principles and data
              structures. I developed a strong ability for problem solving
              having done complex modules like Microprocessors and a final year
              project that required me to implement an IOT system.
            </p>
          </div>
        </div>
        <hr />
        <div className="row mt-5">
          <div className="col-12 d-flex col-md-6 justify-content-center">
            <motion.h2 style={{ y: smoothScrollY }} class="section-heading">Skills</motion.h2>
          </div>
          <div className="col-12 col-md-6 d-flex flex-row align-items-center justify-content-start">
            <div className="row">
              <div className="col-12">
                <h3 className="page-text small">Ratings</h3>
              </div>
              {skills.map((skill, i) => {
                return (
                  <div
                    key={`${i}-skill`}
                    className="col-12 d-flex align-items-center justify-content-start gap-20"
                  >
                    <div className="row w-100">
                      <div className="col d-flex align-items-center">
                        <progress
                          className={`progress-bar ${
                            skill.progress <= 30
                              ? "bad"
                              : skill.progress <= 70
                              ? "ok"
                              : "good"
                          }`}
                          id="frontend-development"
                          value={`${skill.progress}`}
                          max="100"
                          color="#ff0000"
                        ></progress>
                      </div>
                      <div className="col">
                        <label
                          className="progress-label"
                          htmlFor="frontend-development"
                        >
                          {skill.label}
                        </label>
                      </div>
                    </div>
                    &nbsp;
                  </div>
                );
              })}
              <div className="col-12">
                <h3 className="page-text small mt-5">Languages</h3>
                {languages.map((language, i) => {
                  return (
                    <p key={`${i}-language`} className="progress-label">
                      <b>{language}</b>
                    </p>
                  );
                })}
              </div>

              <div className="col-12">
                <h3 className="page-text small mt-5">Frameworks/Libraries</h3>
                {frameworks.map((framework, i) => {
                  return (
                    <p key={`${i}-framework`} className="progress-label">
                      <b>{framework}</b>
                    </p>
                  );
                })}
              </div>

              <div className="col-12">
                <h3 className="page-text small mt-5">Tools & Platforms</h3>
                {toolsAndPlatforms.map((toolOrPlatform, i) => {
                  return (
                    <p key={`${i}-toolOrPlatform`} className="progress-label">
                      <b>{toolOrPlatform}</b>
                    </p>
                  );
                })}
              </div>

              <div className="col-12">
                <h3 className="page-text small mt-5">
                  Collaboration & Documentation
                </h3>
                {collaborationAndDocumentation.map((collabOrDoc, i) => {
                  return (
                    <p key={`${i}-collabOrDoc`} className="progress-label">
                      <b>{collabOrDoc}</b>
                    </p>
                  );
                })}
              </div>

              <div className="col-12">
                <h3 className="page-text small mt-5">DevOps & CI/CD</h3>
                {devOpsAndCICD.map((devOpOrCi, i) => {
                  return (
                    <p key={`${i}-devOpOrCi`} className="progress-label">
                      <b>{devOpOrCi}</b>
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default About;
