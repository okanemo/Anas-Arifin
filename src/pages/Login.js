import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/user";
import Axios from "axios";

const Login = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<div
			id="login"
			onSubmit={(e) => {
				e.preventDefault();
				Axios.post(
					"http://192.168.1.25:6600/api/login",
					{ username, password },
					{
						withCredentials: true,
					},
				).then((resolve) => {
					dispatch(login(resolve.data));
					history.replace("/");
				});
			}}>
			<form>
				<label>
					Username:
					<input type="text" onChange={(e) => setUsername(e.target.value)} />
				</label>
				<label>
					Password:
					<input type="password" onChange={(e) => setPassword(e.target.value)} />
				</label>
				<button type="submit">Login</button>
				<button
					type="button"
					onClick={() => {
						console.log(user);
					}}>
					Check
				</button>
			</form>
		</div>
	);
};

export default Login;
