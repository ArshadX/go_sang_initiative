'use client'

import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";

// Define the structure of each step
interface Step {
  name: string;
  href: string;
  status: "current" | "upcoming" | "complete";
}

export default function Carousal() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [moving, setMoving] = useState<"right" | "left">("right");

  const [steps, setSteps] = useState<Step[]>([
    { name: "/images/about/vimal.jpg", href: "#", status: "current" },
    { name: "/images/promotions/laptop/testing.png", href: "#", status: "upcoming" },
    { name: "/images/about/vimal.jpg", href: "#", status: "current" },
    { name: "/images/promotions/laptop/testing.png", href: "#", status: "upcoming" },
  ]);

  const prevStep = () => {
    setMoving("left");
    setSteps((oldSteps) =>
      oldSteps.map((step, i) => {
        if (i === currentStep) {
          step.status = "upcoming";
        } else if (i === currentStep - 1) {
          step.status = "current";
        }
        return step;
      })
    );
    setCurrentStep(currentStep - 1);
  };

  const nextStep = async () => {
    setMoving("right");

    setSteps((oldSteps) =>
      oldSteps.map((step, i) => {
        if (i === currentStep) {
          step.status = "complete";
        } else if (i === currentStep + 1) {
          step.status = "current";
        }
        return step;
      })
    );
    setCurrentStep(currentStep + 1);
  };

  const wrapper = useRef<HTMLDivElement | null>(null);
  const [wrapperWidth, setWrapperWidth] = useState<number>(1);

  useEffect(() => {
    function handleResize() {
      if (wrapper.current !== null) {
        setWrapperWidth(wrapper.current.offsetWidth);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <div className="flex-1 bg-white flex flex-col justify-top py-12 px-4 sm:px-6 ">
        <div className="flex items-start overflow-hidden w-96 sm:w-full" ref={wrapper}>
          <div className="flex flex-nowrap ">
            {/* Transition for step 1 */}
            <Transition
              appear={false}
              unmount={false}
              show={currentStep === 0}
              enter="transform transition ease-in-out duration-500"
              enterFrom={moving === "right" ? `translate-x-96 opacity-0` : `-translate-x-96 opacity-0`}
              enterTo={`translate-x-0 opacity-100`}
              leave="transform transition ease-in-out duration-500 "
              leaveFrom={`translate-x-0 opacity-100`}
              leaveTo={moving === "right" ? `-translate-x-full opacity-0` : `translate-x-full opacity-0`}
              className="w-0 bg-green-200 overflow-visible"
              as="div"
            >
              <div className="bg-green-200" style={{ width: `${wrapperWidth}px` }}>
                <div style={{ position: 'relative', height: '400px' }}>
        <Image
          alt="Mountains"
          src={steps[0].name}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: 'cover', // cover, contain, none
          }}
        />
      </div>
              </div>
            </Transition>

            {/* Transition for step 2 */}
            <Transition
              appear={false}
              unmount={false}
              show={currentStep === 1}
              enter="transform transition ease-in-out duration-500"
              enterFrom={moving === "right" ? `translate-x-96 opacity-0` : `-translate-x-96 opacity-0`}
              enterTo={`translate-x-0 opacity-100`}
              leave="transform transition ease-in-out duration-500 "
              leaveFrom={`translate-x-0 opacity-100`}
              leaveTo={moving === "right" ? `-translate-x-96 opacity-0` : `translate-x-96 opacity-0`}
              className="bg-red-200 w-0 overflow-visible"
              as="div"
            >
               <div className="bg-green-200" style={{ width: `${wrapperWidth}px` }}>
               <div style={{ position: 'relative', height: '400px' }}>
        <Image
          alt="Mountains"
          src={steps[1].name}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: 'cover', // cover, contain, none
          }}
        />
      </div>
              </div>
            </Transition>

            {/* Transition for step 3 */}
            <Transition
              appear={false}
              unmount={false}
              show={currentStep === 2}
              enter="transform transition ease-in-out duration-500"
              enterFrom={moving === "right" ? `translate-x-96 opacity-0` : `-translate-x-96 opacity-0`}
              enterTo={`translate-x-0 opacity-100`}
              leave="transform transition ease-in-out duration-500 "
              leaveFrom={`translate-x-0 opacity-100`}
              leaveTo={moving === "right" ? `-translate-x-96 opacity-0` : `translate-x-96 opacity-0`}
              className="w-0 overflow-visible"
              as="div"
            >
               <div className="bg-green-200" style={{ width: `${wrapperWidth}px` }}>
               <div style={{ position: 'relative', height: '400px' }}>
        <Image
          alt="Mountains"
          src={steps[2].name}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: 'cover', // cover, contain, none
          }}
        />
      </div>
              </div>
            </Transition>

            {/* Transition for step 4 */}
            <Transition
              appear={false}
              unmount={false}
              show={currentStep === 3}
              enter="transform transition ease-in-out duration-500"
              enterFrom={moving === "right" ? `translate-x-96 opacity-0` : `-translate-x-96 opacity-0`}
              enterTo={`translate-x-0 opacity-100`}
              leave="transform transition ease-in-out duration-500 "
              leaveFrom={`translate-x-0 opacity-100`}
              leaveTo={moving === "right" ? `-translate-x-96 opacity-0` : `translate-x-96 opacity-0`}
              className="bg-blue-200 w-0 overflow-visible"
              as="div"
            >
               <div className="bg-green-200" style={{ width: `${wrapperWidth}px` }}>
                    <div style={{ position: 'relative', height: '400px' }}>
                        <Image
                          alt="Mountains"
                          src={steps[3].name}
                          fill
                          sizes="(min-width: 808px) 50vw, 100vw"
                          style={{
                            objectFit: 'cover', // cover, contain, none
                          }}
                        />
                    </div>
              </div>
            </Transition>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-sm font-medium mb-1 mt-3 text-center">
            Step {steps.findIndex((step) => step.status === "current") + 1} of {steps.length}
          </p>
          <nav className="flex items-center justify-center" aria-label="Progress">
            <button type="button" disabled={currentStep === 0} onClick={prevStep}>
              Prev
            </button>
            <ol className="mx-8 flex items-center space-x-5">
              {steps.map((step, i) => (
                <li key={`step_${i}`}>
                  {step.status === "complete" ? (
                    <a href={step.href} className="block w-2.5 h-2.5 bg-indigo-600 rounded-full hover:bg-indigo-900">
                      <span className="sr-only"></span>
                    </a>
                  ) : step.status === "current" ? (
                    <a href={step.href} className="relative flex items-center justify-center" aria-current="step">
                      <span className="absolute w-5 h-5 p-px flex" aria-hidden="true">
                        <span className="w-full h-full rounded-full bg-indigo-200" />
                      </span>
                      <span className="relative block w-2.5 h-2.5 bg-indigo-600 rounded-full" aria-hidden="true" />
                      <span className="sr-only"></span>
                    </a>
                  ) : (
                    <a href={step.href} className="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400">
                      <span className="sr-only"></span>
                    </a>
                  )}
                </li>
              ))}
            </ol>
            <button type="button" disabled={currentStep === 3} onClick={nextStep}>
              Next
            </button>
          </nav>
        </div>
      </div>

  );
}
