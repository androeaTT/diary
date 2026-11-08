import Card from "./Card.jsx";


export default function TextCard({ children, className, onClick, label, desc = false, ripple = false }) {
    return (
        <Card
            className={className}
            onClick={onClick}
            ripple={ripple}
        >
            <div className="flex flex-row justify-center items-center pr-6 pl-6 pb-3 pt-3">
                <div className="flex-1 flex flex-col">
                    <span className="flex-1 text-nowrap">{label}</span>
                    <span className="text-xs text-(--text-color-darker)">{desc}</span>
                </div>
                {children}
            </div>
        </Card>
    )
}