import {userStatus, responses, studentsProblems, teachersProblems} from "./quizdata";

class Quiz{
    constructor(_div, _step, _page, _teacherList, _isteacher){
        this.div = _div;
        this.step = _step;
        this.userStatus = userStatus;
        this.responses = responses;
        this.studentsProblems = studentsProblems;
        this.teachersProblems = teachersProblems;
        this.teachersList = _teacherList;
        this.page = _page;
        this.questionnary = null;
        this.isteacher = _isteacher;
        this.step = this.takeAStepFurther(0);
    }

    initQuiz(){
        let html = document.createElement('div');
        //for going back possibility
        if(this.questionnary) this.questionnary.remove();
        html.id="theWholeThing";
        const userStatus = this.userStatus;

        const htmlIn = document.createElement('div');
        htmlIn.classList.add('d-flex', 'justify-content-around', 'w-100');

        const studBtn = document.createElement('a');
        studBtn.classList.add('btn', 'btn-primary');
        studBtn.innerText = userStatus.student;
        studBtn.id = "studBtn";

        studBtn.onclick = () =>{
            // e.preventDefault();
            this.chooseYourOwnAdventure(htmlIn, userStatus.student);
            this.takeAStepFurther(2);
        };

        if(this.isteacher){
            const teachButton = document.createElement('a');
            teachButton.classList.add('btn', 'btn-secondary');
            teachButton.innerText = userStatus.teacher;
            teachButton.onclick = () =>{
                this.chooseYourOwnAdventure(htmlIn, userStatus.teacher);
                this.takeAStepFurther(2);
            };

            htmlIn.append(teachButton);
        }

        htmlIn.append(studBtn);
        html.append(htmlIn);

        return html;
    }

    chooseYourOwnAdventure(toRemove, userStatus){
        const parent = document.getElementById('theWholeThing');
        const teachers = this.teachersList;

        const problems = userStatus === this.userStatus.student ? this.studentsProblems : this.teachersProblems;
        let answer = null;

        toRemove.remove();

        const item = document.createElement('div');
        item.classList.add('accordion');
        item.id = "accordionExample";

        const subItem = document.createElement('div');
        subItem.classList.add('card');

        for(let i=0; i<problems.length; i++){
            answer = problems[i].teacher
                                        ? responses.teacher
                                        : problems[i].epedago
                                            ? responses.epedago
                                            : problems[i].correspondant
                                                ? responses.correspondant
                                                : problems[i].scolarite
                                                    ? responses.scolarite
                                                    : problems[i].response;

            const headerC = document.createElement('div');
            headerC.classList.add('card-header');

            const h2 = document.createElement('h3');
            h2.classList.add('mb-0');

            const button = document.createElement('button');
            button.classList.add("btn", "btn-link", "btn-block", "text-left");
            button.setAttribute("data-toggle", "collapse");
            button.setAttribute("data-target", "#collapse"+i);
            button.setAttribute("aria-expanded","false");
            button.setAttribute("aria-controls", "collapse"+i);
            button.innerText = problems[i].other ? problems[i].other : Object.values(problems[i]);

            h2.append(button);
            headerC.append(h2);

            const answerContainer = document.createElement('div');
            answerContainer.classList.add('collapse');
            answerContainer.id = "collapse"+i;
            answerContainer.setAttribute('data-parent', '#accordionExample');

            const answerText = document.createElement('div');
            answerText.classList.add('card-body');
            if(teachers && teachers.length > 0 && teachers[0] !== "" && problems[i].teacher){
                //todo : fonction to generate html
                const answerCorps = document.createElement('p');
                answerCorps.innerText = answer;
                answerText.append(answerCorps);
                answerText.append(this.generateTeachersList());
            }else if(problems[i].epedago){
                answerText.innerHTML = answer;
            }else if(problems[i].other){
                answerText.innerText = problems[i].response;
            }else{
                answerText.innerText = answer;
            }
            answerContainer.append(answerText);

            headerC.append(answerContainer);
            subItem.append(headerC);
        }

        //bouton revenir en arriere
        // const backToSquareOne = document.createElement('button');
        // backToSquareOne.classList.add('btn', 'btn-secondary');
        // backToSquareOne.innerText = "Revenir en arrière";
        // backToSquareOne.onclick = (e) =>{
        //     e.preventDefault();
        //     item.remove();
        //     this.initQuiz;
        // };

        item.append(subItem);
        parent.append(item);
        // parent.append(backToSquareOne);
        this.questionnary = parent;
    }

    generateTeachersList(){
        const teachers = this.teachersList;
        const list = document.createElement('ul');
        const title = document.createElement('p');
        title.innerText = "Professeur(s) du cours sur lequel vous êtes :";
        list.append(title);
        for(let i=0; i<teachers.length;i++){
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${teachers[i]}">${teachers[i]}</a>`;
            list.append(listItem);
        }
        return list;
    }

    takeAStepFurther(incrementValue){
        if(typeof incrementValue === "number" && incrementValue >= 0){
            this.step = incrementValue;
            return this.step;
        }else{
            return this.step;
        }
    }
}

export default Quiz;