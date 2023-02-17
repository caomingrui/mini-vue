import watch from "./watch";

type RenderOptionProps = {
    template: string,
    proxy: any
}

const render = (option: RenderOptionProps, dom: Element) => {
    const { template, proxy } = option;
    dom.innerHTML = template.trim();

    dom.childNodes[0].childNodes.forEach(node => {
        if (node.textContent && /\{\{(.*)\}\}/.test(node.textContent)) {
            let key = RegExp.$1.trim()
            const updater = function (key: string) {
                node.textContent = proxy[key];
            }
            updater(key);
            watch(() => proxy[key], updater.bind(null, key))
        }
    })
}

export default render;
