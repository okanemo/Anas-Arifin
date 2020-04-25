import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/user";
import Sidebar from "../components/Home/Sidebar";
import Product from "../components/Home/Product";
import Admin from "../components/Home/Admin";
import Modal from "../components/Home/ModalProduct";

const Home = () => {
	const [page, setPage] = useState();
	const [show, setShow] = useState(false);
	const [cardData, setCardData] = useState(false);
	const [modalAdd, setModalAdd] = useState(false);
	const [modalEdit, setModalEdit] = useState(false);
	const user = useSelector((state) => state.user.user);
	const userList = useSelector((state) => state.user.userList);
	const dispatch = useDispatch();

	useEffect(() => {
		Axios.post(
			"http://192.168.1.25:6600/api/verify",
			{},
			{
				withCredentials: true,
			},
		).then((resolve) => {
			dispatch(login(resolve.data));
		});
	}, []);

	return (
		<div id="home">
			{user ? (
				<>
					{" "}
					<button
						type="submit"
						onClick={() => {
							console.log(userList);
						}}>
						TESt
					</button>
					<Sidebar
						priv_add={user.priv_add}
						id={user.id}
						setPage={(x) => {
							setPage(x);
						}}
						setOpen={() => {
							setModalAdd(true);
							setShow(true);
						}}
					/>
					{page == "admin" ? (
						<Admin />
					) : (
						<Product
							setOpen={() => {
								setModalEdit(true);
								setShow(true);
							}}
							setCardData={(x) => {
								setCardData(x);
							}}
						/>
					)}
					<div className={show ? "blank show" : "blank"} />
					<Modal
						show={modalEdit}
						setClose={() => {
							setModalEdit(false);
							setShow(false);
						}}
						priv_edit={user.priv_edit}
						priv_delete={user.priv_delete}
						cardData={cardData}
					/>
					<Modal
						show={modalAdd}
						setClose={() => {
							setModalAdd(false);
							setShow(false);
						}}
						priv_add={user.priv_add}
						cardData={cardData}
					/>
				</>
			) : (
				<div className="loading">
					<h1
						onClick={() => {
							console.log(user);
						}}>
						Loading
					</h1>
				</div>
			)}
		</div>
	);
};

export default Home;
