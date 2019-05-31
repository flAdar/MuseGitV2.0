export default class Component extends HTMLElement {
    #updateCollection = [];
    constructor(){
        super();
        const valid = this.constructor.name.toLowerCase().split('component').length === 2;
        if(valid){
            this.#load();
        } else {
            this.#load('/routes/');
        }
        // if component init function defined
        if(this.onInit) {
            // set readyState init from parent extended class (example : "AppComponent")
            this.ReadyState = this.onInit;
            // if component sync function defined
        }
        if(this.onSync) {
            //it will loop thi function over and over
            setInterval(()=>{
                if(this.isConnected){
                    // just run the function
                    this.onSync();
                    this.applyUpdate();
                }
            },100)
        }
        if(this.isConnected && this.onConnection){
            console.log(`%c "${this.constructor.name}" has been defined and connected`,"background-color:green;color:white");
            this.onConnection()
        }
        if(!this.isConnected && this.onDisconnection){
            console.log(`%c "${this.constructor.name}" has been defined but disconnected`,"background-color:red;color:white");
            this.#updateCollection = [];
            this.onDisconnection()
        }
    }

    applyUpdate(){
        for(const update of this.#updateCollection){
            if(update.value !== update.oldValue){
                console.log(`"${update.selector}" is ready ,applying update...`);
                if(Array.isArray(update.callbacks)){
                    for(let callback of update.callbacks){
                        const binder = callback.bind(this);
                        binder();
                    }
                } else {
                    const binder = callback.bind(this);
                    binder();
                }
            update.oldValue = update.value;
            }
        }
    }

    onUpdate(selector,value,callbacks){
        const exists = this.validateUpdate(selector);
        if(!exists){
            this.addUpdate(selector,value,callbacks);
        } else {
            this.editUpdate(selector,value);
        }

    }

    editUpdate(selector,value){
        for(const update of this.#updateCollection){
            if(update.selector === selector){
                update.value = value;
            }
        }
    }

    addUpdate(selector,value,callbacks){
        this.#updateCollection.push({
            selector:selector,
            value:value,
            oldValue:undefined,
            callbacks:callbacks
        });
    }
    // it validate that update already inserted
    validateUpdate(selector){
        for(const update of this.#updateCollection){
            if(update.selector === selector){
                return true
            }
        }
        return false
    }

    // Event readystate to implement init
    set ReadyState(callback){
        let stateCheck = setInterval(() => {
            // to check when component is ready is to wait for the first child to finish loading
            if (this.firstChild) {
                clearInterval(stateCheck);
                // bind callback event to child "component" class mean this class
                this.init = callback.bind(this);
                // Fire the event
                return this.init()

            }
        }, 100);
    }
    // need
    #load = async (path="/components/",name=this.constructor.name) => {
        // let template = document.createElement('template');
        // template.innerHTML =`<style>${_css}</style>${_html}`;
        // let shadowRoot = this.attachShadow({mode: 'open'});
        // shadowRoot.appendChild(tmpl.content.cloneNode(true));
        const _css = await Component.download(`${path}/${name}/${name}.css`);
        const _html = await Component.download(`${path}/${name}/${name}.html`);
        this.innerHTML =`<style>${_css}</style>${_html}`;
    };
    static download(path){
        return fetch(path)
            .then(response=>{
                return response.text()
            })
            .then(result=>{
                return result
            })
    }
}
