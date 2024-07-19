import type { Base } from "./Base.ts";

export enum ConfigTypes {
    TimerConfig = "chronos-config",
    BrokerConfig = "mqtt-broker"
}

export type Config<ConfigTypes> = Base & object
