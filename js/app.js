import AJAXRequest from "./AJAXRequest.js";
import createNewVisit from "./createNewVisit.js";
import { getTokenFromCookie } from "./cookie.js";
import showNoVisitText from "./showNoVisitText.js";
import { formData, reqData, cardPrefix } from "./constants.js";
import getDataFromCard from "./getDataFromCard.js";

import Modal from "./Modal.js";
import Form from "./form/Form.js";

const createVisitBtn = document.querySelector("#createVisitBtn");
const loginBtn = document.querySelector("#loginBtn");
const cardWrapper = document.querySelector('.cards-wrapper');

const filterFormWrapper = document.querySelector('.filter-container');
filterFormWrapper.append(new Form(formData.FORM_TYPES.CREATE_FILTER).formElement);


createVisitBtn.addEventListener("click", () => {
    let formBody = new Form(formData.FORM_TYPES.CREATE_VISIT);
    let createVisitFormModal = new Modal('Создать визит', formBody.formElement);
    createVisitFormModal.render();
});

loginBtn.addEventListener("click", () => {
    let formBody = new Form(formData.FORM_TYPES.CREATE_LOGIN);
    let createLoginFormModal = new Modal('Войти', formBody.formElement);
    createLoginFormModal.render();
});

cardWrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-card')) {
        
        const cardWrapper = e.target.closest('.card');
        const oldCardData = [...cardWrapper.children];
        const cardData = getDataFromCard(cardWrapper);
        console.log(cardData);
        cardWrapper.innerHTML = "";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const editCardForm = new Form(formData.FORM_TYPES.EDIT_CARD, cardData);
        
        // *CANCEL BTN
        editCardForm.controlButtons.resetBtn.addEventListener("click", () => {
            cardWrapper.innerHTML = "";
            oldCardData.forEach(item => {
                cardWrapper.append(item);
            });
        });

        // *DELETE BTN
        editCardForm.controlButtons.deleteBtn.addEventListener("click", async () => {
            const token = getTokenFromCookie();
            const id = cardWrapper.getAttribute("data-card-id");

            await AJAXRequest({
                url: `${reqData.BASE_URL}${reqData.ENDPOINTS.CARDS}/${id}`,
                method: "DELETE",
                token,
            });
            
            cardWrapper.remove();
        })

        // *PUT BTN
        editCardForm.controlButtons.submitBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            const token = getTokenFromCookie();
            const id = cardWrapper.getAttribute("data-card-id");
            const formData = editCardForm.createFormData(editCardForm.formElement);

            const request = await AJAXRequest({
                method: "PUT",
                body: formData,
                url: `${reqData.BASE_URL}${reqData.ENDPOINTS.CARDS}/${id}`,
                token,
            });
            console.log(request);

            oldCardData.forEach(function(item){
                const cardInfoFields = item.querySelectorAll('[data-info]');

                cardInfoFields.forEach(function(item){
                    const attr = item.dataset["info"];
                    item.innerText = `${cardPrefix.RU[attr]}: ${request[attr]}`;
                })
            });

            cardWrapper.innerHTML = "";
            cardWrapper.append(...oldCardData);

        })

        cardBody.append(editCardForm.formElement);

        cardWrapper.append(cardBody);
    }
})

$("#mainModal").on("hidden.bs.modal", (event) => {
    Modal.onModalClose(event.target);
});

document.addEventListener("DOMContentLoaded", async () => {
    const token = getTokenFromCookie();
    document.querySelector("#createVisitBtn").classList.add("hidden");
    document.querySelector("#loginBtn").classList.add("hidden");
    if (token) {
        document.querySelector("#createVisitBtn").classList.remove("hidden");
        const response = await AJAXRequest({
            method: "GET",
            url: `${reqData.BASE_URL}${reqData.ENDPOINTS.CARDS}`,
            token,
        });
        console.log(response)
        response.forEach(item => {
            createNewVisit(item);
            
            
            
            // *В случае если на сервере лежат неправильные данные
            // await AJAXRequest({
                //     method: "DELETE",
                //     url: `${reqData.BASE_URL}${reqData.ENDPOINTS.CARDS}/${item.id}`,
                //     token,
            // })
        }); 
    } else {
        showNoVisitText(document.querySelector(".cards-wrapper"));
        document.querySelector("#loginBtn").classList.remove("hidden");
    }
});