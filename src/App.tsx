import { cn } from "@public/libs/tailwind";
import { useState } from "react";
import { renderToString } from "react-dom/server";

export default function App() {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);

  return (
    <>
      <img src="/images/maddelena-1.webp" className="max-w-40" />
      <h1 className="text-3xl">Bun/Elysia Fullstack</h1>
      <h2 className="text-6xl">{count}</h2>
      <button
        className={cn(
          "text-xl text-blue-500 px-6 py-2 bg-blue-100 rounded-xl bg-[#ccc] bg-"
        )}
        onClick={increase}
      >
        Increase
      </button>
    </>
  );
}

export const html = renderToString(<App />);
