import AppRouter from "./routes/AppRouter";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRouter />
      <ScrollToTop threshold={400} />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3200,
          className: "rounded-md bg-neutral-900 text-neutral-50 shadow-overlay dark:bg-neutral-800",
          success: {
            className: "rounded-md border border-status-success/20 bg-neutral-900 text-neutral-50 shadow-overlay",
          },
          error: {
            className: "rounded-md border border-status-error/20 bg-neutral-900 text-neutral-50 shadow-overlay",
          },
        }}
      />
    </>
  );
}

export default App;