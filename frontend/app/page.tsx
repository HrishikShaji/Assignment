import QueryForm from "@/components/QueryForm";
import RangeSlider from "@/components/RangeSlider";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full min-h-scree flex-col justify-center items-center ">
      <QueryForm />
    </main>
  );
}
