import Image from "next/image";
import Link from 'next/link'
import Footer from "@/components/footer/Footer";
import SelectService from "@/components/home/SelectService";
import ChooseLocation from "@/components/home/ChooseLocation";
import BottomNavBar from "@/components/home/BottomNavBar";
import RideCard from "@/components/rides/RideCard";

export default function Home() {
  return (
    <>
    {/* <SelectService/> */}
    <ChooseLocation/>
    <BottomNavBar/>
    <Footer/>
    </>
  );
}
