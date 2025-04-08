let items = [];
let userInfo = [];

const bttnNext = document.getElementById("bttnNext");
const bttnBack = document.getElementById("bttnBack");
const userDocument = document.getElementById("inptDocument");
const address = document.getElementById("comercialAddress");
const userName = document.getElementById("userName");
const observations = document.getElementById("observations");
const bttn_addItem = document.getElementById("bttn_addItem");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

const nameItem = document.getElementById("nameItem");
const quantityItem = document.getElementById("quantity");
const unityItem = document.getElementById("unity");
const valueItem = document.getElementById("value");

const bttnFinshPdf = document.getElementById("finishPDF");

nameItem.addEventListener("change",function(){
    disableAddItem(nameItem)
    
})

quantityItem.addEventListener("change",function(){
    disableAddItem(quantityItem)
    
})

unityItem.addEventListener("change",function(){
    disableAddItem(unityItem)
    
})

valueItem.addEventListener("change",function(){
    disableAddItem(valueItem)
    
})

function disableAddItem (itemToVerify){
    if (nameItem.value && quantityItem.value && unityItem.value && valueItem.value){
        bttn_addItem.disabled = false;
    }
}


class user_Info {
    constructor(name,document,address,observations){
        this.name = name;
        this.document = document;
        this.address = address;
        this.observations = observations;
    }
}

bttnNext.addEventListener("click",function(){
    if (!userDocument.value){
        alert("Por favor, preencha o número do CPF ou CNPJ");
        userDocument.focus()
    }
    else if (!address.value){
        alert("Por favor, preencha o Endereço comercial");
        address.focus()
    }
    else if (!userName.value){
        alert("Por favor, informe o seu nome ou Razão Social");
        userName.focus()
    }
    else {
        newUser = new user_Info(userName.value,userDocument.value,address.value,observations.value)
        step1.style.display = "none"
        step2.style.display = "flex"
        document.getElementById("nameItem").focus()
        


    }
    
})
bttnBack.addEventListener("click",function(){
        step1.style.display = "flex"
        step2.style.display = "none"
        ;
})







class items_budget  {
    constructor(item,quantity,unity,value,total) {
        this.item = item;
        this.quantity = quantity;
        this.unity = unity;
        this.value = value;
        this.total = parseFloat(value) * parseFloat(quantity);

    }
}

function addItem(){
    const nameItem = document.getElementById("nameItem").value;
    const quantityItem = document.getElementById("quantity").value;
    const unityItem = document.getElementById("unity").value;
    const valueItem = document.getElementById("value").value;
    const totalPriceItem = document.getElementById("totalPrice").value;

    new_item = new items_budget(nameItem,quantityItem,unityItem,valueItem,totalPriceItem);
    items.push(new_item);
    bttn_addItem.disabled = true

}

function renderItems() {
    const container = document.getElementById("itemsContainer");
    container.innerHTML = ""; 


    //     let frutas = ["banana", "maçã", "laranja"];

    // frutas.forEach((fruta, index) => {
    //     console.log(`Fruta: ${fruta} na posição ${index}`);
    // });


    items.forEach((itemObj, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item-card";
        itemDiv.innerHTML = `
            <strong>${itemObj.item}</strong><br>
            Quantidade: ${itemObj.quantity} ${itemObj.unity}<br>
            Valor unitário: R$ ${itemObj.value}<br>
            Total: R$ ${itemObj.total}<br>
            <button onclick="removeItem(${index})">Remover</button>
            <hr>
        `;
        container.appendChild(itemDiv);
    });
}


bttn_addItem.addEventListener("click",function(){
    addItem();
    renderItems(); 
    clearInputs();
    bttnFinshPdf.disabled = false;


})

function removeItem(index) {
    items.splice(index, 1); // remove pelo índice
    renderItems(); // re-renderiza
    if (items.length == 0){
        bttnFinshPdf.disabled = true;
    }
}


async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Centraliza o título no topo da página
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = "Gerador de PDF";
    const textWidth = doc.getTextWidth(title);
    const x = (pageWidth - textWidth) / 2;
    doc.setFontSize(16);
    doc.text(title, x, 20); // y = 20 para deixar espaço

    // Dados da tabela
    const cabecalho = [["Item", "Quantidade","Und.","Valor Ind.","Total"]];
    const dados = items.map(obj => [
        obj.item,
        obj.quantity,
        obj.unity,
        `R$ ${parseFloat(obj.value).toFixed(2)}`,
        `R$ ${(parseFloat(obj.value) * parseFloat(obj.quantity)).toFixed(2)}`
    ]);
    
    

    // Adiciona a tabela usando autoTable
    doc.autoTable({
        startY: 30, // distância do topo
        head: cabecalho,
        body: dados,
    });

    // Faz o download
    doc.save("tabela.pdf");
}

function clearInputs() {
    document.getElementById("nameItem").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("unity").value = "";
    document.getElementById("value").value = "";
    document.getElementById("totalPrice").value = "";
    document.getElementById("nameItem").focus()
}
