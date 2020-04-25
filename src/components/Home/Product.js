import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../redux/actions/product";

const Product = ({ setOpen, setCardData }) => {
	const products = useSelector((state) => state.product.products);
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProduct());
	}, []);

	const productsLoop = [];
	products.forEach((x) => {
		productsLoop.push(
			<div
				className="card"
				onClick={() => {
					setOpen();
					setCardData(x);
				}}>
				<h2>{x.name}</h2>
				<h4>{x.description}</h4>
			</div>,
		);
	});

	return <div className="product">{productsLoop}</div>;
};

export default Product;
