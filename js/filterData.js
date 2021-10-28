import AJAXRequest from "./AJAXRequest.js";
import createNewVisit from "./createNewVisit.js";
import { getTokenFromCookie } from "./cookie.js";
import { reqData } from "./constants.js";

export default async function filterData(event) {

    event.preventDefault();

    let container = document.querySelector('.cards-wrapper');
    container.innerHTML = "";

    let filterForm = document.forms[0];
    let filterName = filterForm.elements.name.value;
    let filterStatus = filterForm.elements.status.value;
    let filterUrgency = filterForm.elements.urgency.value;

    const token = getTokenFromCookie();
    if (token) {
        const response = await AJAXRequest({
            method: "GET",
            url: `${reqData.BASE_URL}${reqData.ENDPOINTS.CARDS}`,
            token,
        });


        let responseFilterUrgency = filterUrgencyArr(response, filterUrgency);
        let responseFilterString = filterSubstrArr(responseFilterUrgency, filterName);
        let responseFilterStatus = filterStatusArr(responseFilterString, filterStatus);


        responseFilterStatus.forEach(item => {
            createNewVisit(item);
        });
    } else {

        console.log("токен не получен");

    }
}

function filterUrgencyArr(arr, urgency) {
    if (urgency != '') {
        let filterArr = arr.filter(item => {
            if (typeof item.urgency === "string") {
                return (item.urgency == urgency);
            } else {
                return false;
            }
        });


        return filterArr;
    } else {
        return arr;
    }
}

function filterSubstrArr(arr, string) {
    if (string != '') {
        let filterArr = arr.filter(item => {
            if ((typeof item.name === "string") && (typeof item.target === "string")) {
                return ((item.name.toLowerCase().includes(string.toLowerCase())) || (item.target.toLowerCase().includes(string.toLowerCase())));
            } else {
                return false;
            }
        });

        return filterArr;

    } else {
        return arr;
    }
}

function filterStatusArr(arr, status) {
    if (status != '') {
        let currenDate = new Date();
        if (status === 'Открыта') {

            let filterData = arr.filter(item => {
                if (typeof item.visitDate === "string") {
                    let itemDate = new Date(item.visitDate);
                    return (currenDate <= itemDate);
                } else {
                    return false;
                }
            });

            return filterData;

        } else if (status === 'Закрыта') {

            let filterData = arr.filter(item => {
                if (typeof item.visitDate === "string") {
                    let itemDate = new Date(item.visitDate);
                    return (currenDate > itemDate);
                } else {
                    return false;
                }
            });
            return filterData;
        }
    } else {
        return arr;
    }
}