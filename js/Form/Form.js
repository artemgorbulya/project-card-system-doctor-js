import { formData, reqData } from "../constants.js";

import showNoVisitText from "../showNoVisitText.js";
import { writeTokenToCookie, getTokenFromCookie } from "../cookie.js";
import AJAXRequest from "../AJAXRequest.js";
import FormButton from "./FormButton.js";
import FormInput from "./FormInput.js";
import FormSelect from "./FormSelect.js";

import Visit from "../visit/Visit.js";
import VisitCardiologist from "../visit/VisitCardiologist.js";
import VisitTherapist from "../visit/VisitTherapist.js";
import VisitDentist from "../visit/VisitDentist.js";

import createNewVisit from "../createNewVisit.js";

import filterData from "../filterData.js";
import Modal from "../Modal.js";

export default class Form {
    constructor(type, defaultData) {
        this.type = type;
        this.defaultData = defaultData;
        this.formElement = this.createForm();
    }

    createForm() {
        switch (this.type) {
            case formData.FORM_TYPES.CREATE_LOGIN: {
                return this.createLoginForm();
            }
            case formData.FORM_TYPES.CREATE_VISIT: {
                return this.createVisitForm();
            }
            case formData.FORM_TYPES.CREATE_FILTER: {
                return this.createFilterForm();
            }
            case formData.FORM_TYPES.EDIT_CARD: {
                return this.editCardForm();
            }
        }
    }

    editCardForm() {
        const formElem = document.createElement("form");
        formElem.classList.add('edit-form');

        const regularFields = document.createElement('div');
        regularFields.classList.add('edit-form__regular');

        regularFields.append(...Visit.createFormFields(this.defaultData));

        const alternateFields = document.createElement('div');
        alternateFields.classList.add('edit-form__alternate');

        switch (this.defaultData.doctor) {
            case formData.VISIT_FORM.FORM_DOCTORS.CARDIOLOGIST: {
                alternateFields.append(...VisitCardiologist.createFormFields(this.defaultData));
                break;
            }
            case formData.VISIT_FORM.FORM_DOCTORS.DANTIST: {
                alternateFields.append(...VisitDentist.createFormFields(this.defaultData));
                break;
            }
            case formData.VISIT_FORM.FORM_DOCTORS.THERAPIST: {
                alternateFields.append(...VisitTherapist.createFormFields(this.defaultData));
                break;
            }
        }


        const selectDoctor = regularFields.querySelector('select[name="doctor"]');
        selectDoctor.addEventListener("change", () => {
            this.updateForm(selectDoctor.value, alternateFields);
        })


        const controls = document.createElement("div");
        const submitBtn = new FormButton(["btn", "btn-primary", "w-75", "mb-3", "mt-4"], "submit", "Обновить").create();
        const resetBtn = new FormButton(["btn", "btn-secondary", "w-75", "mb-3"], "button", "Отмена").create();
        const deleteBtn = new FormButton(["btn", "btn-danger", "w-75", "mb-3"], "button", "Удалить").create();

        this.controlButtons = {
            submitBtn,
            resetBtn,
            deleteBtn,
        }

        controls.append(submitBtn, resetBtn, deleteBtn);

        formElem.append(regularFields, alternateFields, controls);

        return formElem;
    }

    createFilterForm() {
        const formElem = document.createElement("form");
        formElem.classList.add('filter-form');

        const regularFields = document.createElement('div');
        regularFields.classList.add('filter-form__regular');

        regularFields.append(
            new FormInput("Поиск по заголовку/ визиту", "name", 'text').create(),
            new FormSelect("Поиск по статусу", "status", formData.FILTER_FORM.STATUS).create(),
            new FormSelect("Срочность визита", "urgency", formData.VISIT_FORM.FORM_ELS.URGENCY).create()
        )

        const controls = document.createElement('div');
        controls.classList.add('filter-form__controls', 'text-center');

        const submitFilter = new FormButton(formData.LOGIN_FORM.SUBMIT_BTN_CLASSLIST, "submit", "Найти").create();
        submitFilter.addEventListener('click', filterData);

        controls.append(submitFilter)

        formElem.append(
            regularFields,
            controls
        );

        return formElem;

    }

    createLoginForm() {
        const formElem = document.createElement("form");
        formElem.classList.add('login-form');

        const regularFields = document.createElement('div');
        regularFields.classList.add('modal-form__regular');

        regularFields.append(
            new FormInput("Email адрес", "email", "email").create(),
            new FormInput("Пароль", "password", "password").create()
        );

        const controls = document.createElement('div');
        controls.classList.add('modal__controls', 'text-center');

        
        formElem.addEventListener("submit", (event) => {
            event.preventDefault();
            this.sendLoginDataRequest(this.createFormData(event.target), event);
        })
        
        controls.append(
            new FormButton(formData.LOGIN_FORM.SUBMIT_BTN_CLASSLIST, "submit", "Вход").create(),
            new FormButton(formData.LOGIN_FORM.CANCEL_BTN_CLASSLIST, "button", "Отмена", true).create()
        )

        formElem.append(
            regularFields,
            controls
        );

        return formElem;
    }

    createVisitForm() {
        const formElem = document.createElement("form");
        formElem.classList.add('modal-form');


        const regularFields = document.createElement('div');
        regularFields.classList.add('modal-form__regular');

        regularFields.append(...Visit.createFormFields());


        const selectDoctor = regularFields.querySelector('select[name="doctor"]');


        const alternateFields = document.createElement('div');
        alternateFields.classList.add('modal-form__alternate');

        this.updateForm(selectDoctor.value, alternateFields);

        selectDoctor.addEventListener('change', () => {
            this.updateForm(selectDoctor.value, alternateFields);
        });


        const controls = document.createElement('div');
        controls.classList.add('modal__controls', 'text-center');

        controls.append(
            new FormButton(formData.LOGIN_FORM.SUBMIT_BTN_CLASSLIST, "submit", "Создать").create(),
            new FormButton(formData.LOGIN_FORM.CANCEL_BTN_CLASSLIST, "button", "Отмена", true).create()
        );

        formElem.append(regularFields, alternateFields, controls);

        formElem.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendVisitDataRequest(this.createFormData(e.target), getTokenFromCookie());
            $(event.target.closest(".modal")).modal("hide");
        });

        return formElem;
    }

    updateForm(doctorType, wrapperEl) {
        wrapperEl.innerHTML = '';
        switch (doctorType) {
            case formData.VISIT_FORM.FORM_DOCTORS.CARDIOLOGIST: {
                wrapperEl.append(...VisitCardiologist.createFormFields());
                break;
            }
            case formData.VISIT_FORM.FORM_DOCTORS.DANTIST: {
                wrapperEl.append(...VisitDentist.createFormFields());
                break;
            }
            case formData.VISIT_FORM.FORM_DOCTORS.THERAPIST: {
                wrapperEl.append(...VisitTherapist.createFormFields());
                break;
            }
        }
    }

    createFormData(formElem) {
        const formInfo = new FormData(formElem);
        return JSON.stringify(this.convertFormData(formInfo));
    }

    convertFormData(formInfo) {
        const data = [...formInfo];
        const convertedData = {};

        data.forEach(item => {
            convertedData[item[0]] = item[1];
        })

        return convertedData;
    }

    async sendVisitDataRequest(formInfo, token) {
        const request = await AJAXRequest({
            url: `${reqData.BASE_URL}${reqData.ENDPOINTS.CARDS}`,
            body: formInfo,
            method: "POST",
            token: token,
        });
        createNewVisit(request);
    }

    async sendLoginDataRequest(formData, event) {
        const request = await AJAXRequest({
            url: `${reqData.BASE_URL}${reqData.ENDPOINTS.LOGIN}`,
            body: formData,
            method: "POST",
        });
        console.log(request);
        if (!request.token) {
            const messageElem = document.createElement("p");
            messageElem.classList.add("error-msg")
            messageElem.innerText = "Адрес почты или пароль введены неправильно!";

            const errorModal = new Modal("Error!", messageElem);
            errorModal.render();
        } else {
            $(event.target.closest(".modal")).modal("hide");
            document.querySelector("#createVisitBtn").classList.remove("hidden");
            document.querySelector("#loginBtn").classList.add("hidden");
            writeTokenToCookie(request.token);

            const visitsRequest = await AJAXRequest({
                method: "GET",
                url: `${reqData.BASE_URL}${reqData.ENDPOINTS.CARDS}`,
                token: getTokenFromCookie(),
            });
            console.log(visitsRequest)
            if (visitsRequest) {
                document.querySelector(".cards-wrapper").innerHTML = "";
                visitsRequest.forEach(item => {
                    createNewVisit(item);
                });
            } else {
                showNoVisitText(document.querySelector(".cards-wrapper"));
            }
        }
    }
}