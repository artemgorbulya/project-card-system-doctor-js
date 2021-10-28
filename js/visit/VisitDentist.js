import FormInput from "../form/FormInput.js"
import Visit from "./Visit.js";

export default class VisitDentist extends Visit{

    static createFormFields(valueData) {
        const { date = "" } = valueData || {};
        
        return [
            new FormInput('Дата последнего посещения', 'date', 'date', date).create()
        ]
    }

    constructor(cardOptions) {
        super();
        this.cardOptions = cardOptions;
    }
}