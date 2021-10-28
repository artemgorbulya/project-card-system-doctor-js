export default class Modal {
    constructor(title, body) {
        this.title = title;
        this.body = body;
    }

    render() {
        const modal = document.querySelector("#mainModal");
        modal.querySelector(".modal-title").innerText = this.title;
        modal.querySelector(".modal-body").append(this.body);
    }

    static onModalClose(modalToBeClosed) {
        modalToBeClosed.querySelector(".modal-body").innerHTML = "";
    }
}