import Component from "../../modules/Component.mjs";

export default class ProjectRoute extends Component {
    #a_project;
    #projInfo;

    constructor(){
        super();
    }

    onInit(){

        this.#projInfo = {
            proj_name: this.querySelector("#projName"),
            pro_Disc: this.querySelector("#proDisc"),
            pro_img: this.querySelector("#projImg"),
        };

        Application.Modules.FireModule.queryProject(location.search.split('?')[1]);

        this._versions = document.getElementById('versions');
        this._collaborators = document.getElementById('collaborators');
        this._project = document.getElementById('project');

        this._project.onclick = ()=>{
            Application.Modules.RouterModule.redirect('/project');
        };

        this._versions.onclick = ()=>{
            Application.Modules.RouterModule.redirect('/versions');
        };

        this._collaborators.onclick = ()=>{
            Application.Modules.RouterModule.redirect('/collaborators');
        };
    }

    onSync(){
        this.#a_project = Application.Modules.FireModule.a_project;
        this.onUpdate('a_project', this.#a_project, [this.renderProject]);
    }

    renderProject(){
        setTimeout(() => {
            console.dir(this.#a_project);
            console.dir(this.#projInfo);
            this.#projInfo.pro_img.src = `../../assets/album/${this.#a_project.ImgURL}.jpg`;

            this.#projInfo.proj_name.innerHTML = this.#a_project.PName;
            this.#projInfo.pro_Disc.innerHTML = this.#a_project.Description;

        },2000);


        /** 
        const genres = this.querySelector('#proGenres');
        if(genres.children.length !== this.#a_project.Genres.length) {
            genres.innerHTML = '';
            this.#a_project.Genres.forEach((genre) => {
                genres.innerHTML += `<span class=\"badge badge-danger\">${genre}</span>`;
            });
        }
        const collaborators = this.querySelector('#proColl');
        if(collaborators.children.length !== this.#a_project.Genres.length) {
            collaborators.innerHTML = '';
            this.#a_project.Collaborators.forEach((collaborator) => {
                collaborators.innerHTML += `<span class=\"page5-collaboratorsauthor\">${collaborator}</span>`;
            });
        }
        */
    }
}