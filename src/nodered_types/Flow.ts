import { type Node, NodeTypes } from "./Nodes.ts";
import { type Config, ConfigTypes } from "./Configs.ts";
import { generateId } from "./Base.ts";

class Flow  {
    disabled: boolean;
    id: string;
    label: string;
    info: string = "";
    nodes: Node<NodeTypes>[];
    configs : Config<ConfigTypes>[];
    constructor({ disabled = false, id = generateId(), label }: { disabled: boolean; id: string; label: string; }) {
	this.disabled = disabled;
	this.id = id;
	this.label = label;
	this.nodes = [];
	this.configs = [];
    }
    getId() {
	return this.id;
    }
};
