import { MoveUp } from "lucide-react";
import clsx from "clsx";

type CardProps = {
    amount: number;
    description: string;
    percentage?: number;
    icon: React.ReactNode;
    color: "blue" | "green" | "purple" | "yellow";
    notice: string;
    requiresAttention?: "warning" | "success" | "neutral";
};

const Card = ({ amount, description, percentage, icon, color, requiresAttention, notice }: CardProps) => {
    const getColorClasses = (colorValue: "blue" | "green" | "purple" | "yellow") => {
        switch (colorValue) {
            case "blue":
                return "bg-primary-middle text-primary";
            case "green":
                return "bg-success-light text-success";
            case "purple":
                return "bg-accent-light text-accent";
            case "yellow":
                return "bg-warning-light text-warning";
            default:
                return "bg-primary-middle text-primary";
        }
    };

    const getNoticeColorClass = () => {
        if (requiresAttention === "success") return "text-success";
        if (requiresAttention === "warning") return "text-warning";
        return "text-neutral-500";
    };

    return (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-primary/15 bg-white p-4 shadow-md shadow-neutral-900/5 sm:p-5">
            <div>
                <div>
                    <h2 className="text-2xl font-semibold sm:text-3xl">{amount}</h2>
                    <p className="text-neutral-500 text-sm mt-1">{description}</p>
                </div>
                <div className="flex items-center gap-1 mt-3">
                    {percentage !== undefined && (
                        <MoveUp className={clsx("w-3 h-3", getNoticeColorClass())} />
                    )}
                    <p className={clsx("text-xs", getNoticeColorClass())}>
                        {percentage !== undefined && `${percentage}% `}
                        {notice}
                    </p>
                </div>
            </div>
            <div className={clsx("rounded-xl p-3 sm:p-4", getColorClasses(color))}>
                {icon}
            </div>
        </div>
    );
}; 
 
export default Card;
