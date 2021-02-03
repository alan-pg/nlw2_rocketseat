document.querySelector("#add-time")
.addEventListener('click', addNewField)

const containerSchedule = document.querySelector('.schedule-item:last-child').cloneNode(true)

function addNewField() { 
    const lastField = document.querySelector('#schedule-items .schedule-item:last-child')    
    if(!lastField){
        cloneField()
        return
    }
    const inputs = lastField.querySelectorAll('input')
    const select = lastField.querySelector('select')
    const empty = []
    select.value == "" ? empty.push(select) : null
    inputs[0].value == "" ? empty.push(inputs[0]) : null
    inputs[1].value == "" ? empty.push(inputs[1]) : null
    
    if(empty.length > 0){
        empty.forEach(function(value){
            value.classList.add("blink_me")
            setTimeout(function(){
                value.classList.remove("blink_me")
            }, 3000)
        })
    }else{
        cloneField()
    }
    
 }

function cloneField() {  
    const clone = containerSchedule.cloneNode(true)    
    document.querySelector('#schedule-items').appendChild(clone);
}


function excluir(obj) { 
    var element = obj.parentNode
    var parentelement = element.parentNode
    parentelement.remove()
 }