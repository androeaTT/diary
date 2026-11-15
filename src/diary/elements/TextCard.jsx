import Card from "./Card.jsx";


export default function TextCard({ children, className, onClick, label, left = null, desc = false, ripple = false }) {
    return (
        <Card
            className={className}
            onClick={onClick}
            ripple={ripple}
        >
            <div className="flex flex-row justify-center items-center gap-2 pr-3 pl-3 pb-3 pt-3">
                {left}
                <div className="flex-1 flex flex-col ml-2">
                    <span className="flex-1 text-nowrap">{label}</span>
                    <span className="text-xs text-(--text-color-darker)">{desc}</span>
                </div>
                {children}
            </div>
        </Card>
    )
}