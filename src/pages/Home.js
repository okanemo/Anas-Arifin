import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/user";
import Sidebar from "../components/Sidebar";
import Product from "../components/Product";
import Admin from "../components/Admin";
import Profile from "../components/Profile";
import Modal from "../components/ModalProduct";
import Privilege from "../components/Privilege";

const Home = ({ location }) => {
	const [page, setPage] = useState();
	const [show, setShow] = useState(false);
	const [priv, setPriv] = useState(false);
	const [cardData, setCardData] = useState(false);
	const [modalAdd, setModalAdd] = useState(false);
	const [modalEdit, setModalEdit] = useState(false);
	const [modalProfile, setModalProfile] = useState(false);
	const user = useSelector((state) => state.user.user);
	const userList = useSelector((state) => state.user.userList);
	const dispatch = useDispatch();
	const history = useHistory();

	const verify = () => {
		Axios.post(
			"http://192.168.1.25:6600/api/verify",
			{},
			{
				withCredentials: true,
			},
		).then((resolve) => {
			console.log(resolve);
			if (resolve.data.error) {
				history.replace("/login");
			} else {
				dispatch(login(resolve.data));
			}
		});
	};

	useEffect(() => {
		if (location.state !== user?.id) {
			verify();
		} else if (!location.state) {
			verify();
		}
	}, []);

	return (
		<>
			{user ? (
				<div id="home">
					<Sidebar
						priv_add={user.priv_add}
						id={user.id}
						token={user.token}
						setPage={(x) => {
							setPage(x);
						}}
						setOpen={() => {
							setModalAdd(true);
							setShow(true);
						}}
						setOpenProfile={() => {
							setModalProfile(true);
							setShow(true);
						}}
					/>
					{page == "admin" ? (
						<Admin
							token={user.token}
							setPriv={(x) => {
								setPriv(x);
								setShow(true);
							}}
						/>
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
						token={user.token}
					/>
					<Modal
						show={modalAdd}
						setClose={() => {
							setModalAdd(false);
							setShow(false);
						}}
						priv_add={user.priv_add}
						cardData={{}}
						token={user.token}
					/>
					<Profile
						show={modalProfile}
						user={user}
						setClose={() => {
							setModalProfile(false);
							setShow(false);
						}}
					/>
					<Privilege
						user={priv}
						token={user.token}
						setClose={() => {
							setPriv(false);
							setShow(false);
						}}
					/>
				</div>
			) : (
				<div className="loading" />
			)}
		</>
	);
};

export default Home;
