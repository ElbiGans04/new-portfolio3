"use client";

import { JSX, useMemo, useState } from "react";
import AppContext from "../_contexts/appContext";

export default function WrapperAppContext({children}: {children: JSX.Element}) {
  const [loading, setLoading] = useState(false);
  const memoValue = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading, setLoading]
  );

  return <AppContext value={memoValue}>{children}</AppContext>;
}
