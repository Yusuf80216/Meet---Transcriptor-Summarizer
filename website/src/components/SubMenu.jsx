import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = ({ data , routes ,route}) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      {/* {console.log('ROUTE',data.route)} */}
      <li
        className={`link ${pathname.includes(data.name) && "text-blue-600"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
      {/* {
        routes.route?.map((curElem)=>{
          console.log('CURELEM',curElem);
          return(
            <>
              <li>
                <NavLink
                  to={`${curElem.route}`}
                  className="link !bg-transparent capitalize"
                >
              </NavLink>
          </li>
            </>
          )
        })
      } */}
        {data.menus?.map((menu) => (
          
          <li key={menu}>
            <NavLink
              to={`${route}`}
              className="link !bg-transparent capitalize"
            >
              {menu}
            </NavLink>
          </li>
        ))}
        {/* {
          routes.map((curElem)=>{
            return(
              <li key={menu}>
                  <NavLink
                    to={`${curElem.}`}
                    className="link !bg-transparent capitalize"
                  >
                    {menu}
                  </NavLink>
              </li>
            )
          })
        } */}
      </motion.ul>
    </>
  );
};

export default SubMenu;
