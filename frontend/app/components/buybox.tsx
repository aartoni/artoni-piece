import { useMemo, useState } from "react";

interface BuyBoxProps {
  available: number;
  unitPrice: number;
  canBuy: boolean;
  onBuy: (qty: number) => Promise<void>;
}

export default function BuyBox({
  available,
  unitPrice,
  canBuy,
  onBuy,
}: BuyBoxProps) {
  const [qty, setQty] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const total = useMemo(() => qty * unitPrice, [qty, unitPrice]);

  async function handleBuyClick() {
    setError("");
    if (!canBuy) return;
    setQty(qty);

    try {
      setSubmitting(true);
      await onBuy(qty);
    } catch (err: any) {
      setError(err?.message || "Something went wrong while purchasing.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Buy pieces</h3>
        <span className="text-xs text-gray-500">Max {available}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center rounded-lg border border-gray-300 overflow-hidden">
          <button
            type="button"
            className="px-3 py-2 disabled:opacity-40"
            onClick={() => setQty((q) => q - 1)}
            disabled={!canBuy || qty <= 1 || submitting}
          >
            −
          </button>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={available}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value || 0))}
            className="w-20 text-center py-2 outline-none"
            disabled={!canBuy || submitting}
          />
          <button
            type="button"
            className="px-3 py-2 disabled:opacity-40"
            onClick={() => setQty((q) => q + 1)}
            disabled={!canBuy || qty >= available || submitting}
          >
            +
          </button>
        </div>
        <div className="ml-auto text-sm">
          <div className="text-gray-600">Total</div>
          <div className="text-base font-semibold">{total}</div>
        </div>
        <button
          type="button"
          onClick={handleBuyClick}
          disabled={!canBuy || submitting}
          className="rounded-lg px-4 py-2 bg-black text-white disabled:bg-gray-300"
        >
          {submitting ? "Processing…" : "Buy"}
        </button>
      </div>
      {!canBuy && (
        <p className="text-xs text-gray-500 mt-2">
          {available === 0
            ? "No pieces available."
            : "This property is currently not available."}
        </p>
      )}
      {error && (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2 text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
