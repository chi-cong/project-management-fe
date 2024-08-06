import type { IconProp } from "./iconProp";

export const MenuDots = ({ className, style }: IconProp) => {
  return (
    <svg
      id='Overflow-Menu-Horizontal--Streamline-Carbon'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x={0}
      y={0}
      viewBox='-0.5 -0.5 16 16'
      xmlSpace='preserve'
      enableBackground='new 0 0 32 32'
      className={`${className}`}
      {...(style && { style: style })}
    >
      <desc>
        {"Overflow Menu Horizontal Streamline Icon: https://streamlinehq.com"}
      </desc>
      <title>{"overflow-menu--horizontal"}</title>
      <path
        d='M2.8125 7.5a0.9375 0.9375 0 1 0 1.875 0 0.9375 0.9375 0 1 0 -1.875 0'
        strokeWidth={1}
      />
      <path
        d='M6.5625 7.5a0.9375 0.9375 0 1 0 1.875 0 0.9375 0.9375 0 1 0 -1.875 0'
        strokeWidth={1}
      />
      <path
        d='M10.3125 7.5a0.9375 0.9375 0 1 0 1.875 0 0.9375 0.9375 0 1 0 -1.875 0'
        strokeWidth={1}
      />
      <path
        id='_Transparent_Rectangle_'
        d='M0 0h15v15H0Z'
        fill='none'
        strokeWidth={1}
      />
    </svg>
  );
};
