
type ButtonProps = {
    text: string;
    icon: React.ReactNode;
};

const Button = ({ text, icon }: ButtonProps) => {
    return (<button className="px-5 py-2.5 flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary text-primary-light cursor-pointer">
        <span className="text-primary-light">{icon}</span>
        <p className="text-primary-light">{text}</p>
    </button> );
}
 
export default Button;