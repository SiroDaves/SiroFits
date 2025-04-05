"use client";

import { useEffect } from "react";

export default function MyStravaRedirect() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      window.location.href = `mystrava://auth?code=${code}`;
    }
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Redirecting to My Strava App...</h2>
    </div>
  );
}
