import { useContext } from "react";
import  Welcome  from "./Welcome";
import { TeamsFxContext } from "./Context";
import config from "./lib/config";

const showFunction = Boolean(config.apiName);

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  return (
    <div
      className={themeString === "default" ? "light" : themeString === "dark" ? "dark" : "contrast"}
    >
      <Welcome showFunction={showFunction} />
    </div>
  );
}
