import { Injectable, NotFoundException } from '@nestjs/common';

import { Class } from './class.model';


@Injectable()
export class ClassesService {

  insertClass(id: number, name: string, capacity: number) {
    const newClass = new Class(id, name, capacity, []);
    //put in DB
    //update store
  }


  getClasses() {
    //get from DB
  }

//   getSingleClass(id: number) {
//     //get from DB
//   }

//   updateProduct(productId: string, title: string, desc: string, price: number) {
//     const [product, index] = this.findProduct(productId);
//     const updatedProduct = { ...product };
//     if (title) {
//       updatedProduct.title = title;
//     }
//     if (desc) {
//       updatedProduct.description = desc;
//     }
//     if (price) {
//       updatedProduct.price = price;
//     }
//     this.products[index] = updatedProduct;
//   }

  deleteClass(id: number) {
      //remove from DB
  }

  removeStudent(classId: number, studentId: number) {
    //remove student from student list
  }

  getStudents(id: number) {
    //get students from DB
  }

//   private findProduct(id: string): [Product, number] {
//     const productIndex = this.products.findIndex(prod => prod.id === id);
//     const product = this.products[productIndex];
//     if (!product) {
//       throw new NotFoundException('Could not find product.');
//     }
//     return [product, productIndex];
//   }
}
