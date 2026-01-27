type Props = {
    Title: string;
    Subtitle: string;  
    className?: string;
};

const Hero = ({ Title, Subtitle, className }: Props) => {
    return (
        <div className={className ? `space-y-1 ${className}` : "space-y-1"}>
            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{Title}</h1>
            <p className="text-neutral-500 text-sm sm:text-base lg:text-lg">{Subtitle}</p>
        </div>
    );
};
 
export default Hero;
