import "../styles/components/Dropdown.scss";
import { useEffect, useRef } from "react";

const DropDown = ({ menuItems, isActive, animateIcons }) => {
  const dropdown = useRef();
  const canvas = useRef()
  console.log(menuItems);
  useEffect(() => {
    if (isActive)
      dropdown.current.classList.add("active");
    else {
        dropdown.current.classList.remove("active");

    }
  }, [isActive]);

  return (
    <div ref={dropdown} className="drop-down">
      {menuItems.map((menuItem, i) => (
        <div
          key={`${i}-menuItem`}
          className="drop-down__item"
          data-prefix={ menuItem.title }
          onClick={() => {
            console.log("Clicked")
            animateIcons();
            menuItem.onClick();
          }}
        >
        </div>
      ))}
    </div>
  );
};

export default DropDown;
