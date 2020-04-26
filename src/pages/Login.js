import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/user";
import Axios from "axios";

const Login = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [ready, setReady] = useState(false);
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const submit = (e) => {
		e.preventDefault();
		if (username) {
			if (password) {
				Axios.post(
					"http://192.168.1.25:6600/api/login",
					{ username, password },
					{
						withCredentials: true,
					},
				).then(async (resolve) => {
					await dispatch(login(resolve.data));
					history.replace({
						pathname: "/",
						state: resolve.data.id,
					});
				});
			} else {
				alert("Password is empty!");
			}
		} else {
			alert("Username is empty!");
		}
	};

	const verify = () => {
		Axios.post(
			"http://192.168.1.25:6600/api/verify",
			{},
			{
				withCredentials: true,
			},
		).then(async (resolve) => {
			if (resolve.data.id) {
				await dispatch(login(resolve.data));
				history.replace({
					pathname: "/",
					state: resolve.data.id,
				});
				setReady(true);
			} else {
				setReady(true);
			}
		});
	};

	useEffect(() => {
		verify();
	}, []);

	return (
		<>
			{ready ? (
				<div
					id="login"
					onSubmit={(e) => {
						submit(e);
					}}>
					<form>
						<input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
						<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
						<div>
							<button type="submit">Login</button>
							<button
								type="button"
								onClick={() => {
									history.push("/register");
								}}>
								Register
							</button>
						</div>
					</form>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default Login;
