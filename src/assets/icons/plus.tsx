import type { IconProp } from "./iconProp";

export const Plus = ({ className, style }: IconProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='-0.5 -0.5 16 16'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      id='Plus--Streamline-Feather'
      className={`feather feather-plus ${className}`}
      {...(style && { style: style })}
    >
      <desc>{"Plus Streamline Icon: https://streamlinehq.com"}</desc>
      <path d='m7.5 3.125 0 8.75' strokeWidth={1} />
      <path d='m3.125 7.5 8.75 0' strokeWidth={1} />
    </svg>
  );
};
