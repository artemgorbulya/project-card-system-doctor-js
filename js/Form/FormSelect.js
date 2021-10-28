export default class FormSelect{

    constructor(label, name, options, selected = ''){
        this.label = label;
        this.name = name;
        this.option = options;
        this.selected = selected;
    }

    create() {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        const optionsMarkup = this.option.map((item) => {
            
            // let isSelected = '';

            // if(this.selected === item){
            //     isSelected = 'selected';
            // }

            return `<option ${this.selected === item ? "selected" : ""} value="${item}">${item || 'Не задано'}</option>`
        })

        formGroup.innerHTML = `
              <label class="form-group__label">
                <span class="form-group__title">${this.label}</span>
                <select class="custom-select mr-sm-2" name="${this.name}" required>
                    ${optionsMarkup.join(" ")}
                </select>
              </label>
            `;
            
        return formGroup;
    }

}