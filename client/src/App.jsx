import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Toolbar from "./components/Toolbar.jsx";
import Sheet from "./components/Sheet.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { initializeSheetState } from "../store/tableStore.js";
import React from "react";


function SheetRouteWrapper() {
  const { sheetId } = useParams();
  React.useEffect(() => {
    console.log("sheet data fetched");
    if (sheetId) {
      initializeSheetState(sheetId);
    }
  }, [sheetId]);

  return (
    <>
      <Toolbar />
      <Sheet />
    </>
  );
}

function AppM() {
  console.log("Migrated App Rendered");
  return (
    <Router>
      <Routes>
        <Route path="/sheet/:sheetId" element={<SheetRouteWrapper />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/"
          element={
            <div>
              <h1 className="text-center text-2xl font-bold mt-10">
                Welcome to Tabular
              </h1>
              <p className="text-center mt-4">
                Please select a sheet to view or create a new one.
              </p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppM;
// export default useMigrated ? AppM : AppL;
