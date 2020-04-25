import React from "react";

const Modal = ({ cardData, show, setClose, priv_add, priv_edit, priv_delete }) => {
	return (
		<div className={show ? "modal show" : "modal"}>
			<form>
				<label>
					Name:
					<input type="text" defaultValue={cardData?.name} disabled={priv_add ? false : !priv_edit} />
				</label>
				<label>
					Description:
					<input type="text" defaultValue={cardData?.description} disabled={priv_add ? false : !priv_edit} />
				</label>
				<label>
					Price:
					<input type="text" defaultValue={cardData?.price} disabled={priv_add ? false : !priv_edit} />
				</label>
				<label>
					Stock:
					<input type="text" defaultValue={cardData?.stock} disabled={priv_add ? false : !priv_edit} />
				</label>
				<label>
					Image:
					<input type="file" disabled={!priv_edit} />
				</label>
				<div className="button">
					{priv_add ? (
						<button type="button" onClick={setClose}>
							Add
						</button>
					) : (
						<></>
					)}
					{priv_edit ? (
						<button
							onClick={(e) => {
								e.preventDefault();
								console.log(cardData);
							}}>
							Change
						</button>
					) : (
						<></>
					)}
					{priv_delete ? (
						<button type="button" onClick={setClose}>
							Delete
						</button>
					) : (
						<></>
					)}
				</div>
			</form>
		</div>
	);
};

export default Modal;
