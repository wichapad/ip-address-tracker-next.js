import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function page() {
  const Map = useMemo(
    () =>
      dynamic(() => import("./map/page"), {
        loading: () => <p className="flex items-center justify-center h-[100vh]">A map is loading</p>,
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
