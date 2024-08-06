import { IconProp } from "./iconProp";

export const PlusSquare = ({ className, style }: IconProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='#000000'
      className={`bi bi-plus-square ${className}`}
      {...(style && { style: style })}
      viewBox='0 0 16 16'
      id='Plus-Square--Streamline-Bootstrap'
    >
      <desc>{"Plus Square Streamline Icon: https://streamlinehq.com"}</desc>
      <path
        d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1H2a1 1 0 0 1 -1 -1V2a1 1 0 0 1 1 -1zM2 0a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2z'
        strokeWidth={1}
      />
      <path
        d='M8 4a0.5 0.5 0 0 1 0.5 0.5v3h3a0.5 0.5 0 0 1 0 1h-3v3a0.5 0.5 0 0 1 -1 0v-3h-3a0.5 0.5 0 0 1 0 -1h3v-3A0.5 0.5 0 0 1 8 4'
        strokeWidth={1}
      />
    </svg>
  );
};
