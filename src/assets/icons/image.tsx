import type { IconProp } from "./iconProp";

export const ImageIcon = ({ className, style }: IconProp) => {
  return (
    <svg
      id='Image--Streamline-Carbon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='-0.5 -0.5 16 16'
      className={`bi bi-filetype-pdf ${className}`}
      {...(style && { style: style })}
    >
      <desc>{"Image Streamline Icon: https://streamlinehq.com"}</desc>
      <defs />
      <title>{"image"}</title>
      <path
        d='M8.90625 6.5625a1.40625 1.40625 0 1 0 -1.40625 -1.40625 1.40625 1.40625 0 0 0 1.40625 1.40625Zm0 -1.875a0.46875 0.46875 0 1 1 -0.46875 0.46875 0.46875 0.46875 0 0 1 0.46875 -0.46875Z'
        strokeWidth={1}
      />
      <path
        d='M12.1875 1.875H2.8125a0.9375 0.9375 0 0 0 -0.9375 0.9375v9.375a0.9375 0.9375 0 0 0 0.9375 0.9375h9.375a0.9375 0.9375 0 0 0 0.9375 -0.9375V2.8125a0.9375 0.9375 0 0 0 -0.9375 -0.9375Zm0 10.3125H2.8125v-2.8125l2.34375 -2.34375 2.6203125 2.6203125a0.9375 0.9375 0 0 0 1.321875 0L9.84375 8.90625l2.34375 2.34375Zm0 -2.2640625 -1.6828124999999998 -1.6828124999999998a0.9375 0.9375 0 0 0 -1.321875 0L8.4375 8.9859375l-2.6203125 -2.6203125a0.9375 0.9375 0 0 0 -1.321875 0L2.8125 8.0484375V2.8125h9.375Z'
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
