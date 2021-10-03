import { useMediaQuery } from "react-responsive";

export default function ScreenSize() {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  return isMobile;
}
