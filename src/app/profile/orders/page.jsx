// FILE PATH: app/profile/orders/page.jsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// 🟢 Har status ka label, color aur icon-jaisa dot yahan define hai
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    dot: "bg-yellow-500",
    text: "text-yellow-700 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-200 dark:border-yellow-900/50",
  },
  processing: {
    label: "Processing",
    dot: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-900/50",
  },
  under_review: {
    label: "Under Review",
    dot: "bg-purple-500",
    text: "text-purple-700 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-900/50",
  },
  received: {
    label: "Received",
    dot: "bg-green-500",
    text: "text-green-700 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-900/50",
  },
  return: {
    label: "Return",
    dot: "bg-red-500",
    text: "text-red-700 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-900/50",
  },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("stowave_user_token");

    if (!token) {
      router.push("/signUp");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders/my-orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!data.success) {
          setError(data.error || "Could not load your orders.");
          setLoading(false);
          return;
        }

        setOrders(data.orders || []);
      } catch (err) {
        console.error("fetchOrders error:", err);
        setError(
          "Can't connect to server. Check your internet or reload page?",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm font-medium bg-zinc-50 dark:bg-zinc-950 text-zinc-500">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 py-28 text-zinc-900 dark:text-zinc-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Track the status of everything you've ordered.
            </p>
          </div>
          <Link
            href="/profile"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            ← Back to Profile
          </Link>
        </div>

        {error && (
          <div className="p-3 rounded-lg text-sm font-medium border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {!error && orders.length === 0 && (
          <div className="p-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              You haven't placed any orders yet.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-sm font-semibold underline text-zinc-900 dark:text-zinc-50"
            >
              Start Shopping
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"
            >
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <p className="text-sm font-bold">{order.orderId}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Placed on {formatDate(order.placedAt || order.createdAt)}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              {/* Items */}
              <div className="space-y-1.5 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {item.name}
                      {item.size ? ` (${item.size})` : ""} × {item.qty}
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-50 font-medium">
                      PKR {item.price * item.qty}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {order.paymentMethod}
                </span>
                <span className="text-sm font-bold">
                  Total: PKR {order.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
