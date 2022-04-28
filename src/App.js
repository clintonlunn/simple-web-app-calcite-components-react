import { useRef, useState } from "react";
import "./App.css";
import {
  CalciteAction,
  CalciteActionBar,
  CalciteActionGroup,
  CalciteLabel,
  CalciteModal,
  CalcitePanel,
  CalciteShell,
  CalciteShellPanel,
  CalciteSwitch,
  CalciteTip,
  CalciteTipGroup,
  CalciteTipManager,
} from "@esri/calcite-components-react";
import ReactMap from "./ReactMap";
import CalciteInfoPanel from "./CalciteInfoPanel";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import LayerList from "@arcgis/core/widgets/LayerList";
import Legend from "@arcgis/core/widgets/Legend";
import Print from "@arcgis/core/widgets/Print";

function App() {
  const [activeAg, setActiveAg] = useState("");
  const [activePanel, setActivePanel] = useState("");
  const [webmapTitle, setWebmapTitle] = useState("My Webmap");
  // const [portalItem, setPortalItem] = useState(null);
  const [isTipManagerClosed, setIsTipManagerClosed] = useState(undefined);
  const [isActionBarExpanded, setIsActionBarExpanded] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isModalActive, setisModalActive] = useState(undefined);

  const config = [
    [
      {
        name: "layers",
        ref: useRef(),
      },
      {
        name: "basemaps",
        icon: "basemap",
        ref: useRef(),
      },
      {
        name: "legend",
        ref: useRef(),
      },
      {
        name: "bookmarks",
        icon: "bookmark",
        ref: useRef(),
      },
      {
        name: "print",
      },
      {
        name: "info",
        icon: "information",
        ref: useRef(),
      },
    ],
    [
      {
        name: "tips",
        icon: "lightbulb",
        ref: useRef(),
      },
      {
        name: "feedback",
        icon: "information",
        ref: useRef(),
      },
    ],
  ];

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  };

  const onAgClick = (name) => {
    if (name === activeAg) {
      setActiveAg(null);
      setActivePanel(null);
    } else {
      setActiveAg(name);
      setActivePanel(name);
    }
  };

  const onTipsAbClick = () => {
    setIsTipManagerClosed(isTipManagerClosed === "" ? undefined : "");
  };

  const onFeedbackAbClick = () => {
    setisModalActive(true);
  };

  const initWidgets = (view) => {

    new BasemapGallery({
      view,
      container: "basemaps-container",
    });

    new Bookmarks({
      view,
      container: "bookmarks-container",
    });

    new LayerList({
      view,
      selectionEnabled: true,
      container: "layers-container",
    });

    new Legend({
      view,
      container: "legend-container",
    });

    new Print({
      view,
      container: "print-container",
    });
  };

  const handleDarkMode = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <CalciteShell contentBehind className={`calcite-theme-${currentTheme}`}>
      <div
        slot="header"
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "12px",
          marginRight: "12px",
        }}
      >
        <h2 style={{ flex: 1 }}>{webmapTitle}</h2>
        <CalciteLabel layout="inline" style={{ marginTop: "12px" }}>
          <label>Dark mode</label>
          <CalciteSwitch
            onCalciteSwitchChange={handleDarkMode}
            className="float-xl-end"
          ></CalciteSwitch>
        </CalciteLabel>
      </div>
      <CalciteShellPanel slot="primary-panel" position="start" detached>
        <CalciteActionBar
          slot="action-bar"
          onCalciteActionBarToggle={() =>
            setIsActionBarExpanded(!isActionBarExpanded)
          }
          expanded={isActionBarExpanded}
        >
          <CalciteActionGroup key={`cag_1`}>
            {config[0].map((item, i) => (
              <CalciteAction
                key={`ca_${i}`}
                text={capitalize(item.name)}
                icon={item.icon || item.name}
                onClick={() => onAgClick(item.name)}
                active={activeAg === item.name ? "" : null}
              ></CalciteAction>
            ))}
          </CalciteActionGroup>
          {/* <CalciteActionGroup>
            <CalciteAction
              key={`ca_tips`}
              text="Tips"
              icon="lightbulb"
              onClick={onTipsAbClick}
              active={activeAg === "tips" ? "" : null}
            ></CalciteAction>
            <CalciteAction
              key={`ca_info`}
              text="Feedback"
              icon="information"
              onClick={() => onFeedbackAbClick()}
              active={activeAg === "feedback" ? "" : null}
            ></CalciteAction>
          </CalciteActionGroup> */}
        </CalciteActionBar>

        {config.map((group) =>
          group.map((item, i) => {
            if (item.name === "info") {
              return (
                <CalciteInfoPanel
                  style={{ padding: "12px" }}
                  // portalItem={portalItem}
                  heading="yeah"
                  heightScale="l"
                  widthScale="m"
                  hidden={activePanel === item.name ? null : ""}
                ></CalciteInfoPanel>
              );
            } else if (item.name !== "tips" && item.name !== "feedback") {
              return (
                <CalcitePanel
                  key={`cp_${i}`}
                  hidden={activePanel === item.name ? null : ""}
                  heading={capitalize(item.name)}
                  heightScale="l"
                  widthScale="m"
                >
                  <div id={`${item.name}-container`} ref={item.ref}></div>
                </CalcitePanel>
              );
            }
          })
        )}
      </CalciteShellPanel>

      {/* <CalciteTipManager slot="center-row" closed={isTipManagerClosed}>
        <CalciteTipGroup groupTitle="Tips">
          <CalciteTip heading="Header">
            <img
              alt="thumbnail"
              slot="thumbnail"
              src="https://user-images.githubusercontent.com/197440/113641299-319f8080-9632-11eb-95f6-7a893f8f9f21.png"
            />
            <p>The header will display the webmap's authored title.</p>
          </CalciteTip>
          <CalciteTip heading="Map Actions">
            <img
              alt="thumbnail"
              slot="thumbnail"
              src="https://user-images.githubusercontent.com/197440/113641300-32381700-9632-11eb-97e7-269e1c687194.png"
            />
            <p>The first group of actions provide map-specific operations.</p>
          </CalciteTip>
          <CalciteTip heading="App Actions">
            <img
              alt="thumbnail"
              slot="thumbnail"
              src="https://user-images.githubusercontent.com/197440/113641301-32381700-9632-11eb-9fb3-9198ecd9236a.png
                                   "
            />
            <p>
              The second group of actions provide app-specific operations, such
              as displaying these tips.
            </p>
          </CalciteTip>
        </CalciteTipGroup>
      </CalciteTipManager> */}

      <CalciteModal
        active={isModalActive}
        onCalciteModalClose={() => setisModalActive(undefined)}
      >
        <h3 slot="header">Feedback</h3>
        <div slot="content">
          Don't forget to fill out the session survey to submit feedback!
        </div>
      </CalciteModal>

      {/* map content  */}
      <ReactMap initWidgets={initWidgets} />
    </CalciteShell>
  );
}

export default App;
