import NavItem from "./NavItem";
import { LayoutDashboard, Activity, UsersRound, Stethoscope, FlaskConical, UserRoundCog, Search } from "lucide-react";

const Sidebar = () => {
    return (
        <nav className="bg-primary px-4 py-4 sm:px-6 lg:py-6 flex flex-col gap-3 w-full h-full overflow-y-auto">
            <NavItem 
                icon={<LayoutDashboard className="w-5 h-5" />} 
                text="Dashboard" 
                href="/dashboard" 
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
            <div className="border-t border-primary-middle/30">
                <NavItem 
                    icon={<Search className="w-5 h-5" />} 
                    text="FHRMS" 
                    href="/fhrms" 
                />
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
