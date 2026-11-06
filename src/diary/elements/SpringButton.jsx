import {twMerge} from "tailwind-merge";
import SmoothWidthBox from "./SmoothWidthBox.jsx";
import {Button} from "./Button.jsx";

export function SpringButton({ variant,  buttonClassName, className, onClick, fill = false, open = true, label = false, icon = false }) {
    return (
        <SmoothWidthBox fill={fill} open={open} className={twMerge("rounded-full", className)}>
            <Button
                variant={variant}
                onClick={onClick}
                className={buttonClassName}
                label={label}
                icon={icon}
            />
        </SmoothWidthBox>
    )
}