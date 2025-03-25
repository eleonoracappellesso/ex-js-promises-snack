/*
🏆 Snack 1
Ottieni il titolo di un post con una Promise.

Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}

🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.
*/

function getPostTitle(id) {
    //creo la promise
    const promise = new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(res => res.json())
            .then(post => resolve(post.title))
            .catch(error => reject(error))
    })
    //ritorno la costante contenente la promise
    return promise
}

//richiamo la funzione 
getPostTitle(2)
    .then(title => console.log('Il titolo è', title))
    .catch(error => console.error(error));

//BONUS

function getPost(ID) {
    //creo la promise
    const promise = new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(res => res.json())
            .then(post => {
                fetch(`https://dummyjson.com/users/${post.userId}`)
                    .then(res => res.json())
                    .then(user => {
                        const postData = {
                            ...post,
                            user
                        }
                        resolve(postData);
                    })
                    .catch(error => reject(error))
            })
            .catch(error => reject(error))
    })
    //ritorno la costante contenente la promise
    return promise
}

//richiamo la funzione 
getPost(2)
    .then(post => console.log('Post:', post))
    .catch(error => console.error(error));

/*
🏆 Snack 2
Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".
*/

function lanciaDado() {
    const promise2 = new Promise((resolve, reject) => {
        console.log('Sto lanciando il dado...');
        setTimeout(() => {
            if (Math.random() < 0.2) {
                reject('Il dado si è incastrato. Prova di nuovo.');
            } else {
                const result = Math.floor(Math.random() * 6) + 1
                resolve(result);
            }
        }, 3000)
    });
    return promise2
}

lanciaDado()
    .then(result => console.log('Il dado è stato lanciato. Numero:', result))
    .catch(error => console.error(error));