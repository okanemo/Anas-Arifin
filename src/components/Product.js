import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../redux/actions/product";
import no_image from "../images/no_image.png";

const urlImg = "http://192.168.1.25:6600/public/img/product/";

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
				key={x.id}
				style={{ backgroundImage: x.image ? `url(${urlImg + x.image})` : `url(${no_image})` }}
				onClick={() => {
					setOpen();
					setCardData(x);
				}}>
				<div>
					<span>{x.name}</span>
				</div>
			</div>,
		);
	});

	return <div className="product">{productsLoop}</div>;
};

export default Product;
