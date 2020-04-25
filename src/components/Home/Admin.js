import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../redux/actions/user";

const Admin = () => {
	const userList = useSelector((state) => state.user.userList);
	const dispatch = useDispatch();

	useEffect(() => {
		Axios.get("http://192.168.1.25:6600/api/user", {
			withCredentials: true,
		}).then((resolve) => {
			dispatch(getUserList(resolve.data));
		});
	}, []);

	const userListLoop = [];
	userList.forEach((x) => {
		userListLoop.push(<h2>{x.username}</h2>);
	});

	return (
		<div id="admin">
			<h1 onClick={() => {}}>Hello admin!</h1>
			<div className="user-list">{userListLoop}</div>
		</div>
	);
};

export default Admin;
