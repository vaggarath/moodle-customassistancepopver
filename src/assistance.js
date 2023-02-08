import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.1/dist/sweetalert2.all.min.js';
import Quiz from "./Quiz";

export const init = (user, pagelayout, teachers, isteacher) =>{
    const questionning = document.getElementById('questionning');

    const launchAssistant = (initQuiz) =>{
        initQuiz.takeAStepFurther(0);
        Swal.fire({
            title: 'Assistance'
                +"<br />"
                + `<h3>Bienvenue <strong>${user}</strong></h3>`
            ,
            icon: 'question',
            html: initQuiz.initQuiz(),
            confirmButtonText: 'Fermer',
            showCancelButton: true,
            cancelButtonText: "Retour",
          }).then((result)=>{
            if(result.dismiss === Swal.DismissReason.cancel){
                if(initQuiz.takeAStepFurther(null) > 0){
                    launchAssistant(initQuiz);
                }
            }
          });
    };

    questionning.addEventListener('click', ()=>{
        const teachersList = JSON.parse(
            JSON.stringify(teachers
                            .replaceAll("quot", "")
                            .replaceAll("&;", "")
                            .replace("[","").replace("]","")
                            .split(",")));

        const initQuiz = new Quiz(null, null, pagelayout, teachersList, isteacher);

        launchAssistant(initQuiz);
    });
};