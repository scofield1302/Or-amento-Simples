let items = []
let userInfo = ""

const bttn_addItem = document.getElementById("bttn_addItem");


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


})

function removeItem(index) {
    items.splice(index, 1); // remove pelo índice
    renderItems(); // re-renderiza
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
