export default class FormInput {
    constructor(label, name, type, value) {
        this.label = label;
        this.name = name;
        this.type = type;
        this.value = value;
    }

    create() {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        formGroup.innerHTML = `
              <label class="form-group__label">
                <span class="form-group__title">${this.label}</span>
                <input type="${this.type}" class="form-control" name="${this.name}" value="${this.value || ""}" required="true">
              </label>
            `;

        return formGroup;
    }
}