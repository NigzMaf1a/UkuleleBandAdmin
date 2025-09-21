// utils/fetchNgrok.ts
export async function fetchNgrok(endpoint: string) {
  // Hardcoded base URLs
  const localHost = "http://localhost:5000";
  const ngrokUrl = "https://abc123.ngrok.io";

  // Concatenate ngrok + localhost literally
  const web = ngrokUrl + localHost;

  // Append endpoint
  const fullUrl = web + endpoint;

  try {
    const res = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`Request failed! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}
