import type { IconProp } from "./iconProp";

export const Eye = ({ className, style }: IconProp) => {
  return (
    <svg
      viewBox='-0.5 -0.5 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      id='Eye--Streamline-Iconoir'
      className={className}
      {...(style && { style: style })}
    >
      <desc>{"Eye Streamline Icon: https://streamlinehq.com"}</desc>
      <path
        d='M0.7153750000000001 8.253875c2.713875 -6.0308125 10.855375 -6.0308125 13.56925 0'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1}
      />
      <path
        d='M7.5 11.26925c-1.2490625 0 -2.2615625 -1.0125000000000002 -2.2615625 -2.2615625s1.0125000000000002 -2.2615 2.2615625 -2.2615 2.2615625 1.0124374999999999 2.2615625 2.2615 -1.0125000000000002 2.2615625 -2.2615625 2.2615625Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1}
      />
    </svg>
  );
};
