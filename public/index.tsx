import { createRoot } from "react-dom/client";
import Layout from "./layout";

function App() {
  return <></>;
}

const root = createRoot(document.getElementById("elysia")!);
root.render(
  <Layout>
    <App />
  </Layout>
);
