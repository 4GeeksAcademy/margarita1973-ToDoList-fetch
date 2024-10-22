import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import NewItem from "./newitem";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="display-1">todos</h1>
			<div >
				<NewItem />
			</div>
			
		</div>
	);
};

export default Home;
