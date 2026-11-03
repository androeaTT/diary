import { useLayoutEffect, useRef, useState } from "react";

/**
 * SmoothWidthBox — плавная анимация ширины.
 *
 * Режимы:
 *  • по умолчанию — ширина плавно подстраивается под содержимое ребёнка
 *    (у ребёнка должна быть собственная ширина от контента, не `width: 100%`);
 *  • `open={false}` — коробка плавно схлопывается до 0 (и раскрывается при `true`);
 *  • `fill` — коробка занимает всё свободное место во flex-ряду. Сама она не
 *    анимируется: она сжимается, пока соседний SmoothWidthBox раскрывается,
 *    и растёт обратно, когда тот схлопывается. Ширина всегда ровно
 *    «100% минус ширина соседей», без calc и измерений.
 *
 * Для `fill` родитель должен быть `display: flex`.
 */
export default function SmoothWidthBox({
                                           children,
                                           fill = false,
                                           open = true,
                                           duration = 500,
                                           easing = "cubic-bezier(0.22, 1.44, 0.1, 0.95)",
                                           className,
                                           style,
                                       }) {
    const innerRef = useRef(null);
    const [naturalWidth, setNaturalWidth] = useState(null); // null = ещё не измеряли
    const [animate, setAnimate] = useState(false);

    useLayoutEffect(() => {
        if (fill) return; // в режиме fill измерять нечего
        const el = innerRef.current;
        if (!el) return;

        // Первое измерение — до отрисовки, без анимации (нет «прыжка» при маунте)
        setNaturalWidth(el.offsetWidth);

        const observer = new ResizeObserver(([entry]) => {
            setNaturalWidth(entry.borderBoxSize?.[0]?.inlineSize ?? el.offsetWidth);
        });
        observer.observe(el);

        // Включаем transition только после первой отрисовки
        const raf = requestAnimationFrame(() => setAnimate(true));

        return () => {
            observer.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [fill]);

    if (fill) {
        return (
            <div className={className} style={{ flex: "1 1 0", minWidth: 0, ...style }}>
                {children}
            </div>
        );
    }

    const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const ms = reduceMotion ? 0 : duration;

    return (
        <div
            className={className}
            aria-hidden={!open}
            style={{
                flex: "none",
                overflow: "hidden",
                width: open ? naturalWidth ?? "auto" : 0,
                // Скрытое содержимое не должно ловить фокус: прячем после схлопывания
                visibility: open ? "visible" : "hidden",
                transition: animate
                    ? `width ${ms}ms ${easing}, visibility 0s linear ${open ? 0 : ms}ms`
                    : "none",
                ...style,
            }}
        >
            <div ref={innerRef} style={{ width: "max-content" }}>
                {children}
            </div>
        </div>
    );
}
