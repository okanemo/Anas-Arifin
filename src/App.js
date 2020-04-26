import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Router = () => {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Home} />
			<Route path="/login" exact component={Login} />
			<Route path="/register" component={Register} />
		</BrowserRouter>
	);
};

const Redux = () => {
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	);
};

export default Redux;
