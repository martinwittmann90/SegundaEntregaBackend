const fs = require("fs");

class ProductManager {
    constructor(path) {
    this.path = path;
    }

    addProduct(newProduct) {
    if (
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.thumbnail ||
        !newProduct.code ||
        !newProduct.stock
) {
    throw new Error("Missing fields");
    }

        let newId = this.getNewId();
        newProduct.id = newId;
        const allProductsArray = this.read();
        allProductsArray.push(newProduct);
        this.write(allProductsArray);
  }

    getNewId() {
        let lastId = 0;
        let allProductsArray = this.read(this.file);
        if (allProductsArray.length > 0) {
            lastId = allProductsArray[allProductsArray.length - 1].id;
        }
        return lastId + 1;
    }

    getProductById(id) {
        let allProductsArray = this.read(this.file);
        const product = allProductsArray.find((product) => product.id === id);
        if (!product) {
        throw new Error("Product not found by ID");
        }
        return product;
    }

    getProducts() {
        return this.read(this.file);
    }

    updateProduct(id, newProduct) {
        let allProductsArray = this.read(this.file);
        const productToUpdate = allProductsArray.find((product) => product.id === id);
        if (!productToUpdate) {
        throw new Error("Update not found");
        }
        if (
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.thumbnail ||
        !newProduct.code ||
        !newProduct.stock
        ) {
        throw new Error("Missing fields");
        }

    const updatedProduct = this.updateProductFields(productToUpdate, newProduct);
    const index = allProductsArray.indexOf(productToUpdate);
    allProductsArray[index] = updatedProduct;
    this.write(allProductsArray);

    const change = {
      message: "Product updated",
      product: updatedProduct,
    };
    return change;
  }

  updateProductFields(productToUpdate, newProduct) {
    const updatedProduct = {
      ...productToUpdate,
      ...newProduct,
    };
    return updatedProduct;
  }

  deleteProductById(id) {
    const allProductsArray = this.read(this.file);
    const product = allProductsArray.find((product) => product.id === id);
    if (!product) {
      throw new Error("Product not deleted");
    }
    const index = allProductsArray.indexOf(product);
    allProductsArray.splice(index, 1);
    this.write(allProductsArray);
    const change = {
      message: "Product deleted successfully",
      product: product,
    };
    return change;
  }

  deleteAllProducts() {
    const allProductsArray = this.read(this.file);
    allProductsArray.splice(0, allProductsArray.length);
    this.write(allProductsArray);
  }

  read() {
    let allProductsArray = [];
    try {
      let allProductsString = fs.readFileSync(this.path, "utf8");
      allProductsString.length > 0
        ? (allProductsArray = JSON.parse(allProductsString))
        : (allProductsArray = []);
    } catch (err) {
      console.log("Read failure", err);
    }
    return allProductsArray;
  }

  write(allProductsArray) {
    let allProductsString = JSON.stringify(allProductsArray, null, 2);
    try {
      fs.writeFileSync(this.path, allProductsString);
    } catch (err) {
      console.log("Write error", err);
    }
  }
}

module.exports = ProductManager;