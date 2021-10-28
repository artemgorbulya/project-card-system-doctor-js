export default function getDataFromCard(cardWrapper) {
    const dataArr = cardWrapper.querySelectorAll('[data-info]');
    return [...dataArr].reduce((prev, curr) => {
        if (curr.innerText.includes(":")) {
            prev[curr.getAttribute("data-info")] = curr.innerText.split(": ")[1] || "";
        } else {
            prev[curr.getAttribute("data-info")] = curr.innerText || "";
        }
        return prev;
    }, {})
}