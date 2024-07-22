export function generateId(): string {
	const bytes = [];
	for (let i = 0; i < 8; i++) {
		bytes.push(
			Math.round(0xff * Math.random()).toString(16).padStart(
				2,
				"0",
			),
		);
	}
	return bytes.join("");
}

export interface Base {
	id: string;
	name: string;
	type: string;
	// INFO: getId,name fn
}

export interface NodeBase extends Base {
	x: number;
	y: number;
	z: string;
	g?: string;
	wires?: string[][];
}
