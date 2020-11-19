import React from "react";
import { Spring, animated } from "react-spring/renderprops";
import "./TestMenuStyle.css";
import { BiMenu } from "react-icons/bi";
import useResizeAware from "react-resize-aware";
import { useDispatch } from "react-redux";

import { reportHamburgerMenuSize } from "./actions";

const MenuItems = [
  "Login",
  "Search For Podcasts",
  "Books I've heard",
  "Languages To Learn",
];

function TestMenu() {
  const [resizeListener, sizes] = useResizeAware();
  const dispatch = useDispatch();

  //test
  React.useEffect(() => {}, []);

  React.useEffect(() => {
    // console.log("TestMenu Do something with the new size values");
    // console.log(sizes.height);
    // dispatch(reportHamburgerMenuSize(sizes.height));
  }, [sizes.width, sizes.height]);

  const [toggle, setToggle] = React.useState(false);

  function onToggle() {
    setToggle(!toggle);
  }

  function reportSize(event) {
    console.log("reporting size");
    // // console.log(event);
    // console.log(sizes.height);

    dispatch(reportHamburgerMenuSize(sizes.height));
  }

  return (
    <div className="auto-main">
      <button onClick={onToggle}>
        {" "}
        <BiMenu size={40} />
      </button>
      {/* <button onClick={onAddText}>Add text</button>
      <button onClick={onRemoveText}>Remove text</button> */}
      <div className="content">
        <Spring
          native
          force
          config={{ tension: 2000, friction: 100, precision: 1 }}
          from={{ height: toggle ? 0 : "auto" }}
          to={{ height: toggle ? "auto" : 0 }}
          onRest={reportSize}
        >
          {(props) => (
            <animated.div className="item" style={props}>
              {resizeListener}

              {MenuItems.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </animated.div>
          )}
        </Spring>
      </div>
    </div>
  );
}

export default TestMenu;
