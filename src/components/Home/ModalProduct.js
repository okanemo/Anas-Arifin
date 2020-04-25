import React, { useState } from "react";
import close from "../../images/close.png";

const Modal = ({ cardData, show, setClose, priv_add, priv_edit, priv_delete }) => {
	const [data, setData] = useState({});

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
					/>
				</label>
				<label>
					Price:
					<input
						type="text"
						value={data.price ?? cardData?.price ?? ""}
						disabled={priv_add ? false : !priv_edit}
						onChange={(e) => {
							setData({
								...data,
								price: e.target.value,
							});
						}}
					/>
				</label>
				<label>
					Stock:
					<input
						type="text"
						value={data.stock ?? cardData?.stock ?? ""}
						disabled={priv_add ? false : !priv_edit}
						onChange={(e) => {
							setData({
								...data,
								stock: e.target.value,
							});
						}}
					/>
				</label>
				<label>
					Image:
					<input type="file" disabled={priv_add ? false : !priv_edit} />
				</label>
				<div className="button">
					{priv_add ? (
						<button
							type="button"
							onClick={() => {
								console.log(data);
							}}>
							Add
						</button>
					) : (
						<></>
					)}
					{priv_edit ? (
						<button
							onClick={(e) => {
								e.preventDefault();
							}}>
							Change
						</button>
					) : (
						<></>
					)}
					{priv_delete ? <button type="button">Delete</button> : <></>}
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
