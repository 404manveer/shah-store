import { Link, useNavigate, useNavigation } from "react-router-dom";
import { House, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { shopingViewHeaderMenuItems } from "../../data";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { checkauth, userLogout } from "../../store/actions/userAction";
import CartComponents from "./CartComponents";
import { getCartItemsThunk } from "../../store/slices/shoping/cartItemSlice";
import { useEffect } from "react";

function MenuItem() {
  return (
    <nav className=" text-black flex flex-col mb-2 lg:mb-0 lg:flex-row max-md:gap-8 gap-16 w-full  ">
      {shopingViewHeaderMenuItems.map((item) => {
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`relative before:border before:w-0 hover:before:w-full before:transition-all before:opacity-0 hover:before:opacity-100 before:duration-300 ease-in-out before:border-white  before:h-[1px] before:absolute before:bottom-0  font-normal text-s  `}
          >
            {item?.label}
          </Link>
        );
      })}
    </nav>
  );
}

function HeaderRightContent() {
  const { isAuthenticate, user } = useSelector((state) => state.userReducer);
  const { cartItems } = useSelector((state) => state.cartItems);

  const dispatch = useDispatch();
  const name = user?.username;
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(userLogout()).then((data) => {
      if (data.payload.data.success) {
        dispatch(checkauth());
        navigate("/");
      }
    });
  };

  useEffect(()=>{
    dispatch(getCartItemsThunk({ userId: user?.id }));
  },[dispatch]);
  console.log(cartItems,"hearders>>>>>>" );

  return (
    <div className=" flex flex-col lg:items-center lg:flex-row gap-4 ">
      <CartComponents  cart={cartItems}  />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className=" bg-black text-white  font-semibold font-serif text-xl flex items-center justify-center uppercase  ">
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className=" bg-white w-56 ">
          <DropdownMenuLabel className=" text-lg">
            Hello,{name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <hr />
          <DropdownMenuItem
            onClick={() => navigate("/account")}
            className="cursor-pointer font-semibold "
          >
            <UserCog className="  h-5 w-5" /> Account
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={logoutHandler}
            className="cursor-pointer font-semibold "
          >
            <LogOut className=" h-5 w-5  " /> Logout
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const Header = () => {
  const { isAuthenticate, user } = useSelector((state) => state.userReducer);
  const id = user?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(getCartItemsThunk({ userId: id }));
  },[dispatch]);

  return (
    <header className="w-full max-w-7xl z-50 fixed left-1/2 -translate-x-1/2 rounded-full  top-6 bg-white/20 backdrop-blur-md border border-white/20 py-4 px-8   mx-auto h-16 shadow-md flex items-center justify-between  ">
      <Link to={"/"} className={` flex gap-2 text-md font-bold font-sans  `}>
        <House className=" w-6 h-6  " />
        Ecommerce
      </Link>

      <div className=" hidden lg:block ">
        <MenuItem />
      </div>

      {isAuthenticate ? (
        <div className=" hidden lg:block ">
          <HeaderRightContent />
        </div>
      ) : (
        <Link to={"/auth/login"} className=" font-bold  text-lg ">
          Login
        </Link>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden ">
            <Menu className=" w-6 h-6  " />
            <span className="sr-only">Toggle home menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className=" w-full max-w-xs bg-white ">
          <HeaderRightContent />
          <hr />
          <MenuItem />
        </SheetContent>
      </Sheet>
    </header>
  );
};
