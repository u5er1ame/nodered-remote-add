import { generateId } from "../Base.ts";
import { NodeTypes, type Node } from "../Nodes.ts";


enum ValueType {
	string= "str",
	json= "json",
	number= "num",
	binary= "bin",
	timestamp= "date",
	expression= "jsonata",
	env= "env",
	msg= "msg",
}
// INFO: all this props thing looks ewww
type Props = {
	p: string;
	v: string;
	vt: ValueType;
}


// FIXME: it smells
function createPayload(props: Props[]) {
	const p = props.filter((e:Props)=>{e.p=="payload"});

	if (!p || p.length == 0) return [undefined, undefined];
	 return [p[0].v,p[0].vt ];
}

function createTopic(props: Props[]) {
	const p = props.filter((e:Props)=>{e.p=="topic"});
	if (!p || p[0].vt !== "str") return "" ;
	return p[0].v;
}

export class Inject implements Node<NodeTypes.Inject> {
	id: string = generateId();
	name: string = "";
	g?: string | undefined;
	type: NodeTypes = NodeTypes.Inject;
	z: string;
	x: number;
	y: number;

	topic: string;

	props: Props[] = [];
	payload?: string;
	payloadType?: string;
	once: boolean = false;
	onceDelay: string = "";
	repeat: string = "";
	crontab: string = "";
	// INFO: each node output is array of id's it connects to
	wires: Array<Array<string>> = [[]];

	constructor({ name, g, x, y, z, props,wires = new Array([])}:
			{ name: string; g?: string; x: number; y: number; z: string; props: Props[]; wires: string[][]; }) {
		this.name = name;
		this.g = g;
		this.z = z;
		this.props = props;
		const [payload,payloadType]= createPayload(props);
		this.payload = payload;
		this.payloadType = payloadType;
		this.topic  = createTopic(props);
		// TODO: calculate x y coordinates from z (tab) data

		this.wires = wires;
	}
}
