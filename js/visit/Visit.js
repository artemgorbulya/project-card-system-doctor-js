import FormButton from "../form/FormButton.js"
import FormInput from "../form/FormInput.js"
import FormTextarea from "../form/FormTextarea.js"
import FormSelect from "../form/FormSelect.js"
import { formData, cardPrefix } from "../constants.js"

export default class Visit {
    static createFormFields(valueData) {
        const { visitDate = "", name = "", doctor = "", target = "", description = "", urgency = "" } = valueData || {};

        return [
            new FormInput('Дата визита','visitDate', 'date', visitDate).create(),
            new FormInput('Имя', 'name', 'text', name).create(),
            new FormSelect('Врач', 'doctor', Object.values(formData.VISIT_FORM.FORM_DOCTORS), doctor).create(),
            new FormInput('Цель визита','target', 'text', target).create(),
            new FormTextarea('Краткое описание','description', description).create(),
            new FormSelect('Срочность','urgency', formData.VISIT_FORM.FORM_ELS.URGENCY, urgency).create(),
        ]
    }

    render = () => { 
        const {visitDate, name, doctor, id, ...rest} = this.cardOptions;
        const card = document.createElement('div');
        card.classList.add('card','m-1');
        card.dataset.cardId = id;

        let cardInfo = "";

        for (let key in rest) {
            cardInfo += `<div class="mb-4" data-info="${key}">${cardPrefix.RU[key]}: ${rest[key]}</div>`
        }

        card.innerHTML = `
            <div class="card-header">
                <h5 class="card-title" data-info="name">${name}</h5>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" data-info="doctor">Врач: ${doctor}</li>
                    <li class="list-group-item" data-info="visitDate">Дата визита: ${visitDate}</li>
                    <li class="list-group-item card-details">
                        <div>
                            <button class="btn btn-sm btn-info card-details__btn">Показать детали</button>
                        </div>
                        <div class="card-details__info hidden">
                            ${cardInfo}
                        </div>
                    </li>
                </ul>
            </div>
        `

        const toggleBtn = card.querySelector('.card-details__btn');

        toggleBtn.addEventListener('click', function(){
            const cardInfoWrap = this.closest('.card-details').querySelector('.card-details__info');
            cardInfoWrap.classList.toggle('hidden');
        })

        const cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");

        const editCardBtn = new FormButton(["btn", "btn-primary"], "button", "Редактировать").buttonElement;
        editCardBtn.classList.add('edit-card')
        cardFooter.append(editCardBtn);
        card.append(cardFooter);

        const cardWrapper = document.querySelector('.cards-wrapper');
        cardWrapper.append(card);
    }
}