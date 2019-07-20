import Component from "../../modules/Component.mjs";

export default class ProjectRoute extends Component {
    #projInfo;
    #a_project;
    #channels;

    constructor() {
        super();
    }

    onInit() {

        this.#projInfo = {
            proj_name: this.querySelector("#projName"),
            pro_Disc: this.querySelector("#proDisc"),
            pro_img: this.querySelector("#projImg"),
        };

        Application.Modules.FireModule.queryProject(location.search.split('?')[1]);
        this.proj_name = document.getElementById("projName"),
            this.pro_Disc = document.getElementById("proDisc")
        this._versions = document.getElementById('versions');
        this._collaborators = document.getElementById('collaborators');
        this._project = document.getElementById('project');

        this._project.onclick = () => {
            Application.Modules.RouterModule.redirect('/project');
        };

        this._versions.onclick = () => {
            Application.Modules.RouterModule.redirect('/versions');
        };

        this._collaborators.onclick = () => {
            Application.Modules.RouterModule.redirect('/collaborators');
        };
    }

    onSync() {
        this.#a_project = Application.Modules.FireModule.a_project;
        this.#channels = Application.Modules.FireModule.channels;
        if (this.#a_project) {
            this.onUpdate('a_project', this.#a_project, [this.renderProject]);
        }
        if (this.#channels && this.#channels.length) {
            this.onUpdate('channels', this.#channels, [this.renderChannels]);
        }

    }

    renderProject() {
        console.log(this.#a_project);
        console.log(this.#projInfo);

        this.#projInfo.proj_name.innerHTML = this.#a_project.PName;
        this.#projInfo.pro_Disc.innerHTML = this.#a_project.Description;

        this.#projInfo.pro_img.src = `../../assets/album/${this.#a_project.ImgURL}.jpg`;

        const genres = this.querySelector('#proGenres');
        if (genres.children.length !== this.#a_project.Genres.length) {

            genres.innerHTML = '';
            this.#a_project.Genres.forEach((genre) => {
                console.log(genre);
                genres.innerHTML += `<span class=\"badge badge-danger\">${genre}</span>`;
            });
        }
    }

    renderChannels() {
        console.dir(this.#channels);
        for(let ch in this.#channels){
            console.dir(ch.data);
            // let channel = document.createElement("project-channel");
            // channel.setAttribute('channelName', ch)
        }
    }
}