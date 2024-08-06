import type { IconProp } from "./iconProp";

export const DoubleCheck = ({ className, style }: IconProp) => {
  return (
    <svg
      viewBox='-0.5 -0.5 16 16'
      fill='none'
      className={`${className}`}
      {...(style && { style: style })}
    >
      <desc>{"Check Read Streamline Icon: https://streamlinehq.com"}</desc>
      <path
        d='M0.78 8.22975L3.4199374999999996 11.2536875L10.019875 3.6938125'
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1}
      />
      <path
        d='M14.219999999999999 3.7463125L7.019875 11.3061875L6.6600625 10.8336875'
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1}
      />
    </svg>
  );
};
