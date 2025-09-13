import type { Route } from "./+types/home";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Piece Properties" },
    { name: "description", content: "Welcome to Piece!" },
  ];
}

export enum PropertyStatus {
  AVAILABLE = "available",
  NOT_AVAILABLE = "not_available",
  HIDDEN = "hidden",
}

interface Property {
  id: string;
  city: string;
  address: string;
  totalPieces: number;
  soldPieces: number;
  unitPrice: number;
  status: PropertyStatus;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:3000/properties", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data: Property[] = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err?.message || "Failed to load properties");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Real Estate Listings</h1>

        {loading && (
          <div className="text-sm text-gray-600">Loading properties…</div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="text-sm text-gray-600">No properties found.</div>
        )}

        <ul className="space-y-3">
          {properties.map((p) => (
            <li
              key={p.id}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-medium">
                    {p.address || "Untitled property"}
                  </h2>
                  <div className="mt-1 text-sm text-gray-700">
                    <span className="font-semibold">Price:</span> {p.unitPrice}
                  </div>
                  {p.city && (
                    <div className="text-sm text-gray-700">
                      <span className="font-semibold">Location:</span> {p.city}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
