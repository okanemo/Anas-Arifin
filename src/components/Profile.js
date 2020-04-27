import React, { useState, useRef } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/user";
import close from "../images/close.png";
import admin from "../images/admin.png";
import no_avatar from "../images/no_avatar.png";

const urlImg = "http://100.24.32.116:6600/public/img/avatar/";

const Profile = ({ user, show, setClose }) => {
	const [edit, setEdit] = useState(false);
	const [info, setInfo] = useState("");
	const name = useRef();
	const email = useRef();
	const phone = useRef();
	const address = useRef();
	const avatar = useRef();
	const password = useRef();
	const rePassword = useRef();
	const dispatch = useDispatch();

	const submit = () => {
		const formData = new FormData();
		if (name.current.value) {
			formData.append("name", name.current.value);
		}
		if (email.current.value) {
			formData.append("email", email.current.value);
		}
		if (phone.current.value) {
			formData.append("phone", phone.current.value);
		}
		if (address.current.value) {
			formData.append("address", address.current.value);
		}
		if (avatar.current.files.length) {
			if (!["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(image.current.files[0])) {
				alert("File is not image type!");
				return false;
			} else if (image.size >= 1000000) {
				alert("Maximum file size is 1mb!");
				return false;
			} else {
				formData.append("image", image.current.files[0]);
			}
		}
		if (password.current.value) {
			if (password.current.value === rePassword.current.value) {
				if (password.current.value.length >= 6) {
					formData.append("password", password.current.value);
				} else {
					alert("Minimum password is 6 character!");
					return false;
				}
			} else {
				alert("Re-type password is not match!");
				return false;
			}
		}
		Axios.patch("http://100.24.32.116:6600/api/user/" + user.username, formData, {
			headers: { Authorization: user.token },
			withCredentials: true,
		}).then(() => {
			Axios.get("http://100.24.32.116:6600/api/user/" + user.username, {
				headers: { Authorization: user.token },
				withCredentials: true,
			}).then((resolve) => {
				dispatch(login(resolve.data));
				setEdit(false);
				setClose();
			});
		});
	};

	return (
		<>
			{user.username === "admin" ? (
				<div id="profile" className={show ? "admin show" : "admin"}>
					<img
						className="close"
						src={close}
						onClick={() => {
							setEdit(false);
							setClose();
						}}
					/>
					<form>
						{!edit ? (
							<>
								<img src={admin} alt="admin" />
								<h1>You are admin!</h1>
							</>
						) : (
							<>
								<label>
									Password:
									<input type="text" disabled={!edit} ref={password} />
								</label>
								<label>
									Re-type password:
									<input type="text" disabled={!edit} ref={rePassword} />
								</label>
							</>
						)}
						{edit ? (
							<div className="button">
								<button
									type="button"
									onClick={() => {
										submit();
									}}>
									Save
								</button>
								<button
									type="button"
									className="alert"
									onClick={async () => {
										password.current.value = "";
										rePassword.current.value = "";
										setEdit(false);
									}}>
									Cancel
								</button>
							</div>
						) : (
							<button
								className="changePassword"
								type="button"
								onClick={async () => {
									await setEdit(true);
									password.current.focus();
								}}>
								Change Password
							</button>
						)}
					</form>
				</div>
			) : (
				<div id="profile" className={show ? "show" : ""}>
					<img className="close" src={close} onClick={setClose} />
					<div className="scroll">
						<form>
							<label className="image">
								<img src={user.avatar ? urlImg + user.avatar : no_avatar} />
								<input type="file" style={{ display: "none" }} ref={avatar} disabled={!edit} />
							</label>
							<h4>{user.username}</h4>
							<label>
								Name:
								<input type="text" defaultValue={user.name} ref={name} disabled={!edit} />
							</label>
							<label>
								Email:
								<input type="text" defaultValue={user.email} disabled={!edit} ref={email} />
							</label>
							<label>
								Phone:
								<input type="number" defaultValue={user.phone} disabled={!edit} ref={phone} />
							</label>
							<label>
								Address:
								<textarea defaultValue={user.address} disabled={!edit} rows="1" ref={address} />
							</label>
							{edit ? (
								<>
									<label>
										Password:
										<input type="password" disabled={!edit} ref={password} />
									</label>
									<label>
										Re-type password:
										<input type="password" disabled={!edit} ref={rePassword} />
									</label>
								</>
							) : (
								<></>
							)}
							<div className="button">
								{edit ? (
									<>
										<button
											type="button"
											onClick={() => {
												submit();
											}}>
											Save
										</button>
										<button
											type="button"
											className="alert"
											onClick={async () => {
												name.current.value = user.name || "";
												email.current.value = user.email || "";
												phone.current.value = user.phone || "";
												address.current.value = user.address || "";
												password.current.value = "";
												rePassword.current.value = "";
												setEdit(false);
											}}>
											Cancel
										</button>
									</>
								) : (
									<button
										type="button"
										className="editProfile"
										onClick={async () => {
											await setEdit(true);
											name.current.focus();
										}}>
										Edit Profile
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
