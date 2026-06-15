import LogoSvg from "@/assets/svg/logo";

// Util Imports
import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* <LogoSvg className="size-8.5" /> */}
      <Image src="/logo-2.png" alt="logo" width={35} height={35} />
      <span className="text-xl font-semibold">GoodDeed Foundation</span>
    </div>
  );
};

export default Logo;
