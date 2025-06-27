"use client";

import React from "react";
import WorldMap from "react-svg-worldmap";

type PastRetreatsMapProps = {
  visitedCountryCodes: string[];
};

const PastRetreatsMap = ({ visitedCountryCodes }: PastRetreatsMapProps) => {
  const styleFunction = (countryContext: any) => {
    const isVisited = visitedCountryCodes.some(c => c.toLowerCase() === countryContext.countryCode.toLowerCase());

    return {
      fill: isVisited ? "#96BF50" : "#e0e0e0",
      stroke: "#a0a0a0",
      strokeWidth: 0.5,
      cursor: "default",
    };
  };

  return (
    <WorldMap
      data={[]}
      styleFunction={styleFunction}
      size="responsive"
      backgroundColor="transparent"
    />
  );
};

export default PastRetreatsMap; 