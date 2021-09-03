import React, { useEffect, useRef } from "react";

import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

const ReactMap = ({ initWidgets }) => {
  const mapDiv = useRef(null);

  useEffect(() => {
    (async function () {
      if (mapDiv.current) {
        const map = new WebMap({
          portalItem: {
            id: "d16d53126f1243a3a7a7f1d0dff39662",
          },
        });

        const webmapInfo = await map.load();

        const view = new MapView({
          container: mapDiv.current,
          map: map,
          padding: { left: 49 },
        });
        view.ui.move("zoom", "bottom-right");

        initWidgets(view, webmapInfo);
      }
    })();
  }, [mapDiv]);

  return <div className="mapDiv" ref={mapDiv}></div>;
};

export default ReactMap;
