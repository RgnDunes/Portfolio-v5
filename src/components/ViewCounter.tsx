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

        // Use a free counter API service
        // We'll use api.countapi.xyz alternative: countapi.io or similar
        const namespace = "rgndunes-portfolio";
        const key = pageId;

        // Increment total views
        const totalResponse = await fetch(
          `https://api.countapi.xyz/hit/${namespace}/${key}-total`
        );
        const totalData = await totalResponse.json();

        // Increment unique views only if new visitor
        let uniqueData;
        if (isNewVisitor) {
          const uniqueResponse = await fetch(
            `https://api.countapi.xyz/hit/${namespace}/${key}-unique`
          );
          uniqueData = await uniqueResponse.json();
          localStorage.setItem(localStorageKey, "true");
        } else {
          const uniqueResponse = await fetch(
            `https://api.countapi.xyz/get/${namespace}/${key}-unique`
          );
          uniqueData = await uniqueResponse.json();
        }

        setStats({
          totalViews: totalData.value || 0,
          uniqueViews: uniqueData.value || 0,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch view count:", error);
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
