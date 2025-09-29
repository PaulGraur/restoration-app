import Link from "next/link";
import Image from "next/image";
import Logo from "@/image/logo.png";

const navLinks = [
  { href: "/tasks", text: "Tasks" },
  { href: "/challenges", text: "Challenges" },
  { href: "/leaderboard", text: "Leaderboard" },
  { href: "/community", text: "Community" },
];

const externalLinks = [{ href: "https://www.codewars.com", text: "Codewars" }];

const HeaderComponent = () => {
  return (
    <header className="bg-[#111827] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        <Link href="/">
          <Image src={Logo} alt="Logo" height={120} />
        </Link>

        <nav className="flex gap-8 items-center">
          {navLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="hover:text-green-400 transition-colors duration-200 font-medium"
            >
              {item.text}
            </Link>
          ))}
          {externalLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors duration-200 font-medium"
            >
              {item.text}
            </a>
          ))}
        </nav>

        <Link
          href="/login"
          className="border-[1px] border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-md font-semibold transition duration-200"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
