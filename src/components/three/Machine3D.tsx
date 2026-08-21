import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

import { useLang } from "@/lib/i18n";
import type { CanvasProps } from "./MachineCanvas";

const MachineCanvas = lazy(() => import("./MachineCanvas"));

function Loader() {
  const { t } = useLang();
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="size-2 animate-ping rounded-full bg-primary" />
        <span className="label-tech">{t("hero.loading")}</span>
      </div>
    </div>
  );
}

/** Client-only, lazily loaded 3D machine with an image fallback. */
export function Machine3D({
  fallbackImage,
  className,
  ...props
}: CanvasProps & { fallbackImage: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setSupported(Boolean(c.getContext("webgl2") ?? c.getContext("webgl")));
    } catch {
      setSupported(false);
    }
  }, []);

  if (failed || !supported) {
    return (
      <img
        src={fallbackImage}
        alt="Negilu agricultural machine"
        loading="lazy"
        className={className ?? "size-full object-contain"}
      />
    );
  }

  return (
    <div className={className ?? "relative size-full"}>
      <ClientOnly fallback={<Loader />}>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary onError={() => setFailed(true)}>
            <MachineCanvas {...props} />
          </ErrorBoundary>
        </Suspense>
      </ClientOnly>
    </div>
  );
}

import { Component, type ErrorInfo, type ReactNode } from "react";

class ErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("3D model failed", error, info);
    this.props.onError();
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
