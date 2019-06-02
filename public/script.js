import AppComponent from "./components/AppComponent/AppComponent.mjs";
import RouterModule from "./modules/RouterModule.mjs";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent.mjs";
import FireModule from "./modules/FireModule.mjs";
import {FormsModule} from "./modules/FormsModule.mjs";
import ArtistComponent from "./components/ArtistComponent/ArtistComponent.mjs";
import ProjectComponent from "./components/ProjectComponent/ProjectComponent.mjs";
import ProjectDisplayComponent from "./components/ProjectDisplayComponent/ProjectDisplayComponent.mjs";

window['Application'] = new class Application {
    #Imports;
    constructor() {
        this.#Imports = [
            {
                selector:'FireModule',
                script: new FireModule
            },
            {
                selector:'RouterModule',
                script: new RouterModule
            },
            {
                selector:'FormsModule',
                script: new FormsModule
            }
        ];
        this.Declarations = [
            {
                selector:'app-root',
                component:AppComponent
            },
            {
                selector:'app-header',
                component:HeaderComponent
            },
            {
                selector:'explore-artist',
                component:ArtistComponent
            },
            {
                selector:'explore-project',
                component:ProjectComponent
            }
            ,
            {
                selector:'project-result',
                component:ProjectDisplayComponent
            }

        ];
    }
    set Declarations (declarations){
        for(const declaration of declarations){
            customElements.define(declaration.selector,declaration.component)
        }
    }
    get Modules(){
        let Modules={};
        for(const Import of this.#Imports){
            Modules[Import.selector] = Import.script
        }
        return Modules
    }
};





