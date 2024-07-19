import { type Node, NodeTypes } from "../Nodes.ts";
import { generateId } from "../Base.ts";

type GroupStyle = {
	label: boolean,
	stroke: string,
	fill: string,
	"fill-opacity": string,
	color: string,
};
/**
* Generates random color
* @return {String}
*/
const randomColor = (): string => {
	let result = '';
	for (let i = 0; i < 6; ++i) {
		const value = Math.floor(16 * Math.random());
		result += value.toString(16);
	}
	return '#' + result;
};

export class Group implements Node<NodeTypes.Group> {
	id: string = generateId();
	name: string;
	g?: string | undefined;

	z: string;
	w: number;
	h: number;
	x: number;
	y: number;

	nodes: string[];

	type: NodeTypes = NodeTypes.Group;
	style: GroupStyle;
	createStyle({ label = true, stroke, fill, fill_opacity, color }: { label?: boolean; stroke?: string; fill?: string; fill_opacity?: string; color?: string; } = {}) {
		return {
			label,
			stroke,
			fill,
			"fill-opacity": fill_opacity,
			color,
		} as GroupStyle;
	}

	constructor({ name, g, w = 1024, h = 256, x, y, z, nodes, style = this.createStyle() }: { name: string; g?: string; w: number; h: number; x: number; y: number; z: string; nodes: string[]; style?: GroupStyle; }) {
		this.name = name;
		this.g = g;
		this.z = z
		this.w = w;
		this.h = h;
		// TODO: calculate x y coordinates from z (tab) data

		this.style = style;
		this.nodes = nodes
	}
}
