"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function handleRegister() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      alert(error?.message);
      return;
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
