import FormInput from "../form/FormInput.js"
import FormTextarea from "../form/FormTextarea.js"
import Visit from "./Visit.js";

export default class VisitCardiologist extends Visit {

    static createFormFields(valueData) {
        const { pressure = "", massIndex = "", heartIllness = "", age = ""} = valueData || {};

        return [
            new FormInput('Обычное давление', 'pressure', 'text', pressure).create(),
            new FormInput('Индекс массы тела', 'massIndex', 'number', massIndex).create(),
            new FormTextarea('Перенесенные заболевания сердечно-сосудистой системы','heartIllness', heartIllness).create(),
            new FormInput('Возраст','age', 'number', age).create(),
        ]
    }

    constructor(cardOptions) {
        super();
        this.cardOptions = cardOptions;
    }
}