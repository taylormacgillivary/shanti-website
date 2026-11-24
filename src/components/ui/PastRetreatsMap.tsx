"use client";

import React from "react";
import WorldMap, { CountryContext } from "react-svg-worldmap";

type PastRetreatsMapProps = {
  visitedCountryCodes: string[];
};

// Natural Earth 1:50m outlines for Malta and Gozo in the world map's 960 × 720 Mercator viewport.
const maltaOutline =
  "M518.88 387.36 L518.79 387.46 L518.54 387.46 L518.31 387.29 L518.31 386.94 L518.57 387.01 L518.81 387.25 Z " +
  "M518.21 386.78 L518.05 386.83 L517.89 386.73 L517.85 386.67 L518.08 386.62 L518.18 386.67 L518.23 386.75 Z";

const PastRetreatsMap = ({ visitedCountryCodes }: PastRetreatsMapProps) => {
  const visitedCountries = new Set(visitedCountryCodes.map((code) => code.toLowerCase()));
  const countryFill = (code: string) => (visitedCountries.has(code.toLowerCase()) ? "#96BF50" : "#e0e0e0");

  const styleFunction = (countryContext: CountryContext) => ({
    fill: countryFill(countryContext.countryCode),
    stroke: "#a0a0a0",
    strokeWidth: 0.5,
    cursor: "default",
  });

  return (
    <div className="relative">
      <WorldMap
        data={[]}
        styleFunction={styleFunction}
        size="responsive"
        backgroundColor="transparent"
      />
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 960 720">
        <path d={maltaOutline} fill={countryFill("mt")} />
      </svg>
    </div>
  );
};

export default PastRetreatsMap;
