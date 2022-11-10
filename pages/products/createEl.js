class El {
    createElement(element, className) {
        let x = document.createElement(element);
        x.setAttribute("class", className);
        return x;
    }
}

export default new El();