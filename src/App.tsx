import { useScript } from "@uidotdev/usehooks";
import { useEffect } from "react";
import "./App.css";

function App() {
  const status = useScript(
    `https://icdcdn.who.int/embeddedct/icd11ect-1.6.1.js`,
    {
      removeOnUnmount: false,
    }
  );

  useEffect(() => {
    if (status === "ready") {
      const settings = {
        apiServerUrl: "https://icd11restapi-developer-test.azurewebsites.net",
      };

      const callbacks = {
        selectedEntityFunction: (selectedEntity) => {
          // paste the code into the <input>
          document.getElementById("paste-selectedEntity").value =
            selectedEntity.code;
          // clear the searchbox and delete the search results
          window?.ECT.Handler.clear("1");
        },
      }; // configure the ECT Handler with mySetting

      window?.ECT.Handler.configure(settings, callbacks);
    }
  }, [status]);

  return (
    <div>
      <input
        type="text"
        className="ctw-input"
        autoComplete="off"
        data-ctw-ino="1"
      />
      <div className="ctw-window" data-ctw-ino="1"></div>
    </div>
  );
}

export default App;
