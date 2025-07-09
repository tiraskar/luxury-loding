import { useState, useEffect, useRef } from "react";

export default function useInView(options) {
    const ref = useRef(null);
    const [isInView, setInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, ...options }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [options]);

    return [ref, isInView];
}
