import type { IconProp } from "./iconProp";

export const Down = ({ className, style }: IconProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 16 16'
      id='Down--Streamline-Block---Free'
      className={className}
      {...(style && { style: style })}
    >
      <desc>{"Down Streamline Icon: https://streamlinehq.com"}</desc>
      <path
        fill='#000000'
        fillRule='evenodd'
        d='M0.16 4.0802 15.84 4.08l-7.8401 7.84L0.16 4.0802Z'
        clipRule='evenodd'
        strokeWidth={1}
      />
    </svg>
  );
};
