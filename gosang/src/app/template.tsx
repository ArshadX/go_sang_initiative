import Header from "@/components/common/Header";
import BottomTab from "@/components/footer/BottomTab";

export default function Template({ children }: { children: React.ReactNode }) {
    return <>
            <Header />
                <main>{children}</main>
            <BottomTab  />
            </>
}