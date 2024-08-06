import type { IconProp } from "./iconProp";

export const Doc = ({ className, style }: IconProp) => {
  return (
    <svg
      id='Document--Streamline-Carbon'
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
      <desc>{"Document Streamline Icon: https://streamlinehq.com"}</desc>
      <title>{"document"}</title>
      <path
        d='m12.046875 4.359375 -3.28125 -3.28125c-0.09375 -0.09375 -0.1875 -0.140625 -0.328125 -0.140625H3.75c-0.515625 0 -0.9375 0.421875 -0.9375 0.9375v11.25c0 0.515625 0.421875 0.9375 0.9375 0.9375h7.5c0.515625 0 0.9375 -0.421875 0.9375 -0.9375V4.6875c0 -0.140625 -0.046875 -0.234375 -0.140625 -0.328125zM8.4375 2.0625l2.625 2.625H8.4375V2.0625zM11.25 13.125H3.75V1.875h3.75v2.8125c0 0.515625 0.421875 0.9375 0.9375 0.9375h2.8125v7.5z'
        strokeWidth={1}
      />
      <path d='M4.6875 10.3125h5.625v0.9375H4.6875Z' strokeWidth={1} />
      <path d='M4.6875 7.5h5.625v0.9375H4.6875Z' strokeWidth={1} />
      <path d='M0 0h15v15H0Z' fill='none' strokeWidth={1} />
    </svg>
  );
};
