import { useMemo } from "react";
import { PropertyStatus, type Property } from "~/routes/home";
import BuyBox from "./buybox";

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
  onPurchased: (id: string, purchased: number) => void;
}

export default function PropertyModal({
  property,
  onClose,
  onPurchased,
}: PropertyModalProps) {
  const available = useMemo(
    () => property.totalPieces - property.soldPieces,
    [property.totalPieces, property.soldPieces]
  );

  const canBuy = property.status === PropertyStatus.AVAILABLE && available > 0;

  async function handleBuy(qty: number) {
    const res = await fetch(`http://localhost:3000/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ property: property.id, pieces: qty }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `Purchase failed: ${res.status}`);
    }

    onPurchased(property.id, qty);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // close when clicking background
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {property.image && (
          <img
            src={property.image}
            alt={property.address}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <h2 className="text-xl font-semibold mb-2">
          {property.address || "Untitled property"}
        </h2>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
          <div>
            <span className="font-semibold">City:</span> {property.city}
          </div>
          <div>
            <span className="font-semibold">Price / piece:</span>{" "}
            {property.unitPrice}
          </div>
          <div>
            <span className="font-semibold">Pieces sold:</span>{" "}
            {property.soldPieces}/{property.totalPieces}
          </div>
          <div>
            <span className="font-semibold">Available:</span> {available}
          </div>
          <div className="col-span-2">
            <span className="font-semibold">Status:</span>{" "}
            {property.status.replace("_", " ")}
          </div>
        </div>
        <BuyBox
          available={available}
          unitPrice={property.unitPrice}
          canBuy={canBuy}
          onBuy={handleBuy}
        />
      </div>
    </div>
  );
}
