import Header from "@/components/common/Header";
import NavbarScrollHandler from "@/components/common/NavbarScrollHandler";
import BottomTab from "@/components/footer/BottomTab";

export default function Template({ children }: { children: React.ReactNode }) {
    return <>
            <NavbarScrollHandler>
                <Header  />
            </NavbarScrollHandler>
                <main>{children}</main>
            <BottomTab  />
            </>
}