 const inputs = document.querySelectorAll(`.selectionTours__form input`);
 const popup = document.querySelector('.popUp');

let validInputLength = (inputs) => {
    let status = true;
    let valid = `valid`;

    let inputLength = (input) => {
        let count = input.classList.contains('phone') ? 17 : 0;

        if(input.value.length > count){
            if(input.classList.contains(valid)){
                input.classList.remove(valid)
            }
        }else{
            input.classList.add(valid)
            status = false;
        }
    }

    inputs.forEach( input => {
        input.onkeyup  = (e) => inputLength(input);
        inputLength(input);
    })

    return status;
}

let closeWindow = () => {
   inputs.forEach( input => input.value = '');
   popup.innerHTML = '';
}

let sendTrue = () => {
    let templatePopUpTrue = `
            <div class="popUp__bg">
                    <div class="popUp__block">
                        <div class="popUp__close" onclick="closeWindow()">&#10006;</div>
                        <div class="popUp__body">
                            <div class="popUp__img">
                                <img src="https://www.tui.ua/getmedia/fc1a5f26-a88b-44dc-ba72-f89d1307bd2f/Succes" >
                            </div>
                            <h2 class="popUp__title"> Дякуємо!</h2>
                            <p>Наш менеджер вже готує пропозиції для вас! </p>
                            <p>Очікуйте, будь ласка, повідомлення найближчим часом</p>
                    </div>
                </div>
                </div>`;
popup.innerHTML = templatePopUpTrue;
}

let sendFalse = () => {
    let templatePopUpFalse = `
            <div class="popUp__bg">
            <div class="popUp__block">
                <div class="popUp__close" onclick="closeWindow()">&#10006;</div>
                <div class="popUp__body">
                    <div class="popUp__img">
                        <img src="https://www.tui.ua/getmedia/e4339886-f27e-4fc8-91b6-4efc2fec2b7b/Cross" >
                    </div>
                    <h2 class="popUp__title"> УПС!</h2>
                    <p>Здається, щось пішло не так.</p>
                    <p>Перевірте, чи ви заповнили всі поля та спробуйте, будь ласка, ща раз.</p>
            </div>
        </div>
        </div>`;
popup.innerHTML = templatePopUpFalse;
}

let sendForm = () => {
    
    if(validInputLength(inputs)){
        let data = [];
        inputs.forEach( ({value}) => {
            data = [...data, value];
            value = '';
        }) 

        fetch('#', {
                method: 'POST', 
                body: JSON.stringify(data) 
            })
        .then(res => res.json())
        .then( status => {
            status ? sendTrue() : sendFalse()
        }).catch(err =>{
            sendFalse()
        });
        setTimeout(closeWindow, 5000);
    }
}

$(function(){
    $(".phone").mask("+38(099) 999-99-99");
});
