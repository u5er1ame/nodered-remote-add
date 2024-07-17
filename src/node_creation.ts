
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




type Flow  = {
	id : string;
	label : string
	nodes Object[]
	configs = Object[]
	constructor(label) {
		this.id = generateId();
		this.label = label;
	}
};
