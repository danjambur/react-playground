import React from "react";
import InfiniteLoader from "./components";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-full items-center justify-center bg-gray-200 text-gray-700">
        <div className="flex items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 m-4">
            <InfiniteLoader
              apiEndpoint="https://picsum.photos/v2/list?random=1"
              limit={10}
              renderContent={(data: any) => {
                return data.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center justify-center"
                  >
                    <img
                      src={`${item.download_url}`}
                      alt={item.author}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="text-center">
                      <p className="text-lg font-semibold">{item.author}</p>
                      <p className="text-sm">{item.title}</p>
                      <p className="text-sm">
                        {item.width} x {item.height}
                      </p>
                    </div>
                  </div>
                ));
              }}
            />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
