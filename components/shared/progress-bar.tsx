"use client";

import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import { useEffect, useRef } from "react";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const ProgressBar = () => {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      NProgress.done();
      previousPath.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const link = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const isExternal = link.hostname !== window.location.hostname;
      if (isExternal) return; // ignore external links

      NProgress.start();
      // If the clicked link points to the current page, finish immediately
      if (link.pathname === window.location.pathname) {
        NProgress.done();
      }

      if (target.closest("[data-nprogress]")) {
        NProgress.start();
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  return null;
};

export default ProgressBar;
