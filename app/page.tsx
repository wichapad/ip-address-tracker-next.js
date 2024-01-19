import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function page() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/map/page"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div>
      <Map />
    </div>
  );
}
