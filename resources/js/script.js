const incButtons = () => {
    let increaseButtons = document.getElementsByClassName('list-item-increase');

    for(let i = 0; i < document.getElementsByClassName('list-item').length; i++) {
        document.getElementsByClassName('list-item-increase')[i].addEventListener('click', () => {
            const counterButton = increaseButtons[i].closest('.list-item').querySelector('.list-item-count');
            let value = parseInt(counterButton.textContent);
            if(event.ctrlKey) {
                value += 100;
            } else if(event.shiftKey) {
                value += 10;
            } else {
                value++;
            }
            counterButton.textContent = value;
        });
    }
}

const decButtons = () => {
    let decreaseButtons = document.getElementsByClassName('list-item-decrease');

    for(let i = 0; i < document.getElementsByClassName('list-item').length; i++) {
        document.getElementsByClassName('list-item-decrease')[i].addEventListener('click', () => {
            const counterButton = decreaseButtons[i].closest('.list-item').querySelector('.list-item-count');
            let value = parseInt(counterButton.textContent);
            if(event.ctrlKey) {
                value -= 100;
            } else if(event.shiftKey) {
                value -= 10;
            } else {
                value--;
            }
            counterButton.textContent = value;
        });
    }
}

const delButtons = () => {
    let deleteButton = document.getElementsByClassName('list-item-delete');
    
    for(let i = 0; i < document.getElementsByClassName('list-item').length; i++) {
        document.getElementsByClassName('list-item-delete')[i].addEventListener('click', () => {
            const deletedItem = deleteButton[i].closest('.list-item');
            deletedItem.remove();
            window.location.reload();
        });
    }
    
};

const reloadButtons = () => {
    incButtons();
    decButtons();
    delButtons();
}

window.onbeforeunload = () => {
    for (let i = 0; i < document.getElementsByClassName('list-item').length; i++) {
        const counterButton = document.getElementsByClassName('list-item')[i].querySelector('.list-item-count');
        const titleBox = document.getElementsByClassName('list-item')[i].querySelector('.list-item-title');
        localStorage.setItem(`deveju-value${i}`, counterButton.textContent);
        localStorage.setItem(`deveju-title${i}`, titleBox.value);
    }
    saveToLocalStorage();
};

window.onload = () => {
    loadFromLocalStorage();
    for (let i = 0; i < document.getElementsByClassName('list-item').length; i++) {
        const counterButton = document.getElementsByClassName('list-item')[i].querySelector('.list-item-count');
        const titleBox = document.getElementsByClassName('list-item')[i].querySelector('.list-item-title');
        const value = localStorage.getItem(`deveju-value${i}`);
        const title = localStorage.getItem(`deveju-title${i}`);
        if (value !== null) {
            counterButton.textContent = value;
        }
        if (title !== null) {
            titleBox.value = title; 
        }
    }
    reloadButtons();
};

const newItem = () => {
    const listItemDiv = document.createElement("div");
    listItemDiv.classList.add("list-item");

    const listItemContentDiv = document.createElement("div");
    listItemContentDiv.classList.add("list-item-content");

    const inputElement = document.createElement("input");
    inputElement.classList.add("list-item-title");
    inputElement.type = "text"; 
    inputElement.placeholder = "Enter title"; 

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const countButton = document.createElement("button");
    countButton.classList.add("list-item-count");
    countButton.textContent = "0";

    const increaseButton = document.createElement("button");
    increaseButton.classList.add("list-item-increase");
    increaseButton.textContent = "+";

    const decreaseButton = document.createElement("button");
    decreaseButton.classList.add("list-item-decrease");
    decreaseButton.textContent = "-";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("list-item-delete");
    deleteButton.textContent = "🗑";

    buttonsDiv.appendChild(countButton);
    buttonsDiv.appendChild(increaseButton);
    buttonsDiv.appendChild(decreaseButton);
    buttonsDiv.appendChild(deleteButton);

    listItemContentDiv.appendChild(inputElement);
    listItemContentDiv.appendChild(buttonsDiv);

    listItemDiv.appendChild(listItemContentDiv);

    document.body.appendChild(listItemDiv);
};

const newItemLegacy = () => {
    const newItem = document.createElement('div');
    newItem.classList.add('list-item');
    newItem.innerHTML = `
        <div class="list-item-content">
            <input class="list-item-title" placeholder="Enter Title">
            <div class="buttons">
                <button class="list-item-count"> 0 </button>
                <button class="list-item-increase"> + </button>
                <button class="list-item-decrease"> - </button>
                <button class="list-item-delete"> 🗑 </button>
            </div>
        </div>
    `;
    document.getElementById('body').appendChild(newItem);
};

document.getElementById('add-new').addEventListener('click', () => {
    newItemLegacy();
    reloadButtons();
    window.location.reload();
});

const saveToLocalStorage = () => {
    const listItems = document.querySelectorAll('.list-item');
    const numItems = listItems.length;

    localStorage.setItem('deveju-num-items', numItems);
};

const loadFromLocalStorage = () => {
    const numItems = parseInt(localStorage.getItem('deveju-num-items')) || 0;

    for (let i = 0; i < numItems; i++) {
        newItemLegacy();
    }
};