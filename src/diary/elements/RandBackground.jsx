import {useEffect, useRef} from "react";

function stringToPleasantColor(seed, s = 65, l = 50) {
    let hash = 2166136261;
    for (let i = 0; i < seed.length; i++) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    const h = (hash >>> 0) % 360;

    // HSL -> hex
    const sat = s / 100, lig = l / 100;
    const k = (n) => (n + h / 30) % 12;
    const a = sat * Math.min(lig, 1 - lig);
    const f = (n) =>
        Math.round(255 * (lig - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));

    return "#" + [f(0), f(8), f(4)].map(v => v.toString(16).padStart(2, "0")).join("");
}

export default function RandBackground({ seed, gradient = true, s = 65, l = 50, ...rest }) {
    const ref = useRef(null);
    useEffect(() => {
        if (gradient) {
            ref.current.style.background = `
                linear-gradient(
                    145deg,
                    ${stringToPleasantColor(seed, s, l)} 0%, 
                    ${stringToPleasantColor(seed, s, l + 15)} 100%
                )`
        } else {
            ref.current.style.backgroundColor = stringToPleasantColor(seed, s, l)
        }
    }, [ref, seed, gradient, l, s])


    return (<div ref={ref} {...rest} />)
}