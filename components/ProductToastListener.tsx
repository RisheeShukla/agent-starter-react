// components/ProductToastListener.tsx
'use client';

import { useDataChannel } from '@livekit/components-react';
import { toast } from 'sonner';

export function ProductToastListener() {
  useDataChannel('product_toast', (msg) => {
    try {
      const decoder = new TextDecoder();
      const jsonString = decoder.decode(msg.payload);
      const data = JSON.parse(jsonString);

      if (data.type === 'aniyor_product_list' && data.products) {
        // Using Sonner's custom toast API
        toast.custom(
          (t) => (
            <div className="w-[350px] bg-white shadow-xl rounded-2xl border border-amber-100 p-4 flex flex-col gap-3 pointer-events-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Aniyor Store Results
                </span>
                <button
                  onClick={() => toast.dismiss(t)}
                  className="text-gray-400 hover:text-gray-600 text-xs font-semibold transition"
                >
                  ✕ Close
                </button>
              </div>

              <div className="flex flex-col gap-2.5 max-h-[320px] overflow-y-auto pr-1">
                {data.products.map((product: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-amber-50/40 hover:bg-amber-50/80 transition p-2 rounded-xl border border-amber-100/60"
                  >
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-14 h-14 object-cover rounded-lg flex-shrink-0 border border-amber-200"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center text-xs text-amber-800">
                        Item
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {product.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {product.product_type}
                      </p>
                      <p className="text-xs font-bold text-emerald-700 mt-0.5">
                        ₹{product.price}
                      </p>
                    </div>

                    {product.url && (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-medium px-3 py-1.5 rounded-lg transition flex-shrink-0 shadow-sm"
                      >
                        Buy Now
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ),
          { duration: 15000 }
        );
      }
    } catch (err) {
      console.error('Failed to parse product data channel message:', err);
    }
  });

  // This component handles logic only; it doesn't render standard DOM elements.
  return null;
}