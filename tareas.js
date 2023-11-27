import { addTareaFire } from './firebase.js';

const inputTarea=document.querySelector('#inputTarea');
const tareas=document.querySelector('#tareas');
const btnTareas=document.querySelector('#btnTareas');


let listaTareas = [];

function createAlert(message, status = 'primary'){
   const alerta=document.createElement('div');
   alerta.classList.add('alert');
   alerta.classList.add('alert-' + status);
   alerta.setAttribute('role', 'alert');
   let buttons='<div>';
   buttons+=`<button class="btn red"></button>`;
   buttons+=`<button class="btn yellow"></button>`;
   buttons+=`<button class="btn green"></button>`;
   buttons+=`<button class="btn x">X</button>`;
   buttons+=`</div>`;
   alerta.innerHTML=`<div>${ message }</div>${ buttons }`;
   return alerta;
}


function addTarea(){
    const data=inputTarea.value;
    if(data){
        listaTareas.push({
            tarea: data.trim(),
            status: 'primary'
        })
        addTareaFire({
            area: data.trim(),
            status: 'primary'
        })
        const jsonT = JSON.stringify(listaTareas);
        localStorage.setItem('tareas', jsonT);
        const alerta=createAlert(data);
        inputTarea.value='';
        tareas.appendChild(alerta);
    }
}

function getButton(e){
    if(e.target.classList.contains('btn')){
        const action=e.target.classList[1];
        const alertActual=e.target.parentElement.parentElement;
        const data = alertActual.querySelector('div').innerText;
        const idxTarea = listaTareas
                            .findIndex(tarea => tarea.tarea === data);
        switch(action){
            case 'red':
                alertActual.classList=[];
                alertActual.classList.add('alert', 'alert-danger');
                listaTareas[idxTarea].status = 'danger';
                break;
            case 'yellow':
                alertActual.classList=[];
                alertActual.classList.add('alert', 'alert-warning');
                listaTareas[idxTarea].status = 'warning';
                break;
            case 'green':
                alertActual.classList=[];
                alertActual.classList.add('alert', 'alert-success');
                listaTareas[idxTarea].status = 'success';
                break;
            case'x':
            alertActual.remove();
            listaTareas.splice(idxTarea, 1);
            break;
        }
        const jsonT = JSON.stringify(listaTareas);
        localStorage.setItem('tareas', jsonT);
    }
}

function leerStorage(){
    if(localStorage.getItem('tareas')){
        const jsonT = localStorage.getItem('tareas');
        listaTareas = JSON.parse(jsonT);
        listaTareas.forEach(tarea => {
            tareas.appendChild(createAlert(tarea.tarea, tarea.status));
        });
    }
}

leerStorage();

btnTarea.addEventListener('click', addTarea);
tareas.addEventListener('click', getButton);