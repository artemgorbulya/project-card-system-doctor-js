export default class FormTextarea {
    constructor(label, name, value){
        this.label = label;
        this.name = name;
        this.value = value;
    }

    create() {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        formGroup.innerHTML = `
              <label class="form-group__label">
                <span class="form-group__title">${this.label}</span>
                <textarea class="form-control" name="${this.name}" required>${this.value || ""}</textarea>
              </label>
            `;
            
        return formGroup;
    }
}