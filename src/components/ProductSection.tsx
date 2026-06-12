import {
  COURSES_HREF,
  PYTHON_COURSE_HREF,
  VIBECODING_COURSE_HREF,
} from "@/lib/links";

export function ProductSection() {
  return (
    <div id="courses" className="scroll-mt-24">
      <section>
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <div className="home-card overflow-hidden rounded-[20px]">
            <div className="px-6 pt-8 md:px-10 md:pt-12">
              <h2 className="text-xl leading-[1.1] tracking-[-0.02em] md:text-[1.9375rem]">
                <span>Courses built for the curious.</span>
                <br />
                <span className="text-[#818181]">
                  Real coding skills from student teachers — loved by learners
                  across 110+ countries, completely free.
                </span>
              </h2>
            </div>
            <div className="mt-8 grid border-t-[0.5px] border-[#e1e1e1] md:mt-10 md:grid-cols-2">
              <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 md:border-r-[0.5px] md:border-r-[#e1e1e1] border-b-[0.5px] border-b-[#e1e1e1] ">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl">Python for Complete Beginners</h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                    Zero experience? Perfect. Go from nothing to building real
                    projects — loved by 800+ students across 50+ countries.
                  </p>
                  <a
                    href={PYTHON_COURSE_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="home-arrow-link mt-5"
                  >
                    Enroll free <span className="home-arrow">→</span>
                  </a>
                </div>
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden="true"
                  className="aspect-square w-[60%] max-w-[230px] shrink-0 self-center md:w-[40%] md:self-auto"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="84"
                    stroke="#cecece"
                    strokeWidth="1"
                    strokeDasharray="2 5"
                  ></circle>
                  <path
                    d="M159 100h-32M129.5 151l-16-28M70.5 151l16-28M41 100h32M70.5 49l16 28M129.5 49l-16 28"
                    stroke="#cecece"
                    strokeWidth="1"
                  ></path>
                  <circle
                    className="home-node"
                    style={{ animationDelay: "-1.2s" }}
                    cx="166"
                    cy="100"
                    r="7"
                    fill="#ffffff"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></circle>
                  <circle
                    className="home-node"
                    style={{ animationDelay: "-2.4s" }}
                    cx="133"
                    cy="157"
                    r="7"
                    fill="#ffffff"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></circle>
                  <circle
                    className="home-node"
                    style={{ animationDelay: "-3.6s" }}
                    cx="67"
                    cy="157"
                    r="7"
                    fill="#ffffff"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></circle>
                  <circle
                    className="home-node"
                    style={{ animationDelay: "-4.8s" }}
                    cx="34"
                    cy="100"
                    r="7"
                    fill="#ffffff"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></circle>
                  <circle
                    className="home-node"
                    style={{ animationDelay: "-6s" }}
                    cx="67"
                    cy="43"
                    r="7"
                    fill="#ffffff"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></circle>
                  <circle
                    className="home-node"
                    style={{ animationDelay: "-7.2s" }}
                    cx="133"
                    cy="43"
                    r="7"
                    fill="#dbefdb"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></circle>
                  <path
                    d="M78 86v28c0 4.4 9.85 8 22 8s22-3.6 22-8V86"
                    fill="#f2f2f2"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></path>
                  <ellipse
                    cx="100"
                    cy="86"
                    rx="22"
                    ry="8"
                    fill="#dbefdb"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></ellipse>
                </svg>
              </div>
              <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14  border-b-[0.5px] border-b-[#e1e1e1] ">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl">Vibecoding 101</h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                    Build real apps using AI tools like Cursor and Copilot. The
                    future of coding — learn to build fast, creatively, and with
                    purpose.
                  </p>
                  <a
                    href={VIBECODING_COURSE_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="home-arrow-link mt-5"
                  >
                    Enroll free <span className="home-arrow">→</span>
                  </a>
                </div>
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden="true"
                  className="aspect-square w-[60%] max-w-[230px] shrink-0 self-center md:w-[40%] md:self-auto"
                >
                  <rect
                    x="78"
                    y="36"
                    width="44"
                    height="30"
                    rx="7"
                    fill="#dbefdb"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></rect>
                  <path d="M87 47h26M87 55h18" stroke="#0a0e19" strokeWidth="1"></path>
                  <path
                    className="home-flow-dash"
                    d="M100 66v20M44 86h112M44 86v22M100 86v22M156 86v22"
                    stroke="#b9b9b9"
                    strokeWidth="1"
                  ></path>
                  <rect
                    x="24"
                    y="108"
                    width="40"
                    height="34"
                    rx="6"
                    fill="#ffffff"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></rect>
                  <path d="M32 121h24M32 129h17" stroke="#0a0e19" strokeWidth="1"></path>
                  <rect
                    x="80"
                    y="108"
                    width="40"
                    height="34"
                    rx="6"
                    fill="#ffffff"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></rect>
                  <path d="M88 121h24M88 129h17" stroke="#0a0e19" strokeWidth="1"></path>
                  <rect
                    x="136"
                    y="108"
                    width="40"
                    height="34"
                    rx="6"
                    fill="#dbefdb"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></rect>
                  <path d="M144 121h24M144 129h17" stroke="#0a0e19" strokeWidth="1"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14 md:border-r-[0.5px] md:border-r-[#e1e1e1] border-b-[0.5px] border-b-[#e1e1e1] md:border-b-0">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl">Completely free, forever</h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                    Quality coding education should cost nothing. Every course,
                    every resource, every minute of teaching — free with no
                    strings attached, for every student everywhere.
                  </p>
                  <a href={COURSES_HREF} className="home-arrow-link mt-5">
                    Browse all courses <span className="home-arrow">→</span>
                  </a>
                </div>
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden="true"
                  className="aspect-square w-[60%] max-w-[230px] shrink-0 self-center md:w-[40%] md:self-auto"
                >
                  <path
                    d="M100 12v8M100 180v8M12 100h8M180 100h8"
                    stroke="#cecece"
                    strokeWidth="1"
                  ></path>
                  <g className="home-orbit">
                    <circle
                      cx="100"
                      cy="100"
                      r="84"
                      stroke="#cecece"
                      strokeWidth="1"
                      strokeDasharray="2 5"
                    ></circle>
                    <circle
                      cx="100"
                      cy="16"
                      r="5"
                      fill="#dbefdb"
                      stroke="#0a0e19"
                      strokeWidth="1"
                    ></circle>
                  </g>
                  <path
                    d="M72 84v34c0 5.6 12.5 10 28 10s28-4.4 28-10V84"
                    fill="#f2f2f2"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></path>
                  <path
                    d="M72 96c0 5.6 12.5 10 28 10s28-4.4 28-10M72 108c0 5.6 12.5 10 28 10s28-4.4 28-10"
                    stroke="#cecece"
                    strokeWidth="1"
                  ></path>
                  <ellipse
                    cx="100"
                    cy="84"
                    rx="28"
                    ry="10"
                    fill="#dbefdb"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></ellipse>
                </svg>
              </div>
              <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-14   md:border-b-0">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl">Made by students, for students</h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-[#636363] md:text-base">
                    We are a student-run nonprofit united by one belief — that
                    every young person deserves the same opportunities to learn
                    code, no matter where they live or what they can afford.
                  </p>
                  <a href={COURSES_HREF} className="home-arrow-link mt-5">
                    Start today — it costs nothing{" "}
                    <span className="home-arrow">→</span>
                  </a>
                </div>
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden="true"
                  className="aspect-square w-[60%] max-w-[230px] shrink-0 self-center md:w-[40%] md:self-auto"
                >
                  <path
                    className="home-flow-dash"
                    d="M12 72h68M12 98h68M12 124h68"
                    stroke="#b9b9b9"
                    strokeWidth="1"
                  ></path>
                  <path
                    d="M100 38l42 16v35c0 31-19 48-42 57-23-9-42-26-42-57V54l42-16Z"
                    fill="#ffffff"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></path>
                  <circle cx="100" cy="98" r="22" fill="#dbefdb"></circle>
                  <path
                    d="M90 98l7 7 13-14"
                    stroke="#0a0e19"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    className="home-flow-dash"
                    d="M148 98h28"
                    stroke="#b9b9b9"
                    strokeWidth="1"
                  ></path>
                  <rect
                    x="178"
                    y="92"
                    width="12"
                    height="12"
                    rx="2"
                    fill="#dbefdb"
                    stroke="#0a0e19"
                    strokeWidth="1"
                  ></rect>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
