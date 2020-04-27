import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import close from "../images/close.png";
import { getProduct } from "../redux/actions/product";
import no_image from "../images/no_image.png";

const urlImg = "http://100.24.32.116:6600/public/img/product/";

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
			Axios.delete("http://100.24.32.116:6600/api/product", {
				data: { id: cardData.id },
				headers: { Authorization: token },
				withCredentials: true,
			}).then(() => {
				dispatch(getProduct());
			});
			setClose();
			setData({});
			return;
		}
		const formData = new FormData();
		formData.append("name", name.current.value);
		formData.append("description", desc.current.value);
		formData.append("price", price.current.value);
		formData.append("stock", stock.current.value);
		if (image.current.files.length) {
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
		if (type == "edit") {
			Axios.patch("http://100.24.32.116:6600/api/product/" + cardData.id, formData, {
				headers: { Authorization: token },
				withCredentials: true,
			}).then(() => {
				dispatch(getProduct());
			});
			setClose();
			setData({});
		} else {
			Axios.post("http://100.24.32.116:6600/api/product", formData, {
				headers: { Authorization: token },
				withCredentials: true,
			}).then(() => {
				dispatch(getProduct());
			});
			setClose();
			setData({});
		}
	};

	return (
		<div className={show ? "modal show" : "modal"}>
			<form>
				<label className="image">
					<img src={cardData.image ? urlImg + cardData.image : no_image} />
					<input type="file" style={{ display: "none" }} disabled={priv_add ? false : !priv_edit} ref={image} />
				</label>
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
				<div className="button">
					{priv_add ? (
						<button
							style={{ gridColumn: "span 2" }}
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
							style={{ gridColumn: priv_delete ? "" : "span 2" }}
							type="button"
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
							className="alert"
							style={{ gridColumn: priv_edit ? "" : "span 2" }}
							type="button"
							onClick={() => {
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
