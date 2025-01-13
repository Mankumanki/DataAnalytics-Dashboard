import { useViewport } from "react-viewport-hooks";
import { Link } from "react-router";
import navBarConfig from "../../Config/header-config.json";
import { useState } from "react";
import { Fade, Fade as Hamburger } from "hamburger-react";

function Header() {
  const { vw } = useViewport();
  return vw <= 992 ? <MobileHeader /> : <DesktopHeader />;
}

function DesktopHeader() {
  return (
    <header id="Desktop-Header" className="min-h-dvh">
      <div className="w-72 h-full bg-[#101624] shadow-md flex flex-col gap-4 fixed">
        <Link to="/" className="outline-none">
          <img
            src="https://www.mapup.ai/mapup-logo.png"
            className="object-fill w-24 mx-6 mt-10"
            alt="Mapup company Logo"
          ></img>
        </Link>
        <div className="flex flex-col w-full p-6 text-slate-200 text-xl gap-4">
          {navBarConfig.header_links.map((link) => {
            return (
              <Link
                key={link.title}
                to={link.url}
                role="button"
                className="block hover:bg-slate-800 px-3 py-2 rounded-md transition-colors "
              >
                <div className="flex gap-4 items-center">
                  <i className={`fa-solid ${link.icon}`}></i>
                  {link.title}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function MobileHeader() {
  const [isOpen, setOpen] = useState(-1);
  function checkToggling(toggle) {
    if (toggle) {
      setOpen(1);
    } else {
      setOpen(0);
    }
  }
  return (
    <header className="flex justify-between px-6 bg-[#101624] shadow-md w-full h-20 fixed z-20">
      <div className="self-center">
        <Link to="/" className="outline-none">
          <img src="https://www.mapup.ai/mapup-logo.png" className="w-24"></img>
        </Link>
      </div>
      <div className="self-center ">
        <Fade
          onToggle={(toggle) => {
            checkToggling(toggle);
          }}
          size={26}
          color="white"
          label="Show menu"
        />
      </div>

      <div
        className={`absolute left-0 w-full top-20 h-36 bg-slate-900 overflow-hidden shadow-md ${
          isOpen == 1
            ? "animate-slideDown"
            : isOpen == 0
            ? "animate-slideUp forward"
            : "hidden"
        }`}
      >
        <div className="flex flex-col w-full h-full gap-10 self-center p-5">
          <div className="flex flex-col w-full h-full gap-4 self-center font-semibold">
            {navBarConfig.header_links.map((link) => {
              return (
                <div
                  key={link.title}
                  className="w-full border-b-2 border-b-slate-800"
                >
                  <Link
                    to={link.url}
                    className="group-hover:border-b-2 py-1 block w-full group"
                  >
                    <span className="text-slate-300 group-hover:text-white text-lg">
                      {link.title}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
