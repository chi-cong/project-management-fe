import { IconProp } from "./iconProp";

export const PieChart = ({ className, style }: IconProp) => {
  return (
    <svg
      id='Pie-Graph--Streamline-Atlas'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='-0.5 -0.5 16 16'
      className={` ${className}`}
      {...(style && { style: style })}
    >
      <desc>{"Pie Graph Streamline Icon: https://streamlinehq.com"}</desc>
      <defs />
      <path
        d='M6.90625 2.13125A5.9624999999999995 5.9624999999999995 0 1 0 12.86875 8.125'
        fill='none'
        stroke='#000000'
        strokeMiterlimit={10}
        strokeWidth={1}
      />
      <path
        d='M11.118749999999999 12.3125 6.90625 8.125V0.9375A7.15625 7.15625 0 0 1 14.0625 8.125H7.5'
        fill='none'
        stroke='#000000'
        strokeMiterlimit={10}
        strokeWidth={1}
      />
    </svg>
  );
};
