"use client";

import { useEffect, useState } from "react";
import { FaEye, FaUsers } from "react-icons/fa";

interface ViewCounterProps {
  pageId: string; // Unique identifier for the page (e.g., "homepage" or "blog-slug")
  showLabel?: boolean;
}

interface ViewStats {
  totalViews: number;
  uniqueViews: number;
}

export default function ViewCounter({ pageId, showLabel = true }: ViewCounterProps) {
  const [stats, setStats] = useState<ViewStats>({ totalViews: 0, uniqueViews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track and fetch view counts
    const trackView = async () => {
      try {
        const localStorageKey = `viewed_${pageId}`;
        const hasVisited = localStorage.getItem(localStorageKey);
        const isNewVisitor = !hasVisited;

        // Using CounterAPI.dev - CORS is only enabled on /up endpoint
        const namespace = "rgndunes-portfolio";
        const baseUrl = "https://api.counterapi.dev/v1";

        // Increment total views (always)
        const totalResponse = await fetch(
          `${baseUrl}/${namespace}/${pageId}-total/up`,
          { method: "GET" }
        );

        if (!totalResponse.ok) {
          throw new Error(`Total views API failed: ${totalResponse.status}`);
        }

        const totalData = await totalResponse.json();

        // Increment unique views only if new visitor
        let uniqueCount = 0;
        if (isNewVisitor) {
          const uniqueResponse = await fetch(
            `${baseUrl}/${namespace}/${pageId}-unique/up`,
            { method: "GET" }
          );

          if (!uniqueResponse.ok) {
            throw new Error(`Unique views API failed: ${uniqueResponse.status}`);
          }

          const uniqueData = await uniqueResponse.json();
          uniqueCount = uniqueData.count || 0;

          // Store both the flag AND the count
          localStorage.setItem(localStorageKey, "true");
          localStorage.setItem(`${localStorageKey}_count`, uniqueCount.toString());
        } else {
          // For returning visitors, use cached unique count
          const cachedCount = localStorage.getItem(`${localStorageKey}_count`);
          uniqueCount = cachedCount ? parseInt(cachedCount, 10) : totalData.count;
        }

        setStats({
          totalViews: totalData.count || 0,
          uniqueViews: uniqueCount,
        });
        setLoading(false);
      } catch (error) {
        console.error("[ViewCounter] Failed to fetch view count:", error);
        // Keep the component visible even on error, just show 0
        setLoading(false);
      }
    };

    trackView();
  }, [pageId]);

  if (loading) {
    return (
      <div className="flex items-center gap-6 text-xs text-muted">
        <div className="flex items-center gap-1.5">
          <FaEye className="h-3.5 w-3.5 animate-pulse" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 text-xs text-muted">
      {/* Total Views */}
      <div className="flex items-center gap-1.5 transition-colors hover:text-accent">
        <FaEye className="h-3.5 w-3.5" />
        <span className="font-medium">{stats.totalViews.toLocaleString()}</span>
        {showLabel && <span>views</span>}
      </div>

      {/* Unique Visitors */}
      <div className="flex items-center gap-1.5 transition-colors hover:text-accent">
        <FaUsers className="h-3.5 w-3.5" />
        <span className="font-medium">{stats.uniqueViews.toLocaleString()}</span>
        {showLabel && <span>visitors</span>}
      </div>
    </div>
  );
}
