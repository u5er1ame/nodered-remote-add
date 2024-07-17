import { readable } from "svelte/store";
import axios from "axios";
const url = "http://localhost:1880";


/**
 * Generates a pseudo-unique-random id.
 * copy from @node-red/util
 * @return {String} a random-ish id
 * @memberof @node-red/util_util
 */
function generateId() {
    const bytes = [];
    for (let i=0;i<8;i++) {
        bytes.push(Math.round(0xff*Math.random()).toString(16).padStart(2,'0'));
    }
    return bytes.join("");
}



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

class Flow  {
	id = generateId();
	label = "";
	nodes = [];
	configs = [];
};

async function addFlow() {
	try {
		const response = await axios.post( url + "/flows",{
			headers: {
				"Content-Type": "application/json",
				"Node-RED-API-Version": "v1",
			},
			data: {

			}
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}

// console.log(flows);
console.log(generateId());
const nodered = {
	tabs: filter(flows,"type","tab"),
	groups: filter(flows,"type","group"),
	module_configs: [],
};

function filter(arr,key,value) {
	return arr.filter(function(i) {
		return i[key] == value;
	});
}

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
