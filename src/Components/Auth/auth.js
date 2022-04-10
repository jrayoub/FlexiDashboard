import React from "react";
import screens from "../../Assets/img/screens.png";
import logo from "../../Assets/img/logo1.png";
import { Navigate } from "react-router-dom";

import { useState, useCallback } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { BaseUrl } from "../../config";
/*Redux*/
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
/***** */

function auth({ auth }) {
  return auth ? <Navigate to={"/"} /> : <Content />;
}

function Content() {
  const [loginInfo, setlogininfo] = useState({
    Email: "",
    Password: "",
  });

  const state = useSelector((state) => state.User);

  const dispatch = useDispatch();

  const { Login } = bindActionCreators(actionCreators, dispatch);

  const loginSubmite = async (e) => {
    e.preventDefault();

    console.log(state);
    fetch(`${BaseUrl}/Auth/admin_auth`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.available !== false) {
          Login();
          Cookies.set("accesToken", data.accesToken, { expires: 2 });
        } else {
          console.log("not available");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className='grid grid-cols-1 xl:grid-cols-2 xl:gap-4  gap-3 h-screen'>
        <div className='bg-light_gray h-full grid grid-rows-[1fr_2fr]  gap-3 px-20'>
          <a
            href='/'
            className='text-xl font-bold flex items-center lg:ml-2.5 h-full justify-center'>
            <img src={logo} className='h-12 mr-2' alt='Windster Logo' />
          </a>
          <div className=' flex  flex-row items-top justify-center'>
            <form
              className=' flex flex-col gap-5  '
              action=''
              onSubmit={(e) => loginSubmite(e)}>
              <h1 className='font-bold ' style={{ "font-size": "32.39px" }}>
                فلكسي المدراء
              </h1>
              <p style={{ color: "#8A8A8A" }}>
                فلكسي خدمة تسهيل الإشتراك اللياقة البندية
              </p>
              <input
                type='text'
                name=''
                id=''
                value={loginInfo.Email}
                onChange={(e) => {
                  setlogininfo({ ...loginInfo, Email: e.target.value });
                }}
                className='h-14 w-96 px-5 rounded-lg border-2 border-border_color'
                placeholder='بريد المستخدم'
              />
              <input
                type='password'
                name=''
                id=''
                value={loginInfo.Password}
                onChange={(e) => {
                  setlogininfo({ ...loginInfo, Password: e.target.value });
                }}
                className='h-14 w-96 px-5 rounded-lg border-2 border-border_color'
                placeholder='كلمة المرور'
              />
              <p style={{ color: "#3966FA" }} className='cursor-pointer'>
                هل نسيت كلمة المرور؟
              </p>

              <label className='rounded-full bg-border_color w-20 h-20 mx-auto my-8 grid place-content-center cursor-pointer '>
                <input
                  type='submit'
                  value=''
                  className='h-full w-full fixed  cursor-pointer'
                />
                <svg
                  width='13'
                  height='24'
                  viewBox='0 0 13 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M0.671692 22.8699C0.288391 22.4866 0.253545 21.8868 0.567156 21.4642L0.671692 21.3431L9.98455 12.0297L0.671692 2.71638C0.288391 2.33308 0.253545 1.73328 0.567156 1.31061L0.671692 1.18952C1.05499 0.806219 1.6548 0.771373 2.07746 1.08498L2.19855 1.18952L12.2753 11.2663C12.6586 11.6496 12.6935 12.2494 12.3799 12.6721L12.2753 12.7932L2.19855 22.8699C1.77692 23.2916 1.09332 23.2916 0.671692 22.8699Z'
                    fill='white'
                  />
                </svg>
              </label>
            </form>
          </div>
        </div>
        <div className='hidden xl:grid  place-items-center'>
          <img src={screens} alt='' srcset='' />
        </div>
      </div>
    </>
  );
}

export default auth;