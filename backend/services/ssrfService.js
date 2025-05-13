import dotenv from "dotenv";

dotenv.config();

export const getSSRF = async (isSSRF, url) => {
  try {
    if (isSSRF && url) {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-ssrf": isSSRF,
        },
      });

      return response.ok ? await response.json() : null;
    }

    // jsonplaceholder bununla başlıyorsa

    if (!isSSRF && url && url.includes("jsonplaceholder")) {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-ssrf": isSSRF,
        },
      });

      return response.ok ? await response.json() : null;
    }

    if (!url.includes("jsonplaceholder")) {
      return false;
    }
  } catch (error) {
    console.log("[getSSRF]: ", error);
    return null;
  }
};
