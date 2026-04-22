import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import html2canvas from "html2canvas";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SlideNavigationProvider } from "@/contexts/SlideNavigationContext";

const FRAME_W = 1920;
const FRAME_H = 1080;

const waitForImages = async (root: HTMLElement) => {
  const imgs = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    imgs.map((img) =>
      img.complete && img.naturalWidth > 0
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          })
    )
  );
};

/**
 * Render a React component to a high-res PNG data URI.
 * Uses a hidden but on-viewport host so html2canvas captures correctly.
 * No DeckProvider/AuthProvider so comment layer never mounts.
 */
export async function renderComponentToPng(
  Component: React.ComponentType<any>,
  props: Record<string, any> = {},
): Promise<string> {
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "0";
  host.style.top = "0";
  host.style.width = `${FRAME_W}px`;
  host.style.height = `${FRAME_H}px`;
  host.style.overflow = "hidden";
  host.style.background = "#0a0f1c";
  host.style.opacity = "0";
  host.style.pointerEvents = "none";
  host.style.zIndex = "-1";
  document.body.appendChild(host);

  const root = createRoot(host);
  try {
    root.render(
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(
          SidebarProvider,
          null,
          React.createElement(
            SlideNavigationProvider,
            null,
            React.createElement(
              "div",
              { style: { width: FRAME_W, height: FRAME_H, position: "relative" } },
              React.createElement(Component, props),
            ),
          ),
        ),
      ),
    );

    await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
    if ((document as any).fonts?.ready) await (document as any).fonts.ready;
    await waitForImages(host);
    await new Promise((r) => setTimeout(r, 150));

    const canvas = await html2canvas(host, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#0a0f1c",
      width: FRAME_W,
      height: FRAME_H,
      windowWidth: FRAME_W,
      windowHeight: FRAME_H,
      logging: false,
    });

    return canvas.toDataURL("image/png");
  } finally {
    try { root.unmount(); } catch {}
    host.remove();
  }
}