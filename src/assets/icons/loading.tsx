import type { IconProp } from "./iconProp";

export const Loading = ({ className, style }: IconProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      id='Loading--Streamline-Ultimate'
      className={` ${className}`}
      {...(style && { style: style })}
    >
      <desc>{"Loading Streamline Icon: https://streamlinehq.com"}</desc>
      <path
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 0.746948V4.49695'
        strokeWidth={1.5}
      />
      <path
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 23.2469v-3.75'
        strokeWidth={1.5}
      />
      <path
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m4.04501 4.04199 2.652 2.652'
        strokeWidth={1.5}
      />
      <path
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m19.955 19.952 -2.652 -2.651'
        strokeWidth={1.5}
      />
      <path
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M0.75 11.9969H4.5'
        strokeWidth={1.5}
      />
      <path
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M23.25 11.9969H19.5'
        strokeWidth={1.5}
      />
      <path
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m4.04501 19.952 2.652 -2.651'
        strokeWidth={1.5}
      />
      <path
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m19.955 4.04199 -2.652 2.652'
        strokeWidth={1.5}
      />
    </svg>
  );
};
