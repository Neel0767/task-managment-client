import Sidebar from "@/components/sidebar";
import React from "react";
 
export default function Layout({ children }
  : {children: React.ReactNode }
) {
  return (
    <>
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto bg-gray-100 p-4">
        {children}
      </main>

    </div>
    </>
  )
}