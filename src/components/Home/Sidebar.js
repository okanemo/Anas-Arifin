import React from "react";
import user_list from "../../images/user_list.png";

const Sidebar = ({ id, priv_add, setPage, setOpen }) => {
	return (
		<div className="sidebar">
			<img
				src={user_list}
				onClick={() => {
					setPage("home");
				}}
			/>
			{priv_add ? <img src={user_list} onClick={setOpen} /> : <></>}
			<img
				src={user_list}
				onClick={() => {
					setPage("profile");
				}}
			/>
			{id === 1 ? (
				<img
					src={user_list}
					onClick={() => {
						setPage("admin");
					}}
				/>
			) : (
				<></>
			)}
		</div>
	);
};

export default Sidebar;
