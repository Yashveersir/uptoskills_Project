import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRouter />

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
