import React from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../redux/actions/user";
import home from "../images/home.png";
import add from "../images/add.png";
import profile from "../images/profile.png";
import admin from "../images/admin.png";
import logout from "../images/logout.png";

const Sidebar = ({ token, id, priv_add, setPage, setOpen, setOpenProfile }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<div className="sidebar">
			<img
				src={home}
				alt="home"
				onClick={() => {
					setPage("home");
				}}
			/>
			{priv_add ? <img src={add} alt="add" onClick={setOpen} /> : <></>}
			<img src={profile} alt="profile" onClick={setOpenProfile} />
			{id === 1 ? (
				<img
					src={admin}
					alt="admin"
					onClick={() => {
						setPage("admin");
					}}
				/>
			) : (
				<></>
			)}
			<img
				src={logout}
				alt="logout"
				onClick={() => {
					Axios.post(
						"http://192.168.1.25:6600/api/logout",
						{},
						{
							withCredentials: true,
						},
					).then((resolve) => {
						console.log(resolve.data);
						dispatch(login(null));
						history.replace("/login");
					});
				}}
			/>
		</div>
	);
};

export default Sidebar;
