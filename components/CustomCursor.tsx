import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorRingRef = useRef<HTMLDivElement>(null);
    const cursorWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            if (cursorDotRef.current && cursorRingRef.current) {
                cursorDotRef.current.style.left = `${clientX}px`;
                cursorDotRef.current.style.top = `${clientY}px`;
                cursorRingRef.current.style.left = `${clientX}px`;
                cursorRingRef.current.style.top = `${clientY}px`;
            }
        };

        const addHoverClass = () => {
            cursorWrapperRef.current?.classList.add('cursor-hover');
        };

        const removeHoverClass = () => {
            cursorWrapperRef.current?.classList.remove('cursor-hover');
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('[role="button"]') ||
                target.closest('.cursor-pointer') ||
                target.closest('input')
            ) {
                addHoverClass();
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
             const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('[role="button"]') ||
                target.closest('.cursor-pointer') ||
                target.closest('input')
            ) {
                removeHoverClass();
            }
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <div ref={cursorWrapperRef}>
            <div ref={cursorRingRef} className="cursor-ring" />
            <div ref={cursorDotRef} className="cursor-dot" />
        </div>
    );
};

export default CustomCursor;
