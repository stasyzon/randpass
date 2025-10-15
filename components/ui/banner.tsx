import Image from "next/image";
import type { BannerProps } from "@/types/common";

function Banner(props: BannerProps) {
  return (
    <div className="bg-cyan-900/100 p-3 flex justify-center items-center flex-row flex-wrap text-white">
      <Image className="mr-2" src="/flag.svg" width={20} height={20} alt="Ukraine flag" />
      <span>Support Ukraine -&nbsp;</span>
      <a target="_blank" className="hover:underline" href="https://savelife.in.ua/en/">
        <b>Donate to Come Back Alive Foundation</b>
      </a>
    </div>
  );
}

export default Banner;
