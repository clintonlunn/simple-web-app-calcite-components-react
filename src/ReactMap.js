import React, { useEffect, useRef } from "react";

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";


const ReactMap = ({ initWidgets }) => {
  const mapDiv = useRef(null);

  useEffect(() => {
    (async function () {
      if (mapDiv.current) {

        const countiesRenderer = {
          type: "simple",
          symbol: {
            type: "simple-fill",
            style: "none",
            color: "none",
            outline: {
              style: "dash-dot",
              width: 1,
              color: "dimgray"
            }
          }
        };

        var countyBoundariesURL = "https://maps.freac.fsu.edu/arcgis/rest/services/FREAC/County_Boundaries/MapServer/";
        var countyBoundariesLayer = new MapImageLayer({
          url: countyBoundariesURL,
          title: "County Boundaries",
          minScale: 2000000,
          sublayers: [{
            id: 0,
            title: "County Boundaries",
            visible: true,
            popupEnabled: false,
            renderer: countiesRenderer
          }]
        });

        const map = new Map({
          basemap: "topo",
          layers: [countyBoundariesLayer]
        });

        console.log(map);
        // const webmapInfo = await map.load();


        const view = new MapView({
          container: mapDiv.current,
          map: map,
          padding: { left: 49 },
          center: [-82.28, 27.8],
          zoom: 10,
          constraints: {
            rotationEnabled: false
          }
        });

        view.ui.move("zoom", "bottom-right");

        initWidgets(view);
      }
    })();
  }, [mapDiv]);

  return <div className="mapDiv" ref={mapDiv}></div>;
};

export default ReactMap;
