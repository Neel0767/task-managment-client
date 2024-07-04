import { RiTeamLine } from "react-icons/ri";    
import { FaTasks } from "react-icons/fa";
import { VscProject } from "react-icons/vsc";
import { SiGoogletagmanager } from "react-icons/si";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-white w-64 p-6 shadow-md">
      <div className="flex items-center gap-1.5 mb-4">
        <SiGoogletagmanager size={18} color="rgb(27 111 195)"/>
      <h2 className="text-lg font-bold text-gray-700">
        Task Management
    </h2>

      </div>
      <ul className="text-center">
        <li className="mb-2 my-4 text-gray-700 font-semibold flex items-center">
          <VscProject className="text-2xl" />
          <Link href={"/projects"}>Projects</Link>
        </li>
        <li className="mb-2 my-4 text-gray-700 font-semibold flex items-center">
          <FaTasks className="text-2xl" />
          <Link href={"/tasks"}>Tasks</Link>
        </li>
        <li className="mb-2 my-4 text-gray-700 font-semibold flex items-center">
          <RiTeamLine className="text-2xl" />
          <Link href={"/teams"}>Teams</Link>
        </li>
      </ul>
    </aside>
  );
}
