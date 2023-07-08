import React from "react";
import InfiniteLoader from "./components";
function App() {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-gray-200 text-gray-700">
      <div className="flex items-center">
        <InfiniteLoader />
      </div>
    </div>
  );
}

export default App;
