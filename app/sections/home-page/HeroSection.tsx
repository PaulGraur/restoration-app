import Image from "next/image";
import image from "@/image/pictures/home-hero.svg";
import Typography from "@/components/Typography";
import Button from "@/components/ButtonComponent";

const HeroSection = () => {
  return (
    <section className="bg-[#EAF2F5] container flex flex-col md:flex-row items-center gap-4 rounded-[48px] py-[60px]">
      <div className="flex-1">
        <Typography tag="h1" mb>
          Welcome to My App
        </Typography>

        <Typography tag="p" mb>
          This is a sample homepage with some placeholder content. You can
          replace it with real data.
        </Typography>

        <Button
          href="/algorithms"
          text="Get Started"
          arrow="arrow2"
          color="vermilion"
        />
      </div>
      <div className="flex-1">
        <Image src={image} alt="Placeholder image" width={400} height={300} />
      </div>
    </section>
  );
};

export default HeroSection;
