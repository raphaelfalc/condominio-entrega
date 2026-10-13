import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("entregas");

  if (req.method === "POST") {
    const data = await req.json();
    await store.setJSON("atual", data);
    return new Response(JSON.stringify({ status: "ok", salvo: data }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  const atual = (await store.get("atual", { type: "json" })) || {
    casa: "Nenhuma selecionada",
    link: ""
  };

  return new Response(JSON.stringify(atual), {
    headers: { "Content-Type": "application/json" }
  });
};

export const config = {
  path: "/api/destino"
};
