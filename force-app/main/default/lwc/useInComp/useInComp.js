import { LightningElement } from 'lwc';

export default class UseInComp extends LightningElement {
    value = "";
options = [
	{label: "--None--", value: ""},
	{label: "Call", value: "Call"},
	{label: "Email", value: "Email"},
	{label: "Message", value: "Message"},
	{label: "Task", value: "Task"},
	{label: "Visit", value: "Visit"},
	{label: "Other", value: "Other"},
];

handleChange(event) {
	this.value = event.detail.value;
	console.log(this.value);
}
}