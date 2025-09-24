import React, { Fragment } from "react";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  BaggageClaim,
  ShoppingBag,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import{cn} from "../../lib/utils"






const Sidebar = ({ open, setopen }) => {
  const navigate = useNavigate();
  const menuitem = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "order",
      label: "Order",
      path: "/admin/order",
      icon: <BaggageClaim />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <ShoppingBag />,
    },
  ];

  function Menu() {
    const location= useLocation()
    
    
    return (
      <nav className=" mt-10 flex flex-col gap-6 ">
        {menuitem.map((menu) => (
          <div
            key={menu.id}
            onClick={() => navigate(menu.path)}
            className={cn(" w-full p-2    cursor-pointer flex gap-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-200  ",{"bg-black text-white font-semibold":location.pathname ==menu.path})}
          >
            {menu.icon}
            <span>{menu.label}</span>
          </div>
        ))}
      </nav>
    );
  }
  return (
    <Fragment>
      <aside className="  fixed w-64 bg-white  border-r h-screen p-6     hidden lg:flex flex-col ">
        <div
          onClick={() => navigate("/admin")}
          className=" flex gap-2 items-center  cursor-pointer "
        >
          {" "}
          <ChartNoAxesCombined />{" "}
          <h1 className="font-semibold text-xl ">Admin Panel</h1>{" "}
        </div>
        <Menu />
      </aside>

      {/* mobile sidebar */}
      <Sheet open={open} onOpenChange={() => setopen(false)}>
        <SheetContent side="left" className="w-72 bg-white "  >
          <SheetHeader>
            <SheetTitle>
              <div  
                onClick={() => navigate("/admin")}
                className=" flex gap-2 items-center  cursor-pointer "
              >
                <ChartNoAxesCombined />
                <h1 className="font-semibold text-xl ">Admin Panel</h1>{" "}
              </div>
            </SheetTitle>
          </SheetHeader>
          <Menu/>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Sidebar;
