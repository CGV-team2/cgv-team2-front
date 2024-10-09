import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SlLock } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import { RiCustomerService2Line } from "react-icons/ri";

const HeaderLink = ({ to, icon: Icon, text }) => (
  <Link to={to}>
    <div className="flex flex-col items-center mx-2 p-2">
      <Icon size={23} className="mb-2 text-[#3D3D3D]" />
      <span>{text}</span>
    </div>
  </Link>
);

export default function HeaderAfterLogin() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <div className="noto-sans w-[996px] h-28 mx-auto flex justify-between items-center py-5">
      <Link to="/">
        <div className="flex text-2xl font-bold">
          <img
            src="https://img.cgv.co.kr/R2014/images/common/logo/logoRed.png"
            alt="CGV Logo"
            className="w-[117px] h-[53px]"
          />
          <span className="font-normal text-base text-[#222222] tracking-[.3rem] mt-auto">
            DEEP DIVE SPACE
          </span>
        </div>
      </Link>

      <div className="mt-auto flex text-xs font-semibold text-[#666666]">
        <img
          src="https://img.cgv.co.kr/WingBanner/2023/0208/16758461047540.png"
          alt="ad"
          className="my-auto w-[136px] h-[39px] mr-2.5"
        />

        <div
          className="flex flex-col items-center mx-2 p-2 cursor-pointer"
          onClick={handleLogout}
        >
          <SlLock size={23} className="mb-2 text-[#3D3D3D]" />
          <span>로그아웃</span>
        </div>
        <HeaderLink to="/mycgv" icon={IoPersonOutline} text="MY CGV" />
        <HeaderLink
          to="/center"
          icon={RiCustomerService2Line}
          text="고객센터"
        />
      </div>
    </div>
  );
}
