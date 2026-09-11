import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
    setTimeout(() => {
      const el = document.getElementById("login");
      if (el) {
        import("bootstrap").then((bootstrap) => {
          const instance = bootstrap.Modal.getOrCreateInstance(el);
          instance.show();
        });
      }
    }, 150);
  }, [navigate]);

  return null;
}
