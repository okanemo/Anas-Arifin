import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import close from "../../images/close.png";
import { getProduct } from "../../redux/actions/product";

const Modal = ({ token, cardData, show, setClose, priv_add, priv_edit, priv_delete }) => {
	const [data, setData] = useState({});
	const dispatch = useDispatch();
	const name = useRef();
	const desc = useRef();
	const price = useRef();
	const stock = useRef();
	const image = useRef();

	const submit = (type) => {
		if (type == "delete") {
			Axios.delete("http://192.168.1.25:6600/api/product", {
				data: { id: cardData.id },
				headers: { Authorization: token },
				withCredentials: true,
			}).then((response) => {
				console.log(response);
				dispatch(getProduct());
				setClose();
				setData({});
			});
			return;
		}
		const formData = new FormData();
		formData.append("name", name.current.value);
		formData.append("description", desc.current.value);
		formData.append("price", price.current.value);
		formData.append("stock", stock.current.value);
		if (image.current.files.length) {
			formData.append("image", image.current.files[0]);
		}
		if (type == "edit") {
			Axios.patch("http://192.168.1.25:6600/api/product/" + cardData.id, formData, {
				headers: { Authorization: token },
				withCredentials: true,
			}).then(() => {
				dispatch(getProduct());
				setClose();
				setData({});
			});
		} else {
			Axios.post("http://192.168.1.25:6600/api/product", formData, {
				headers: { Authorization: token },
				withCredentials: true,
			}).then(() => {
				dispatch(getProduct());
				setClose();
				setData({});
			});
		}
	};

	return (
		<div className={show ? "modal show" : "modal"}>
			<form>
				<label>
					Name:
					<input
						type="text"
						value={data.name ?? cardData?.name ?? ""}
						disabled={priv_add ? false : !priv_edit}
						onChange={(e) => {
							setData({
								...data,
								name: e.target.value,
							});
						}}
						ref={name}
					/>
				</label>
				<label>
					Description:
					<input
						type="text"
						value={data.description ?? cardData?.description ?? ""}
						disabled={priv_add ? false : !priv_edit}
						onChange={(e) => {
							setData({
								...data,
								description: e.target.value,
							});
						}}
						ref={desc}
					/>
				</label>
				<label>
					Price:
					<input
						type="number"
						value={data.price ?? cardData?.price ?? ""}
						disabled={priv_add ? false : !priv_edit}
						onChange={(e) => {
							setData({
								...data,
								price: e.target.value,
							});
						}}
						ref={price}
					/>
				</label>
				<label>
					Stock:
					<input
						type="number"
						value={data.stock ?? cardData?.stock ?? ""}
						disabled={priv_add ? false : !priv_edit}
						onChange={(e) => {
							setData({
								...data,
								stock: e.target.value,
							});
						}}
						ref={stock}
					/>
				</label>
				<label>
					Image:
					<input type="file" disabled={priv_add ? false : !priv_edit} ref={image} />
				</label>
				<div className="button">
					{priv_add ? (
						<button
							type="button"
							onClick={() => {
								if (name.current.value && desc.current.value && price.current.value && stock.current.value) {
									submit();
								} else {
									alert("Field cannot be empty!");
								}
							}}>
							Add
						</button>
					) : (
						<></>
					)}
					{priv_edit ? (
						<button
							onClick={() => {
								if (name.current.value && desc.current.value && price.current.value && stock.current.value) {
									submit("edit");
								} else {
									alert("Field cannot be empty!");
								}
							}}>
							Change
						</button>
					) : (
						<></>
					)}
					{priv_delete ? (
						<button
							type="button"
							onClick={() => {
								console.log(1);
								submit("delete");
							}}>
							Delete
						</button>
					) : (
						<></>
					)}
				</div>
			</form>
			<img
				src={close}
				alt="close"
				className="close"
				onClick={() => {
					setClose();
					setData({});
				}}
			/>
		</div>
	);
};

export default Modal;
