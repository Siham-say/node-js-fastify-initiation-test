// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
//require fastify (import de la librairie) 
//logger true entre {exécute la fonction}
//console log du serveur

/*************** */
// METHOD API REST
// si vas à tel route tu obtiendras tel contenu

// GET - READ
// POST - CREATE
// PATCH / PUT - UPDATE
// DELETE - SUPPR



// Declare a route
//machin.truc machin=objet truc=méthode
fastify.get('/', async (request, reply) => {
    //fonction fléchée qui exécute quand on attein la page
    // on retourne un objet js qui va être converti en json (javascript object objet notation) soit une chaine de caractères
  return { hello: 'world' }
})

// Déclarer la route/heroes - cette route retournera la liste des avengers
const avengers = ["Iron man", "Captain America", "Hulk", "Hauk Eye" ]

fastify.get('/heroes', function(){
    return avengers
    })

    const student ="moi"

    /************ex************ */
    // const date = {
    //     // clé: valeur
    //     student // éqquivaut à écrire student:student
    // }
/*********************************** */

fastify.get('/me', function(){
return {
    prenom: "steve",
    nom: "rogers",
    job: "super héros",
}
})
//on déclare une route 
// qu'est ce que je souhaite retourner dans cette page

// Run the server!
//try  = tout le bloc doit etre executé 
// catch = s'il y a une erreur il arrete le processus
const start = async () => {
  try {
    await fastify.listen(3000) // port 
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()