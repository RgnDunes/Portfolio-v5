"use client";

import { useEffect, useState } from "react";
import { FaEye, FaUsers } from "react-icons/fa";

interface ViewCounterProps {
  pageId: string;
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
    const trackView = async () => {
      try {
        const namespace = "rgndunes-portfolio";
        const baseUrl = "https://api.counterapi.dev/v1";
        const localStorageKey = `portfolio_visited_${pageId}`;

        // Always increment total views
        const totalResponse = await fetch(
          `${baseUrl}/${namespace}/${pageId}-total/up`
        );
        if (!totalResponse.ok) throw new Error("Total views API failed");
        const totalData = await totalResponse.json();
        const totalViews = totalData.count || 0;

        // Check if this browser has visited before
        const cachedData = localStorage.getItem(localStorageKey);
        let uniqueViews = 0;

        if (!cachedData) {
          // First visit from this browser - increment unique counter
          const uniqueResponse = await fetch(
            `${baseUrl}/${namespace}/${pageId}-unique/up`
          );
          if (!uniqueResponse.ok) throw new Error("Unique views API failed");
          const uniqueData = await uniqueResponse.json();
          uniqueViews = uniqueData.count || 0;

          // Cache the visit with timestamp and unique count
          localStorage.setItem(localStorageKey, JSON.stringify({
            firstVisit: Date.now(),
            uniqueCount: uniqueViews,
          }));
        } else {
          // Returning visitor - use cached unique count
          const parsed = JSON.parse(cachedData);
          uniqueViews = parsed.uniqueCount || 0;
        }

        setStats({ totalViews, uniqueViews });
        setLoading(false);
      } catch (error) {
        console.error("[ViewCounter] Error:", error);
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
      <div className="flex items-center gap-1.5 transition-colors hover:text-accent">
        <FaEye className="h-3.5 w-3.5" />
        <span className="font-medium">{stats.totalViews.toLocaleString()}</span>
        {showLabel && <span>views</span>}
      </div>
      <div className="flex items-center gap-1.5 transition-colors hover:text-accent">
        <FaUsers className="h-3.5 w-3.5" />
        <span className="font-medium">{stats.uniqueViews.toLocaleString()}</span>
        {showLabel && <span>visitors</span>}
      </div>
    </div>
  );
}
