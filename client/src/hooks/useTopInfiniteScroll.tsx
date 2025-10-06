import { useRef, useEffect, useCallback } from "react";

export const useTopInfiniteScroll = (containerRef, fetchMore, hasMore) => {
  const observer = useRef();

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !hasMore) return;

    // Check if scroll is near the top
    if (containerRef.current.scrollTop < 50) {
      fetchMore();
    }
  }, [containerRef, fetchMore, hasMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, handleScroll]);
};
