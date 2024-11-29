import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { audioDataBase } from './audio-data-base.mjs';
import { dataBase } from './data-base.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/..'));

app.get('/', (_req, res) => res.sendFile(__dirname + "/../index.html"));
app.get('/movies-top', (_req, res) => res.json(dataBase));

app.get('/movies-top/:id/audio', (req, res) => {
    const movieId = Number(req.params.id);
    const entity = audioDataBase.find(e => e.id === movieId);

    if (entity) {
      res.json(entity);
    } else {
      res.sendStatus(404);
    }
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}/`));
