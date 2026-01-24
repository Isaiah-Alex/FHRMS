import clsx from "clsx";
import React from "react";

type Props = {
    profileDisplay: React.ReactNode | string;
    color: "blue" | "green" | "purple" | "yellow" | "profileDisplay";
    rounded?: boolean;
    className?: string;
};


const NameProfile = ({ profileDisplay, color, rounded=true, className }: Props) => {
    return (<div className={clsx("px-3 py-3 flex items-center justify-center font-size-h4 w-[48] h-[48] text-center",
        color === "blue" ? "bg-primary-middle text-primary" : color === "green" ? "bg-success-light text-success" :
        color === "purple" ? "bg-accent-light text-accent" : color === "yellow" ? "bg-warning-light text-warning":
        color === "profileDisplay" ? "bg-primary text-primary-light" : "",  
        rounded ? "rounded-full" : "rounded-lg",
        className? className : ""
    )}>
        {profileDisplay}
    </div> );
}
 
export default NameProfile;