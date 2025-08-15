import { useState } from "react";
import { Loader2 } from "lucide-react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
  loading
}: DeleteAccountModalProps) {
  const [confirmationText, setConfirmationText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 border border-red-700/50 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-red-400">Confirm Deletion</h2>
        <p className="text-sm text-gray-300 mt-2">
          This action <span className="text-red-400 font-bold">cannot</span> be undone.
          Please type <span className="text-red-400 font-bold">DELETE</span> to confirm.
        </p>

        <input
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          placeholder="Type DELETE here"
          className="mt-4 w-full rounded-lg border border-red-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={confirmationText !== "DELETE" || loading}
            className={`px-4 py-2 rounded-lg text-white transition flex items-center gap-2
              ${confirmationText === "DELETE" && !loading
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-600/50 cursor-not-allowed"}`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
