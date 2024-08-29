import Meta from "@/components/Shared/Meta";
import { LayoutContainer, LayoutContent } from "./style";
import Navigation from "../Navigation";
import { useEffect, useRef, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigationRef = useRef<HTMLDivElement>(null);
  const [navigationOffset, setNavigationOffset] = useState<number>(0);

  useEffect(() => {
    setNavigationOffset(navigationRef.current?.clientHeight ?? 0);
  }, [navigationRef.current]);

  return (
    <>
      <Meta />
      <Navigation ref={navigationRef} />
      <LayoutContainer>
        <LayoutContent offset={navigationOffset}>{children}</LayoutContent>
      </LayoutContainer>
    </>
  );
};
export default Layout;
