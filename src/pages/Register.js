import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/user";
import Axios from "axios";

const Register = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [rePassword, setRePassword] = useState();
	const [warning, setWarning] = useState();
	const [ready, setReady] = useState(false);
	const user = useSelector((state) => state.user.user);
	const history = useHistory();
	const dispatch = useDispatch();

	const submit = (e) => {
		e.preventDefault();
		if (password && password === rePassword) {
			Axios.post(
				"http://100.24.32.116:6600/api/register",
				{ username, password },
				{
					withCredentials: true,
				},
			).then((resolve) => {
				if (resolve.data.error) {
					setWarning(resolve.data.error);
				} else {
					setWarning("Register success!");
					setTimeout(() => {
						history.replace({
							pathname: "/login",
						});
					}, 1000);
				}
			});
		} else {
			setWarning("Retype password not match!");
		}
	};

	const verify = () => {
		Axios.post(
			"http://100.24.32.116:6600/api/verify",
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
					<h1>{warning}</h1>
					<form>
						<span>Register</span>
						<input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
						<input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
						<input type="password" onChange={(e) => setRePassword(e.target.value)} placeholder="Re-type password" />
						<div>
							<button type="submit">Register</button>
							<button
								type="button"
								onClick={() => {
									history.push("/login");
								}}>
								Login
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

export default Register;
