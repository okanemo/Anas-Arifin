import React, { useState } from "react";

const Modal = ({ user }) => {
	const [buttonShow, setButtonShow] = useState(false);

	return (
		<div className={show ? "profile show" : "profile"}>
			<form>
				<label clasName="image">
					<img src={urlImg + user.avatar} ref={(img) => (this.img = img)} onError={() => (this.img.src = "img/default.img")} />
				</label>
				<label>
					Name:
					<input type="text" defaultValue={user.name} disabled={priv_add ? false : !priv_edit} />
				</label>
				<label>
					Email:
					<input type="text" defaultValue={user.email} disabled={priv_add ? false : !priv_edit} />
				</label>
				<label>
					Phone:
					<input type="text" defaultValue={user.phone} disabled={priv_add ? false : !priv_edit} />
				</label>
				<label>
					Address:
					<input type="text" defaultValue={cardData?.stock} disabled={priv_add ? false : !priv_edit} />
				</label>
				<div className="button">
					{buttonShow ? (
						<button type="button" onClick={setButtonShow(true)}>
							Edit Profile
						</button>
					) : (
						<>
							<button type="button" onClick={setClose}>
								Save
							</button>
							<button type="button" onClick={setButtonShow(false)}>
								Cancel
							</button>
						</>
					)}
				</div>
			</form>
		</div>
	);
};

export default Modal;
