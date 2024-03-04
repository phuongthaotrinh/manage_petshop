import { RoughNotation } from "react-rough-notation";
import clsx from "clsx"
type NavProps = {
    currentStepIndex: number;
    goTo: (index: number) => void;
};

const SideBar = ({ currentStepIndex, goTo }: NavProps) => {
    return (
        <div className="absolute -top-20 left-0 w-full md:w-[15%] md:relative md:top-0 md:left-0 border-r">
            <nav className="py-5 text-black 	 h-full rounded-md  md:p-5">
                <ul className="flex justify-center gap-2 md:flex-col space-y-5">
                    <li className="flex flex-col items-start font-medium ">
                        <span className={clsx("hidden  capitalize text-lg font-bold md:flex",{
                            "text-gray-900" :currentStepIndex === 0,
                            "text-slate-500" :currentStepIndex !== 0
                        })}>
                          step 1
                        </span>
                        <button
                            tabIndex={0}
                            onClick={() => goTo(0)}
                            className={`text-sm ${
                                currentStepIndex === 0 ? "text-dreamPink" : "text-slate-500"
                            } md:text-base`}
                        >
                            <RoughNotation
                                type="underline"
                                show={currentStepIndex === 0}
                                color=""
                            >
                                Select service
                            </RoughNotation>
                        </button>
                    </li>
                    <li className="flex flex-col items-start font-medium">
                        <span className={clsx("hidden  capitalize text-lg font-bold md:flex",{
                            "text-gray-900" :currentStepIndex ===1,
                            "text-slate-500" :currentStepIndex !== 1
                        })}>
                          step 2
                        </span>
                        <button
                            tabIndex={0}
                            onClick={() => goTo(1)}
                            className={`text-sm ${
                                currentStepIndex === 1 ? "text-dreamPink" : "text-slate-500"
                            } md:text-base`}
                        >
                            <RoughNotation
                                type="underline"
                                show={currentStepIndex === 1}
                                color="#bd284d"
                            >
                                Select pet
                            </RoughNotation>
                        </button>
                    </li>
                    <li className="flex flex-col items-start font-medium">
           <span className={clsx("hidden  capitalize text-lg font-bold md:flex",{
               "text-gray-900" :currentStepIndex ===2,
               "text-slate-500" :currentStepIndex !==2
           })}>
                          step 3
                        </span>
                        <button
                            tabIndex={0}
                            onClick={() => goTo(2)}
                            className={`text-sm ${
                                currentStepIndex === 2 ? "text-[#E7B8FF]" : "text-slate-500"
                            } md:text-base`}
                        >
                            <RoughNotation
                                type="underline"
                                show={currentStepIndex === 2}
                                color="#E7B8FF"
                            >
                                Add-price
                            </RoughNotation>
                        </button>
                    </li>
                    <li className="flex flex-col items-start font-medium">
           <span className={clsx("hidden  capitalize text-lg font-bold md:flex",{
               "text-gray-900" :currentStepIndex === 3,
               "text-slate-500" :currentStepIndex !== 3
           })}>
                          step 4
                        </span>
                        <button
                            tabIndex={0}
                            onClick={() => goTo(3)}
                            className={`text-sm ${
                                currentStepIndex === 3 ? "text-[#6fe79f]" :"text-slate-500"
                            } md:text-base`}
                        >
                            <RoughNotation
                                type="underline"
                                show={currentStepIndex === 3}
                                color="#6fe79f"
                            >
                                Summary
                            </RoughNotation>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export  {SideBar};