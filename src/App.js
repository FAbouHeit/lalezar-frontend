import "./App.css";
import AppRouter from "./Routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet-async";
import FavIcon from './Assets/lalezar.png'
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Helmet>
          <link rel="shortcut icon" href={FavIcon} type="image/x-icon"/>
          <title>Lalezar</title>
        </Helmet>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
