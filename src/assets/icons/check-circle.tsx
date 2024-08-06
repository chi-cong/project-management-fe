import type { IconProp } from "./iconProp";

export const CheckCircle = ({ className, style }: IconProp) => {
  return (
    <svg
      viewBox='-0.5 -0.5 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      id='Check-Circle--Streamline-Solar-Broken'
      className={`${className}`}
      {...(style && { style: style })}
    >
      <desc>{"Check Circle Streamline Icon: https://streamlinehq.com"}</desc>
      <path
        d='M5.107 7.841875L6.4744375 9.2093125L9.892999999999999 5.790687500000001'
        stroke='#000000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1}
      />
      <path
        d='M4.0813749999999995 1.5775000000000001C5.0870625 0.9957499999999999 6.2546875 0.6628125 7.5 0.6628125C11.276062499999998 0.6628125 14.337187499999999 3.7239375000000003 14.337187499999999 7.5C14.337187499999999 11.276062499999998 11.276062499999998 14.337187499999999 7.5 14.337187499999999C3.7239375000000003 14.337187499999999 0.6628125 11.276062499999998 0.6628125 7.5C0.6628125 6.2546875 0.9957499999999999 5.0870625 1.5775000000000001 4.0813749999999995'
        stroke='#000000'
        strokeLinecap='round'
        strokeWidth={1}
      />
    </svg>
  );
};
