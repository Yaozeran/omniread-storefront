

"use client"


import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./RegisterForm.module.css";

import { registerWithEmail, sendEmailVerificationCode } from "@/services/api/user";


function RegisterForm() {

  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [role, setRole] = useState<"reader" | "author">("reader");

  const [sendingCode, setSendingCode] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [codeSentMsg, setCodeSentMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const roleLabel = useMemo(() => {
    return role === "author" ? "Writer" : "Reader";
  }, [role]);

  async function onSendCode() {
    setError(null);
    setCodeSentMsg(null);
    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    setSendingCode(true);
    try {
      const result = await sendEmailVerificationCode(email);
      setCodeSentMsg(`Verification code sent. It expires in ${result.expiresInSec} seconds.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send verification code");
    } finally {
      setSendingCode(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRegistering(true);
    setError(null);
    try {
      await registerWithEmail({
        name,
        email,
        password,
        verificationCode,
        role,
      });
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register");
    } finally {
      setRegistering(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="Your display name"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="you@example.com"
        />
      </div>

      <div className={styles.roleGroup}>
        <label className={styles.label}>Choose account type</label>
        <div className={styles.roleGrid}>
          <button
            type="button"
            onClick={() => setRole("reader")}
            className={`${styles.roleButton} ${
              role === "reader" ? styles.roleButtonActive : styles.roleButtonInactive
            }`}
          >
            Reader
          </button>
          <button
            type="button"
            onClick={() => setRole("author")}
            className={`${styles.roleButton} ${
              role === "author" ? styles.roleButtonActive : styles.roleButtonInactive
            }`}
          >
            Writer
          </button>
        </div>
        <p className={styles.roleLabel}>Selected: {roleLabel}</p>
      </div>

      <div className={styles.codeGroup}>
        <label className={styles.label} htmlFor="verification-code">
          Email verification code
        </label>
        <div className={styles.codeRow}>
          <input
            id="verification-code"
            type="text"
            required
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className={`${styles.input} ${styles.codeInput}`}
            placeholder="Enter code"
          />
          <button
            type="button"
            onClick={onSendCode}
            disabled={sendingCode}
            className={styles.codeButton}
          >
            {sendingCode ? "Sending..." : "Send code"}
          </button>
        </div>
        {codeSentMsg ? <p className={styles.codeMessage}>{codeSentMsg}</p> : null}
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      <button
        type="submit"
        disabled={registering}
        className={styles.submitButton}
      >
        {registering ? "Registering..." : "Create account"}
      </button>

    </form>
  )
}


export default RegisterForm;
