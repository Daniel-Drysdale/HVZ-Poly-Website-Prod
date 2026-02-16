import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import Menu from "../assets/Menu.png";
import { useNavigate } from "react-router-dom";
import { BsFillPeopleFill, BsLink, BsBookFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

const StaggeredDropDown = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        marginTop: "15px",
        width: "10px",
        float: "right",
        marginRight: "90px",
      }}
    >
      <motion.div
        animate={open ? "open" : "closed"}
        className="position-relative"
      >
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="btn menu-btn d-flex align-items-center gap-2"
        >
          <img style={{ width: "35px" }} src={Menu}></img>
        </button>
        <motion.ul
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={wrapperVariants}
          className="list-unstyled bg-white border rounded shadow position-absolute mt-2 p-2"
          style={{
            minWidth: "180px",
            right: "-50px",

            transform: "translateX(25%)",
            zIndex: 1000,
          }}
        >
          <Option
            setOpen={setOpen}
            Icon={AiFillHome}
            text="Home"
            navigate={navigate}
            route="/"
          />
          <Option
            setOpen={setOpen}
            navigate={navigate}
            Icon={BsFillPeopleFill}
            text="Players"
            route="players"
          />
          <Option
            setOpen={setOpen}
            Icon={BsBookFill}
            text="Rules"
            route="rules"
            navigate={navigate}
          />
          <Option
            setOpen={setOpen}
            Icon={BsLink}
            text="Links"
            route="links"
            navigate={navigate}
          />
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({
  text,
  Icon,
  setOpen,
  navigate,
  route,
}: {
  text: string;
  Icon: IconType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  navigate?: (path: string) => void;
  route: string;
}) => {
  const handleClick = () => {
    setOpen(false);
    if (navigate) {
      navigate(route.toLowerCase());
    }
  };

  return (
    <motion.li
      variants={itemVariants}
      onClick={handleClick}
      className="dropdown-item d-flex align-items-center gap-2 rounded"
      style={{ cursor: "pointer" }}
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span
      {text}
    </motion.li>
  );
};

const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    pointerEvents: "auto",
    transition: { when: "beforeChildren", staggerChildren: 0.07 },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    pointerEvents: "none",
    transition: { when: "afterChildren", staggerChildren: 0.05 },
  },
};



const itemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -10 },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0.5, y: -5 },
};

export default StaggeredDropDown;
