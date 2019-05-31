export class FormsModule {
    formHandler(form) {
        let result = {};
        for (let i = 0; i < form.length; i++) {
            const input = form[i];
            if (input.localName === 'input') {
                if(input.id){
                    if (input.id === "remember") {
                        result[input.id] = input.checked;
                    } else {
                        result[input.id] = input.value;
                    }
                }else {
                    if (input.name === "remember") {
                        result[input.name] = input.checked;
                    } else {
                        result[input.name] = input.value;
                    }
                }
            }
        }
        return result;
    }
}