import { RiTeamLine } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { VscProject } from "react-icons/vsc";
import { SiGoogletagmanager } from "react-icons/si";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-white w-72 shadow-xl">
      <Link
        href={"/dashboard"}
        className="flex items-center gap-2 mb-4 p-4 border-b-2"
      >
        <SiGoogletagmanager className="text-2xl text-sky-600" />
        <h3 className="text-xl font-bold text-slate-700">Task Management</h3>
      </Link>
      <ul className="flex flex-col gap-4 mt-4 px-4">
        <li className="text-gray-700 font-semibold flex gap-2 items-center hover:text-sky-500 transition">
          <VscProject className="text-lg" />
          <Link href={"/projects"}>Projects</Link>
        </li>
        <li className="text-gray-700 font-semibold flex gap-2 items-center hover:text-sky-500 transition">
          <FaTasks className="text-lg" />
          <Link href={"/tasks"}>Tasks</Link>
        </li>
        <li className="text-gray-700 font-semibold flex gap-2 items-center hover:text-sky-500 transition">
          <RiTeamLine className="text-lg" />
          <Link href={"/teams"}>Teams</Link>
        </li>
      </ul>
    </aside>
  );
}
