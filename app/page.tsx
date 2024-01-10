import dynamic from "next/dynamic";
import { useMemo } from "react";

const page = () => {
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
};

export default page;
