import Image from "next/image";
import Link from 'next/link'
import Footer from "@/components/footer/Footer";
import SelectService from "@/components/home/SelectService";
import ChooseLocation from "@/components/home/ChooseLocation";
import RideCard from "@/components/rides/RideCard";
import PromotionSlider from "@/components/home/PromotionSlider";

export default function Home() {
  return (
    <>
    {/* <SelectService/> */}
    <ChooseLocation/>
    {/* <PromotionSlider/> */}
    </>
  );
}
