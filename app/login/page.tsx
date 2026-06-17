import React from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="dm-fade" style={{ maxWidth: 480, margin: "40px auto 70px", width: "100%", padding: "0 16px" }}>
      <LoginForm />
    </div>
  );
}
