import React, { useState, useRef } from "react";

const urlImg = "http://192.168.1.25:6600/public/img/avatar/";

const Profile = (props) => {
	const [user, setUser] = useState(props.user);
	const [show, setShow] = useState(false);
	const input = useRef(null);

	return (
		<div className="profile">
			<form>
				<label clasName="image">
					<img src={urlImg + user.avatar} />
					<input type="file" style={{ display: "none" }} />
				</label>
				<h4>{user.username}</h4>
				<label>
					Name:
					<input
						type="text"
						value={user.username}
						ref={input}
						disabled={!show}
						onChange={(e) => {
							setUser({
								...user,
								username: e.target.value,
							});
						}}
					/>
				</label>
				<label>
					Email:
					<input type="text" value={user.email} disabled={!show} />
				</label>
				<label>
					Phone:
					<input type="text" value={user.phone} disabled={!show} />
				</label>
				<label>
					Address:
					<input type="text" value={user.stock} disabled={!show} />
				</label>
				<div className="button">
					{show ? (
						<>
							<button type="button">Save</button>
							<button
								type="button"
								onClick={() => {
									setUser(props.user);
									setShow(false);
								}}>
								Cancel
							</button>
						</>
					) : (
						<button
							type="button"
							onClick={async () => {
								await setShow(true);
								input.current.focus();
							}}>
							Edit Profile
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default Profile;
