import React from "react";
import { CastleImage } from "../components/CurrentCastle";
import ShopItem from "../components/ShopItem";
import "./shop.css";

const Castle = () => {
	return (
		<div className="App overflow-hidden">
			<div className="Wrapper">
				<h1>
					Castle <strong>Shop</strong>!
				</h1>
				<div className="flex flex-col items-center gap-4">
					<div>
						<h2>Common</h2>
						<div className="flex items-center gap-8">
							<ShopItem imagePath={"./c2.svg"} name="Small House" price={25} />
							<ShopItem imagePath={"./c3.svg"} name="Medium House" price={50} />
							<ShopItem imagePath={"./c4.svg"} name="Large House" price={100} />
						</div>
					</div>
					<div>
						<h2>Rare</h2>
						<div className="flex items-center gap-8">
							<ShopItem imagePath={"./c5.svg"} name="Noble Castle" price={200} />
							<ShopItem imagePath={"./c6.svg"} name="Royal Castle" price={400} />
						</div>
					</div>
					<div>
						<h2>Legendary</h2>
						<div className="flex items-center gap-8">
							<ShopItem imagePath={"./c7.svg"} name="Soverign Castle" price={800} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Castle;
