import Layout from "@public/layout";
import { createRoot } from "react-dom/client";

function App() {
  return <></>;
}

const root = createRoot(document.getElementById("elysia")!);
root.render(
  <Layout>
    <App />
  </Layout>
);
