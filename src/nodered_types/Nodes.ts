import {  type NodeBase } from "./Base.ts";

export enum NodeTypes {
	Group = "group",
	Inject = "inject",
	Debug = "debug",
	Timer = "chronos-state",
	MqttIn = "mqtt in",
	MqttOut = "mqtt out",
}


export type Node<NodeTypes> = NodeBase & object
