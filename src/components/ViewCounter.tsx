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

        // Using CounterAPI.dev as a free alternative to CountAPI.xyz
        const namespace = "rgndunes-portfolio";
        const baseUrl = "https://api.counterapi.dev/v1";

        console.log(`[ViewCounter] Tracking view for ${pageId}, isNewVisitor: ${isNewVisitor}`);

        // Increment total views
        const totalResponse = await fetch(
          `${baseUrl}/${namespace}/${pageId}-total/up`,
          { method: "GET" }
        );

        if (!totalResponse.ok) {
          throw new Error(`Total views API failed: ${totalResponse.status}`);
        }

        const totalData = await totalResponse.json();
        console.log(`[ViewCounter] Total views response:`, totalData);

        // Increment unique views only if new visitor
        let uniqueData;
        if (isNewVisitor) {
          const uniqueResponse = await fetch(
            `${baseUrl}/${namespace}/${pageId}-unique/up`,
            { method: "GET" }
          );

          if (!uniqueResponse.ok) {
            throw new Error(`Unique views API failed: ${uniqueResponse.status}`);
          }

          uniqueData = await uniqueResponse.json();
          localStorage.setItem(localStorageKey, "true");
        } else {
          const uniqueResponse = await fetch(
            `${baseUrl}/${namespace}/${pageId}-unique`,
            { method: "GET" }
          );

          if (!uniqueResponse.ok) {
            throw new Error(`Get unique views API failed: ${uniqueResponse.status}`);
          }

          uniqueData = await uniqueResponse.json();
        }

        console.log(`[ViewCounter] Unique views response:`, uniqueData);

        const newStats = {
          totalViews: totalData.count || 0,
          uniqueViews: uniqueData.count || 0,
        };

        console.log(`[ViewCounter] Setting stats:`, newStats);
        setStats(newStats);
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
