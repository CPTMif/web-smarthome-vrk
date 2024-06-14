const dom = {
    selectbox: document.getElementById('selectbox'),
    rooms: document.getElementById('rooms'),
    selectboxlist: selectbox.querySelector(".selectbox__list"),
    options: document.getElementById('options'),
    optionTabs: options.querySelector(".options__tabs"),
    settingsScreens: options.querySelector(".settings__screens"),
    temperatureSlider: document.getElementById("temperatureSlider"),
    lightsSlider: document.getElementById("lightsSlider"),
    humiditySlider: document.getElementById("humiditySlider")
}

const rooms = {
    all: "Все комнаты",
    livingroom: "Зал",
    bedroom: "Спальня",
    kitchen: "Кухня",
    bathroom: "Ванная",
    studio: "Кабинет",
    washingroom: "Уборная"
}

let roomValues = {
    livingroom: {
        tempB: true,
        temp: 21,
        lightB: true,
        lightsSlider: 45,
        humidityB: true,
        humiditySlider: 45
    },
    bedroom: {
        tempB: true,
        temp: 21,
        lightB: true,
        lightsSlider: 45,
        humidityB: true,
        humiditySlider: 45
    },
    kitchen: {
        tempB: true,
        temp: 21,
        lightB: true,
        lightsSlider: 45,
        humidityB: true,
        humiditySlider: 45
    },
    bathroom: {
        tempB: true,
        temp: 21,
        lightB: true,
        lightsSlider: 45,
        humidityB: true,
        humiditySlider: 45
    },
    studio: {
        tempB: true,
        temp: 21,
        lightB: true,
        lightsSlider: 45,
        humidityB: true,
        humiditySlider: 45
    },
    washingroom: {
        tempB: true,
        temp: 21,
        lightB: true,
        lightsSlider: 45,
        humidityB: true,
        humiditySlider: 45
    }
}

let activeRoom
let activeOption

// Выпадающий список
dom.selectbox.querySelector(".selectbox__selected").onclick = (event) => {
    dom.selectbox.classList.toggle('open')
}

dom.selectboxlist.onclick = (event) => {
    const {target} = event;
    if (target.matches('.selectbox__item')){
        const value = target.dataset.room;
        const active = dom.selectboxlist.querySelector(".selected");
        active.classList.remove("selected");
        target.classList.add("selected");
        console.log(value);
        selectRoom(value);
        renderSetScreen("temperature");
        dom.selectbox.classList.remove('open')
    }
    
}

document.body.onclick = (event) =>{
    const {target} = event;
    if (
        target == document.body ||
        (
            !target.matches('.selectbox') 
            &&!target.parentElement.matches('.selectbox')
            &&!target.parentElement.parentElement.matches('.selectbox')
        )
    ){
        dom.selectbox.classList.remove('open')
    }
}

// Выбор комнаты

function selectRoom(room){
    const selectedRoom = dom.rooms.querySelector(".selected");
    
    if(selectedRoom){
        selectedRoom.classList.remove("selected"); 
    }
    if(room != "all"){
       const new_selectedRoom = dom.rooms.querySelector(`[data-room=${room}]`);
       new_selectedRoom.classList.add("selected");
       renderScreen(false);
       activeRoom = room;
       renderSetScreen("temperature");
    }
    else{
        renderScreen(true); 
    }
    const selectboxSelectedRoom = dom.selectbox.querySelector(".selectbox__item.selected");
    selectboxSelectedRoom.classList.remove("selected");  
    const new_selectedItem = dom.selectbox.querySelector(`[data-room = ${room}]`);
    new_selectedItem.classList.add("selected");
    const selectboxSelected = dom.selectbox.querySelector('.selectbox__selected span');
    selectboxSelected.innerHTML = rooms[room];
}

// тык по иконкам

dom.rooms.querySelectorAll(".room").forEach(room => {
    room.onclick = (event) =>{
        const value = room.dataset.room;
        selectRoom(value);
    }
})

// скрыть выбор комнат

function renderScreen(isRooms){
    setTimeout(() => {
        if (isRooms){
            dom.rooms.style.display = 'grid';
            dom.options.style.display = "none";
        }
        else{
            dom.rooms.style.display = 'none';
            dom.options.style.display = "grid";
            selectOption("temperature");
        }
    }, 300)
    
}

function selectOption(option){
    const selectedOption = dom.optionTabs.querySelector(".selected");
    selectedOption.classList.remove("selected");
    
    const new_selectedOption = dom.optionTabs.querySelector(`[data-type=${option}]`);
    new_selectedOption.classList.add("selected");
    renderSetScreen(option);

    activeOption = option;
}

dom.optionTabs.querySelectorAll(".option").forEach(option => {
    option.onclick = (event) =>{
        const value = option.dataset.type;
        selectOption(value);
    }
})

function renderSetScreen(option){
    setTimeout(() => {
        dom.settingsScreens.querySelectorAll(".settings__screen").forEach(setScr =>{
            setScr.classList.remove("active");
        })
        const newScreen = dom.settingsScreens.querySelector(`[data-type = ${option}]`);
        newScreen.classList.add("active");
        if (!roomValues[activeRoom].tempB){
            document.getElementById("switchT").querySelector("div").classList.remove("on");
            dom.temperatureSlider.classList.remove("on");
        }
        else{
            document.getElementById("switchT").querySelector("div").classList.add("on");
            dom.temperatureSlider.classList.add("on");
        }
        if (!roomValues[activeRoom].lightB){
            document.getElementById("switchL").querySelector("div").classList.remove("on");
            dom.lightsSlider.classList.remove("on");
        }
        else{
            document.getElementById("switchL").querySelector("div").classList.add("on");
            dom.lightsSlider.classList.add("on");
        }
        changeSlider(roomValues[activeRoom].lightsSlider, dom.lightsSlider);
        if (!roomValues[activeRoom].humidityB){
            document.getElementById("switchH").querySelector("div").classList.remove("on");
            dom.humiditySlider.classList.remove("on");
        }
        else{
            document.getElementById("switchH").querySelector("div").classList.add("on");
            dom.humiditySlider.classList.add("on");
        }
        changeSlider(roomValues[activeRoom].humiditySlider, dom.humiditySlider)
    }, 300)
    
}

// Функция изменения слайдера
function changeSlider(percent, slider){
    if (percent >= 0 && percent <= 100){
        slider.querySelector('span').innerText = percent;
        slider.style.height = `${percent}%`;
        const idValue = slider.id;
        roomValues[activeRoom][idValue] = percent;
        console.log(roomValues[activeRoom]);
    }
}

// Отслеживание изменения слайдера
function watchSlider(slider){
    let mouseover = false;
    let mousedown = false;
    let position = 0;
    let range = 0;
    let change = 0;
    const parent = slider.parentElement;
    parent.onmouseover = () => mouseover = true;
    parent.onmouseout = () => mouseover = false;
    parent.onmouseup = () => mousedown = false;
    parent.onmousedown = (e) => {
        mousedown = true;
        position = e.offsetY;
        range = 0;
    }

    parent.onmousemove = (e) => {
        if(mouseover && mousedown){
            range = e.offsetY - position;
            const newChange = Math.round(range / -5);
            if (newChange != change){
                let percent = +slider.querySelector("span").innerText;
                if(newChange < change){
                    percent -= 1;
                }
                else{
                    percent += 1;
                }
                change = newChange;
            changeSlider(percent, slider)
            }
        }
    }
}

watchSlider(dom.lightsSlider);
watchSlider(dom.humiditySlider);

document.getElementById("switchT").onclick = (event) => {
    document.getElementById("switchT").querySelector("div").classList.toggle("on");
    if (activeOption == "temperature"){
        roomValues[activeRoom].tempB = !roomValues[activeRoom].tempB;
    }
    selectOption(activeOption);
}

document.getElementById("switchL").onclick = (event) => {
    document.getElementById("switchL").querySelector("div").classList.toggle("on");
    if (activeOption == "lights"){
        roomValues[activeRoom].lightB = !roomValues[activeRoom].lightB;
    }
    selectOption(activeOption);
}

document.getElementById("switchH").onclick = (event) => {
    document.getElementById("switchH").querySelector("div").classList.toggle("on");
    if (activeOption == "humidity"){
        roomValues[activeRoom].humidityB = !roomValues[activeRoom].humidityB;
    }
    selectOption(activeOption);
}

