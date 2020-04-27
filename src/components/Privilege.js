import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { getUserList } from "../redux/actions/user";
import close from "../images/close.png";

const Privilege = ({ user, token, setClose }) => {
	const [priv, setPriv] = useState({});
	const dispatch = useDispatch();

	const submit = () => {
		Axios.patch(
			"http://192.168.1.25:6600/api/user/" + user.username,
			{
				priv_add: priv.add,
				priv_edit: priv.edit,
				priv_delete: priv.delete,
			},
			{
				headers: {
					Authorization: token,
				},
				withCredentials: true,
			},
		).then(() => {
			Axios.get("http://192.168.1.25:6600/api/user", {
				headers: { Authorization: token },
				withCredentials: true,
			}).then((resolve) => {
				dispatch(getUserList(resolve.data));
			});
			setClose();
		});
	};

	useEffect(() => {
		setPriv({
			add: user.priv_add,
			edit: user.priv_edit,
			delete: user.priv_delete,
		});
	}, [user]);

	return (
		<div id="privilege" className={user ? "show" : ""}>
			<span>
				{user.username} | <span className="space">{(user.priv_add ? "A" : "") + (user.priv_edit ? "E" : "") + (user.priv_delete ? "D" : "") || "—"}</span>
			</span>
			<form>
				<div>
					<button
						type="button"
						className={priv.add ? "check" : ""}
						onClick={() => {
							setPriv({
								...priv,
								add: !priv.add,
							});
						}}>
						Add
					</button>
					<button
						type="button"
						className={priv.edit ? "check" : ""}
						onClick={() => {
							setPriv({
								...priv,
								edit: !priv.edit,
							});
						}}>
						Edit
					</button>
					<button
						type="button"
						className={priv.delete ? "check" : ""}
						onClick={() => {
							setPriv({
								...priv,
								delete: !priv.delete,
							});
						}}>
						Delete
					</button>
				</div>
				<button type="button" className="button" onClick={submit}>
					Change Privilege
				</button>
			</form>
			<img src={close} alt="close" className="close" onClick={setClose} />
		</div>
	);
};

export default Privilege;
