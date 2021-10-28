import FormInput from "../form/FormInput.js"
import Visit from "./Visit.js";

export default class VisitTherapist extends Visit{

    static createFormFields(valueData) {
        const { age = "" } = valueData || {};

        return [
            new FormInput('Возраст', 'age', 'number', age).create()
        ]
    }

    constructor(cardOptions) {
        super();
        this.cardOptions = cardOptions;
    }
}