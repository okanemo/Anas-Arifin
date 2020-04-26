import React from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/actions/user";
import user_list from "../../images/user_list.png";

const Sidebar = ({ token, id, priv_add, setPage, setOpen, setOpenProfile }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<div className="sidebar">
			<img
				src={user_list}
				onClick={() => {
					setPage("home");
				}}
			/>
			{priv_add ? <img src={user_list} onClick={setOpen} /> : <></>}
			<img src={user_list} onClick={setOpenProfile} />
			{id === 1 ? (
				<img
					src={user_list}
					onClick={() => {
						setPage("admin");
					}}
				/>
			) : (
				<></>
			)}
			<img
				src={user_list}
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
