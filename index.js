const fs = require("fs")

const ProductManager = require("./productManager");

const createFile = async (file_path) => {
    try {
      if (!fs.existsSync(file_path)) {
          await fs.promises.writeFile(file_path, "", "utf8");
      }
    } catch (err) {
      console.log("File creation error", err);
    }
  };

const path = "./products.json";
createFile(path);
const myProductManager = new ProductManager(path);

const productsIncorporated = [
    {
      title: 'Alemania',
      description: 'Camiseta de Alemania',
      price: 'USD 100',
      thumbnail: 'https://i.ibb.co/f1VRdR0/camiseta-Alemania.png',
      code: 'C0001',
      stock: '5',
    },
    {
      title: 'España',
      description: 'Camiseta España',
      price: 'USD 90',
      thumbnail: 'https://i.ibb.co/fnyhXPj/camiseta-Espa-a.png',
      code: 'C0002',
      stock: '3',
    },
    {
      title: 'Portugal',
      description: 'Camiseta Portugal',
      price: 'USD 70',
      thumbnail: 'https://i.ibb.co/SVtLNvb/camiseta-Portugal.png',
      code: 'C0003',
      stock: '7',
    },
  ];

  productsIncorporated.forEach((product) => {
  myProductManager.addProduct(product);
});


const newProduct = {
    title: 'Argentina',
    description: 'Camiseta Argentina',
    price: 'USD 120',
    thumbnail: 'https://i.ibb.co/4dJB6DR/camiseta-Argentina.png',
    code: 'C0004',
    stock: '2',
};

const change = myProductManager.updateProduct(1, newProduct);
console.log("Producto actualizado:");
console.log(change);

const change2 = myProductManager.deleteProductById(3);
console.log("Producto eliminado:");
console.log(change2);

// Eliminación de todos los productos, sacar las barras para habilitar la eliminacion completa.
//myProductManager.deleteAllProducts();

