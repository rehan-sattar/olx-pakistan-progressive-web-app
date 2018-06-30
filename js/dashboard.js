console.log('runnign');

const db = firebase.database();


document.getElementById('addProductForm').addEventListener('submit', (event) => {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let catagory = document.getElementById('catagory').value;
    let title = document.getElementById('title').value;
    let phone_number = document.getElementById('phone_number').value;
    let address = document.getElementById('address').value;
    let price = document.getElementById('price').value;


    let product = {
        name,
        catagory,
        title,
        phone_number,
        address,
        price,
    };
    console.log(product);
    // write kerne ka!
    db.ref("users").child(localStorage.getItem("user_mail")).child("products").child(product.catagory).push(product)
        .then(() => {
            console.log('written');
        }).catch(error => {
            console.log(error.messsage);
        });

    //read; 






});

var table = document.getElementById('container');

const convertItIntoArray = (object) => {
    let productArray = []
    for (let key in object) {
        for (let key2 in object[key]) {
            for (let key3 in object[key][key2]) {
                for (let key4 in object[key][key2][key3]) {
                    productArray.push(object[key][key2][key3][key4]);
                };
            };
        };
    }

    return productArray;
}

db.ref('users').on('value', (snapshot) => {
    let data = snapshot.val();
    let productArray = convertItIntoArray(data);
    printData(productArray);
});


const searchAddByname = () => {
    let input = document.getElementById('searchbyname').value;
    console.log(input);
    db.ref('users').on('value', (snapshot) => {
        let data = snapshot.val();
        let productArray = convertItIntoArray(data);
        let newArray = productArray.filter(item => item.name.toLowerCase() === input.toLowerCase());
        printData(newArray);
    });
};


const searchByCatagory = () => {
    let catagoryName = document.getElementById('catagoryForSearch').value;
    if( catagoryName === "selected" ) {
        alert('Please select a catagory')
    }
    db.ref('users').on('value', (snapshot) => {
        let data = snapshot.val();
        db.ref('users').on('value', (snapshot) => {
        let data = snapshot.val();
        let productArray = convertItIntoArray(data);
        let newArray = productArray.filter(item => item.catagory === catagoryName );
        printData(newArray);       
    });
});
}


const printData = (array) => {
    table.innerHTML = '';
    array.map(item => {
        table.innerHTML += `
    
        <tr> 
                <td> Name :  </td>
                <td>${item.name}</td>
        </tr>
        <tr> 
                <td>Ttle</td>
                <td>${item.title}</td>
        </tr>
        <tr> 
                <td> Address</td>
                <td>${item.address}</td>
        </tr>
        <tr> 
                <td> price </td>
                <td>${item.price}</td>
        </tr>
        <tr> 
                <td> Phone </td>
                <td>${item.phone_number}</td>
        </tr>
        <tr> 
                <td> Catagory  </td>
                <td>${item.catagory}</td>
        </tr>
        `;
    });

}




