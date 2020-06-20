class BookService{
    constructor(){
        this.URI = '/api/books'; //Direccion de la API 
    }

    async getBooks(){   
        const response = await fetch(this.URI); //Hace una peticion a la API
        const books = await response.json(); //Guarda la respuesta en formato JSON
        return books;
        console.log(data);
        
    }
   async postBook(book){
     const res = await fetch(this.URI,{ //Envia una peticion post al Servidor
            method: 'POST',
            body: book  
        });
      const data = await res.json(); //Guarda la respuesta en formato JSON
      return data;
      console.log(data);
        

    }
  async deleteBook(bookId){
       const res = await fetch(`${this.URI}/${bookId}`, {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
     const data = await res.json();
     console.log(data);
     


    }
}
module.exports = BookService;