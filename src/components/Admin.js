import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../redux/actions/user";
import Privilege from "./Privilege";

const Admin = ({ token, setPriv }) => {
	const userList = useSelector((state) => state.user.userList);
	const dispatch = useDispatch();

	// const submit

	useEffect(() => {
		Axios.get("http://192.168.1.25:6600/api/user", {
			headers: { Authorization: token },
			withCredentials: true,
		}).then((resolve) => {
			dispatch(getUserList(resolve.data));
		});
	}, []);

	const userListLoop = [];
	userList.forEach((x, i) => {
		userListLoop.push(
			<ul
				className="list"
				onClick={() => {
					setPriv(x);
				}}>
				<li>{i + 1}</li>
				<li>{x.username}</li>
				<li>{x.name || "—"}</li>
				<li>{x.email || "—"}</li>
				<li className="space">{(x.priv_add ? "A" : "") + (x.priv_edit ? "E" : "") + (x.priv_delete ? "D" : "") || "—"}</li>
			</ul>,
		);
	});

	return (
		<div id="admin">
			<div className="table">
				<span>Note: [A] Add | [E] Edit | [D] Delete</span>
				<div className="topTable">
					<div>No</div>
					<div>Username</div>
					<div>Name</div>
					<div>Email</div>
					<div>Privilege</div>
				</div>
				<div className="bottomtable">{userListLoop}</div>
			</div>
		</div>
	);
};

export default Admin;
