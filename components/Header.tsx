import Image from "next/image";
import logo from "@/public/images/logo.svg"
import doctorIcon from "@/public/images/doctor-icon.svg"
import { ChevronDown } from "lucide-react";
import Button from "./Button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (<div className="w-full bg-white flex justify-between items-center py-4 px-8 shadow-md position-fixed top-0 left-0 z-10">
        <Link href="/">
            <div className="flex items-center gap-3">
            <Image
                width={42}
                height={42}
                src={logo}
                alt="FHRMS Logo"
            />
            <h2 className="flex text-4xl font-semibold">FHRMS</h2>
        </div>        
        </Link>
        <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
                 <Image
                src={doctorIcon}
                alt="Doctor Icon"
                width={15}
                height={16.5}
            />
            <p className="text-bold">Dr Sarah Johnson</p>
            <span className="text-neutral-500">|</span>
            <p className="text-neutral-500">Physician</p>
            </div>
            <div className="flex items-center gap-1 hover:bg-neutral-100 py-1.5 px-3 rounded-lg cursor-pointer">
                <span className="px-3 py-3 flex items-center justify-center font-size w-8 h-8 text-center bg-primary rounded-full text-primary-light">SJ</span>
                <ChevronDown className="text-neutral-500"/>
            </div>
            <Link href="/login"><Button text="Logout" icon={<LogOut />} /></Link>
        </div>
    </div> );
}
 
export default Header;