import type { Property } from "~/routes/home";

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  if (!property) return null;

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
        {property.imageUrl && (
          <img
            src={property.imageUrl}
            alt={property.address}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <h2 className="text-xl font-semibold mb-2">
          {property.address || "Untitled property"}
        </h2>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">City:</span> {property.city}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Price per unit:</span>{" "}
          {property.unitPrice}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Pieces sold:</span>{" "}
          {property.soldPieces}/{property.totalPieces}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Status:</span>{" "}
          {property.status.replace("_", " ")}
        </p>
      </div>
    </div>
  );
}
