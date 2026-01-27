import NavItem from "./NavItem";
import { LayoutDashboard, Activity, UsersRound, Stethoscope, FlaskConical, Pill, UserRoundCog } from "lucide-react";

const Sidebar = () => {
    return (
        <nav className="bg-primary px-4 py-4 sm:px-6 lg:py-6 flex flex-col gap-3 w-full h-full overflow-y-auto">
            <NavItem 
                icon={<LayoutDashboard className="w-5 h-5" />} 
                text="Dashboard" 
                href="/" 
            />
            <NavItem 
                icon={<UsersRound className="w-5 h-5" />} 
                text="Patients" 
                href="/patients" 
            />
            <NavItem 
                icon={<Stethoscope className="w-5 h-5" />} 
                text="Encounters" 
                href="/encounters" 
            />
            <NavItem 
                icon={<Activity className="w-5 h-5" />} 
                text="Vitals" 
                href="/vitals" 
            />
            <NavItem 
                icon={<FlaskConical className="w-5 h-5" />} 
                text="Laboratory" 
                href="/laboratory" 
            />
            <NavItem 
                icon={<Pill className="w-5 h-5" />} 
                text="Pharmacy" 
                href="/pharmacy" 
            />
            <div className="border-t border-primary-middle/30">
                <NavItem 
                    icon={<UserRoundCog className="w-5 h-5" />} 
                    text="Users" 
                    href="/users" 
                    className="mt-3"
                />
            </div>
        </nav>
    );
};
 
export default Sidebar;
