import { useCallback, useEffect, useRef, useState } from "react";

interface UseAutoScrollProps {
  smooth?: boolean;
  content?: React.ReactNode;
}

export const useAutoScroll = ({ smooth = false, content }: UseAutoScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const getScrollBottom = useCallback(() => {
    if (!scrollRef.current) return 0;
    const { scrollHeight, scrollTop, clientHeight } = scrollRef.current;
    return scrollHeight - scrollTop - clientHeight;
  }, []);

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollOptions = smooth ? { behavior: "smooth" as const } : undefined;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      ...scrollOptions,
    });
  }, [smooth]);

  const handleScroll = useCallback(() => {
    const scrollBottom = getScrollBottom();
    setIsAtBottom(scrollBottom <= 2);
    if (scrollBottom <= 2) {
      setAutoScrollEnabled(true);
    }
  }, [getScrollBottom]);

  useEffect(() => {
    if (autoScrollEnabled) {
      scrollToBottom();
    }
  }, [content, autoScrollEnabled, scrollToBottom]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const disableAutoScroll = useCallback(() => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom > 2) {
      setAutoScrollEnabled(false);
    }
  }, [getScrollBottom]);

  return {
    scrollRef,
    isAtBottom,
    autoScrollEnabled,
    scrollToBottom,
    disableAutoScroll,
  };
}; 