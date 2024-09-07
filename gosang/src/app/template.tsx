import SelectService from "@/components/home/SelectService";

export default function Template({ children }: { children: React.ReactNode }) {
    return <>
                <SelectService />
                {children}
            </>
}