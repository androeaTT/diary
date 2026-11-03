import {useMediaQuery} from "react-responsive";
import {SpringButton} from "./SpringButton.jsx";


export default function NavBarElement(props) {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    return (
        <SpringButton className="" variant={props.isActive ? "filled" : "flat"} icon={props.icon} onClick={props.onClick} label={props.isActive ? props.label : false} />
    )
}