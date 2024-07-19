import { generateId } from "../Base.ts";
import { type Node, NodeTypes } from "../Nodes.ts";

export class MqttIn implements Node<NodeTypes.MqttIn> {
	id: string = generateId();
	name: string = "";
	g?: string = undefined;
	type: NodeTypes = NodeTypes.MqttIn;
	z: string;
	x: number;
	y: number;

	topic: string;
	qos: string = "2";
	datatype: string = "auto-detect";
	broker: string;

	// INFO: each node output is array of id's it connects to
	wires: Array<Array<string>> = [[]];

	// TODO: idk what this fields mean
	nl: boolean = false;
	rap: boolean = true;
	rh: number = 0;
	inputs: number = 0;
	constructor(
		{ name, g, x, y, z, topic, broker, wires = new Array([]) }: {
			name: string;
			g?: string;
			x: number;
			y: number;
			z: string;
			topic: string;
			broker: string;
			wires: string[][];
		},
	) {
		this.name = name;
		this.g = g;
		this.z = z;
		this.topic = topic;
		this.broker = broker;
		// TODO: calculate x y coordinates from z (tab) data

		this.wires = wires;
	}
}

export class MqttOut implements Node<NodeTypes.MqttOut> {
	id: string = generateId();
	name: string = "";
	g?: string = undefined;
	type: NodeTypes = NodeTypes.MqttOut;
	z: string;
	x: number;
	y: number;

	topic: string;
	qos: string = "";
	broker: string;

	// TODO: add to constructor if needed
	retain: string = "";
	respTopic: string = "";
	contentType: string = "";
	userProps: string = "";
	correl: string = "";
	expiry: string = "";

	// INFO: each node output is array of id's it connects to
	wires: Array<Array<string>> = [[]];
	constructor(
		{ name, g, x, y, z, topic, broker, wires = new Array([]) }: {
			name: string;
			g?: string;
			x: number;
			y: number;
			z: string;
			topic: string;
			broker: string;
			wires: string[][];
		},
	) {
		this.name = name;
		this.g = g;
		this.z = z;
		this.topic = topic;
		this.broker = broker;
		// TODO: calculate x y coordinates from z (tab) data

		this.wires = wires;
	}
}
