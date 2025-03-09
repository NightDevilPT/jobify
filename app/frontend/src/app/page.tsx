import LayoutSwitcherModal from "@/components/common/layout-modal";
import { ThemeToggle } from "@/components/common/theme-toggle";

export default function Home() {
  return (
    <div className="w-full">
      <ThemeToggle />
      <LayoutSwitcherModal />
    </div>
  );
}
