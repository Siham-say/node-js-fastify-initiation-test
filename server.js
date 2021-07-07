// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const { ObjectId } = require('mongodb')
// Connexion à la base de donnee -- https://github.com/fastify/fastify-mongodb
fastify.register(require('fastify-mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  // url: 'mongodb://mongo/mydb'
  url: 'mongodb://localhost:27017/superheroes'
})

// Declare a route
fastify.get('/', (request, reply) => {
  return { hello: 'world 2' }
})

// Déclarer la route /heroes - cette route retournera la liste des avengers
const avengers = ["Iron man", "Captain america", "Spiderman"]

// heroes GET - Obtiens la liste des héros
fastify.get('/heroes', ()=>{
    return avengers //equivalent à avengers: avengers
})

// // /heroes/69 GET - Obtiens le héros ayant l'id 69
// fastify.get('/heroes/:heroesId', async (request, reply) => {
//   // console.log({
//   //   id: request.id,
//   //   params: request.params
//   // })
//   const heroesId = request.params.heroesId
//   const db = fastify.mongo.db
//   const collection = db.collection('heroes')
//   const result = await collection.findOne({
//     // id: "69"
//     id: heroesId
//   })
//   // return["name"]
//   // return result.name
//   return result
  
// })

// Recuperer l'ID de Mongodb
fastify.get('/heroes/:heroesId', async (request, reply) => {
  // console.log({
  //   id: request.id,
  //   params: request.params
  // })
  const { heroesId } = request.params
  const db = fastify.mongo.db
  const collection = db.collection('heroes')
  const result = await collection.findOne({
    // id: "69"
    _id: new ObjectId(heroesId)
  })
  // return["name"]
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  // return result.name
  return result
  
})

// /heros/bio/id
// cette route devra retourner: nomDuHero connu sous le nom de vraiNom.
// je suis née à lieuDeNaissance. j'ai XX en intelligence, et YY en vitesse.
fastify.get('/heroes/bio/:heroesId', async (request, reply) => {
  const db = fastify.mongo.db
  const collection = db.collection('heroes')
     const { heroesId } = request.params
  const result = await collection.findOne({
    // id: "69"
    _id: new ObjectId(heroesId)
  })
  
 /** Version ES 6  NOUVEAU *******/
//  const {name, biography, powerstats: {intelligence, speed} } = result
 const {
   name,
   biography,
   powerstats: {intelligence, speed},
 } = result
  //Template literals : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  // return  `${result.name} connu sous le nom de result.biography.full-name. je suis née à  j'ai ${result.powerstats.intelligence}, et ${result.powerstats.speed} en vitesse .`

  //result.biography.full-name ===> ${biography["full-name"]}
  //autre Methode pour éviter la repetition de result result ..

  // const {name, biography, powerstats} = result 
  // const{intelligence,speed}= powerstats
  // Ou pour change cette methode  ${powerstats.speed} à ${speed}


   
  return  `${name} connu sous le nom de ${biography["full-name"]}. je suis née à ${biography["place-of-birth"]} j'ai ${intelligence} en intelligence, et ${speed} en vitesse .`

  //***  Version ES5 (Vieux JS) ********/
  /** 
   * const name = result.name
  const fullName = result.biography["full-name"]
  const placeOfBirth = result.biography["place-of-birth"]
  const intelligence = result.powerstats.intelligence
  const speed = result.powerstats.speed

  return "Version ES5 : " + name + " connu sous le nom de " + fullName + ". je suis née à "+ placeOfBirth + ". J'ai " + intelligence + " en intelligence, et + " + speed + " en vitesse"
  */

  /**** fin Version ES5 */
})



// heroes POST Ajoute un nouvel héro
fastify.post('/heroes', async (request, reply) => {
  console.log(request.body)
  const db = fastify.mongo.db
  const collection = db.collection('heroes')

  // console.log(collection);
  // db.collection('inserts')
  // Insert a single document


  // collection.insertOne({
  //   name: request.body.name,
  //   powerstats: request.body.powerstats,
  // })
  const result = await collection.insertOne(request.body)
  return result


  // return null
  // reply.send(null)
  
})



fastify.get('/me', (request, reply) => {
    //ici on retourne un objet javascript qui va etre converti en json
    //(JavaScript Object Notation)
    return { 
        prenom: 'Abdallah',
        nom: "Dargui d",
        job: "developpeur web 3",
     }
  })


// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

const student = "Siham"
const age = 18
//dans un objet,si une clé et sa valeur portent le même nom, on pourra utiliser la forme raccourcie
const data ={
    //cle : valeur
    //student // est équivaut à écrire student : student
    student,
    age,
}

//Equivalent à

// const data2 ={
//     student = student,
//     age = age,
// }
/*********************************** */
fastify.delete('/heroes/:heroesId', async (request, reply)=> {
  const collection = fastify.mongo.db.collection('heroes')
  const { heroesId } = request.params
  const result = await collection.findOneAndDelete({
    _id: new ObjectId(heroesId)
  })
  return result
})

/***************************************************** */
// // Require the framework and instantiate it
// // Require the framework and instantiate it
// //dépendance de mongodb
// const fastify =require('fastify')({logger:true})
// // const mongodb = require('mongodb')
// // console.log(mongodb.ObjectId)
// // ou par déstucturation
// const { ObjectId } = require('mongodb') //import que de l'objet id et pas de toute la librairie
// //require fastify (import de la librairie) 
// //logger true entre {exécute la fonction}
// //console log du serveur

// /*************** */
// // METHOD API REST
// // si vas à tel route tu obtiendras tel contenu

// // GET - READ
// // POST - CREATE
// // PATCH / PUT - UPDATE
// // DELETE - SUPPR

// // users
// // heroes
// // conversation





// //connexion à la bdd
// fastify.register(require('fastify-mongodb'), {
//   // force to close the mongodb connection when app stopped
//   // the default value is false
//   forceClose: true,

//   url: 'mongodb://localhost:27017/superheroes'
// })

// // Declare a route
// //machin.truc machin=objet truc=méthode
// // fastify.get('/', async (request, reply) => {
// //   //fonction fléchée qui exécute quand on attein la page
// //   // on retourne un objet js qui va être converti en json (javascript object objet notation) soit une chaine de caractères
// //   return { hello: 'world' }
// // })
// fastify.get('/heroes', async ()=> {
//   const collection = fastify.mongo.db.collection('heroes')
//   const result = await collection.find({}).toArray() //retourner un tableau de resultat
//   return result
// })
// /********************************** */
// /// heroes/69 GET - Obtient le héros ayant l'id 69
// // /heroes/: heroId ...findOne()
// fastify.get('/heroes/:heroesId', async (request,reply) => {
//   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

//   // après : c'est une variable (ligne 47)
//   // sans les deux points il considère chaine de caractères

//   // params est un objet 

// // console.log({
// //   id: request.id,
// //   params: request.params.heroesId
// // })
// // const heroesId = request.params.heroesId
// const { heroesId } = request.params //je souhaite extraire de l'objet params heroesid
// const collection = fastify.mongo.db.collection("heroes")
// const result = await collection.findOne({
//   _id: new ObjectId(heroesId) //conversion en objet une chaine de caractère
// })
// // return result ["name"]
// return result
// })

// // Déclarer la route/heroes - cette route retournera la liste des avengers
// // const avengers = ["Iron man", "Captain America", "Hulk", "Hauk Eye"]

// // fastify.get('/heroes', function () {
// //   return avengers
// // })

// // const student = "moi"
// /************************************ */
// // heroes/bio/id
// // cette route devra retourner : nomDuHeroconnu sous le nom de vraiNom
// // je suis né à lieuDeaissance.j'ai XX en intelligence  et YY en vitesse
// fastify.get('heroes/bio/:heroesId', async (request, reply) => {
//   const collection = fastify.mongo.db.collection('heroes')
//   const { heroesId } = request.params
//   const result = await collection.findOne({
// 		_id: new ObjectId(heroesId) //conversion de la chaine de caractère en objet
// 	})


// // Version ES6
// const { name, biography: { ['place-of-birth']: placeOfBirth, ['full-name']: fullName }, powerstats: { intelligence, speed } } = result

// // Template literals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
//   return `${name} connu sous le nom de ${fullName}. Je suis née à ${placeOfBirth}. J'ai ${intelligence} en intelligence, et ${speed} en vitesse.`


//   const {name, biography: powerstats: { intelligence, speed } } = result //déstructuré
//   // const { intelligence, speed} = powerstats
//   // const name = result.name
//    // const name = result["name"] egal à la ligne du dessus
//   // const biography = result.biography
//   // const powerstats = result.powerstats

// 	// Template literals: ttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// 	// return `${name} connu sous le nom de ${biography[full-name]}. 
//   // Je suis né à ${biography["place-of-birth"]}. 
//   // J'ai ${intelligence} en intelligence, et 
//   // ${speed} en vitesse.`

//   // return `${name} connu sous le nom de ${biography["full-name"]}. Je suis née à 
//   //${biography["place-of-birth"]}. J'ai ${intelligence} en intelligence, et ${speed} en vitesse.`



//   // return name + "connu sous le nom de" + fullName + ".  
//   //je suis née à" + placeOfBirth + ".J'ai " + intelligence + " en intelligence,
//   // et + "+ speed" + "en vitesse."
//   // Je suis né à ${biography["place-of-birth"]}. 
//   // J'ai ${intelligence} en intelligence, et 
//   // ${speed} en vitesse.`

// })






// /*********************** */
// //heroes post // ajoute un nouvel héros
// fastify.post('/heroes', async (request, reply) => {
//   // console.log(request.body) // type objet
//   //pour changer le contexte (lecontexte est dans fastify)
//   const collection = fastify.mongo.db.collection('heroes')
//   // console.log(collection)
//   // collection.insertOne({
//   //   name: request.body.name,
//   //   powerstats: request.body.powerstats
//   // })
//   const result = await collection.insertOne(request.body)

//   return result.ops[0].name // qui retourne un tableau avec un objet dedans 
//   //c'est pour qu'il te le retourne dans la bd si j'ai bien compris

//   //pour éviter les codes erreur
//     // reply.send(null)
//     // async et await combinaison des deux codes pour attendre qu'l ait fini d'analyser la
//     //bdd avant de retourner le resutat

// })

  

// /************ex************ */
// // const date = {
// //     // clé: valeur
// //     student // éqquivaut à écrire student:student
// // }
// /*********************************** */

// fastify.get('/me', function () {
//   return {
//     prenom: "steve",
//     nom: "rogers",
//     job: "super héros",
//   }
// })
// //on déclare une route 
// // qu'est ce que je souhaite retourner dans cette page

// // Run the server!
// //try  = tout le bloc doit etre executé 
// // catch = s'il y a une erreur il arrete le processus
// const start = async () => {
//   try {
//     await fastify.listen(3000) // port 
//   } catch (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// }
// start()