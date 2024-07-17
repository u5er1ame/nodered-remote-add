import { readable } from "svelte/store";
import axios from "axios";

const url = "http://localhost:1880";
async function getFlows() {
	try {
		const response = await axios.get( url + "/flows",{
			headers: {
				"Content-Type": "application/json",
				"Node-RED-API-Version": "v1",
			},
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
const flows = await getFlows();

// console.log(flows);

const nodered = {
	tabs: [],
	groups: [],
	installed_modules: [],
	module_configs: [],
};

export const tabs = readable([], (set) => {
	// setup code goes here
	const tabs = flows.filter((i) => i.type == "tab");
	set(tabs);

	return () => {
		// teardown code goes here
	};
});

export const groups = readable([], (set) => {
	// setup code goes here
	const groups = flows.filter((i) => i.type == "group");
	console.log(groups);
	set(groups);

	return () => {
		// teardown code goes here
	};
});
