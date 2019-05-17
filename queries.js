const pg =  require('pg');
const client = new pg.Client({
    user: 'rpiieouhijvuqm',
    host: 'ec2-174-129-208-118.compute-1.amazonaws.com',
    database: 'd5nu1f0qoqk6uo',
    password: 'a00d339948f36ce7a4c272dbca1db9546f5a6fb9dce2382aef8e0557c777f17f',
    port: 5432,
    ssl: true   
});
client.connect();

const getPlatforms = (req, res) => {
    client.query('SELECT * FROM platform', (err, results) => {
      if (err) {
        res.status(401).json({ message : `${err.message}`});
      }else{
          res.status(200).json(results.rows);
      }
    })
};

const getPlatformById = (req, res) => {
    let id_platform = parseInt(req.params.id_platform);
    console.log(id_platform);
    client.query('SELECT * FROM platform WHERE id_platform = $1', [id_platform], (err, results) => {
      if (err) {
        res.status(401).json({ message : `${error.message}`});
      }else{
          res.status(200).json(results.rows);
      }
    });
};

const createPlatform = (req, res) => {
    let { idPlataforma, nombrePlataforma } = req.body;  
    client.query('INSERT INTO PLATFORM (ID_PLATAFORMA, NOMBRE_PLATAFORMA) VALUES ($1, $2)', [idPlataforma, nombrePlataforma], (err, result) => {
        if (err) {
            res.status(401).json({ message : `${err.message}`});
        }else{
            res.status(201).json({ message : `Platform added with ID: ${idPlataforma}`});
        }
    })
};

const updatePlatform = (req, res) => {
    let idPlataforma = parseInt(req.params.idPlataforma);
    let { nombrePlataforma } = req.body;
  
    client.query(
      'UPDATE PLATAFORMA SET NOMBRE_PLATAFORM = $1 WHERE ID_PLATAFORMA = $2',
      [nombrePlataforma, idPlataforma],
      (err, results) => {
        if (err) {
          res.status(401).json({ message : `${err.message}`});
        }else{
          response.status(200).send(`Plataforma modified with ID: ${idPlataforma}`);
        }
      }
    )
};

module.exports = {
    getPlatforms,
    getPlatformById,
    createPlatform,
    updatePlatform
};