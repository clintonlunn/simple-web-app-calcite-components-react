import {
  CalciteLabel,
  CalcitePanel,
  CalciteRating,
} from "@esri/calcite-components-react";
import React from "react";

const CalciteInfoPanel = (props) => {
  const { portalItem } = props;
  return (
    <CalcitePanel {...props}>
      <h3 slot="header-content">{portalItem?.title}</h3>
      <div className="info-content">
        <img src={portalItem?.thumbnailUrl} alt={portalItem?.title} />
        <div id="item-description">{portalItem?.snippet}</div>
        <CalciteLabel layout="inline">
          Rating
          <CalciteRating
            readOnly
            average={portalItem?.numRatings}
          ></CalciteRating>
        </CalciteLabel>
      </div>
    </CalcitePanel>
  );
};

export default CalciteInfoPanel;
