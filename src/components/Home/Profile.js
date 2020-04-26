import React, { useState, useRef } from "react";
import close from "../../images/close.png";

const urlImg = "http://192.168.1.25:6600/public/img/avatar/";

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

	const submit = () => {
		const formData = new FormData();
		formData.append("name", name.current.value);
		formData.append("email", email.current.value);
		formData.append("phone", phone.current.value);
		formData.append("address", address.current.value);
		if (avatar.current.files.length) {
			formData.append("avatar", avatar.current.files[0]);
		}
		if (password.current.value) {
			if (password.current.value === rePassword.current.value) {
				formData.append("password", password.current.value);
			} else {
				setInfo("Re-type password is not match!");
			}
		}
	};

	return (
		<>
			{user.username === "admin" ? (
				<div id="profile" className={show ? "admin show" : "admin"}>
					<img className="close" src={close} onClick={setClose} />
					<form>
						{!edit ? (
							<h1>You are admin!</h1>
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
							<>
								<button
									type="button"
									onClick={() => {
										console.log(user);
									}}>
									Save
								</button>
								<button
									type="button"
									onClick={async () => {
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
								<img src={urlImg + user.avatar} />
								<input type="file" style={{ display: "none" }} ref={avatar} />
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
								<input type="text" defaultValue={user.phone} disabled={!edit} ref={phone} />
							</label>
							<label>
								Address:
								<textarea defaultValue={user.address} disabled={!edit} rows="1" ref={address} />
							</label>
							{edit ? (
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
							) : (
								<></>
							)}
							<div className="button">
								{edit ? (
									<>
										<button
											type="button"
											onClick={() => {
												console.log(user);
											}}>
											Save
										</button>
										<button
											type="button"
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
