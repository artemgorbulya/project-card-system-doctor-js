export default class FormButton {
    constructor(classList, type, text, isDismiss) {
        this.classList = classList;
        this.type = type;
        this.text = text;
        this.isDismiss = !!isDismiss;
        this.buttonElement = this.create();
    }

    create() {
        const btnElem = document.createElement("button");
        btnElem.innerText = this.text;
        btnElem.type = this.type;

        if (this.isDismiss) {
            btnElem.setAttribute("data-dismiss", "modal");
        }

        this.classList.forEach(element => {
            btnElem.classList.add(element);
        });

        return btnElem;
    }
}