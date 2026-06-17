"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  gov: string;
  isDefault: boolean;
}

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "#fdf6f4",
  border: "1px solid #e3c3cc",
  borderRadius: 12,
  padding: "13px 16px",
  fontSize: 14,
  fontFamily: "var(--font-jost),sans-serif",
  color: "#5a4145",
  boxSizing: "border-box",
};

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    name: "Jasmine Aly",
    phone: "0100 123 4567",
    address: "12 El Obour Buildings, Floor 14",
    city: "Heliopolis",
    gov: "Cairo",
    isDefault: true,
  },
];

export default function AddressesPage() {
  const router = useRouter();
  const { loggedIn, hydrated, showToast } = useStore();
  const [addresses, setAddresses] = useState<Address[]>(DEFAULT_ADDRESSES);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formGov, setFormGov] = useState("");
  const [formDefault, setFormDefault] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (hydrated && !loggedIn) {
      router.push("/login");
    }
  }, [hydrated, loggedIn, router]);

  if (!hydrated) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#a98e93" }}>
        Loading addresses...
      </div>
    );
  }

  if (!loggedIn) {
    return null;
  }

  const handleEdit = (addr: Address) => {
    setEditId(addr.id);
    setFormName(addr.name);
    setFormPhone(addr.phone);
    setFormAddress(addr.address);
    setFormCity(addr.city);
    setFormGov(addr.gov);
    setFormDefault(addr.isDefault);
    setIsEditing(true);
    setFormError("");
  };

  const handleAddNew = () => {
    setEditId(null);
    setFormName("");
    setFormPhone("");
    setFormAddress("");
    setFormCity("");
    setFormGov("");
    setFormDefault(addresses.length === 0); // Default if first address
    setIsEditing(true);
    setFormError("");
  };

  const handleDelete = (id: string) => {
    const isDef = addresses.find((a) => a.id === id)?.isDefault;
    let newAddrs = addresses.filter((a) => a.id !== id);
    if (isDef && newAddrs.length > 0) {
      newAddrs[0].isDefault = true; // Nominate new default
    }
    setAddresses(newAddrs);
    showToast("Address deleted");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAddress.trim() || !formCity.trim() || !formGov.trim() || !formPhone.trim()) {
      setFormError("Please complete all required fields");
      showToast("Fields incomplete");
      return;
    }
    if (!/^[0-9+\-\s]{8,}$/.test(formPhone)) {
      setFormError("Please enter a valid phone number");
      showToast("Invalid phone number");
      return;
    }

    let updatedList: Address[];
    if (editId) {
      // Editing
      updatedList = addresses.map((a) => {
        if (a.id === editId) {
          return {
            id: a.id,
            name: formName,
            phone: formPhone,
            address: formAddress,
            city: formCity,
            gov: formGov,
            isDefault: formDefault,
          };
        }
        return formDefault ? { ...a, isDefault: false } : a;
      });
      showToast("Address updated");
    } else {
      // New
      const newAddr: Address = {
        id: "addr-" + Date.now(),
        name: formName,
        phone: formPhone,
        address: formAddress,
        city: formCity,
        gov: formGov,
        isDefault: formDefault,
      };
      updatedList = formDefault
        ? addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddr)
        : addresses.concat(newAddr);
      showToast("Address added");
    }

    setAddresses(updatedList);
    setIsEditing(false);
  };

  return (
    <div className="dm-fade" style={{ maxWidth: 800, margin: "0 auto", width: "100%", padding: "clamp(20px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ marginBottom: 8, fontSize: 12.5, color: "#a98e93" }}>
        <Link href="/account" style={{ textDecoration: "underline" }}>Account</Link> / <span style={{ color: "#7c6065" }}>Addresses</span>
      </div>
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
        <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: 0 }}>My Addresses</h1>
        {!isEditing ? (
          <button onClick={handleAddNew} className="dm-btn-primary" style={{ padding: "10px 22px", fontSize: 13, textTransform: "uppercase" }}>Add New Address</button>
        ) : null}
      </div>

      {isEditing ? (
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }} className="dm-fade">
          <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 22, color: "#5a4145", margin: "0 0 18px" }}>
            {editId ? "Edit Address" : "Add New Address"}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="address-name" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>Full Name *</label>
              <input id="address-name" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Full Name *" style={inputBase} />
            </div>
            <div className="dm-address-two-col">
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label htmlFor="address-phone" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>Phone *</label>
                <input id="address-phone" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="Phone *" style={inputBase} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label htmlFor="address-city" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>City *</label>
                <input id="address-city" value={formCity} onChange={(e) => setFormCity(e.target.value)} placeholder="City *" style={inputBase} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="address-gov" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>Governorate *</label>
              <input id="address-gov" value={formGov} onChange={(e) => setFormGov(e.target.value)} placeholder="Governorate *" style={inputBase} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="address-street" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>Street Address *</label>
              <input id="address-street" value={formAddress} onChange={(e) => setFormAddress(e.target.value)} placeholder="Street Address *" style={inputBase} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "6px 0" }}>
              <input
                id="isDefault"
                type="checkbox"
                checked={formDefault}
                onChange={(e) => setFormDefault(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: "#c07f8d", cursor: "pointer" }}
              />
              <label htmlFor="isDefault" style={{ fontSize: 13.5, color: "#7c6065", cursor: "pointer" }}>Set as default shipping address</label>
            </div>

            {formError ? (
              <div style={{ fontSize: 13.5, color: "#cf6b6b" }}>{formError}</div>
            ) : null}

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button type="submit" className="dm-btn-primary" style={{ padding: "12px 28px", fontSize: 13, textTransform: "uppercase" }}>Save Address</button>
              <button type="button" onClick={() => setIsEditing(false)} className="dm-btn-outline" style={{ padding: "11px 28px", fontSize: 13, textTransform: "uppercase" }}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {addresses.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", background: "#fff", borderRadius: 20, border: "1px solid #f0dde1" }}>
              <p style={{ fontSize: 14.5, color: "#a98e93", margin: "0 0 14px" }}>You don&apos;t have any saved addresses.</p>
              <button onClick={handleAddNew} className="dm-btn-primary" style={{ padding: "10px 24px" }}>Add Address</button>
            </div>
          ) : (
            <div className="dm-grid-responsive-two-col" style={{ gap: 16 }}>
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  style={{ background: "#fff", border: `1.5px solid ${addr.isDefault ? "#c07f8d" : "#f0dde1"}`, borderRadius: 18, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#4f3a3e" }}>{addr.name}</span>
                      {addr.isDefault ? (
                        <span style={{ fontSize: 10.5, background: "#faecef", color: "#b76e79", padding: "3px 9px", borderRadius: 999, fontWeight: 600 }}>Default</span>
                      ) : null}
                    </div>
                    <div style={{ fontSize: 14, color: "#7c6065", lineHeight: 1.5, marginBottom: 16 }}>
                      <div>{addr.address}</div>
                      <div>{addr.city}, {addr.gov}</div>
                      <div style={{ marginTop: 4, color: "#a98e93", fontSize: 13 }}>📞 {addr.phone}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 12, borderTop: "1px solid #f5eef0", paddingTop: 14 }}>
                    <button onClick={() => handleEdit(addr)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#b76e79", textDecoration: "underline", padding: 0 }}>Edit</button>
                    <button onClick={() => handleDelete(addr.id)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#bd8a93", textDecoration: "underline", padding: 0 }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!isEditing ? (
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Link href="/account" className="dm-btn-outline" style={{ display: "inline-block", fontSize: 13, padding: "10px 24px" }}>
            Back to Dashboard
          </Link>
        </div>
      ) : null}
    </div>
  );
}
