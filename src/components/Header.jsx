import React from "react";

import styled from "styled-components";
import userIcon from "../assets/userIcon.png";
import musicIcon from "../assets/musicIcon.png";
import exitIcon from "../assets/exitIcon.png";
import roomIcon from "../assets/roomIcon.png";
import databaseIcon from "../assets/databaseIcon.png";
import editIcon from "../assets/editIcon.png";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const menuItem = [
  {
    name: "Профиль",
    link: "/",
    icon: userIcon,
    id: 0,
  },
  {
    name: "Мой плейлист",
    link: "/playlist",
    icon: musicIcon,
    id: 1,
  },
  {
    name: "Комнаты",
    link: "/rooms",
    icon: roomIcon,
    id: 2,
  },
];

function Header() {
  const userData = useSelector((store) => store.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <Container>
      <div className="menu">
        {menuItem.map((item) => (
          <Link to={item.link} className="menu-item" key={item.id}>
            <div className="menu-item__icon">
              <img src={item.icon} alt="icon" />
            </div>
            <h2>{item.name}</h2>
          </Link>
        ))}
        {userData?.isAdmin && (
          <>
            <Link to="/track-add" className="menu-item">
              <div className="menu-item__icon">
                <img src={databaseIcon} alt="icon" />
              </div>
              <h2>Добавить песню</h2>
            </Link>
            <Link to="/edit" className="menu-item">
              <div className="menu-item__icon">
                <img src={editIcon} alt="icon" />
              </div>
              <h2>Редактировать</h2>
            </Link>
          </>
        )}
      </div>
      <button className="exit" onClick={logoutHandler}>
        <img src={exitIcon} alt="" />
        <h2>Выйти</h2>
      </button>
    </Container>
  );
}

const Container = styled.div`
  border-right: 2px solid #7b74d5;
  padding-right: 1rem;
  height: 90%;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 3%;
  top: 4%;
  .menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .menu-item {
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      position: relative;
      &:after {
        content: "";
        width: 0%;
        height: 1px;
        background-color: #7b74d5;
        position: absolute;
        bottom: 0;
        left: 0;
        transition: width 0.5s ease 0s;
      }
      &:hover {
        &:after {
          transition: width 0.5s ease 0s;
          width: 100%;
        }
      }
      h2 {
        color: #2d3d75;
        font-size: 1rem;
      }
      &__icon {
        img {
          height: 3rem;
          width: 3rem;
        }
      }
    }
  }
  .exit {
    cursor: pointer;
    margin-top: auto;
    padding: 0;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    outline: none;
    gap: 0.9rem;
    position: relative;
    padding-bottom: 7px;
    &:after {
      content: "";
      width: 0%;
      height: 2px;
      background-color: #7b74d5;
      position: absolute;
      bottom: 0;
      left: 0;
      transition: width 0.5s ease 0s;
    }
    &:hover {
      &:after {
        transition: width 0.5s ease 0s;
        width: 100%;
      }
    }
    h2 {
      color: #2d3d75;
      font-size: 1rem;
    }
    img {
      height: 2.5rem;
      width: 2.5rem;
    }
  }
`;

export default Header;
