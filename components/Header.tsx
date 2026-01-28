import Image from "next/image";
import logo from "@/public/images/logo.svg"
import doctorIcon from "@/public/images/doctor-icon.svg"
import { ChevronDown } from "lucide-react";
import Button from "./Button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <div className="w-full bg-white px-4 py-3 shadow-md sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Link href="/dashboard">
                    <div className="flex items-center gap-3">
                        <Image
                            width={42}
                            height={42}
                            src={logo}
                            alt="FHRMS Logo"
                        />
                        <h2 className="flex text-2xl font-semibold sm:text-3xl lg:text-4xl">FHRMS</h2>
                    </div>
                </Link>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <div className="flex items-center gap-2">
                        <Image
                            src={doctorIcon}
                            alt="Doctor Icon"
                            width={16}
                            height={16}
                        />
                        <p className="font-semibold">Dr Amina Yusuf</p>
                        <span className="hidden sm:inline text-neutral-500">|</span>
                        <p className="hidden sm:inline text-neutral-500">Physician</p>
                    </div>
                    <div className="flex items-center gap-1 hover:bg-neutral-100 py-1.5 px-2 rounded-lg cursor-pointer">
                        <span className="flex h-8 w-8 items-center justify-center text-sm font-semibold text-center bg-primary rounded-full text-primary-light">AY</span>
                        <ChevronDown className="text-neutral-500"/>
                    </div>
                    <Link href="/login"><Button text="Logout" icon={<LogOut />} /></Link>
                </div>
            </div>
        </div>
    );
}
 
export default Header;
