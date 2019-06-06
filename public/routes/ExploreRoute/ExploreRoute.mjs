import Component from "../../modules/Component.mjs";

export default class ExploreRoute extends Component {
    explore_result;
    constructor() {
        super();
    }

    onInit() {
        this._exploreForm = document.getElementById('exploreForm');
        this._exploreForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const form = event.target;
            let _exploreResult = this.querySelector("#exploreResult");
            while(_exploreResult.firstChild){
                _exploreResult.removeChild(_exploreResult.firstChild)
            }
            const result = this.exploreFormHandler(form);
            console.log(result);
            Application.Modules.FireModule.queryFilters(result);

        });
    }

    onSync() {
        this.explore_result = Application.Modules.FireModule.explore_result;
        if (this.explore_result && this.explore_result.length>0){
            this.onUpdate('explore_result', this.explore_result,[this.creatResult])
        }
    }

    //--> temporary form handler
    exploreFormHandler(form) {
        let result = {};
        for (let i = 0; i < form.length - 1; i++) {

            const input = form[i];
            if (input.localName === 'type') {
                result[input.name] = input.option[selected].value;
            }
            result[input.name] = input.value;
        }
        return result;
    }

    creatResult() {
        let _exploreResult = this.querySelector("#exploreResult");
        console.log(this.explore_result);
        for(let res of this.explore_result){
            if (res['type'] === "artist") {
                let artist = {
                    uid: res['data'].uid,
                    name: res['data'].displayName,
                    bio: res['data'].Bio,
                    img: res['data'].photoURL
                };
                console.log(artist);
                const searchResult = document.createElement("explore-artist");
                searchResult.setAttribute("uid", artist.uid);
                searchResult.setAttribute("name", artist.name);
                searchResult.setAttribute("bio", artist.bio);
                searchResult.setAttribute("img", artist.img);
                _exploreResult.appendChild(searchResult);

            }
            else if (res['type'] === "project") {
                    let project = {
                        pid: res['data'].pid,
                        name: res['data'].PName,
                        author: res['author'],
                        stars: res['data'].Stars,
                        img: res['data'].ImgURL
                    };
                console.log(project);
                const searchResult = document.createElement("explore-project");
                searchResult.setAttribute("pid", project.pid);
                searchResult.setAttribute("name", project.name);
                searchResult.setAttribute("author", project.author);
                searchResult.setAttribute("stars", project.stars);
                searchResult.setAttribute("img", project.img);
                _exploreResult.appendChild(searchResult);

            }
        }
        Application.Modules.FireModule.explore_result = [];
    }

}

