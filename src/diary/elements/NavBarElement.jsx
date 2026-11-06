import {SpringButton} from "./SpringButton.jsx";


export default function NavBarElement({ isActive, icon, iconActive, onClick, label }) {
    return (
        <SpringButton
            className=""
            variant={isActive ? "filled" : "flat"}
            icon={isActive ? iconActive : icon}
            onClick={onClick}
            label={isActive ? label : false} />
    )
}