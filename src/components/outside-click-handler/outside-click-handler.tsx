import React, { useRef, useEffect } from "react";

export const OutsideClickHandler = ({
  children,
  onClickOutside,
}: {
  children: React.ReactNode;
  onClickOutside: () => void;
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return <div ref={wrapperRef}>{children}</div>;
};
