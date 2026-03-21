"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

interface CalculatorData {
  totalPrice: number;
  platforms: string[];
  hours: number;
  consulting: number;
  addons: string[];
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: "audit" | "inquiry" | "contact";
  calculatorData?: CalculatorData;
}

const WEB3FORMS_KEY = "3778f514-eeac-4af7-80b9-3044f61dd808";

export function ContactModal({ isOpen, onClose, source, calculatorData }: ContactModalProps) {
  const { t, language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Auto-close after success
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setStatus("idle");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const sourceLabel = source === "audit" ? "OBJEDNAŤ AUDIT" : source === "inquiry" ? "ODOSLAŤ DOPYT" : "KONTAKT";
    const subjectPrefix = source === "audit" ? "[AUDIT]" : source === "inquiry" ? "[DOPYT]" : "[KONTAKT]";

    const formData: Record<string, string> = {
      access_key: WEB3FORMS_KEY,
      subject: `${subjectPrefix} Nový dopyt od ${name}`,
      from_name: name,
      email: email,
      phone: phone || "Neuvedené",
      message: message,
      source_button: sourceLabel,
    };

    // Only include calculator data for audit/inquiry sources
    if (source !== "contact" && calculatorData) {
      formData.estimated_price = `${calculatorData.totalPrice} €/mesiac`;
      formData.selected_platforms = calculatorData.platforms.length > 0
        ? calculatorData.platforms.join(", ")
        : "Žiadne";
      formData.management_hours = `${calculatorData.hours} h`;
      formData.consulting_hours = `${calculatorData.consulting} h`;
      formData.selected_addons = calculatorData.addons.length > 0
        ? calculatorData.addons.join(", ")
        : "Žiadne";
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const m = t.modal;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-xl bg-background border-2 border-foreground z-10 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-foreground">
              <div>
                <div className="ui-label text-accent mb-2">
                  {source === "audit" ? m.audit_label : source === "inquiry" ? m.inquiry_label : m.contact_label}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-black text-foreground tracking-tight leading-tight">
                  {source === "audit" ? m.audit_title : source === "inquiry" ? m.inquiry_title : m.contact_title}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 border border-card-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors flex-shrink-0 ml-4"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success State */}
            {status === "success" ? (
              <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[300px] gap-6">
                <CheckCircle2 className="w-16 h-16 text-accent" strokeWidth={1} />
                <h4 className="text-3xl font-serif font-black text-foreground tracking-tight">
                  {m.success_title}
                </h4>
                <p className="text-foreground/60 text-lg max-w-xs">
                  {m.success_desc}
                </p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                {/* Calculator Summary - only for audit/inquiry */}
                {source !== "contact" && calculatorData && (
                  <div className="mb-8 p-4 border border-card-border bg-accent/[0.03]">
                    <div className="ui-label text-foreground/40 mb-3">{m.summary}</div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-serif font-black text-foreground tracking-tight">
                        {calculatorData.totalPrice} €
                      </span>
                      <span className="ui-label text-foreground/40">{t.configurator.per_month}</span>
                    </div>
                    {calculatorData.platforms.length > 0 && (
                      <div className="ui-label text-foreground/50 text-[10px]">
                        {calculatorData.platforms.join(" • ")}
                        {calculatorData.addons.length > 0 && ` • ${calculatorData.addons.join(" • ")}`}
                      </div>
                    )}
                  </div>
                )}

                {/* Fields */}
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="text-xs uppercase tracking-widest font-sans font-bold text-foreground/50 block mb-2">
                      {m.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={m.name_placeholder}
                      className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-accent py-3 px-0 text-foreground text-lg font-medium outline-none transition-colors rounded-none placeholder:text-foreground/20"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs uppercase tracking-widest font-sans font-bold text-foreground/50 block mb-2">
                      {m.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={m.email_placeholder}
                      className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-accent py-3 px-0 text-foreground text-lg font-medium outline-none transition-colors rounded-none placeholder:text-foreground/20"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs uppercase tracking-widest font-sans font-bold text-foreground/50 block mb-2">
                      {m.phone}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={m.phone_placeholder}
                      className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-accent py-3 px-0 text-foreground text-lg font-medium outline-none transition-colors rounded-none placeholder:text-foreground/20"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs uppercase tracking-widest font-sans font-bold text-foreground/50 block mb-2">
                      {m.message} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={m.message_placeholder}
                      className="w-full bg-transparent border-2 border-foreground/20 focus:border-accent p-3 text-foreground text-lg font-medium outline-none transition-colors rounded-none resize-none placeholder:text-foreground/20"
                    />
                  </div>
                </div>

                {/* Error */}
                {status === "error" && (
                  <div className="mt-4 p-3 border border-red-500 text-red-500 ui-label text-center">
                    {m.error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full mt-8 inline-flex items-center justify-between gap-4 bg-foreground text-background px-6 py-5 font-bold ui-label text-sm border border-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>
                    {status === "loading" ? m.sending : m.submit}
                  </span>
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
