// WARNING: This file was generated by a script. Do not modify it manually
import { forwardRef } from "react";
import { useId } from "@salt-ds/core";

import { CountrySymbol, CountrySymbolProps } from "../country-symbol";

export type NGProps = CountrySymbolProps;

const NG = forwardRef<SVGSVGElement, NGProps>(function NG(props: NGProps, ref) {
  const uid = useId(props.id);

  return (
    <CountrySymbol
      data-testid="NG"
      aria-label="Nigeria"
      viewBox="0 0 72 72"
      ref={ref}
      {...props}
    >
      <mask
        id={`${uid}-NG-a`}
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
      >
        <circle
          cx="36"
          cy="36"
          r="36"
          fill="#D9D9D9"
          transform="matrix(1 0 0 -1 0 72)"
        />
      </mask>
      <g mask={`url(#${uid}-NG-a)`}>
        <path fill="#005B33" d="M0 72h72V0H0z" />
        <path fill="#F5F7F8" d="M24 72h24V0H24z" />
      </g>
    </CountrySymbol>
  );
});

export default NG;
