import { createServer, Model, Serializer } from 'miragejs';
import response from './server.json';

function makeServer() {
  return createServer({
    models: {
      food: Model,
    },

    serializers: {
      food: Serializer.extend({
        root: false,
        embed: true
      })
    },

    seeds(server) {
      server.db.loadData({
        foods: response.foods,
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/foods', (schema) => schema.foods.all());
      this.get('/foods/:id', (schema, request) => {
        const { id } = request.params;
        return schema.foods.find(id);
      });
      this.post('/foods', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        return schema.foods.create({
          ...data,
          available: true,
        });
      });
      this.put('/foods/:id', (schema, request) => {
        const { id } = request.params;
        const data = JSON.parse(request.requestBody);
        return schema.foods.find(id).update(data);
      });
      this.delete('/foods/:id', (schema, request) => {
        const { id } = request.params;
        return schema.foods.find(id).destroy();
      });
    },
  });
}

export { makeServer }